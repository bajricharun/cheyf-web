import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Use test keys as fallback for development
const MONRI_KEY = process.env.MONRI_MERCHANT_KEY || 'test_merchant_key';
const MONRI_AUTH_TOKEN = process.env.MONRI_AUTHENTICITY_TOKEN || 'test_authenticity_token';
// In-memory store for pending reservations (for dev).
// In production, this should ideally be in a Redis cache or Database.
export const pendingReservations = new Map<string, any>();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { propertyId, unitTypeId, checkIn, checkOut, guests, fullName, email, note, amount, currency } = body;

    if (!amount || !currency || !fullName || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const orderNumber = `CHEYF-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const digestString = `${MONRI_KEY}${orderNumber}${amount}${currency}`;
    const digest = crypto.createHash('sha512').update(digestString).digest('hex');

    // Store the pending reservation details using the order_number as the key
    pendingReservations.set(orderNumber, {
      propertyId,
      unitTypeId,
      checkIn,
      checkOut,
      guests,
      fullName,
      email,
      note,
      paymentAmount: amount, // The amount paid (might be 40% or 100%)
      totalAmount: body.totalAmount, // The full original price
      createdAt: Date.now()
    });

    // Clean up old pending reservations (older than 1 hour)
    const ONE_HOUR = 60 * 60 * 1000;
    const now = Date.now();
    for (const [key, value] of pendingReservations.entries()) {
      if (now - value.createdAt > ONE_HOUR) {
        pendingReservations.delete(key);
      }
    }

    return NextResponse.json({
      order_number: orderNumber,
      digest,
      authenticity_token: MONRI_AUTH_TOKEN,
      ch_full_name: fullName,
      ch_email: email,
      amount,
      currency,
      transaction_type: 'purchase',
      order_info: `Cheyf Stays Booking: ${propertyId}`
    });

  } catch (error) {
    console.error('Monri Digest Error:', error);
    return NextResponse.json({ error: 'Failed to generate payment digest' }, { status: 500 });
  }
}
