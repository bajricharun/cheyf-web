import React from 'react';
import { PropertyCard } from '@/components/PropertyCard';
import { rentlApi } from '@/lib/api/rentl';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export async function PropertyGrid() {
  // Fetch properties server-side
  const response = await rentlApi.getProperties();
  const rawData: any = response.data;
  const properties: any[] = Array.isArray(rawData) ? rawData : (rawData?.data || []);
  
  // Take top 3 or 4 for landing page
  const featuredProperties = properties.slice(0, 4);

  return (
    <section className="py-24 bg-background" id="properties">
      <div className="container px-4 md:px-6 mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Featured Properties
            </h2>
            <p className="text-muted-foreground text-lg">
              Discover our handpicked selection of premium apartments and studios. Designed for comfort, styled for you.
            </p>
          </div>
          <Button asChild variant="outline" className="hidden md:inline-flex">
            <Link href="/book">View All Availability</Link>
          </Button>
        </div>

        {featuredProperties.length === 0 ? (
          <div className="text-center py-20 bg-muted/30 rounded-2xl border border-dashed border-border/50">
            <p className="text-muted-foreground">No properties available at the moment.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center md:hidden">
            <Button asChild variant="outline" className="w-full">
              <Link href="/book">View All Availability</Link>
            </Button>
        </div>
        
      </div>
    </section>
  );
}
