"use client";

import { motion } from "framer-motion";
import { Cpu, Palette, HeadphonesIcon, ShieldCheck } from "lucide-react";
import { fadeUp, revealViewport, staggerContainer } from "@/lib/animations";

const reasons = [
    {
        icon: Cpu,
        title: "Performance First",
        description:
            "Every asset is optimized for FPS and stability — no bloated files, just smooth roleplay.",
    },
    {
        icon: Palette,
        title: "Original Designs",
        description:
            "All models are built from scratch. No retextures, no recycled assets — fully unique work.",
    },
    {
        icon: HeadphonesIcon,
        title: "Dedicated Support",
        description:
            "Get help fast with installation, troubleshooting, and custom requests through our Discord.",
    },
    {
        icon: ShieldCheck,
        title: "Trusted Delivery",
        description:
            "Secure checkout via Tebex with instant delivery and lifetime access to your purchases.",
    },
];

export function Stats() {
    return (
        <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={revealViewport}
                variants={fadeUp}
                className="mb-16 text-center"
            >
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                    Why choose us
                </span>
                <h2 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">
                    Built for servers that demand more.
                </h2>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={revealViewport}
                variants={staggerContainer}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
                {reasons.map((reason, i) => (
                    <motion.div
                        key={reason.title}
                        variants={fadeUp}
                        custom={i}
                        className="glass group relative overflow-hidden rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40"
                    >
                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary transition-transform duration-500 group-hover:scale-110">
                            <reason.icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-display text-lg font-semibold">
                            {reason.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                            {reason.description}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
