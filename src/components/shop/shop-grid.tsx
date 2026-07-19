"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
    Search,
    PackageSearch,
    Grid3x3,
    Star,
    Box,
    Code,
    Car,
    Shirt,
    Package,
} from "lucide-react";
import type { Product } from "@/types";
import { getProductCategories } from "@/lib/products";
import { cn } from "@/lib/utils";
import { staggerContainer } from "@/lib/animations";
import { ProductCard } from "./product-card";

const categoryIcons: Record<string, React.ReactNode> = {
    all: <Grid3x3 className="h-3.5 w-3.5" />,
    featured: <Star className="h-3.5 w-3.5" />,
    mlo: <Box className="h-3.5 w-3.5" />,
    script: <Code className="h-3.5 w-3.5" />,
    vehicle: <Car className="h-3.5 w-3.5" />,
    clothing: <Shirt className="h-3.5 w-3.5" />,
    bundle: <Package className="h-3.5 w-3.5" />,
};

export function ShopGrid({ products }: { products: Product[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState(
        () => searchParams.get("category") ?? "all",
    );

    useEffect(() => {
        const urlCategory = searchParams.get("category");
        setCategory(urlCategory ?? "all");
    }, [searchParams]);
    const categories = getProductCategories();

    const filtered = useMemo(() => {
        return products.filter((p) => {
            const matchesQuery =
                query.trim().length === 0 ||
                p.name.toLowerCase().includes(query.toLowerCase()) ||
                p.tagline.toLowerCase().includes(query.toLowerCase()) ||
                p.tags.some((t) =>
                    t.toLowerCase().includes(query.toLowerCase()),
                );
            const matchesCategory =
                category === "all" ||
                (category === "featured"
                    ? p.featured
                    : p.category === category);
            return matchesQuery && matchesCategory;
        });
    }, [products, query, category]);

    return (
        <div>
            <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-sm">
                    <Search className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-primary/70" />
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
                            onClick={() => {
                                setCategory(cat.value);
                                const params = new URLSearchParams(
                                    searchParams.toString(),
                                );
                                if (cat.value === "all") {
                                    params.delete("category");
                                } else {
                                    params.set("category", cat.value);
                                }
                                const qs = params.toString();
                                router.replace(qs ? `/shop?${qs}` : "/shop", {
                                    scroll: false,
                                });
                            }}
                            data-cursor-hover
                            className={cn(
                                "flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all",
                                category === cat.value
                                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(255,122,0,0.4)]"
                                    : "glass text-muted hover:text-foreground",
                            )}
                        >
                            {categoryIcons[cat.value]}
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
                        <ProductCard
                            key={product.id}
                            product={product}
                            index={i}
                        />
                    ))}
                </motion.div>
            ) : (
                <div className="glass flex flex-col items-center gap-4 rounded-3xl px-6 py-24 text-center">
                    <PackageSearch className="h-10 w-10 text-muted" />
                    <div>
                        <h3 className="font-display text-xl font-semibold">
                            No products found
                        </h3>
                        <p className="mt-1 text-sm text-muted">
                            Try a different search term or category — new
                            releases drop regularly.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
