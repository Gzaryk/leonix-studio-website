import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { ShopGrid } from "@/components/shop/shop-grid";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
    title: "Shop",
    description:
        "Browse Leonix Studio's collection of premium, high-fidelity FiveM MLOs and scripts built for serious roleplay servers.",
};

export default function ShopPage() {
    const products = getAllProducts();

    return (
        <>
            <PageHeader
                eyebrow="Shop"
                title="Premium assets, built for immersion."
                description="Every release is fully custom, optimized, and backed by lifetime updates. This is only the beginning."
            />
            <section className="mx-auto max-w-7xl px-6 pb-20 pt-20 lg:px-8">
                <Suspense fallback={null}>
                    <ShopGrid products={products} />
                </Suspense>
            </section>
        </>
    );
}
