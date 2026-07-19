"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Trash2,
    ShoppingBag,
    ShieldCheck,
    ArrowUpRight,
    Loader2,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function CartDrawer({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    const [checkingOut, setCheckingOut] = useState(false);
    const { items, itemCount, total, removeItem, clearCart } = useCart();
    const scrollbarRef = useRef(0);

    useEffect(() => {
        if (open) {
            scrollbarRef.current =
                window.innerWidth - document.documentElement.clientWidth;
            document.body.style.paddingRight = `${scrollbarRef.current}px`;
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.style.paddingRight = "";
            document.documentElement.style.overflow = "";
        }
    }, [open]);

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{
                            type: "spring",
                            damping: 30,
                            stiffness: 300,
                        }}
                        className="fixed inset-y-0 right-0 z-[95] flex w-full max-w-md flex-col border-l border-white/10 bg-background shadow-2xl"
                    >
                        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                            <h2 className="font-display text-lg font-semibold">
                                Cart{" "}
                                {itemCount > 0 && (
                                    <span className="text-muted">
                                        ({itemCount})
                                    </span>
                                )}
                            </h2>
                            <button
                                onClick={onClose}
                                data-cursor-hover
                                className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:text-foreground"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {items.length === 0 ? (
                            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                                <ShoppingBag className="h-12 w-12 text-muted/50" />
                                <div>
                                    <h3 className="font-display text-base font-semibold">
                                        Your cart is empty
                                    </h3>
                                    <p className="mt-1 text-sm text-muted">
                                        Add some products to get started.
                                    </p>
                                </div>
                                <Button asChild size="sm" onClick={onClose}>
                                    <Link href="/shop">Browse Shop</Link>
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="flex-1 overflow-y-auto px-6 py-4">
                                    <ul className="space-y-4">
                                        {items.map((item) => (
                                            <li
                                                key={item.product.id}
                                                className="glass flex gap-4 rounded-2xl p-3"
                                            >
                                                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                                                    <Image
                                                        src={
                                                            item.product
                                                                .images[0]
                                                        }
                                                        alt={item.product.name}
                                                        fill
                                                        sizes="80px"
                                                        className="object-cover"
                                                    />
                                                </div>

                                                <div className="flex min-w-0 flex-1 flex-col justify-between">
                                                    <div className="flex justify-between gap-2">
                                                        <Link
                                                            href={`/product/${item.product.slug}`}
                                                            onClick={onClose}
                                                            className="truncate text-sm font-medium hover:text-primary"
                                                        >
                                                            {item.product.name}
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                removeItem(
                                                                    item.product
                                                                        .id,
                                                                )
                                                            }
                                                            data-cursor-hover
                                                            className="shrink-0 text-muted transition-colors hover:text-red-400"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>

                                                    <span className="text-sm font-semibold">
                                                        {formatPrice(
                                                            item.product.price,
                                                            item.product
                                                                .currency,
                                                        )}
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="border-t border-white/10 px-6 py-5">
                                    <div className="mb-1 flex items-center justify-between text-sm">
                                        <span className="text-muted">
                                            Subtotal
                                        </span>
                                        <span className="font-semibold">
                                            {formatPrice(total, "EUR")}
                                        </span>
                                    </div>
                                    <p className="mb-4 text-xs text-muted">
                                        Taxes and fees calculated at checkout.
                                    </p>

                                    <div className="flex gap-3">
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={clearCart}
                                            className="flex-1"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />{" "}
                                            Clear
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="flex-1"
                                            disabled={checkingOut}
                                            onClick={() => {
                                                setCheckingOut(true);
                                                const params =
                                                    new URLSearchParams({
                                                        items: JSON.stringify(
                                                            items.map((i) => ({
                                                                slug: i.product
                                                                    .slug,
                                                                quantity:
                                                                    i.quantity,
                                                            })),
                                                        ),
                                                    });
                                                window.location.href = `/api/tebex/checkout/cart?${params}`;
                                            }}
                                        >
                                            {checkingOut ? (
                                                <>
                                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                    Redirecting...
                                                </>
                                            ) : (
                                                <>
                                                    Checkout{" "}
                                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                    <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted">
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
                                                width={64}
                                                height={26}
                                                className="h-4 w-auto opacity-80"
                                            />
                                        </a>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
