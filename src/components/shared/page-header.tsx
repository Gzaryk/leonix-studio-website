"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { AmbientBackground } from "./ambient-background";

export function PageHeader({
    eyebrow,
    title,
    description,
}: {
    eyebrow: string;
    title: string;
    description?: string;
}) {
    return (
        <section className="relative overflow-hidden px-6 pb-20 pt-40 text-center">
            <AmbientBackground className="opacity-70" />
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                    {eyebrow}
                </span>
                <h1 className="mx-auto mt-4 max-w-3xl font-display text-5xl font-semibold leading-[1.05] sm:text-6xl">
                    {title}
                </h1>
                {description && (
                    <p className="mx-auto mt-6 max-w-xl text-balance text-muted">
                        {description}
                    </p>
                )}
            </motion.div>
        </section>
    );
}
