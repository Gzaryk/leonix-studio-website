"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Star } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { fadeUp, revealViewport } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function FeaturedProduct({ product }: { product: Product }) {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-32 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={fadeUp}
        className="mb-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
      >
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Featured Release
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">
            The one you&apos;ve been asking for.
          </h2>
        </div>
        <Link
          href="/shop"
          data-cursor-hover
          className="group flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
        >
          View full catalog
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={fadeUp}
        custom={1}
        className="glass-strong glow-primary relative grid overflow-hidden rounded-3xl lg:grid-cols-2"
      >
        <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent lg:bg-gradient-to-r" />
          <div className="absolute left-6 top-6 flex gap-2">
            {product.new && <Badge variant="solid">New</Badge>}
            <Badge variant="glass">{product.category.toUpperCase()}</Badge>
          </div>
        </div>

        <div className="flex flex-col justify-center p-8 sm:p-12">
          <div className="mb-3 flex items-center gap-2 text-sm text-secondary">
            <Star className="h-4 w-4 fill-secondary" />
            <span className="font-medium">{product.rating}</span>
            <span className="text-muted">({product.reviewCount} reviews)</span>
          </div>

          <h3 className="font-display text-3xl font-semibold sm:text-4xl">
            {product.name}
          </h3>
          <p className="mt-3 text-muted">{product.tagline}</p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {product.features.slice(0, 4).map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-foreground/85">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-8">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-semibold">
                  {formatPrice(product.price, product.currency)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm text-muted line-through">
                    {formatPrice(product.compareAtPrice, product.currency)}
                  </span>
                )}
              </div>
              <span className="text-xs text-muted">One-time purchase</span>
            </div>
            <Button asChild size="lg">
              <Link href={`/product/${product.slug}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
