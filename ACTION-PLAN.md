# SEO Action Plan — Cheyf Stays
**Date:** 2026-03-01
**Priority Order:** Critical → High → Medium → Low

---

## CRITICAL — Fix Immediately

### C1. Add `robots.txt`
**File:** `public/robots.txt`
**Effort:** 5 minutes

```
User-agent: *
Allow: /

# Block transactional pages
Disallow: /payment/
Disallow: /api/

# Block AI crawlers (optional — remove if you want AI citation)
# User-agent: GPTBot
# Disallow: /

Sitemap: https://cheyfstays.com/sitemap.xml
```

---

### C2. Add XML Sitemap via Next.js Route
**File:** `app/sitemap.ts` (new file)
**Effort:** 30 minutes

Create a Next.js sitemap route that includes all static pages plus all property pages (fetched from the rentl API at build time):

```ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cheyfstays.com'
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/book`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/become-a-partner`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    // Add dynamic property URLs from rentl API here
  ]
}
```

---

### C3. Add `generateMetadata` to Property & Booking Pages
**Files:** `app/properties/[id]/page.tsx`, `app/book/[id]/page.tsx`
**Effort:** 1 hour

Every property page currently inherits the generic root layout title. Add unique titles per property:

```ts
// In app/properties/[id]/page.tsx
export async function generateMetadata({ params }: PageProps) {
  const { id: paramId } = await params;
  const data = propertyData[Number(paramId)];
  if (!data) return {};
  return {
    title: `${data.name} | Cheyf Stays Sarajevo`,
    description: data.description.substring(0, 160).trim(),
    openGraph: {
      title: `${data.name} | Cheyf Stays`,
      description: data.description.substring(0, 160).trim(),
      images: [{ url: data.images[0], width: 1200, height: 630 }],
    },
  };
}
```

---

### C4. Add Organization + LodgingBusiness JSON-LD Schema
**File:** `app/layout.tsx`
**Effort:** 1–2 hours

Add a `<script>` tag with JSON-LD in the root layout. This is the single highest-ROI schema change:

```tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LodgingBusiness", "LocalBusiness"],
  "name": "Cheyf Stays",
  "url": "https://cheyfstays.com",
  "logo": "https://cheyfstays.com/images/cheyf-logo-black.webp",
  "image": "https://cheyfstays.com/images/3.webp",
  "telephone": "+38767100-6007",
  "email": "info@cheyfstays.ba",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Fojnička 33",
    "addressLocality": "Sarajevo",
    "addressRegion": "Federation of BiH",
    "postalCode": "71000",
    "addressCountry": "BA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.8563,
    "longitude": 18.4131
  },
  "sameAs": [
    "https://instagram.com/cheyf.stays",
    "https://www.facebook.com/profile.php?id=61559738473242"
  ],
  "priceRange": "€€"
};

// In layout:
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
```

---

### C5. Fix the Broken Footer Image
**File:** `components/Footer.tsx` line 50
**Effort:** 5 minutes

Change:
```tsx
<Image src="/monri_images/postcss.config.png" alt="Monri" ... />
```
To the correct Monri payment badge image. Find the right path in `/public/monri_images/` and update.

---

### C6. Fix the Contact Form — Actually Send Emails
**File:** `components/sections/ContactForm.tsx`
**Effort:** 30 minutes

The `handleSubmit` function calls `e.preventDefault()` which stops the web3forms action from firing. Either:
- Remove `handleSubmit` and let the native form POST to web3forms (add a redirect parameter)
- Or use `fetch()` to POST to web3forms manually and show success based on the real response

---

### C7. Noindex Payment Pages
**File:** `app/payment/success/page.tsx`, `app/payment/cancel/page.tsx`
**Effort:** 10 minutes

Add to each:
```tsx
export const metadata = {
  title: "Booking Confirmed | Cheyf Stays",
  robots: { index: false, follow: false },
};
```

---

## HIGH — Fix Within 1 Week

### H1. Add Twitter Card Metadata to Root Layout
**File:** `app/layout.tsx`
**Effort:** 15 minutes

```tsx
export const metadata: Metadata = {
  // ... existing ...
  twitter: {
    card: 'summary_large_image',
    title: 'Cheyf Stays | Premium Apartments in Sarajevo',
    description: 'Experience modern, comfortable stays in Sarajevo with Cheyf Stays.',
    images: ['https://cheyfstays.com/images/og-image.jpg'], // use proper OG image
  },
};
```

---

### H2. Create a Proper OG / Social Sharing Image
**Effort:** 2 hours (design + implementation)

