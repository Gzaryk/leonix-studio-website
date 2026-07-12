"use client";

import { motion } from "framer-motion";
import type { Product } from "@/types";
import { fadeUp, revealViewport, staggerContainer } from "@/lib/animations";
import { ProductCard } from "@/components/shop/product-card";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={fadeUp}
      className="mt-32"
    >
      <h2 className="mb-10 font-display text-3xl font-semibold">You might also like</h2>
      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </motion.div>
    </motion.section>
  );
}
