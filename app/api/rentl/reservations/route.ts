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
    // Return empty blocked dates for mock mode
    return NextResponse.json([]);
  }

  try {
    // If unitTypeId is missing, we must try to get the first valid unit for the property
    let targetUnitTypeId = unitTypeId;

    if (!targetUnitTypeId) {
       const unitsRes = await fetch(`${RENTL_API_BASE_URL}/properties/${propertyId}/unit-types`, {
          headers: { 'ApiKey': RENTL_API_KEY },
          next: { revalidate: 3600 }
       });
       if (unitsRes.ok) {
          const unitsData = await unitsRes.json();
          const units = unitsData.data || unitsData || [];
          if (units.length > 0) {
             targetUnitTypeId = units[0].id.toString();
          }
       }
    }

    if (!targetUnitTypeId) {
       return NextResponse.json([]); // Can't resolve unit type, return open
    }

    // Rentl /unit-types/{id}/availability paginates beautifully 100 days at a time.
    // We grab exactly 4 pages (400 days) to cover the 365 days requested by BookingForm.
    const pageRequests = [1, 2, 3, 4].map(page => 
      fetch(`${RENTL_API_BASE_URL}/unit-types/${targetUnitTypeId}/availability?dateFrom=${dateFrom}&dateTo=${dateTo}&page=${page}&perPage=100`, {
        headers: {
          'ApiKey': RENTL_API_KEY
        },
        next: { revalidate: 60 } // Cache for 60 seconds
      }).then(res => res.json())
    );

    const pages = await Promise.all(pageRequests);
    
    // Combine all pages, filter availability === 0, map to standard calendar blocked dates
    const blockedDates: { from: number, to: number }[] = [];

    pages.forEach(page => {
       const data = page.data || [];
       data.forEach((day: any) => {
          if (day.availability <= 0) {
            const t = new Date(day.date).getTime();
             blockedDates.push({ from: t, to: t });
          }
       });
    });

    return NextResponse.json(blockedDates);
  } catch (error) {
    console.error('Rentl API error in blocked-dates route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
