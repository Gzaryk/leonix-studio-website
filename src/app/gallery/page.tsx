import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { MasonryGallery } from "@/components/gallery/masonry-gallery";
import { galleryImages, getGalleryCategories } from "@/lib/gallery";

export const metadata: Metadata = {
    title: "Gallery",
    description:
        "A closer look at the interiors, lighting, and detail behind every Leonix Studio release.",
};

export default function GalleryPage() {
    return (
        <>
            <PageHeader
                eyebrow="Gallery"
                title="Every detail, up close."
                description="A closer look at the craftsmanship behind each Leonix Studio release."
            />
            <section className="mx-auto max-w-7xl px-6 pb-20 pt-20 lg:px-8">
                <MasonryGallery
                    images={galleryImages}
                    categories={getGalleryCategories()}
                />
            </section>
        </>
    );
}
