"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

export function CartIcon({ onClick }: { onClick: () => void }) {
    const { itemCount } = useCart();

    return (
        <button
            onClick={onClick}
            data-cursor-hover
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:text-foreground"
            aria-label={`Cart (${itemCount} items)`}
        >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
                <span
                    className={cn(
                        "absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground",
                        itemCount > 9 && "h-5 min-w-5 text-[9px]",
                    )}
                >
                    {itemCount > 99 ? "99+" : itemCount}
                </span>
            )}
        </button>
    );
}
