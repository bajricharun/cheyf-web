"use client";

import React, { useState, useEffect, FormEvent } from "react";
import {
  format,
  addDays,
  isBefore,
  startOfDay,
  isWithinInterval,
} from "date-fns";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import {
  Calendar as CalendarIcon,
  Users,
  Mail,
  User,
  Info,
  Loader2,
  CreditCard,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

export function BookingForm({
  propertyId,
  propertyName,
  unitTypes,
}: {
  propertyId: string | number;
  propertyName: string;
  unitTypes?: any[];
}) {
  const defaultUnitId =
    unitTypes && unitTypes.length > 0 ? String(unitTypes[0].id) : "";
  const [selectedUnitId, setSelectedUnitId] = useState<string>(defaultUnitId);
  const [date, setDate] = useState<DateRange | undefined>();
  const [blockedDates, setBlockedDates] = useState<{ from: Date; to: Date }[]>(
    [],
  );
  const [availability, setAvailability] = useState<any>(null);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  const [paymentOption, setPaymentOption] = useState<"deposit" | "full">(
    "deposit",
  );
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Fetch blocked dates for the calendar
  useEffect(() => {
    async function loadBlockedDates() {
      if (!selectedUnitId) {
        setBlockedDates([]);
        return;
      }
      try {
        const today = new Date();
        const nextYear = addDays(today, 365);
        const res = await fetch(
          `/api/rentl/reservations?propertyId=${propertyId}&unitTypeId=${selectedUnitId}&dateFrom=${format(today, "yyyy-MM-dd")}&dateTo=${format(nextYear, "yyyy-MM-dd")}`,
        );
        const data = await res.json();

        if (Array.isArray(data)) {
          setBlockedDates(
            data.map((d: any) => ({
              from: new Date(d.from),
              to: new Date(d.to),
            })),
          );
        } else {
          setBlockedDates([]);
        }
      } catch (e) {
        console.error("Failed to load blocked dates", e);
      }
    }
    loadBlockedDates();
  }, [propertyId, selectedUnitId]);

  // Fetch pricing when valid dates are selected
  useEffect(() => {
    async function checkAvailability() {
      if (date?.from && date?.to) {
        setIsLoadingPrice(true);
        setAvailability(null);
        try {
          const res = await fetch(
            `/api/rentl/availability?propertyId=${propertyId}&unitTypeId=${selectedUnitId}&dateFrom=${format(date.from, "yyyy-MM-dd")}&dateTo=${format(date.to, "yyyy-MM-dd")}`,
          );
          const data = await res.json();
          setAvailability(data);
        } catch (e) {
          console.error("Failed to check availability", e);
        } finally {
          setIsLoadingPrice(false);
        }
      } else {
        setAvailability(null);
      }
    }

    // Simple debounce to prevent spamming the API while picking the second date
    const timeoutId = setTimeout(checkAvailability, 500);
    return () => clearTimeout(timeoutId);
  }, [date, propertyId, selectedUnitId]);

  // Function to disable dates in the Calendar
  const isDateDisabled = (day: Date) => {
    // Disable past dates
    if (isBefore(startOfDay(day), startOfDay(new Date()))) return true;

    // Disable booked dates
    return blockedDates.some((range) =>
      isWithinInterval(day, {
        start: startOfDay(range.from),
        end: startOfDay(range.to),
      }),
    );
  };

  // Determine if booking is allowed
  const isMinStayViolated =
    availability?.error ||
    (availability?.minStay &&
      date?.from &&
      date?.to &&
      (date.to.getTime() - date.from.getTime()) / (1000 * 3600 * 24) <
        availability.minStay);
  const validationError =
    availability?.error ||
    (isMinStayViolated
      ? `Minimum stay for these dates is ${availability?.minStay} nights.`
      : null);

  const amountToPay = availability?.totalPrice
    ? paymentOption === "deposit"
      ? 1
      : availability.totalPrice
    : 0;

  const handlePaymentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date?.from || !date?.to || !availability?.totalPrice) return;

    setIsProcessingPayment(true);
    setPaymentError(null);

    const formData = new FormData(e.currentTarget);
    const guests = formData.get("guests") as string;
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const note = formData.get("note") as string;

    // We do price conversion to Monri format (minor units). E.g., 100.50 EUR = 10050
    // Actually Monri expects minor units or standard format depending on the gateway config. Usually minor units: amount * 100
    const paymentAmountMinorUnits = Math.round(amountToPay * 100);

    try {
      const res = await fetch("/api/payment/monri", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: paymentAmountMinorUnits,
          currency: "EUR",
          fullName,
          email,
          propertyId,
          unitTypeId: selectedUnitId || propertyId,
          checkIn: format(date.from, "yyyy-MM-dd"),
          checkOut: format(date.to, "yyyy-MM-dd"),
          guests: parseInt(guests, 10),
          note,
          totalAmount: availability.totalPrice,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to initialize payment");
      }

      // Reservation data is stored server-side in Redis (keyed by order_number).
      // The Monri callback webhook will read it and create the rentl.io booking.

      // Generate the invisible form and submit to Monri
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://ipg.monri.com/v2/form";

      const fields: Record<string, string> = {
        ch_full_name: data.ch_full_name,
        ch_email: data.ch_email,
        amount: String(data.amount),
        currency: data.currency,
        order_number: data.order_number,
        authenticity_token: data.authenticity_token,
        digest: data.digest,
        transaction_type: data.transaction_type,
        order_info: data.order_info,
        // Monri redirect & callback URLs
        success_url_override: data.success_url_override,
        cancel_url_override: data.cancel_url_override,
        callback_url_override: data.callback_url_override,
      };

      for (const [key, value] of Object.entries(fields)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value as string;
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } catch (err: any) {
      console.error(err);
      setPaymentError(err.message || "An unexpected error occurred.");
      setIsProcessingPayment(false);
    }
  };

  return (
    <Card className="shadow-2xl shadow-primary/5 bg-card/50 backdrop-blur-xl border border-border/50 sticky top-24">
      <CardContent className="pt-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold">Book Your Stay</h3>
          <p className="text-muted-foreground mt-2">
            Complete the details below to reserve {propertyName} instantly.
          </p>
        </div>

        {paymentError && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 rounded-lg mb-6 animate-fade-in">
            <h4 className="font-bold mb-1">Payment Error</h4>
            <p className="text-sm">{paymentError}</p>
          </div>
        )}

        <form onSubmit={handlePaymentSubmit} className="space-y-4">
          <input type="hidden" name="propertyId" value={String(propertyId)} />
          {unitTypes && unitTypes.length === 1 && (
            <input type="hidden" name="unitTypeId" value={unitTypes[0].id} />
          )}

          {unitTypes && unitTypes.length > 1 && (
            <div className="space-y-2">
              <label
                htmlFor="unitTypeId"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Info className="w-4 h-4 text-muted-foreground" /> Select Unit
              </label>
              <select
                id="unitTypeId"
                name="unitTypeId"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                value={selectedUnitId}
                onChange={(e) => {
                  setSelectedUnitId(e.target.value);
                  setDate(undefined); // Reset dates when unit changes
                  setAvailability(null);
                }}
              >
                <option value="" disabled>
                  Select a unit type...
                </option>
                {unitTypes.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name} (Max: {unit.maxOccupancy} guests)
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Date Picker - Hidden until unit is selected for multi-unit properties */}
          {(!unitTypes || unitTypes.length <= 1 || selectedUnitId) && (
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-muted-foreground" /> Dates
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal bg-background/50",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick your dates</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    disabled={isDateDisabled}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* Dynamic Pricing Box & Payment Options */}
          {date?.from && date?.to && (
            <div className="bg-muted/30 p-4 rounded-xl border border-border/50 transition-all">
              {isLoadingPrice ? (
                <div className="flex items-center justify-center py-2 text-muted-foreground">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Calculating
                  price...
                </div>
              ) : availability?.available ? (
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      &euro;{availability.pricePerNight?.toFixed(2)} x{" "}
                      {Math.ceil(
                        (date.to.getTime() - date.from.getTime()) /
                          (1000 * 3600 * 24),
                      )}{" "}
                      nights
                    </span>
                    <span>&euro;{availability.totalPrice?.toFixed(2)}</span>
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <label className="text-sm font-semibold mb-3 block">
                      Payment Options
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label
                        className={cn(
                          "cursor-pointer rounded-lg border p-3 flex flex-col items-center justify-center text-center transition-all",
                          paymentOption === "deposit"
                            ? "border-accent bg-accent/10"
                            : "border-border hover:border-accent/50",
                        )}
                      >
                        <input
                          type="radio"
                          name="paymentOption"
                          value="deposit"
                          className="sr-only"
                          onChange={() => setPaymentOption("deposit")}
                          checked={paymentOption === "deposit"}
                        />
                        <span className="text-xs font-medium text-muted-foreground mb-1">
                          Pay 40% Deposit
                        </span>
                        <span className="font-bold text-accent">
                          &euro;{(availability.totalPrice * 0.4).toFixed(2)}
                        </span>
                      </label>

                      <label
                        className={cn(
                          "cursor-pointer rounded-lg border p-3 flex flex-col items-center justify-center text-center transition-all",
                          paymentOption === "full"
                            ? "border-accent bg-accent/10"
                            : "border-border hover:border-accent/50",
                        )}
                      >
                        <input
                          type="radio"
                          name="paymentOption"
                          value="full"
                          className="sr-only"
                          onChange={() => setPaymentOption("full")}
                          checked={paymentOption === "full"}
                        />
                        <span className="text-xs font-medium text-muted-foreground mb-1">
                          Pay Full Amount
                        </span>
                        <span className="font-bold text-accent">
                          &euro;{availability.totalPrice.toFixed(2)}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-2 mt-2 border-t border-border/50 flex justify-between font-bold text-lg">
                    <span>Total Due Now</span>
                    <span className="text-accent">
                      &euro;{amountToPay.toFixed(2)}
                    </span>
                  </div>
                </div>
              ) : null}

              {validationError && !isLoadingPrice && (
                <div className="mt-3 p-2 bg-red-500/10 text-red-600 text-sm rounded-md border border-red-500/20">
                  {validationError}
                </div>
              )}
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="guests"
              className="text-sm font-medium flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-muted-foreground" /> Number of
              Guests
            </label>
            <Input
              id="guests"
              name="guests"
              type="number"
              min="1"
              max={10}
              required
              placeholder="2"
            />
          </div>

          <div className="space-y-2 mt-6 pt-4 border-t border-border/50">
            <label
              htmlFor="fullName"
              className="text-sm font-medium flex items-center gap-2"
            >
              <User className="w-4 h-4 text-muted-foreground" /> Full Name
            </label>
            <Input
              id="fullName"
              name="fullName"
              required
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-muted-foreground" /> Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="note"
              className="text-sm font-medium flex items-center gap-2"
            >
              <Info className="w-4 h-4 text-muted-foreground" /> Special
              Requests / Note
            </label>
            <textarea
              id="note"
              name="note"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Any requirements..."
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-4 h-12 text-md gap-2"
            variant="accent"
            disabled={
              !date?.from ||
              !date?.to ||
              !!validationError ||
              isLoadingPrice ||
              isProcessingPayment
            }
          >
            {isProcessingPayment ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Redirecting to
                Secure Payment...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4" /> Go to Secure Checkout
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
