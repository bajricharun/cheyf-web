import { rentlApi } from "@/lib/api/rentl";
import { PropertyCard } from "@/components/PropertyCard";

export const metadata = {
  title: "Book Your Stay | Cheyf Stays",
  description: "Browse availability and book your premium apartment with Cheyf Stays directly.",
};

export default async function BookPage(
  props: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {
  const searchParams = await props.searchParams;
  const checkIn = searchParams?.checkIn as string | undefined;
  const checkOut = searchParams?.checkOut as string | undefined;
  const minPrice = searchParams?.minPrice ? parseInt(searchParams.minPrice as string) : undefined;
  const maxPrice = searchParams?.maxPrice ? parseInt(searchParams.maxPrice as string) : undefined;
  const guests = searchParams?.guests as string | undefined;

  // Fetch properties server-side for the booking grid
  const response = await rentlApi.getProperties();
  const rawData: any = response.data;
  let properties: any[] = Array.isArray(rawData) ? rawData : (rawData?.data || []);

  // Filter by dates using the rentl API logic if dates are provided
  if (checkIn && checkOut) {
    const propertyIds = properties.map(p => p.id);
    
    try {
      const availRes = await rentlApi.checkBulkAvailability(propertyIds, checkIn, checkOut);
      if (availRes.status === 200 && Array.isArray(availRes.data)) {
        // Create a map of propertyId -> availability info
        const availMap = new Map();
        availRes.data.forEach((status: any) => {
          availMap.set(status.propertyId, status);
        });

        // Filter and update price for properties
        properties = properties.filter(p => {
          const status = availMap.get(p.id.toString());
          if (!status || !status.available) return false;
          
          // Inject the exact calculated price per night for the date range
          if (status.pricePerNight) {
            p.price = status.pricePerNight; 
          }
          return true;
        });
      } else {
        console.warn('Unable to bulk check availability, showing all defaults.');
      }
    } catch(e) {
      console.error('Error checking availability during filter:', e);
    }
  }

  // Filter by price (Done AFTER date check so we use the actual date-based dynamic price)
  if (minPrice !== undefined) {
    properties = properties.filter(p => !p.price || p.price >= minPrice);
  }
  if (maxPrice !== undefined) {
    properties = properties.filter(p => !p.price || p.price <= maxPrice);
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="max-w-3xl mb-12 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Find Your Perfect Stay
        </h1>
        <p className="text-muted-foreground text-lg">
          Explore all our available properties in Sarajevo, and find your perfect stay today!
        </p>
      </div>

      <form method="GET" action="/book" className="bg-muted/50 border border-border/50 p-6 rounded-2xl mb-12 flex flex-col sm:flex-row flex-wrap gap-4 items-center">
        <div className="flex-1 w-full min-w-[150px]">
          <label className="text-xs text-muted-foreground mb-1 block">Check In</label>
          <input 
            type="date" 
            name="checkIn"
            defaultValue={checkIn}
            className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background text-foreground"
          />
        </div>
        <div className="flex-1 w-full min-w-[150px]">
          <label className="text-xs text-muted-foreground mb-1 block">Check Out</label>
          <input 
            type="date" 
            name="checkOut"
            defaultValue={checkOut}
            className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background text-foreground"
          />
        </div>
        <div className="flex-1 w-full min-w-[100px]">
          <label className="text-xs text-muted-foreground mb-1 block">Min Price (€)</label>
          <input 
            type="number"
            name="minPrice"
            placeholder="Min"
            defaultValue={minPrice}
            className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background text-foreground"
          />
        </div>
        <div className="flex-1 w-full min-w-[100px]">
          <label className="text-xs text-muted-foreground mb-1 block">Max Price (€)</label>
          <input 
            type="number"
            name="maxPrice"
            placeholder="Max"
            defaultValue={maxPrice}
            className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background text-foreground"
          />
        </div>
        <div className="w-full sm:w-auto mt-4 sm:mt-5">
          <button type="submit" className="h-10 px-8 rounded-md bg-accent text-accent-foreground font-medium w-full hover:bg-accent/90 transition-colors">
            Search
          </button>
        </div>
      </form>

      {properties.length === 0 ? (
        <div className="text-center py-20 bg-muted/30 rounded-2xl border border-dashed border-border/50">
          <p className="text-muted-foreground">No properties available matching your filters.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
