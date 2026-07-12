"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, PackageSearch } from "lucide-react";
import type { Product } from "@/types";
import { getProductCategories } from "@/lib/products";
import { cn } from "@/lib/utils";
import { staggerContainer } from "@/lib/animations";
import { ProductCard } from "./product-card";

export function ShopGrid({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const categories = getProductCategories();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery =
        query.trim().length === 0 ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.tagline.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      const matchesCategory = category === "all" || p.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, category]);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="glass h-12 w-full rounded-full pl-11 pr-4 text-sm outline-none placeholder:text-muted focus:border-primary/50"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              data-cursor-hover
              className={cn(
                "rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all",
                category === cat.value
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(255,122,0,0.4)]"
                  : "glass text-muted hover:text-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </motion.div>
      ) : (
        <div className="glass flex flex-col items-center gap-4 rounded-3xl px-6 py-24 text-center">
          <PackageSearch className="h-10 w-10 text-muted" />
          <div>
            <h3 className="font-display text-xl font-semibold">No products found</h3>
            <p className="mt-1 text-sm text-muted">
              Try a different search term or category — new releases drop regularly.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
