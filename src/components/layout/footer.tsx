"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { fadeUp, revealViewport } from "@/lib/animations";

export function Footer() {
    return (
        <footer className="relative mt-24 overflow-hidden border-t border-white/10">
            <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

            <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-20 lg:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={revealViewport}
                    variants={fadeUp}
                    className="flex flex-col items-start justify-between gap-10 border-b border-white/10 pb-14 lg:flex-row lg:items-end"
                >
                    <div className="max-w-lg">
                        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                            Join the community
                        </span>
                        <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.1] sm:text-5xl">
                            Built for servers that take roleplay seriously.
                        </h2>
                    </div>
                    <a
                        href={siteConfig.discord}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor-hover
                        className="group flex shrink-0 items-center gap-3 rounded-full bg-primary px-7 py-4 font-medium text-primary-foreground shadow-[0_0_30px_rgba(255,122,0,0.35)] transition-transform hover:-translate-y-1"
                    >
                        Join our Discord
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                </motion.div>

                <div className="grid grid-cols-2 gap-10 py-14 sm:grid-cols-4">
                    <div className="col-span-2 sm:col-span-1">
                        <Link
                            href="/"
                            className="flex items-center gap-2"
                            data-cursor-hover
                        >
                            <Image
                                src={siteConfig.logo}
                                alt={siteConfig.name}
                                width={32}
                                height={32}
                                className="h-8 w-auto"
                            />
                            <span className="font-display text-lg font-semibold">
                                {siteConfig.shortName}
                                <span className="text-primary">.</span>
                            </span>
                        </Link>
                        <p className="mt-4 max-w-[220px] text-sm leading-relaxed text-muted">
                            Premium FiveM assets crafted for high-fidelity
                            roleplay servers.
                        </p>
                        <div className="mt-4 flex items-center gap-1.5 text-xs text-muted">
                            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                            <span>All payments secured by</span>
                            <a
                                href="https://tebex.io"
                                target="_blank"
                                rel="noreferrer"
                                className="transition-opacity hover:opacity-100"
                            >
                                <Image
                                    src="/images/tebex_logo.svg"
                                    alt="Tebex"
                                    width={96}
                                    height={38}
                                    className="h-6 w-auto opacity-80"
                                />
                            </a>
                        </div>
                    </div>

                    {Object.entries(siteConfig.footerNav).map(
                        ([title, links]) => (
                            <div key={title}>
                                <h4 className="font-display text-sm font-semibold text-foreground/90">
                                    {title}
                                </h4>
                                <ul className="mt-4 space-y-3">
                                    {links.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                data-cursor-hover
                                                className="text-sm text-muted transition-colors hover:text-primary"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ),
                    )}
                </div>

                <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-muted sm:flex-row">
                    <p>
                        &copy; {new Date().getFullYear()} {siteConfig.name}. All
                        rights reserved.
                    </p>
                    <p>
                        Not affiliated with Rockstar Games or Take-Two
                        Interactive.
                    </p>
                </div>
            </div>
        </footer>
    );
}
