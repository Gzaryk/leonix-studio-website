"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { fadeUp } from "@/lib/animations";
import { Badge } from "@/components/ui/badge";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.div variants={fadeUp} custom={index}>
      <Link
        href={`/product/${product.slug}`}
        data-cursor-hover
        className="group glass relative flex flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/40"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-background/0" />
          <div className="absolute left-4 top-4 flex gap-2">
            {product.new && <Badge variant="solid">New</Badge>}
            <Badge variant="glass">{product.category.toUpperCase()}</Badge>
          </div>
          <div className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          {product.rating && (
            <div className="mb-2 flex items-center gap-1.5 text-xs text-secondary">
              <Star className="h-3.5 w-3.5 fill-secondary" />
              <span className="font-medium">{product.rating}</span>
              <span className="text-muted">({product.reviewCount})</span>
            </div>
          )}
          <h3 className="font-display text-lg font-semibold">{product.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted">{product.tagline}</p>

          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl font-semibold">
                {formatPrice(product.price, product.currency)}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-muted line-through">
                  {formatPrice(product.compareAtPrice, product.currency)}
                </span>
              )}
            </div>
            <span className="text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              View &rarr;
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
