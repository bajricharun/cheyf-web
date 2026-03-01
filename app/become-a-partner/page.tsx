import Image from "next/image";
import { ContactForm } from "@/components/sections/ContactForm";
import { ServicesSection } from "@/components/sections/ServicesSection";

export const metadata = {
  title: "Become a Partner | Cheyf Stays",
  description: "Partner with Cheyf Stays to manage your property and maximize your rental income in Sarajevo.",
};

export default function BecomeAPartnerPage() {
  return (
    <>
      <div className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/properties/verde.webp"
            alt="Partner with Cheyf Stays"
            fill
            className="object-cover"
            priority
          />
          {/* Fades nicely into the background of services section */}
          <div className="absolute inset-0 bg-gradient-to-t from-background z-10" />
        </div>
        <div className="relative z-20 container mx-auto text-white">
          <span className="inline-block py-1 px-3 rounded-full bg-accent text-accent-foreground text-xs font-semibold tracking-wider uppercase mb-6 shadow-xl leading-none">
            Property Management
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 drop-shadow-md text-balance max-w-4xl mx-auto">
            Maximize Your Rental Income with Zero Stress
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto drop-shadow text-balance">
            We handle everything—from guest communication and cleaning to dynamic pricing and maintenance. Let your property work for you.
          </p>
        </div>
      </div>
      
      {/* We reuse the services section which outlines what we do */}
      <ServicesSection />
      
      <section className="py-24 bg-background">
        <div className="container px-4 md:px-6 mx-auto max-w-5xl text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How To Partner With Us</h2>
          <div className="grid sm:grid-cols-3 gap-8 text-left mt-16 relative">
            
            {/* Connecting line for desktop */}
            <div className="hidden sm:block absolute top-[24px] left-[15%] right-[15%] h-px bg-border/80 -z-10" />

            <div className="space-y-4 pt-6 relative">
              <div className="absolute top-5 left-0 w-12 h-12 bg-primary/10 text-primary border-4 border-background rounded-full flex items-center justify-center text-xl font-bold -translate-y-1/2 -mt-6">1</div>
              <h3 className="text-xl font-semibold mt-4">Get in Touch</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Contact us with details about your property in Sarajevo. The size, neighborhood, and current condition.</p>
            </div>
            
            <div className="space-y-4 pt-6 relative">
              <div className="absolute top-5 left-0 w-12 h-12 bg-primary/10 text-primary border-4 border-background rounded-full flex items-center justify-center text-xl font-bold -translate-y-1/2 -mt-6">2</div>
              <h3 className="text-xl font-semibold mt-4">Property Evaluation</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">We visit the property, suggest any necessary upgrades, and project your estimated revenue based on our market data.</p>
            </div>
            
            <div className="space-y-4 pt-6 relative">
              <div className="absolute top-5 left-0 w-12 h-12 bg-accent/20 text-accent-foreground border-4 border-background rounded-full flex items-center justify-center text-xl font-bold -translate-y-1/2 -mt-6">3</div>
              <h3 className="text-xl font-semibold mt-4">Start Earning</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">We take professional photos, list the property, manage it 24/7, and optimize prices for continuously high bookings.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-muted py-16 border-t border-border/50">
        <div className="container mx-auto text-center px-4 max-w-2xl space-y-4">
             <h2 className="text-3xl font-bold tracking-tight">Ready to unlock your property's potential?</h2>
             <p className="text-muted-foreground text-lg">Leave us a message below and our acquisition team will contact you within 24 hours.</p>
        </div>
      </div>

      <ContactForm />
    </>
  );
}
