# Full SEO Audit Report — Cheyf Stays
**Date:** 2026-03-01
**Audited by:** Claude Code SEO Audit
**Framework:** Next.js 16.1.6 (App Router)
**Business Type:** Short-term rental / Property management — Sarajevo, Bosnia & Herzegovina

---

## Executive Summary

### Overall SEO Health Score: **49 / 100**

| Category | Weight | Score | Contribution |
|---|---|---|---|
| Technical SEO | 25% | 40/100 | 10.0 pts |
| Content Quality | 25% | 65/100 | 16.3 pts |
| On-Page SEO | 20% | 55/100 | 11.0 pts |
| Schema / Structured Data | 10% | 5/100 | 0.5 pts |
| Performance (CWV) | 10% | 70/100 | 7.0 pts |
| Images | 5% | 60/100 | 3.0 pts |
| AI Search Readiness | 5% | 25/100 | 1.3 pts |
| **TOTAL** | **100%** | | **49.0 / 100** |

---

### Top 5 Critical Issues
1. **No robots.txt** — Crawlers have no guidance; indexing may be unpredictable
2. **No XML sitemap** — Search engines cannot discover all pages efficiently
3. **No structured data (schema markup)** — Zero JSON-LD; missing rich results for properties, reviews, and business info
4. **Property detail pages have no dynamic metadata** — `/properties/[id]` exports no `metadata` or `generateMetadata`, so Google sees the root layout title on every property page
5. **OpenGraph image is the logo** — OG social shares will look unprofessional; logo is not 1200×630

### Top 5 Quick Wins
1. Add `robots.txt` to `/public` (5 minutes)
2. Add `sitemap.xml` or a Next.js `sitemap.ts` route handler (30 minutes)
3. Add `generateMetadata` to `app/properties/[id]/page.tsx` and `app/book/[id]/page.tsx` (1 hour)
4. Add Organization + LodgingBusiness JSON-LD to root layout (1–2 hours)
5. Fix the broken footer image path (`postcss.config.png`) (5 minutes)

---

## 1. Technical SEO

### Crawlability

| Check | Status | Notes |
|---|---|---|
| robots.txt | ❌ MISSING | No `public/robots.txt` file exists |
| XML sitemap | ❌ MISSING | No `public/sitemap.xml` and no Next.js sitemap route |
| 404 handling | ✅ OK | Next.js handles 404 via `_not-found` page |
| Redirect handling | ✅ OK | No problematic redirect chains detected |
| Internal links | ✅ OK | All pages linked from Header/Footer |

**robots.txt** is completely absent. Until one is added, all pages are implicitly crawlable — including `/api/*`, `/payment/success`, `/payment/cancel` — which should be blocked.

### Indexability

| Check | Status | Notes |
|---|---|---|
| Canonical tags | ❌ MISSING | No canonical URL implementation anywhere |
| noindex pages | ⚠️ MISSING | `/payment/success`, `/payment/cancel` should be noindex |
| Duplicate content | ⚠️ RISK | `/book` and `/properties/[id]` show similar property info; no canonicalization |
| `lang` attribute | ✅ OK | `<html lang="en">` set in layout |

### Security & Headers

| Check | Status | Notes |
|---|---|---|
| Security headers | ❌ MISSING | `next.config.ts` is empty — no CSP, X-Frame-Options, HSTS, etc. |
| HTTPS | ✅ Assumed | Deployed on Vercel (HTTPS by default) |
| External links | ⚠️ WARNING | Social links in footer use `href` without `rel="noopener noreferrer"` |

### Metadata Coverage

| Page | Title | Description | OG | Twitter Card |
|---|---|---|---|---|
| `/` (root layout) | ✅ | ✅ | ✅ Partial | ❌ Missing |
| `/about` | ✅ | ✅ | ❌ | ❌ |
| `/book` | ✅ | ✅ | ❌ | ❌ |
| `/book/[id]` | ❌ NO METADATA | ❌ | ❌ | ❌ |
| `/contact` | ✅ | ✅ | ❌ | ❌ |
| `/become-a-partner` | ✅ | ✅ | ❌ | ❌ |
| `/properties/[id]` | ❌ NO METADATA | ❌ | ❌ | ❌ |
| `/privacy-policy` | ✅ | ✅ Thin | ❌ | ❌ |
| `/terms-of-service` | ✅ | ✅ Thin | ❌ | ❌ |
| `/payment/success` | ❌ | ❌ | ❌ | ❌ |
| `/payment/cancel` | ❌ | ❌ | ❌ | ❌ |

**Critical:** `app/properties/[id]/page.tsx` and `app/book/[id]/page.tsx` have **no `metadata` or `generateMetadata` export**. Every individual property page inherits the root layout title: "Cheyf Stays | Premium Property Management & Rentals in Sarajevo". Google will see the same title for all property pages — a significant duplicate title issue.

### Favicon / Icon
- No favicon is configured in `layout.tsx` metadata
- `cheyf-site-icon-1.webp` exists in `/public/images/` but is not registered
- Next.js App Router expects `app/favicon.ico` or `metadata.icons` to be configured

