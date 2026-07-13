"use client";

import { motion } from "framer-motion";
import { fadeUp, revealViewport, staggerContainer } from "@/lib/animations";

const stats = [
  { value: "4.9★", label: "Average rating" },
  { value: "180+", label: "Servers running Leonix assets" },
  { value: "24H", label: "Average support response" },
  { value: "100%", label: "Custom, no retextures" },
];

export function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={staggerContainer}
        className="glass grid grid-cols-2 divide-x divide-y divide-white/10 overflow-hidden rounded-3xl sm:grid-cols-4 sm:divide-y-0"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            custom={i}
            className="flex flex-col items-center justify-center gap-2 p-8 text-center"
          >
            <span className="font-display text-3xl font-semibold text-gradient sm:text-4xl">
              {stat.value}
            </span>
            <span className="text-xs uppercase tracking-wider text-muted">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
