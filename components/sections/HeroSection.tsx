import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/3.avif" 
          alt="Premium Sarajevo Stays"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t to-black/50 z-10" />
      </div>

      <div className="container relative z-20 px-4 md:px-6 mx-auto text-center flex flex-col items-center">
        <span className="inline-block py-1 px-3 rounded-full bg-accent text-accent-foreground text-xs font-semibold tracking-wider uppercase mb-6 shadow-xl animate-fade-in">
          Welcome to Cheyf Stays
        </span>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 text-balance max-w-4xl drop-shadow-md">
          Experience the True Spirit of <span className="text-accent">Sarajevo</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl text-balance drop-shadow">
          Premium property management and curated comfortable stays in the heart of the city. Modern amenities, exceptional locations, and authentic hospitality.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button asChild size="lg" className="text-md h-12 px-8" variant="accent">
            <Link href="/book">
              Book Your Stay
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-md h-12 px-8 bg-background/20 backdrop-blur-md border-white/20 text-white hover:bg-white/10 hover:text-white">
            <Link href="#properties">
              View Properties
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
