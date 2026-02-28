import { ContactForm } from "@/components/sections/ContactForm";
import Image from "next/image";

export const metadata = {
  title: "Contact Us | Cheyf Stays",
  description: "Get in touch with Cheyf Stays for inquiries, support, or property management services.",
};

export default function ContactPage() {
  return (
    <>
      <div className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/properties/andar1.webp"
            alt="Contact Cheyf Stays"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60 z-10" />
        </div>
        <div className="relative z-20 container mx-auto text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 drop-shadow-md">Contact Us</h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto drop-shadow">
            We're here to help. Reach out to our dedicated team at any time for support or business inquiries.
          </p>
        </div>
      </div>
      <ContactForm />
    </>
  );
}
