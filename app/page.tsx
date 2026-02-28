import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PropertyGrid } from "@/components/sections/PropertyGrid";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactForm } from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PropertyGrid />
      <TestimonialsSection />
      <ContactForm />
    </>
  );
}
