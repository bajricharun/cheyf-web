import { NextResponse } from "next/server";
import crypto from "crypto";
import { getPendingReservation, updateReservationStatus } from "@/lib/redis";

const MONRI_KEY = process.env.MONRI_MERCHANT_KEY || "test_merchant_key";
const RENTL_API_BASE_URL =
  process.env.RENTL_API_URL || "https://api.rentl.io/v1";
const RENTL_API_KEY = process.env.RENTLIO_API_KEY || "";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const orderNumber = body.order_number as string;
    const status = body.status as string; // approved, declined, etc.
    const amount = body.amount as string;
    const currency = body.currency as string;
    const digest = body.digest as string;

    if (!orderNumber) {
      return NextResponse.json(
        { error: "Missing order_number" },
        { status: 400 },
      );
    }

    // Verify the Monri digest to ensure the callback is authentic
    // only if it is available
    if (digest) {
      const expectedDigest = crypto
        .createHash("sha512")
        .update(`${MONRI_KEY}${orderNumber}${amount}${currency}`)
        .digest("hex");

      if (digest !== expectedDigest) {
        console.error(
          `Monri callback digest mismatch for order ${orderNumber}`,
        );
        return NextResponse.json({ error: "Invalid digest" }, { status: 403 });
      }
    }

    // Only process approved transactions
    if (status !== "approved") {
      console.warn(
        `Monri callback: order ${orderNumber} status=${status}, skipping reservation`,
      );
      await updateReservationStatus(orderNumber, "failed");
      return NextResponse.json({ received: true, action: "skipped" });
    }

    // Mark as paid
    await updateReservationStatus(orderNumber, "paid");

    // Retrieve pending reservation from Redis
    const reservation = await getPendingReservation(orderNumber);
    if (!reservation) {
      console.error(`No pending reservation found for order ${orderNumber}`);
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 },
      );
    }

    // Resolve unitTypeId from availability if possible
    let resolvedUnitTypeId = parseInt(reservation.unitTypeId, 10);
    try {
      const availRes = await fetch(
        `${RENTL_API_BASE_URL}/availability?propertiesIds=${reservation.propertyId}&dateFrom=${reservation.checkIn}&dateTo=${reservation.checkOut}`,
        { headers: { ApiKey: RENTL_API_KEY } },
      );
      if (availRes.ok) {
        const availData = await availRes.json();
        if (Array.isArray(availData) && availData.length > 0) {
          const prop = availData.find(
            (p: { id: number | string }) =>
              p.id.toString() === reservation.propertyId,
          );
          if (prop?.unitTypes?.length > 0) {
            resolvedUnitTypeId = prop.unitTypes[0].id;
          }
        }
      }
    } catch (e) {
      console.warn(
        "Could not resolve unitTypeId from availability, using stored value",
        e,
      );
    }

    // Create the reservation in rentl.io
    const reservationPayload = {
      unitTypeId: resolvedUnitTypeId,
      dateFrom: reservation.checkIn,
      dateTo: reservation.checkOut,
      email: reservation.email,
      fullName: reservation.fullName,
      adults: reservation.guests,
      rooms: 1,
      note: `[MONRI PAYMENT CONFIRMED] Order: ${orderNumber}. ${reservation.note}`,
    };

    const rentlRes = await fetch(`${RENTL_API_BASE_URL}/reservations`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ApiKey: RENTL_API_KEY },
      body: JSON.stringify(reservationPayload),
    });

    if (!rentlRes.ok) {
      const err = await rentlRes.json();
      console.error("Rentl reservation creation failed:", err);
      await updateReservationStatus(orderNumber, "failed");
      return NextResponse.json({
        received: true,
        action: "rentl_failed",
        error: err,
      });
    }

    // Mark as confirmed
    await updateReservationStatus(orderNumber, "confirmed");
    console.log(`Reservation confirmed for order ${orderNumber}`);

    return NextResponse.json({ received: true, action: "confirmed" });
  } catch (error) {
    console.error("Monri callback error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
