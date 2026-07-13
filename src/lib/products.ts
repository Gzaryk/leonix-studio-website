import type { Product } from "@/types";

/**
 * lib/products.ts
 * -----------------------------------------------------------------------
 * Local product catalog used until Tebex packages are wired up to drive
 * the storefront. The shape mirrors what we'll eventually map Tebex
 * `TebexPackage` records into, so swapping the data source later only
 * means changing these functions' implementations — no component code
 * needs to change.
 * -----------------------------------------------------------------------
 */

export const products: Product[] = [
  {
    id: "stock-305",
    tebexPackageId: 7539813,
    slug: "stock-305",
    name: "STOCK 305 - CLOTHING STORE",
    category: "mlo",
    tagline: "A stylish clothing store bringing fresh looks to your city.",
    description:
    "A complete clothing store designed for immersive roleplay. Players can explore a curated selection of outfits, from everyday streetwear to more elegant styles, with a clean and modern shopping experience. Built to fit naturally into your city, this store gives your players more freedom to customize their characters and create their own unique style.",
    price: 10.00,
    compareAtPrice: 14.99,
    currency: "EUR",
    images: [
      "/images/products/nova-heights/hero.webp",
      "/images/products/nova-heights/living.webp",
      "/images/products/nova-heights/terrace.webp",
      "/images/products/nova-heights/bar.webp",
      "/images/products/nova-heights/bedroom.webp",
      "/images/products/nova-heights/office.webp",
    ],
    features: [
      "Fully custom interior — no retexture kits",
      "Cinematic day/night lighting pass",
      "Optimized for zero client-side FPS impact",
      "Custom MLO-safe collisions & nav mesh",
      "Includes YMAP, interior + exterior entrances",
      "Free lifetime updates & priority Discord support",
    ],
    requirements: [
      "FiveM server with custom resource support",
      "Any framework supported (ESX, QBCore, QBox or standalone)",
      "Minimum server storage: ~50MB",
      "Compatible clothing system required for outfit interactions",
    ],
    installation: [
      {
    title: "Extract the resource",
    description:
      "Unzip the purchased archive into your server's `resources` folder and keep the original resource structure intact.",
      },
      {
    title: "Add the resource to your server.cfg",
    description:
      "Add `ensure leonix_vespucci_store` to your server.cfg to start the MLO with your server.",
      },
      {
    title: "Check resource placement",
    description:
      "Make sure the resource folder is correctly placed inside your server resources directory and that all files are included.",
      },
      {
    title: "Restart and verify",
    description:
      "Restart your server, visit the clothing store location, and confirm the interior, props, and collisions are loading correctly.",
      },
    ],
faq: [
      {
    question: "Is this MLO standalone?",
    answer:
      "Yes. This clothing store MLO is completely standalone and can be used with any FiveM framework or custom server setup. No additional dependencies are required.",
      },
      {
    question: "Will it affect server performance?",
    answer:
      "No. The interior is optimized for FiveM with clean assets, optimized props, and proper streaming to keep performance impact as low as possible.",
      },
      {
    question: "Do I get updates after purchase?",
    answer:
      "Yes, any future fixes, improvements, and optimization updates for this MLO are included after purchase.",
      },
      {
    question: "Can I request custom edits?",
    answer:
      "Small adjustments may be possible depending on the request. For larger modifications or custom MLO work, contact us for a quote.",
      },
    ],
    tags: ["mlo", "clothing", "retail", "featured"],
    featured: true,
    new: true,
    rating: 4.9,
    reviewCount: 27,
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getFeaturedProduct(): Product {
  return products.find((p) => p.featured) ?? products[0];
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(currentSlug: string, limit = 3): Product[] {
  return products.filter((p) => p.slug !== currentSlug).slice(0, limit);
}

export function getProductCategories(): { label: string; value: string }[] {
  return [
    { label: "All", value: "all" },
    { label: "MLOs", value: "mlo" },
    { label: "Scripts", value: "script" },
    { label: "Vehicles", value: "vehicle" },
    { label: "Clothing", value: "clothing" },
    { label: "Bundles", value: "bundle" },
  ];
}
