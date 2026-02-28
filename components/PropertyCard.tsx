import React from 'react';
import Image from 'next/image';
import { Property } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { BedDouble, Bath, Wifi } from 'lucide-react';
import Link from 'next/link';

interface PropertyCardProps {
  property: Property;
}

export  function PropertyCard({ property }: PropertyCardProps) {
  // Use first image or fallback
  const firstImage = property.images && property.images.length > 0 ? property.images[0] : '/placeholder-property.jpg';
  
  // Format price if available
  const formattedPrice = property.price 
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: property.currency || 'USD' }).format(property.price) 
    : 'Contact for price';

  return (
    <Card className="group overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl dark:hover:shadow-primary/5 hover:-translate-y-1">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={firstImage}
          alt={property.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {property.highlights && property.highlights[0] && (
          <div className="absolute top-4 left-4 z-10">
            <Badge variant="accent" className="shadow-lg backdrop-blur-md bg-accent/90 text-accent-foreground">
              {property.highlights[0]}
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader className="flex-none pb-2">
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-xl line-clamp-1">{property.name}</CardTitle>
          {property.price && (
            <div className="text-right flex-shrink-0">
              <span className="font-bold text-lg">{formattedPrice}</span>
              <span className="text-xs text-muted-foreground block">/night</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {property.description}
        </p>
        
        {/* Quick amenities visually represented */}
        <div className="flex gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <BedDouble className="w-4 h-4" />
            <span>{property.bedrooms || 1} Bed</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{property.bathrooms || 1} Bath</span>
          </div>
          {property.amenities?.some(a => (typeof a === 'string' ? a.toLowerCase().includes('wifi') : a.name.toLowerCase().includes('wifi'))) && (
            <div className="flex items-center gap-1">
              <Wifi className="w-4 h-4" />
              <span>WiFi</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 border-t border-border/50">
        <Button asChild className="w-full" variant="default">
          <Link href={`/book/${property.id}`}>
            Book Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
