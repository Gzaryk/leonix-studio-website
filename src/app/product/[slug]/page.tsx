import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
    getAllProducts,
    getProductBySlug,
    getRelatedProducts,
} from "@/lib/products";
import { ProductGallery } from "@/components/product/product-gallery";
import { BuyBox } from "@/components/product/buy-box";
import { ProductDetails } from "@/components/product/product-details";
import { RelatedProducts } from "@/components/product/related-products";
import { StickyProductHeader } from "@/components/product/sticky-product-header";
import { ScrollFade } from "@/components/product/scroll-fade";
import { AmbientBackground } from "@/components/shared/ambient-background";

const categoryLabels: Record<string, string> = {
    mlo: "MLOs",
    script: "Scripts",
    vehicle: "Vehicles",
    clothing: "Clothing",
    bundle: "Bundles",
};

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
    params,
}: ProductPageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) return { title: "Product Not Found" };

    return {
        title: product.name,
        description: product.tagline,
        openGraph: {
            title: product.name,
            description: product.tagline,
            images: [{ url: product.images[0] }],
        },
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) notFound();

    const related = getRelatedProducts(slug);
    const categoryLabel = categoryLabels[product.category] ?? product.category;

    return (
        <>
            <StickyProductHeader product={product} />
            <AmbientBackground />
            <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-32 lg:px-8">
                <ScrollFade>
                    <nav className="flex items-center gap-2 text-sm text-muted">
                        <Link
                            href="/shop"
                            className="transition-colors hover:text-primary"
                        >
                            Shop
                        </Link>
                        <span>/</span>
                        <Link
                            href={`/shop?category=${product.category}`}
                            className="transition-colors hover:text-primary"
                        >
                            {categoryLabel}
                        </Link>
                        <span>/</span>
                        <span className="text-foreground/60">
                            {product.name}
                        </span>
                    </nav>

                    <Link
                        href="/shop"
                        className="mt-4 mb-10 flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-primary"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Shop
                    </Link>
                </ScrollFade>

                <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
                    <ScrollFade>
                        <ProductGallery
                            images={product.images}
                            name={product.name}
                            youtubeUrl={product.youtubeUrl}
                        />
                    </ScrollFade>
                    <Suspense fallback={null}>
                        <BuyBox product={product} />
                    </Suspense>
                </div>

                <ProductDetails product={product} />

                <RelatedProducts products={related} />
            </div>
        </>
    );
}
