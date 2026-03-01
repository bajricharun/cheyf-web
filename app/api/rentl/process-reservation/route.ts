import { NextResponse } from "next/server";

const RENTL_API_BASE_URL =
  process.env.RENTL_API_URL || "https://api.rentl.io/v1";
const RENTL_API_KEY = process.env.RENTLIO_API_KEY || "";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      propertyId,
      unitTypeId,
      checkIn,
      checkOut,
      guests,
      fullName,
      email,
      note,
    } = body;

    if (
      !propertyId ||
      !checkIn ||
      !checkOut ||
      !guests ||
      !fullName ||
      !email
    ) {
      return NextResponse.json(
        { success: false, error: "All required fields must be filled." },
        { status: 400 },
      );
    }

    let resolvedUnitTypeId = unitTypeId
      ? parseInt(String(unitTypeId), 10)
      : parseInt(String(propertyId), 10);

    // Try to resolve the correct unitTypeId from the availability endpoint
    const availRes = await fetch(
      `${RENTL_API_BASE_URL}/availability?propertiesIds=${propertyId}&dateFrom=${checkIn}&dateTo=${checkOut}`,
      { headers: { ApiKey: RENTL_API_KEY } },
    );

    if (availRes.ok) {
      const availData = await availRes.json();
      if (Array.isArray(availData) && availData.length > 0) {
        const propertyAvail = availData.find(
          (p: { id: number | string }) =>
            p.id.toString() === propertyId.toString(),
        );
        if (propertyAvail?.unitTypes?.length > 0) {
          resolvedUnitTypeId = propertyAvail.unitTypes[0].id;
        }
      }
    }

    const reservationPayload = {
      unitTypeId: resolvedUnitTypeId,
      dateFrom: checkIn,
      dateTo: checkOut,
      email,
      fullName,
      adults:
        typeof guests === "number" ? guests : parseInt(String(guests), 10),
      rooms: 1,
      note: note || "Booking created via website",
    };

    const res = await fetch(`${RENTL_API_BASE_URL}/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ApiKey: RENTL_API_KEY,
      },
      body: JSON.stringify(reservationPayload),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Rentl API Error (process-reservation):", err);
      const errorMessage =
        err?.errors?.global || err?.message || "Failed to create reservation.";
      return NextResponse.json({ success: false, error: errorMessage });
    }

    return NextResponse.json({
      success: true,
      message: "Reservation created successfully!",
    });
  } catch (error) {
    console.error("process-reservation exception:", error);
    return NextResponse.json({
      success: false,
      error: "An unexpected error occurred. Please try again.",
    });
  }
}
