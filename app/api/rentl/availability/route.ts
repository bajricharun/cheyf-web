import { NextResponse } from 'next/server';

const RENTL_API_BASE_URL = process.env.NEXT_PUBLIC_RENTL_API_URL || 'https://api.rentl.io/v1';
const RENTL_API_KEY = process.env.RENTLIO_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get('propertyId');
  const unitTypeId = searchParams.get('unitTypeId');
  const dateFrom = searchParams.get('dateFrom');
  const dateTo = searchParams.get('dateTo');

  if (!propertyId || !dateFrom || !dateTo) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  if (!RENTL_API_KEY) {
    return NextResponse.json({
        available: true,
        pricePerNight: 120,
        totalPrice: 240,
        minStay: 2,
        blockedDates: []
    });
  }

  try {
    const res = await fetch(`${RENTL_API_BASE_URL}/availability?propertiesIds=${propertyId}&dateFrom=${dateFrom}&dateTo=${dateTo}`, {
      headers: {
        'ApiKey': RENTL_API_KEY
      }
    });

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json({ error: err?.message || 'Failed to fetch availability' }, { status: res.status });
    }

    const data = await res.json();
    
    if (Array.isArray(data) && data.length > 0) {
      const propertyAvail = data.find((p: any) => p.id.toString() === propertyId.toString());
      if (propertyAvail && propertyAvail.unitTypes && propertyAvail.unitTypes.length > 0) {
         
         // Find requested unit type, or fallback to first
         const unit = unitTypeId ? 
            propertyAvail.unitTypes.find((u: any) => u.id.toString() === unitTypeId.toString()) : 
            propertyAvail.unitTypes[0];

         if (!unit) {
            return NextResponse.json({ error: 'Unit type not found', available: false }, { status: 404 });
         }

         // Extract blocked dates (where availability value === 0)
         const blockedDates = (unit.availability || [])
            .filter((day: any) => day.value === 0)
            .map((day: any) => ({
                from: day.timestamp * 1000,
                to: day.timestamp * 1000 // Map to identical day so it doesn't spill over to the next
            }));
         
         // Aggregate pricing and min/max stay logic
         let totalPrice = 0;
         let minStay = 1;
         
         const rate = unit.rates?.[0]?.DailyValues || [];
         rate.forEach((day: any) => {
            if (day.price) totalPrice += day.price;
            if (day.minStay && day.minStay > minStay) minStay = day.minStay;
         });

         const daysCount = rate.length || 1;
         const pricePerNight = totalPrice / daysCount;

         return NextResponse.json({
             available: blockedDates.length === 0,
             totalPrice,
             pricePerNight,
             minStay,
             blockedDates
         });
      }
    }

    return NextResponse.json({ error: 'Not available for selected dates', available: false, blockedDates: [] }, { status: 400 });
  } catch (error) {
    console.error('Rentl API error in /availability route:', error);
    return NextResponse.json({ error: 'Internal Server Error', blockedDates: [] }, { status: 500 });
  }
}
