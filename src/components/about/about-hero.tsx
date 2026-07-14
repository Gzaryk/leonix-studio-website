"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { AmbientBackground } from "@/components/shared/ambient-background";
import { siteConfig } from "@/config/site";

export function AboutHero() {
    return (
        <section className="relative overflow-hidden px-6 pb-20 pt-40 text-center">
            <AmbientBackground className="opacity-70" />
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="mx-auto flex max-w-3xl flex-col items-center"
            >
                <Image
                    src={siteConfig.logo}
                    alt={siteConfig.name}
                    width={120}
                    height={120}
                    className="h-24 w-auto"
                    priority
                />
                <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] sm:text-6xl">
                    {siteConfig.name}
                </h1>
                <p className="mt-4 max-w-xl text-balance text-muted">
                    {siteConfig.description}
                </p>
            </motion.div>
        </section>
    );
}