- The current OG image is `/images/logo.webp` — it's a logo, not a 1200×630 promotional image
- Create a branded 1200×630px image with property photo + logo overlay
- Save as `/public/images/og-default.jpg`
- Update layout.tsx to point to this image

---

### H3. Configure Favicon in layout.tsx
**File:** `app/layout.tsx`
**Effort:** 20 minutes

Move or copy `cheyf-site-icon-1.webp` to `app/favicon.ico` (or configure via metadata):

```tsx
export const metadata: Metadata = {
  // ... existing ...
  icons: {
    icon: '/images/cheyf-site-icon-1.webp',
    apple: '/images/cheyf-site-icon-1.webp',
  },
};
```

Or (preferred): Place a proper `favicon.ico` at `app/icon.ico` and `app/apple-icon.png`.

---

### H4. Add OpenGraph Metadata to All Sub-pages
**Files:** `app/about/page.tsx`, `app/contact/page.tsx`, `app/become-a-partner/page.tsx`, `app/book/page.tsx`
**Effort:** 1 hour total

Example for About:
```tsx
export const metadata = {
  title: "About Cheyf Stays | Premium Property Management in Sarajevo",
  description: "Learn how Cheyf Stays is redefining hospitality in Sarajevo with curated apartments and expert property management services.",
  openGraph: {
    title: "About Cheyf Stays",
    description: "Redefining hospitality in Sarajevo since day one.",
    url: "https://cheyfstays.com/about",
    images: [{ url: "/images/properties/cobanija.webp", width: 1200, height: 630 }],
  },
};
```

---

### H5. Add Security Headers to next.config.ts
**File:** `next.config.ts`
**Effort:** 30 minutes

```ts
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};
```

---

### H6. Add `sizes` Prop to All `fill` Images
**Effort:** 1–2 hours

Every `<Image fill ...>` without a `sizes` prop will default to 100vw, causing Next.js to serve full-width images even when the image container is smaller. Add `sizes` to all:

```tsx
// Example for property grid thumbnails (4-column grid)
<Image fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" ... />

// Example for hero background (full width)
<Image fill sizes="100vw" ... />

// Example for about section 2-col grid
<Image fill sizes="(max-width: 1024px) 100vw, 50vw" ... />
```

---

### H7. Add Review Schema for Testimonials
**File:** `components/sections/TestimonialsSection.tsx`
**Effort:** 45 minutes

Wrap the testimonials section in an `AggregateRating` + `Review` JSON-LD block:

```json
{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Cheyf Stays",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "3",
    "bestRating": "5"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Sarah Jenkins" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
      "reviewBody": "The Cheyf Modern Studio was absolutely perfect..."
    }
  ]
}
```

---

### H8. Fix Brand Name Inconsistency
**Files:** `app/privacy-policy/page.tsx`, `app/terms-of-service/page.tsx`
**Effort:** 30 minutes

- Standardize the brand name to "Cheyf Stays" throughout
- Fix "Cheif d.o.o." → "Cheyf d.o.o." (typo)
- Unify the contact email across all pages (`info@cheyfstays.ba`)
- Update domain references from `www.cheyf.ba` to `cheyfstays.com` or add both

---

## MEDIUM — Fix Within 1 Month

### M1. Improve Title Tags for Sub-pages

| Page | Current | Recommended |
|---|---|---|
| `/about` | "About Us \| Cheyf Stays" | "Cheyf Stays Sarajevo — Our Story & Team" |
| `/contact` | "Contact Us \| Cheyf Stays" | "Contact Cheyf Stays — Sarajevo Apartments" |
| `/book` | "Book Your Stay \| Cheyf Stays" | "Book Apartments in Sarajevo \| Cheyf Stays" |
| `/become-a-partner` | "Become a Partner \| Cheyf Stays" | "Property Management Sarajevo \| Partner with Cheyf Stays" |

---

### M2. Add Breadcrumb Navigation
**Effort:** 2 hours

