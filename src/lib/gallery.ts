import type { GalleryImage } from "@/types";

export const galleryImages: GalleryImage[] = [
    {
        id: "g1",
        src: "/images/products/nova-heights/hero.jpg",
        alt: "Nova Heights Penthouse skyline view",
        category: "mlo",
        width: 1600,
        height: 1067,
    },
    {
        id: "g2",
        src: "/images/products/nova-heights/living.jpg",
        alt: "Nova Heights living room",
        category: "mlo",
        width: 1600,
        height: 1200,
    },
    {
        id: "g3",
        src: "/images/products/nova-heights/terrace.jpg",
        alt: "Nova Heights rooftop terrace",
        category: "mlo",
        width: 1600,
        height: 900,
    },
    {
        id: "g4",
        src: "/images/products/nova-heights/bar.jpg",
        alt: "Nova Heights private bar",
        category: "mlo",
        width: 1200,
        height: 1600,
    },
    {
        id: "g5",
        src: "/images/products/nova-heights/bedroom.jpg",
        alt: "Nova Heights master bedroom",
        category: "mlo",
        width: 1600,
        height: 1067,
    },
    {
        id: "g6",
        src: "/images/products/nova-heights/office.jpg",
        alt: "Nova Heights office study",
        category: "mlo",
        width: 1600,
        height: 1200,
    },
];

export function getGalleryCategories() {
    const categories = new Set(galleryImages.map((i) => i.category));
    return ["all", ...Array.from(categories)];
}
