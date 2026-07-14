"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    Check,
    Loader2,
    ShieldCheck,
    ShoppingCart,
    Star,
    Sparkles,
    ArrowUpRight,
    Box,
    Code,
    Car,
    Shirt,
    Package,
} from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CHECKOUT_MESSAGES: Record<
    string,
    { type: "error" | "info"; message: string }
> = {
    unavailable: {
        type: "error",
        message:
            "Checkout isn't live yet — Tebex isn't configured for this product.",
    },
    error: {
        type: "error",
        message: "Something went wrong starting checkout. Please try again.",
    },
    cancelled: {
        type: "info",
        message: "Checkout was cancelled.",
    },
};

export function BuyBox({ product }: { product: Product }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const { addItem, isInCart, hydrated } = useCart();

    useEffect(() => {
        const status = searchParams.get("checkout");
        if (!status) return;

        const entry = CHECKOUT_MESSAGES[status];
        if (entry) {
            if (entry.type === "error") toast.error(entry.message);
            else toast.info(entry.message);
        }

        // Strip the query param so the message doesn't reappear on refresh.
        router.replace(`/product/${product.slug}`, { scroll: false });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    function handleBuy() {
        if (!product.tebexPackageId) {
            toast.error(
                "Checkout isn't live yet — this product isn't linked to Tebex.",
            );
            return;
        }
        setLoading(true);
        // Full browser navigation (not fetch): this route creates the basket,
        // then redirects the browser to Tebex's login page if the store
        // requires it, or straight to checkout if it doesn't.
        window.location.href = `/api/tebex/checkout/start?slug=${encodeURIComponent(product.slug)}`;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong mx-auto w-full max-w-lg rounded-3xl p-8 lg:mx-0 lg:max-w-none lg:sticky lg:top-28"
        >
            <div className="mb-4 flex items-center gap-2">
                {product.featured && (
                    <Badge variant="solid">
                        <Star className="h-3 w-3" /> Featured
                    </Badge>
                )}
                {product.new && (
                    <Badge variant="glass">
                        <Sparkles className="h-3 w-3" /> New
                    </Badge>
                )}
                <Badge variant="glass">
                    <CategoryIcon category={product.category} />
                    {product.category.toUpperCase()}
                </Badge>
            </div>

            <h1 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
                {product.name}
            </h1>

            {product.rating && (
                <div className="mt-3 flex items-center gap-1.5 text-sm text-secondary">
                    <Star className="h-4 w-4 fill-secondary" />
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-muted">
                        ({product.reviewCount} reviews)
                    </span>
                </div>
            )}

            <p className="mt-4 text-sm leading-relaxed text-muted">
                {product.tagline}
            </p>

            <div className="mt-8 flex items-baseline gap-3">
                <span className="font-display text-4xl font-semibold">
                    {formatPrice(product.price, product.currency)}
                </span>
                {product.compareAtPrice && (
                    <span className="text-muted line-through">
                        {formatPrice(product.compareAtPrice, product.currency)}
                    </span>
                )}
            </div>
            <span className="text-xs text-muted">
                One-time purchase &middot; Instant delivery
            </span>

            <div className="mt-6 flex flex-col gap-2">
                <Button
                    disabled={hydrated && isInCart(product.id)}
                    onClick={() => {
                        addItem(product);
                        toast.success(`${product.name} added to cart`);
                    }}
                    size="lg"
                    className="w-full"
                >
                    <ShoppingCart className="h-4 w-4" />{" "}
                    {hydrated && isInCart(product.id)
                        ? "Already in Cart"
                        : "Add to Cart"}
                </Button>
                <Button
                    onClick={handleBuy}
                    disabled={loading}
                    variant="secondary"
                    size="sm"
                    className="w-full"
                >
                    {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <>
                            Buy Now <ArrowUpRight className="h-3.5 w-3.5" />
                        </>
                    )}
                </Button>
            </div>

            <div className="mt-6 flex items-center gap-1.5 text-xs text-muted">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                <span>Secure checkout powered by</span>
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
                        className="h-5 w-auto opacity-80"
                    />
                </a>
            </div>

            <ul className="mt-8 space-y-3 border-t border-white/10 pt-6">
                {product.features.map((feature) => (
                    <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-foreground/85"
                    >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {feature}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}

const categoryIcons: Record<string, React.ReactNode> = {
    mlo: <Box className="h-3 w-3" />,
    script: <Code className="h-3 w-3" />,
    vehicle: <Car className="h-3 w-3" />,
    clothing: <Shirt className="h-3 w-3" />,
    bundle: <Package className="h-3 w-3" />,
};

function CategoryIcon({ category }: { category: string }) {
    return categoryIcons[category] ?? null;
}
