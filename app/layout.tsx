import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cheyf Stays | Premium Property Management & Rentals in Sarajevo",
  description: "Experience modern, comfortable, and centrally-located stays in Sarajevo with Cheyf Stays. Book your perfect apartment today.",
  openGraph: {
    title: "Cheyf Stays | Premium Property Management",
    description: "Experience modern, comfortable, and centrally-located stays in Sarajevo with Cheyf Stays.",
    url: "https://cheyfstays.com",
    siteName: "Cheyf Stays",
    images: [
      {
        url: "/images/logo.webp",
        width: 1200,
        height: 630,
        alt: "Cheyf Stays OpenGraph Image",
      }
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col font-sans antialiased bg-background text-foreground`}>
        <Header />
        <SpeedInsights />
        <main className="flex-1 flex flex-col pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
