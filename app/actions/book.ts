"use server";

const RENTL_API_BASE_URL =
  process.env.RENTL_API_URL || "https://api.rentl.io/v1";
const RENTL_API_KEY = process.env.RENTLIO_API_KEY || "";

export async function submitReservation(prevState: any, formData: FormData) {
  try {
    const propertyId = formData.get("propertyId") as string;
    const formUnitTypeId = formData.get("unitTypeId") as string;
    const dateFrom = formData.get("checkIn") as string;
    const dateTo = formData.get("checkOut") as string;
    const guests = parseInt(formData.get("guests") as string, 10);
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const note = formData.get("note") as string;

    if (!propertyId || !dateFrom || !dateTo || !guests || !fullName || !email) {
      return { success: false, error: "All required fields must be filled." };
    }

    let unitTypeId = formUnitTypeId
      ? parseInt(formUnitTypeId, 10)
      : parseInt(propertyId, 10);

    const availRes = await fetch(
      `${RENTL_API_BASE_URL}/availability?propertiesIds=${propertyId}&dateFrom=${dateFrom}&dateTo=${dateTo}`,
      {
        headers: {
          ApiKey: RENTL_API_KEY,
        },
      },
    );

    if (availRes.ok) {
      const availData = await availRes.json();
      if (Array.isArray(availData) && availData.length > 0) {
        const propertyData = availData.find(
          (p: any) => p.id.toString() === propertyId.toString(),
        );
        if (
          propertyData &&
          propertyData.unitTypes &&
          propertyData.unitTypes.length > 0
        ) {
          unitTypeId = propertyData.unitTypes[0].id;
        }
      }
    }

    const reservationPayload = {
      unitTypeId,
      dateFrom,
      dateTo,
      email,
      fullName,
      adults: guests,
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
      console.error("Rentl API Error Reserve:", err);
      // Clean up the error message for the user
      const errorMessage =
        err?.errors?.global || err?.message || "Failed to create reservation.";
      return { success: false, error: errorMessage };
    }

    return { success: true, message: "Reservation created successfully!" };
  } catch (error: any) {
    console.error("Reservation exception:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
