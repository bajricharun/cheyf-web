import type { MetadataRoute } from "next";
import { propertyData } from "@/lib/propertyData";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cheyfstays.com";
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/become-a-partner`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms-of-service`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic property pages
  const propertyPages: MetadataRoute.Sitemap = Object.keys(propertyData).map(
    (id) => ({
      url: `${siteUrl}/properties/${id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }),
  );

  // Booking pages
  const bookingPages: MetadataRoute.Sitemap = Object.keys(propertyData).map(
    (id) => ({
      url: `${siteUrl}/book/${id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }),
  );

  return [...staticPages, ...propertyPages, ...bookingPages];
}
