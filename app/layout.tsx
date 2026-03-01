import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cheyf Stays | Premium Property Management & Rentals in Sarajevo",
  description:
    "Experience modern, comfortable, and centrally-located stays in Sarajevo with Cheyf Stays. Book your perfect apartment today.",
  openGraph: {
    title: "Cheyf Stays | Premium Property Management",
    description:
      "Experience modern, comfortable, and centrally-located stays in Sarajevo with Cheyf Stays.",
    url: "https://cheyfstays.com",
    siteName: "Cheyf Stays",
    images: [
      {
        url: "/images/logo.webp",
        width: 1200,
        height: 630,
        alt: "Cheyf Stays OpenGraph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

/** JSON-LD structured data for the entire site (Organization + VacationRental) */
function JsonLd() {
  const siteUrl = "https://cheyfstays.com";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cheyf Stays",
    url: siteUrl,
    logo: `${siteUrl}/images/logo.webp`,
    description:
      "Premium property management and short-term rental service in Sarajevo, Bosnia and Herzegovina.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sarajevo",
      addressCountry: "BA",
    },
    sameAs: [],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Cheyf Stays",
    url: siteUrl,
    image: `${siteUrl}/images/logo.webp`,
    description:
      "Experience modern, comfortable, and centrally-located stays in Sarajevo with Cheyf Stays.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sarajevo",
      addressCountry: "BA",
    },
    priceRange: "€€",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <JsonLd />
      </head>
      <body
        className={`${inter.className} min-h-screen flex flex-col font-sans antialiased bg-background text-foreground`}
      >
        <Header />
        <SpeedInsights />
        <main className="flex-1 flex flex-col pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
