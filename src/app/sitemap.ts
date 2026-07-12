import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllProducts } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/shop",
    "/gallery",
    "/about",
    "/support",
    "/faq",
    "/legal/privacy",
    "/legal/terms",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const productRoutes = getAllProducts().map((product) => ({
    url: `${siteConfig.url}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...productRoutes];
}
