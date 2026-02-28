import { AboutSection } from "@/components/sections/AboutSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import Image from "next/image";

export const metadata = {
  title: "About Us | Cheyf Stays",
  description: "Learn more about Cheyf Stays, our story, and our premium property management services in Sarajevo.",
};

export default function AboutPage() {
  return (
    <>
      <div className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/properties/cobanija.jpg"
            alt="About Cheyf Stays"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60 z-10" />
        </div>
        <div className="relative z-20 container mx-auto text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 drop-shadow-md">About Cheyf Stays</h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto drop-shadow">
            Discover our vision and why we are redefining the standard for premium hospitable stays and property management in Sarajevo.
          </p>
        </div>
      </div>
      <AboutSection />
      <TestimonialsSection />
    </>
  );
}
