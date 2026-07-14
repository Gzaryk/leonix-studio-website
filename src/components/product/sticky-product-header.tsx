"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowUpRight, ChevronUp, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";

export function StickyProductHeader({ product }: { product: Product }) {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const { addItem, isInCart, hydrated } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 400);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    function handleBuy() {
        if (!product.tebexPackageId) {
            toast.error(
                "Checkout isn't live yet — this product isn't linked to Tebex.",
            );
            return;
        }
        setLoading(true);
        window.location.href = `/api/tebex/checkout/start?slug=${encodeURIComponent(product.slug)}`;
    }

    return (
        <motion.div
            initial={{ y: -64 }}
            animate={{ y: visible ? 0 : -64 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl"
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <button
                        onClick={scrollToTop}
                        className="flex h-8 w-8 items-center justify-center rounded-full glass text-muted transition-colors hover:text-foreground"
                    >
                        <ChevronUp className="h-4 w-4" />
                    </button>
                    <div>
                        <p className="font-display text-sm font-semibold leading-tight">
                            {product.name}
                        </p>
                        <p className="text-xs text-muted">
                            {formatPrice(product.price, product.currency)}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        variant="secondary"
                        className="h-9"
                        disabled={hydrated && isInCart(product.id)}
                        onClick={() => {
                            addItem(product);
                            toast.success(`${product.name} added to cart`);
                        }}
                    >
                        <ShoppingCart className="h-3.5 w-3.5" />
                        {hydrated && isInCart(product.id) ? "Added" : "Cart"}
                    </Button>
                    <Button
                        size="sm"
                        className="h-9"
                        onClick={handleBuy}
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                            <>
                                Buy Now <ArrowUpRight className="h-3 w-3" />
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
