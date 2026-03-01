"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { CheckCircle, ArrowRight, Loader2, AlertTriangle } from "lucide-react";

type ReservationStatus =
  | "pending"
  | "paid"
  | "confirmed"
  | "failed"
  | "not_found";

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-24 min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}

const MAX_POLLS = 20;
const POLL_INTERVAL_MS = 3000;

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order_number") ?? "";

  const [status, setStatus] = useState<ReservationStatus>("pending");
  const [pollCount, setPollCount] = useState(0);
  const [isPolling, setIsPolling] = useState(true);

  const pollStatus = useCallback(async () => {
    if (!orderNumber) {
      setStatus("not_found");
      setIsPolling(false);
      return;
    }

    try {
      const res = await fetch(
        `/api/payment/status?order_number=${encodeURIComponent(orderNumber)}`,
      );
      if (!res.ok) {
        if (res.status === 404) {
          setStatus("not_found");
          setIsPolling(false);
          return;
        }
        return; // Retry on transient errors
      }
      const data = await res.json();
      setStatus(data.status as ReservationStatus);

      // Stop polling once we reach a terminal state
      if (data.status === "confirmed" || data.status === "failed") {
        setIsPolling(false);
      }
    } catch {
      // Network error — keep polling
    }
  }, [orderNumber]);

  useEffect(() => {
    if (!isPolling) return;

    let cancelled = false;

    async function poll() {
      let count = 0;
      while (!cancelled && count < MAX_POLLS) {
        await pollStatus();
        count++;
        if (cancelled) break;
        await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
      }
      if (!cancelled) {
        setPollCount(count);
        setIsPolling(false);
      }
    }

    poll();

    return () => {
      cancelled = true;
    };
  }, [isPolling, pollStatus]);

  const isTerminal =
    status === "confirmed" || status === "failed" || status === "not_found";
  const timedOut = !isTerminal && pollCount >= MAX_POLLS;

  return (
    <div className="container mx-auto px-4 py-24 min-h-[60vh] flex flex-col items-center justify-center">
      <Card className="max-w-md w-full text-center shadow-xl border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-12 pb-12 px-8 flex flex-col items-center space-y-6">
          {/* Icon */}
          {status === "confirmed" ? (
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          ) : status === "failed" || status === "not_found" ? (
            <div className="w-20 h-20 rounded-full bg-yellow-500/20 flex items-center justify-center mb-4">
              <AlertTriangle className="w-10 h-10 text-yellow-500" />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          )}

          <h1 className="text-3xl font-bold tracking-tight">
            Payment Successful
          </h1>

          {/* Status messages */}
          {!isTerminal && !timedOut && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Confirming your reservation&hellip;</span>
            </div>
          )}

          {status === "confirmed" && (
            <p className="text-muted-foreground">
              Thank you for your payment. Your transaction{" "}
              <strong>{orderNumber}</strong> was approved.
              <span className="block mt-4 text-green-600 dark:text-green-400 font-semibold">
                Your reservation at Cheyf Stays has been officially confirmed!
                Check your email for details.
              </span>
            </p>
          )}

          {(status === "failed" || status === "not_found") && (
            <p className="text-muted-foreground">
              Thank you for your payment. Your transaction{" "}
              <strong>{orderNumber}</strong> was received.
              <span className="block mt-4 text-yellow-600 dark:text-yellow-400">
                There was an issue syncing your reservation automatically. Our
                team will contact you shortly to finalize your booking.
              </span>
            </p>
          )}

          {timedOut && (
            <p className="text-muted-foreground">
              Thank you for your payment. Your transaction{" "}
              <strong>{orderNumber}</strong> was approved.
              <span className="block mt-4 text-yellow-600 dark:text-yellow-400">
                Your reservation is still being processed. You will receive a
                confirmation email shortly. If not, please contact us.
              </span>
            </p>
          )}

          <div className="pt-6 w-full">
            <Link href="/" passHref>
              <Button className="w-full h-12 gap-2" variant="default">
                Return to Homepage <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
