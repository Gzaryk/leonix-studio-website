"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeUp, revealViewport } from "@/lib/animations";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={fadeUp}
        className="glass-strong relative overflow-hidden rounded-3xl px-8 py-20 text-center sm:px-16"
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[130px]" />
        <div className="relative z-10">
          <h2 className="mx-auto max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Give your server the interior it deserves.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            Nova Heights Penthouse is live now. More premium assets are already in development.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/shop">
                Shop the Collection <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/about">Learn About Leonix</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
