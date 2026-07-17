# Tijana Jones · Austin Luxury Real Estate

Single-page marketing site for **Tijana Jones**, luxury real-estate agent (eXp Realty / eXp Luxury, CK Residential Group) serving greater Austin, TX.

> **Demo site.** Listings, statistics, and reviews are illustrative. Reviews are republished from Zillow and belong to their authors. Not affiliated with Zillow®, eXp Realty®, or eXp Luxury. The site is set to `noindex`.

## Stack

- **Next.js 16** (App Router, `src/`, Turbopack) · **React 19** · **TypeScript**
- **Tailwind v4** installed; page styling is a hand-rolled design system in `src/app/globals.css`
- Fonts: **Archivo** + **Manrope** via `next/font`

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Editing content

Most copy is data-driven at the top of `src/app/page.tsx`:

- `SALE_LISTINGS` / `RENT_LISTING` — current listings
- `SOLD_LISTINGS` — recently-sold cards (tagged Buyer's-agent / Seller's-agent)
- `REVIEWS` — client reviews (role-based attributions)
- Contact details, service areas, and the YouTube link are constants near the top

Listing/portrait images live in `public/`. The favicon is `src/app/icon.svg` (TJ monogram).

## Deploy

Hosted on **Vercel** (production: <https://tijana-jones-realtor.vercel.app>). Connected to this repo — **pushing to `main` triggers a production deploy**.

## To do

- Wire the contact form to email/CRM (currently front-end only, shows a success state)
- Swap the Meet-Tijana video to a self-hosted `<video>` (YouTube embedding is disabled on the source video)
