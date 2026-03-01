import { createClient } from "redis";

const REDIS_URL = process.env.REDIS_URL || process.env.TEST_REDIS_URL || "";

let clientPromise: ReturnType<typeof createClient> | null = null;

export async function getRedis() {
  if (!clientPromise) {
    clientPromise = createClient({ url: REDIS_URL });
    clientPromise.on("error", (err) =>
      console.error("Redis Client Error:", err),
    );
    await clientPromise.connect();
  }
  // Reconnect if disconnected
  if (!clientPromise.isOpen) {
    await clientPromise.connect();
  }
  return clientPromise;
}

// ── Pending-reservation helpers ──────────────────────────────────────────────

export interface PendingReservation {
  propertyId: string;
  unitTypeId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  fullName: string;
  email: string;
  note: string;
  paymentAmount: number;
  totalAmount: number;
  status: "pending" | "paid" | "confirmed" | "failed";
  createdAt: number;
}

const PREFIX = "reservation:";
const TTL_SECONDS = 3600; // 1 hour

export async function savePendingReservation(
  orderNumber: string,
  data: PendingReservation,
): Promise<void> {
  const redis = await getRedis();
  await redis.set(PREFIX + orderNumber, JSON.stringify(data), {
    EX: TTL_SECONDS,
  });
}

export async function getPendingReservation(
  orderNumber: string,
): Promise<PendingReservation | null> {
  const redis = await getRedis();
  const raw = await redis.get(PREFIX + orderNumber);
  if (!raw) return null;
  return JSON.parse(raw) as PendingReservation;
}

export async function updateReservationStatus(
  orderNumber: string,
  status: PendingReservation["status"],
): Promise<void> {
  const reservation = await getPendingReservation(orderNumber);
  if (!reservation) return;
  reservation.status = status;
  const redis = await getRedis();
  // Keep remaining TTL
  const ttl = await redis.ttl(PREFIX + orderNumber);
  await redis.set(PREFIX + orderNumber, JSON.stringify(reservation), {
    EX: ttl > 0 ? ttl : TTL_SECONDS,
  });
}

export async function deletePendingReservation(
  orderNumber: string,
): Promise<void> {
  const redis = await getRedis();
  await redis.del(PREFIX + orderNumber);
}
