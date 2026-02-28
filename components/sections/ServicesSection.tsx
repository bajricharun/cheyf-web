import React from 'react';
import { Building2, KeyRound, HeadphonesIcon, TrendingUp } from 'lucide-react';

const services = [
  {
    icon: Building2,
    title: 'End-to-End Property Management',
    description: 'We handle everything from listing optimization, dynamic pricing, cleaning, maintenance, and guest communication. Sit back and relax while we maximize your rental income.',
  },
  {
    icon: KeyRound,
    title: 'Seamless Guest Experience',
    description: 'We offer 24/7 guest support, easy self-check-in processes, and concierge-level recommendations to ensure every stay gets a 5-star review.',
  },
  {
    icon: TrendingUp,
    title: 'Revenue Optimization',
    description: 'Using advanced market data and dynamic pricing algorithms, we ensure your property is booked at the optimal price point year-round.',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support & Maintenance',
    description: 'Our dedicated local team responds instantly to guest inquiries and handles emergency maintenance issues before they become problems.',
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 bg-card text-card-foreground border-y border-border/50 relative overflow-hidden" id="services">
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Comprehensive Property Services
          </h2>
          <p className="text-muted-foreground text-lg">
            We partner with property owners to unlock their property's full potential, while providing guests with unforgettable stays.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className="bg-background border border-border/50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
