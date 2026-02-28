import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

const testimonials = [
  {
    name: "Sarah Jenkins",
    location: "United Kingdom",
    rating: 5,
    text: "The Cheyf Modern Studio was absolutely perfect. Clean, exactly as pictured, and you can't beat the location right by the Latin Bridge. The team was responsive and helpful!",
  },
  {
    name: "Marko Novak",
    location: "Croatia",
    rating: 5,
    text: "Exceeded our expectations. The apartment in Grbavica was spacious, quiet, and had incredibly fast internet for my remote work. Will definitely book again.",
  },
  {
    name: "Elena Rossi",
    location: "Italy",
    rating: 5,
    text: "We managed our property through Cheyf Stays for a year now and the revenue is up by 40%. They handle everything so professionally, zero stress for us.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-secondary text-secondary-foreground relative" id="testimonials">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Guest Experiences
          </h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it—read what our guests and property owners have to say about Cheyf Stays.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="bg-background border-none shadow-md h-full flex flex-col">
              <CardContent className="pt-8 flex flex-col flex-grow">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="text-lg mb-6 flex-grow italic">
                  "{t.text}"
                </blockquote>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
