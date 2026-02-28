import { rentlApi } from "@/lib/api/rentl";
import { PropertyCard } from "@/components/PropertyCard";

export const metadata = {
  title: "Book Your Stay | Cheyf Stays",
  description: "Browse availability and book your premium apartment with Cheyf Stays directly.",
};

export default async function BookPage() {
  // Fetch properties server-side for the booking grid
  const response = await rentlApi.getProperties();
  const rawData: any = response.data;
  const properties: any[] = Array.isArray(rawData) ? rawData : (rawData?.data || []);

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

      <div className="bg-muted/50 border border-border/50 p-6 rounded-2xl mb-12 flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <input 
            type="date" 
            className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background"
            placeholder="Check-in Date"
          />
        </div>
        <div className="flex-1 w-full">
          <input 
            type="date" 
            className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background"
            placeholder="Check-out Date"
          />
        </div>
        <div className="flex-1 w-full">
          <select className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background">
            <option>Any Guests</option>
            <option>1 Guest</option>
            <option>2 Guests</option>
            <option>3+ Guests</option>
          </select>
        </div>
        <button className="h-10 px-8 rounded-md bg-accent text-accent-foreground font-medium w-full sm:w-auto hover:bg-accent/90 transition-colors">
          Search
        </button>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-20 bg-muted/30 rounded-2xl border border-dashed border-border/50">
          <p className="text-muted-foreground">No properties available for these dates.</p>
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
