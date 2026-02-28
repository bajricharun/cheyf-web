import { notFound } from "next/navigation";
import Image from "next/image";
import { propertyData, PropertyData } from "../../../lib/propertyData";
import { BookingForm } from "../../../components/BookingForm";

import { ImageGallery } from "../../../components/ImageGallery";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyPage({ params }: PageProps) {
  const { id: paramId } = await params;
  const id = Number(paramId);
  const data = propertyData[id];
  if (!data) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">{data.name}</h1>
      
      {/* Full-width elegant image gallery */}
      <ImageGallery images={data.images} propertyName={data.name} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
        {/* Left Side: Property Details */}
        <div className="md:col-span-2 space-y-8">
          <p className="whitespace-pre-line">{data.description}</p>

          {data.amenities && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Amenities</h2>
              <ul className="list-disc list-inside space-y-1">
                {data.amenities.map((amenity, idx) => {
                  const name =
                    typeof amenity === "string" ? amenity : amenity.name;
                  return <li key={idx}>{name}</li>;
                })}
              </ul>
            </div>
          )}

          {data.highlights && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Highlights</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {data.highlights.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Side: Sticky Booking Form */}
        <div className="md:col-span-1">
          <div className="sticky top-24">
            <BookingForm propertyId={id} propertyName={data.name} />
          </div>
        </div>
      </div>
    </div>
  );
}