---

## 2. Content Quality

### E-E-A-T Assessment

| Signal | Status | Notes |
|---|---|---|
| Experience | ⚠️ WEAK | Testimonials present but hardcoded and not schema-marked |
| Expertise | ⚠️ WEAK | No team bios, no certifications, no "years in business" |
| Authoritativeness | ⚠️ WEAK | No external citations, no press mentions, no awards |
| Trustworthiness | ✅ OK | Privacy policy, terms of service present; legal entity named (Cheif d.o.o.) |

### Content Depth

| Page | Word Count (est.) | Assessment |
|---|---|---|
| Homepage | ~400 words across sections | ⚠️ Thin — below typical 600+ word threshold |
| About | ~250 words (shares AboutSection) | ❌ Very thin |
| Contact | ~100 words | ❌ Very thin — minimal content page |
| Become a Partner | ~350 words | ⚠️ Thin |
| Privacy Policy | ~800 words | ✅ Adequate |
| Terms of Service | ~1,200 words | ✅ Good |

**No blog or editorial content** — The site has zero articles, guides, or local content (e.g. "Best areas to stay in Sarajevo", "Sarajevo travel guide"). This is a major missed opportunity for organic traffic from informational queries.

### Duplicate / Inconsistent Branding
- Privacy Policy and Terms of Service use "Cheyf Accommodations" and "Cheif d.o.o." (note: "Cheif" is a typo of "Cheyf")
- The Terms of Service references `www.cheyf.ba` as the website URL, while the layout metadata references `https://cheyfstays.com`
- Contact form says email is `info@cheyfstays.ba`; TOS says `cheyf@bookings.ba`; TOS also says `cheyf@booking.com` — three different contact emails create trust confusion

### Testimonials
- 3 testimonials present — good for trust
- All testimonials are hardcoded with no Review schema markup
- No link to external review platforms (Airbnb, Booking.com, Google Reviews)

### Contact Form Issue
- `ContactForm.tsx`: The `handleSubmit` function **simulates** an API call with `setTimeout` and shows success — but the actual `<form>` element posts to `https://api.web3forms.com/submit`. These two paths conflict: `e.preventDefault()` is called, preventing the actual form submission. **The contact form may not be sending emails.**

---

## 3. On-Page SEO

### Title Tags

| Page | Title | Length | Issues |
|---|---|---|---|
| `/` | "Cheyf Stays \| Premium Property Management & Rentals in Sarajevo" | 63 chars | ✅ Good |
| `/about` | "About Us \| Cheyf Stays" | 23 chars | ⚠️ Too short, not keyword-rich |
| `/book` | "Book Your Stay \| Cheyf Stays" | 29 chars | ⚠️ Missing location keyword |
| `/contact` | "Contact Us \| Cheyf Stays" | 25 chars | ⚠️ Too short |
| `/become-a-partner` | "Become a Partner \| Cheyf Stays" | 31 chars | ⚠️ Missing "Sarajevo" |
| `/properties/[id]` | ❌ MISSING | — | Critical |
| `/book/[id]` | ❌ MISSING | — | Critical |

### Meta Descriptions

All pages that have descriptions are adequately written but could be more specific. Pages missing metadata inherit nothing useful.

### Heading Structure

**Homepage:**
- H1: "Experience the True Spirit of Sarajevo" ✅ (HeroSection)
- H2: "More than just a place to stay." (AboutSection) ✅
- H2: "Comprehensive Property Services" (ServicesSection) ✅
- H2: "Featured Properties" (PropertyGrid) ✅
- H2: "Guest Experiences" (TestimonialsSection) ✅
- H2: "Get in Touch" (ContactForm) ✅
- H3 used throughout for sub-sections ✅

**About page:**
- H1: "About Cheyf Stays" ✅
- Then imports `<AboutSection>` which starts with H2 — but AbouSection uses H2, so hierarchy is OK ✅

**Book page:**
- H1: "Find Your Perfect Stay" ✅

**Properties/[id] page:**
- H1: `{data.name}` ✅ (dynamic)
- H2: "Amenities", "Highlights" ✅

**Become a Partner:**
- H1: "Maximize Your Rental Income with Zero Stress" ✅
- H2: "How To Partner With Us" ✅

Overall heading structure is solid. No heading skips detected.

### Internal Linking

| Check | Status |
|---|---|
| Homepage → Book | ✅ (Hero CTA + PropertyGrid button) |
| Homepage → Become a Partner | ✅ (Hero CTA) |
| Header nav | ✅ (About, Contact, Become a Partner, Book Now) |
| Footer links | ✅ (About, Contact, Privacy, Terms) |
| Breadcrumbs | ❌ MISSING |
| Properties cross-linking | ⚠️ No "you may also like" or related properties |
| No link to `/book` from `/contact` | ⚠️ Missed conversion opportunity |

### Keyword Targeting

