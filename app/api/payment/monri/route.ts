import { NextResponse } from "next/server";
import crypto from "crypto";
import { savePendingReservation } from "@/lib/redis";

const MONRI_KEY = process.env.MONRI_MERCHANT_KEY || "test_merchant_key";
const MONRI_AUTH_TOKEN =
  process.env.MONRI_AUTHENTICITY_TOKEN || "test_authenticity_token";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

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
      amount,
      currency,
      totalAmount,
    } = body;

    if (!amount || !currency || !fullName || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const orderNumber = `CHEYF-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const digestString = `${MONRI_KEY}${orderNumber}${amount}${currency}`;
    const digest = crypto
      .createHash("sha512")
      .update(digestString)
      .digest("hex");

    // Persist reservation data in Redis with 1-hour TTL
    await savePendingReservation(orderNumber, {
      propertyId: String(propertyId),
      unitTypeId: String(unitTypeId || propertyId),
      checkIn,
      checkOut,
      guests:
        typeof guests === "number" ? guests : parseInt(String(guests), 10),
      fullName,
      email,
      note: note || "",
      paymentAmount: amount,
      totalAmount: totalAmount || amount,
      status: "pending",
      createdAt: Date.now(),
    });

    return NextResponse.json({
      order_number: orderNumber,
      digest,
      authenticity_token: MONRI_AUTH_TOKEN,
      ch_full_name: fullName,
      ch_email: email,
      amount,
      currency,
      transaction_type: "purchase",
      order_info: `Cheyf Stays Booking: ${propertyId}`,
      // URLs for Monri redirect
      success_url: `${BASE_URL}/payment/success?order_number=${orderNumber}`,
      cancel_url: `${BASE_URL}/payment/cancel?order_number=${orderNumber}`,
      callback_url: `${BASE_URL}/api/payment/monri/callback`,
    });
  } catch (error) {
    console.error("Monri Digest Error:", error);
    return NextResponse.json(
      { error: "Failed to generate payment digest" },
      { status: 500 },
    );
  }
}
