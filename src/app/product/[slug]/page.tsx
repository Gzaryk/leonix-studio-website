import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/lib/products";
import { ProductGallery } from "@/components/product/product-gallery";
import { BuyBox } from "@/components/product/buy-box";
import { ProductDetails } from "@/components/product/product-details";
import { RelatedProducts } from "@/components/product/related-products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
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

  return (
    <div className="mx-auto max-w-7xl px-6 pb-32 pt-32 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <ProductGallery images={product.images} name={product.name} />
        <Suspense fallback={null}>
          <BuyBox product={product} />
        </Suspense>
      </div>

      <ProductDetails product={product} />
      <RelatedProducts products={related} />
    </div>
  );
}
