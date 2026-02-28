import { rentlApi } from "@/lib/api/rentl";
import { notFound } from "next/navigation";
import { BookingForm } from "@/components/BookingForm";
import { ImageGallery } from "@/components/ImageGallery";
import { BedDouble, Bath, MapPin } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const propertyRes = await rentlApi.getProperty(id);
  const property = propertyRes.data;
  if (!property) return { title: 'Not Found' };
  return {
    title: `${property.name} | Cheyf Stays`,
    description: property.description?.substring(0, 160) || "Premium property by Cheyf Stays",
  };
}

export default async function PropertyBookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const propertyRes = await rentlApi.getProperty(id);
  const property = propertyRes.data;
  
  const unitsRes = await rentlApi.getUnitTypes(id);
  const rawUnitsData = unitsRes.data as any;
  const unitTypes = rawUnitsData?.data || rawUnitsData || [];

  if (!property) {
    notFound();
  }

  const images = property.images && property.images.length > 0 ? property.images : ['/placeholder-property.jpg'];

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">{property.name}</h1>
      
      {/* Full-width elegant image gallery */}
      <ImageGallery images={images} propertyName={property.name} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
        {/* Left Side: Property Details */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Highlights Bar */}
          <div className="flex flex-wrap gap-6 bg-card p-6 rounded-2xl border border-border/50 shadow-sm">
             <div className="flex flex-col">
                <span className="text-sm text-muted-foreground mb-1">Location</span>
                <span className="font-semibold flex items-center gap-1"><MapPin className="w-4 h-4 text-accent"/> Sarajevo City Center</span>
             </div>
             {property.bedrooms && (
               <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground mb-1">Bedrooms</span>
                  <span className="font-semibold flex items-center gap-1"><BedDouble className="w-4 h-4 text-accent"/> {property.bedrooms} Beds</span>
               </div>
             )}
             {property.bathrooms && (
               <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground mb-1">Bathrooms</span>
                  <span className="font-semibold flex items-center gap-1"><Bath className="w-4 h-4 text-accent"/> {property.bathrooms} Baths</span>
               </div>
             )}
          </div>

          <p className="whitespace-pre-line text-lg leading-relaxed text-muted-foreground">{property.description}</p>

          {/* Amenities Grid */}
          {property.amenities && property.amenities.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Amenities</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {property.amenities.map((amenity: any, idx: number) => {
                  const name = typeof amenity === 'string' ? amenity : amenity.name;
                  return <li key={idx}>{name}</li>;
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Right Side: Sticky Booking Form */}
        <div className="md:col-span-1">
          <div className="sticky top-24">
             <BookingForm propertyId={property.id} propertyName={property.name} unitTypes={unitTypes} />
          </div>
        </div>
      </div>
    </div>
  );
}
