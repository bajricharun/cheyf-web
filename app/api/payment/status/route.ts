import { NextResponse } from "next/server";
import { getPendingReservation } from "@/lib/redis";

/**
 * GET /api/payment/status?order_number=CHEYF-...
 * Returns the current status of a pending reservation.
 * Used by the success page to poll until the Monri callback confirms.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderNumber = searchParams.get("order_number");

  if (!orderNumber) {
    return NextResponse.json(
      { error: "Missing order_number" },
      { status: 400 },
    );
  }

  const reservation = await getPendingReservation(orderNumber);

  if (!reservation) {
    return NextResponse.json({ status: "not_found" }, { status: 404 });
  }

  return NextResponse.json({
    status: reservation.status,
    fullName: reservation.fullName,
    email: reservation.email,
    checkIn: reservation.checkIn,
    checkOut: reservation.checkOut,
  });
}
