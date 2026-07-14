"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    ChevronLeft,
    ChevronRight,
    Grid3x3,
    Box,
    Code,
    Car,
    Shirt,
    Package,
} from "lucide-react";
import type { GalleryImage } from "@/types";
import { cn } from "@/lib/utils";
import { fadeIn } from "@/lib/animations";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const categoryIcons: Record<string, React.ReactNode> = {
    all: <Grid3x3 className="h-3.5 w-3.5" />,
    mlo: <Box className="h-3.5 w-3.5" />,
    script: <Code className="h-3.5 w-3.5" />,
    vehicle: <Car className="h-3.5 w-3.5" />,
    clothing: <Shirt className="h-3.5 w-3.5" />,
    bundle: <Package className="h-3.5 w-3.5" />,
};

const categoryLabels: Record<string, string> = {
    all: "All",
    mlo: "MLOs",
    script: "Scripts",
    vehicle: "Vehicles",
    clothing: "Clothing",
    bundle: "Bundles",
};

export function MasonryGallery({
    images,
    categories,
}: {
    images: GalleryImage[];
    categories: string[];
}) {
    const [filter, setFilter] = useState("all");
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const filtered = useMemo(
        () =>
            filter === "all"
                ? images
                : images.filter((i) => i.category === filter),
        [images, filter],
    );

    return (
        <div>
            <div className="mb-10 flex flex-wrap justify-center gap-2">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        data-cursor-hover
                        className={cn(
                            "flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all",
                            filter === cat
                                ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(255,122,0,0.4)]"
                                : "glass text-muted hover:text-foreground",
                        )}
                    >
                        {categoryIcons[cat]}
                        {categoryLabels[cat] ?? cat}
                    </button>
                ))}
            </div>

            <Dialog
                open={activeIndex !== null}
                onOpenChange={(open) => !open && setActiveIndex(null)}
            >
                <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
                    {filtered.map((image, i) => (
                        <motion.button
                            key={image.id}
                            variants={fadeIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={i}
                            onClick={() => setActiveIndex(i)}
                            data-cursor-hover
                            className="group relative block w-full overflow-hidden rounded-2xl"
                            style={{
                                aspectRatio: `${image.width} / ${image.height}`,
                            }}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        </motion.button>
                    ))}
                </div>

                {activeIndex !== null && (
                    <DialogContent className="border-none bg-transparent p-0 shadow-none">
                        <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
                            <Image
                                src={filtered[activeIndex].src}
                                alt={filtered[activeIndex].alt}
                                fill
                                sizes="90vw"
                                className="object-contain"
                            />
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <button
                                data-cursor-hover
                                onClick={() =>
                                    setActiveIndex((i) =>
                                        i !== null
                                            ? (i - 1 + filtered.length) %
                                              filtered.length
                                            : 0,
                                    )
                                }
                                className="glass flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:text-primary"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <p className="text-sm text-muted">
                                {filtered[activeIndex].alt}
                            </p>
                            <button
                                data-cursor-hover
                                onClick={() =>
                                    setActiveIndex((i) =>
                                        i !== null
                                            ? (i + 1) % filtered.length
                                            : 0,
                                    )
                                }
                                className="glass flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:text-primary"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </DialogContent>
                )}
                <DialogTrigger className="hidden" />
            </Dialog>
        </div>
    );
}
