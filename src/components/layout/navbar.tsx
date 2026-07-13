"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { CartIcon } from "@/components/cart/cart-icon";
import { CartDrawer } from "@/components/cart/cart-drawer";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => setOpen(false), [pathname]);
    useLockBodyScroll(open);

    return (
        <>
            <header
                className={cn(
                    "fixed inset-x-0 top-0 z-[80] transition-all duration-500",
                    scrolled ? "py-3" : "py-6",
                )}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div
                        className={cn(
                            "flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500",
                            scrolled ? "glass-strong" : "bg-transparent",
                        )}
                    >
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
                            <span className="font-display text-lg font-semibold tracking-tight">
                                {siteConfig.shortName}
                                <span className="text-primary">.</span>
                            </span>
                        </Link>

                        <nav className="hidden items-center gap-1 md:flex">
                            {siteConfig.nav.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    data-cursor-hover
                                    className={cn(
                                        "relative rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground",
                                        pathname === item.href &&
                                            "text-foreground",
                                    )}
                                >
                                    {item.label}
                                    {pathname === item.href && (
                                        <motion.span
                                            layoutId="nav-pill"
                                            className="absolute inset-0 -z-10 rounded-full bg-white/8"
                                            transition={{
                                                type: "spring",
                                                stiffness: 350,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                </Link>
                            ))}
                        </nav>

                        <div className="hidden items-center gap-1 md:flex">
                            <CartIcon onClick={() => setCartOpen(true)} />
                            <Button asChild size="sm" variant="secondary">
                                <a
                                    href={siteConfig.discord}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Discord{" "}
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                </a>
                            </Button>
                            <Button asChild size="sm">
                                <Link href="/shop">Shop Now</Link>
                            </Button>
                        </div>

                        <div className="flex items-center gap-1 md:hidden">
                            <CartIcon onClick={() => setCartOpen(true)} />
                            <button
                                className="flex h-10 w-10 items-center justify-center rounded-full text-foreground"
                                onClick={() => setOpen((v) => !v)}
                                aria-label="Toggle menu"
                                data-cursor-hover
                            >
                            {open ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </button>
                        </div>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[75] bg-background/95 backdrop-blur-xl md:hidden"
                    >
                        <motion.nav
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="flex h-full flex-col items-center justify-center gap-8 px-6"
                        >
                            {siteConfig.nav.map((item, i) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.15 + i * 0.06 }}
                                >
                                    <Link
                                        href={item.href}
                                        className="font-display text-3xl font-medium text-foreground/90 transition-colors hover:text-primary"
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <div className="mt-6 flex flex-col gap-4">
                                <Button asChild variant="secondary">
                                    <a
                                        href={siteConfig.discord}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Join Discord
                                    </a>
                                </Button>
                                <Button asChild>
                                    <Link href="/shop">Shop Now</Link>
                                </Button>
                            </div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>

            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    );
}
