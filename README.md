# Leonix Studio

Premium FiveM development studio website — Next.js 15, React 19, TypeScript, Tailwind CSS v4, and Framer Motion.

## Stack

- **Next.js 15** (App Router, React Server Components)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4** (CSS-based theme config, no `tailwind.config.js` needed)
- **Framer Motion** for animation
- **shadcn/ui**-style components (hand-rolled on Radix primitives)
- **Lucide React** icons
- Ready for **Vercel** deployment

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/                  # App Router pages & API routes
    page.tsx            # Home
    shop/                # /shop
    product/[slug]/      # /product/[slug]
    gallery/              # /gallery
    about/                # /about
    support/              # /support
    faq/                  # /faq
    legal/                # /legal, /legal/privacy, /legal/terms
    api/tebex/            # Server-side Tebex API routes
  components/
    ui/                  # Base design-system primitives (Button, Card, Tabs...)
    layout/               # Navbar, Footer
    home/                 # Home page sections
    shop/                 # Shop grid & product cards
    product/              # Product page sections
    gallery/               # Masonry gallery + lightbox
    shared/                # Cursor, scroll progress, ambient backgrounds, states
    providers/              # Theme + toast providers
  lib/                   # tebex.ts, products.ts, gallery.ts, utils.ts, animations.ts
  hooks/                 # Custom React hooks
  types/                  # Shared TypeScript types
  config/                 # site.ts — central site configuration
```

## Enabling Tebex Checkout

The storefront is fully wired for Tebex's **Headless API**, but ships with checkout
disabled by default so the site works out of the box without any keys.

Tebex requires a customer's **basket to be authenticated** (Steam / FiveM via
Cfx.re, depending on your store config) before any package can be added to it —
skipping this step is what causes the API's `422 User must login before adding
packages to basket` error. This project implements the full flow correctly:

1. `GET /api/tebex/checkout/start?slug=...` — creates a basket, then checks
   `GET /baskets/{ident}/auth`. If the store requires login, the browser is
   redirected to Tebex's hosted auth page (e.g. FiveM/Cfx.re login).
2. Tebex redirects back to `GET /api/tebex/checkout/callback` once the basket
   is authorized. Only now is the package added to the basket.
3. The browser is redirected to the basket's `links.checkout` URL to complete
   payment on Tebex's hosted checkout.

If your store has no login requirement configured, step 1 skips straight to
adding the package and redirecting to checkout.

### Setup

1. Create a store at [creator.tebex.io](https://creator.tebex.io) and copy your
   **Webstore Token** from Store Settings → API.
2. Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

3. Set the following variables:

   ```
   TEBEX_WEBSTORE_TOKEN=your_webstore_token
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   NEXT_PUBLIC_DISCORD_URL=https://discord.gg/yourinvite
   ```

4. In `src/lib/products.ts`, set `tebexPackageId` on each product to match the
   package ID configured in your Tebex store.

The "Buy Now" button on the product page performs a full browser navigation to
`/api/tebex/checkout/start` (not a `fetch` call) — this is required so the
browser can actually follow Tebex's login redirect and come back. No API keys
are ever exposed to the client; all Tebex calls happen server-side in
`src/lib/tebex.ts`.

Until a token is configured, the Buy button will show a friendly "checkout isn't
live yet" toast instead of erroring.

## Replacing Placeholder Images

All imagery in `public/images/` is placeholder art generated for this build.
Replace the files in `public/images/products/nova-heights/` and
`public/images/gallery/` with real renders, keeping the same filenames (or
update the paths in `src/lib/products.ts` and `src/lib/gallery.ts`).

## Deployment

This project is ready to deploy on [Vercel](https://vercel.com) with zero
configuration — connect the repository, add your environment variables, and
deploy.

## License

All rights reserved — Leonix Studio.
