import React from 'react';
import Image from 'next/image';
import { ShieldCheck, MapPin, Sparkles } from 'lucide-react';

export function AboutSection() {
  return (
    <section className="py-24 bg-background overflow-hidden relative" id="about">
      {/* Decorative background element */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/2 space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Our Story
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-balance">
              More than just a place to stay. <br />
              <span className="text-muted-foreground">A place to belong.</span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Based in the vibrant heart of Sarajevo, Cheyf Stays is dedicated to redefining hospitality. Whether you're visiting for business, leisure, or seeking a long-term rental, we manage a meticulously curated portfolio of properties that guarantee modern comforts while retaining authentic local charm.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 pt-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-xl">Prime Locations</h3>
                <p className="text-sm text-muted-foreground">Strategically located near major Sarajevo attractions, ensuring everything is within reach.</p>
              </div>
              
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-xl">Premium Comfort</h3>
                <p className="text-sm text-muted-foreground">Every property is outfitted with high-speed WiFi, modern appliances, and spotless interiors.</p>
              </div>
            </div>
          </div>
          
          {/* Images Grid */}
          <div className="lg:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                  <Image src="/images/properties/oldtown1.webp" alt="Sarajevo Old Town" fill className="object-cover" />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <Image src="/images/properties/dzamijska.webp" alt="Modern Apartment" fill className="object-cover" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <Image src="/images/properties/verde.webp" alt="Balcony View" fill className="object-cover" />
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                  <Image src="/images/properties/nana3.webp" alt="Interior Details" fill className="object-cover" />
                </div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center border border-border/50 hidden md:flex">
              <ShieldCheck className="w-10 h-10 text-accent mb-2" />
              <div className="text-2xl font-bold">100%</div>
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Trusted</div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