Add a `<Breadcrumb>` component on interior pages (About, Contact, Book, Properties/[id]) and include `BreadcrumbList` JSON-LD:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://cheyfstays.com" },
    { "@type": "ListItem", "position": 2, "name": "Book", "item": "https://cheyfstays.com/book" }
  ]
}
```

---

### M3. Add Canonical Tags to All Pages
**Effort:** 30 minutes

In each page's metadata export:
```tsx
export const metadata = {
  // ...
  alternates: {
    canonical: 'https://cheyfstays.com/about',
  },
};
```

---

### M4. Add Per-Property Schema Markup
**File:** `app/properties/[id]/page.tsx`
**Effort:** 1 hour

Add `Accommodation` or `LodgingBusiness` JSON-LD for each property page using data from `propertyData`:

```json
{
  "@context": "https://schema.org",
  "@type": "Accommodation",
  "name": "Cheyf Modern Studio",
  "description": "...",
  "image": ["..."],
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "WiFi", "value": true }
  ]
}
```

---

### M5. Improve Image Alt Text on Generic Images
**Files:** Hero, About section
**Effort:** 30 minutes

- `/images/3.webp` (hero background): alt is "Premium Sarajevo Stays" — OK but could be more descriptive: "Sarajevo city view from a Cheyf Stays property"
- About section images like "Modern Apartment" → "Cheyf Stays Dzamijska modern apartment Sarajevo"

---

### M6. Add `rel="noopener noreferrer"` to Social Links
**File:** `components/Footer.tsx`
**Effort:** 5 minutes

```tsx
<a href="https://instagram.com/cheyf.stays" rel="noopener noreferrer" aria-label="Instagram" ...>
```

---

### M7. Add FAQ Schema to Become a Partner Page
**File:** `app/become-a-partner/page.tsx`
**Effort:** 1 hour

Add a FAQ section answering common property management questions, then mark it up with `FAQPage` schema. Example questions:
- "What percentage does Cheyf Stays take?"
- "How quickly can my property be listed?"
- "What is the minimum contract period?"

---

## LOW — Backlog

### L1. Add `llms.txt` for AI Search Readiness
**File:** `public/llms.txt`
**Effort:** 30 minutes

```
# Cheyf Stays
> Premium short-term rental property management in Sarajevo, Bosnia & Herzegovina.

## Services
- End-to-end property management
- Guest experience management
- Revenue optimization / dynamic pricing
- 24/7 support and maintenance

## Properties
Properties are located across Sarajevo neighborhoods including Čobanija, Grbavica, Old Town (Baščaršija), Džamijska, and others.

## Contact
info@cheyfstays.ba | +387 67 100 6007 | Fojnička 33, Sarajevo
```

---

### L2. Create a Blog / Content Hub
**Effort:** Ongoing

Target informational queries with content such as:
- "Best apartments in Sarajevo for tourists"
- "Sarajevo neighborhoods guide: where to stay"
- "Short-term rental regulations in Bosnia"
- "How to maximize Airbnb income in Sarajevo"

This is the single biggest long-term organic traffic opportunity.

---

### L3. Rename Generic Image Files
**Effort:** 1 hour

Rename `/images/1.webp` through `6.webp` to descriptive names like `sarajevo-view.webp`, `cheyf-apartment-interior.webp`, etc. Update references in code.

---

### L4. Add a Google Business Profile Link
**Effort:** 30 minutes setup

Create and verify a Google Business Profile for Cheyf Stays. Link to it from the footer. This dramatically improves local search visibility.

---

### L5. Add a Property Map Embed
**Effort:** 2 hours

Add a Google Maps embed on the Contact page and/or individual property pages showing the property locations. This improves local SEO signals and user experience.

---

## Summary Checklist

| Priority | Item | Done? |
|---|---|---|
| Critical | Add robots.txt | ☐ |
| Critical | Add sitemap.ts | ☐ |
| Critical | Add generateMetadata to properties/[id] and book/[id] | ☐ |
| Critical | Add Organization/LodgingBusiness JSON-LD | ☐ |
| Critical | Fix broken footer image (postcss.config.png) | ☐ |
| Critical | Fix contact form not submitting | ☐ |
| Critical | Noindex payment pages | ☐ |
| High | Add Twitter Card metadata | ☐ |
| High | Create proper 1200x630 OG image | ☐ |
| High | Configure favicon | ☐ |
| High | Add OG metadata to sub-pages | ☐ |
| High | Add security headers | ☐ |
| High | Add `sizes` to fill images | ☐ |
| High | Add Review schema for testimonials | ☐ |
| High | Fix brand name inconsistency ("Cheif" → "Cheyf") | ☐ |
| Medium | Improve title tags for sub-pages | ☐ |
| Medium | Add breadcrumb navigation + schema | ☐ |
| Medium | Add canonical tags | ☐ |
| Medium | Add per-property schema | ☐ |
| Medium | Improve image alt text | ☐ |
| Medium | Add noopener noreferrer to social links | ☐ |
| Medium | Add FAQ section + schema to become-a-partner | ☐ |
| Low | Add llms.txt | ☐ |
| Low | Start a blog/content hub | ☐ |
| Low | Rename generic image files | ☐ |
| Low | Add Google Business Profile link | ☐ |
| Low | Add property map embeds | ☐ |

---

*Action plan generated: 2026-03-01*