The site targets "Sarajevo" effectively across most pages. However:
- "Sarajevo apartment rental" — not explicitly used in titles
- "short-term rental Sarajevo" — not targeted
- "property management Sarajevo" — mentioned in root title but not sub-pages
- "vacation rental Sarajevo" — not targeted
- Individual property neighborhoods (Grbavica, Baščaršija, Old Town) — mentioned only in property descriptions, not in headings or page titles

---

## 4. Schema / Structured Data

### Current Implementation
**None detected.** The entire site has zero JSON-LD or microdata markup.

### Missing Schema Types

| Schema Type | Priority | Impact |
|---|---|---|
| `Organization` | Critical | Establishes brand identity |
| `LocalBusiness` / `LodgingBusiness` | Critical | Rich results in local search |
| `Product` / `Accommodation` per property | High | Property rich results |
| `Review` / `AggregateRating` | High | Star ratings in SERPs |
| `BreadcrumbList` | High | Better SERP appearance |
| `FAQPage` | Medium | Can appear as expandable results |
| `ContactPage` | Low | Enhances contact page signal |

### Recommended Root Layout JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Cheyf Stays",
  "url": "https://cheyfstays.com",
  "logo": "https://cheyfstays.com/images/cheyf-logo-black.webp",
  "telephone": "+387671006007",
  "email": "info@cheyfstays.ba",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Fojnička 33",
    "addressLocality": "Sarajevo",
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
  ]
}
```

---

## 5. Performance

### Image Optimization
- ✅ All images use `.webp` format — excellent modern format choice
- ✅ `next/image` used throughout — automatic optimization, lazy loading, responsive
- ✅ Hero, above-fold property images use `priority` prop — good LCP
- ⚠️ Many `fill` images do not specify a `sizes` prop — Next.js may serve oversized images
- ❌ Footer payment images include `postcss.config.png` — a development artifact served as a payment badge; this image will appear broken/wrong in production
- ❌ OG image (`/images/logo.webp`) is not sized to 1200×630

### Bundle Size Concerns
- `framer-motion` is imported but no usage was found in the source files reviewed — if it's imported but unused, it adds ~35KB to the JS bundle
- `@radix-ui/react-popover` is listed as a dependency but only `calendar.tsx` and `popover.tsx` appear to use it — seems appropriate

### Core Web Vitals (Estimated)
| Metric | Estimate | Notes |
|---|---|---|
| LCP | ⚠️ Moderate risk | Hero background image (90vh full-screen) is large — needs priority + proper sizing |
| INP | ✅ Low risk | Minimal client-side interactivity |
| CLS | ⚠️ Monitor | Fill images without `sizes` can cause layout shift |

---

## 6. Images

| Check | Status | Count/Details |
|---|---|---|
| Format | ✅ WebP | 100+ images, all webp |
| Alt text | ⚠️ Partial | All explicit images have alt text; PropertyCard uses `property.name` as alt — good |
| `sizes` prop on `fill` images | ❌ MISSING | All `fill` images across the site lack `sizes` |
| Broken image | ❌ FOUND | Footer: `src="/monri_images/postcss.config.png"` — wrong path |
| OG image dimensions | ❌ WRONG | Logo image used as OG, not 1200×630 |
| Image naming | ⚠️ Unclear | `1.webp`, `2.webp`, `3.webp` are non-descriptive |

---

## 7. AI Search Readiness

| Check | Status |
|---|---|
| `llms.txt` | ❌ MISSING |
| Structured data | ❌ MISSING |
| Author/entity signals | ❌ MISSING |
| Passage-level citability | ⚠️ MODERATE — paragraphs are somewhat self-contained |
| Factual, specific content | ✅ Good — specific addresses, neighborhoods, prices referenced |
| AI crawler access (robots.txt) | N/A — no robots.txt |

**The site has no `llms.txt`** — a new standard that helps AI systems understand what content they can cite. Given the site targets English-speaking international travelers, this is an emerging opportunity.

---

## 8. Additional Issues Found

### Contact Form Bug
In `components/sections/ContactForm.tsx` (line 12), `handleSubmit` calls `e.preventDefault()` and shows a simulated success — but the `<form>` element (line 65) uses `action="https://api.web3forms.com/submit"`. Since `preventDefault()` is called, the form **never actually submits to web3forms**. Users get a fake "Message Sent!" without any email being sent.

### Brand Name Inconsistency
- "Cheyf Stays" — used in all marketing copy
- "Cheyf Accommodations" — used in Privacy Policy
- "Cheif d.o.o." — used in Terms of Service (typo: Cheif vs Cheyf)
- Domain in ToS: `www.cheyf.ba`; metadata domain: `https://cheyfstays.com`

These inconsistencies can undermine trust signals for both users and search engines.

### Payment Pages Should Be Noindexed
`/payment/success` and `/payment/cancel` are transactional confirmation pages that should not appear in search results. They should have `<meta name="robots" content="noindex">` or be blocked via robots.txt.

---

*Report generated: 2026-03-01*
