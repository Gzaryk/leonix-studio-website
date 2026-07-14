"use client";

import { motion } from "framer-motion";
import { Search, CreditCard, DownloadCloud, Rocket } from "lucide-react";
import { fadeUp, revealViewport, staggerContainer } from "@/lib/animations";

const steps = [
    {
        icon: Search,
        title: "Browse the collection",
        description:
            "Explore high-fidelity MLOs and scripts built specifically for serious roleplay servers.",
    },
    {
        icon: CreditCard,
        title: "Secure checkout",
        description:
            "Purchase safely through Tebex — the same trusted platform used by top FiveM stores.",
    },
    {
        icon: DownloadCloud,
        title: "Instant delivery",
        description:
            "Get immediate access to your files along with a full installation guide.",
    },
    {
        icon: Rocket,
        title: "Deploy & elevate",
        description:
            "Drop it into your server and give your community a location worth roleplaying in.",
    },
];

export function Process() {
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
                    How it works
                </span>
                <h2 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">
                    From browse to deploy in minutes.
                </h2>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={revealViewport}
                variants={staggerContainer}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
                {steps.map((step, i) => (
                    <motion.div
                        key={step.title}
                        variants={fadeUp}
                        custom={i}
                        className="glass group relative overflow-hidden rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40"
                    >
                        <span className="absolute right-6 top-6 font-display text-4xl font-bold text-white/5">
                            0{i + 1}
                        </span>
                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary transition-transform duration-500 group-hover:scale-110">
                            <step.icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-display text-lg font-semibold">
                            {step.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                            {step.description}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
