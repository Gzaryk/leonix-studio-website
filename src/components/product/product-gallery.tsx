"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Expand, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

function getYouTubeEmbed(url: string) {
    const match = url.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/,
    );
    return match
        ? `https://www.youtube-nocookie.com/embed/${match[1]}?rel=0`
        : undefined;
}

function itemCount(images: string[], youtubeUrl?: string) {
    return images.length + (youtubeUrl ? 1 : 0);
}

function isYouTube(index: number, youtubeUrl?: string) {
    return youtubeUrl !== undefined && index === 0;
}

function imageIndex(index: number, youtubeUrl?: string) {
    return youtubeUrl ? index - 1 : index;
}

export function ProductGallery({
    images,
    name,
    youtubeUrl,
}: {
    images: string[];
    name: string;
    youtubeUrl?: string;
}) {
    const [active, setActive] = useState(youtubeUrl ? -1 : 0);
    const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
    const total = itemCount(images, youtubeUrl);

    const previewIsYT = active === -1 && youtubeUrl;

    function handleThumbClick(index: number) {
        setActive(index);
        setFullscreenIndex(index);
    }

    return (
        <div className="flex flex-col gap-4">
            <Dialog
                open={fullscreenIndex !== null}
                onOpenChange={(open) => !open && setFullscreenIndex(null)}
            >
                <DialogTrigger asChild>
                    <button
                        className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl"
                        data-cursor-hover
                        onClick={() =>
                            setFullscreenIndex(active === -1 ? 0 : active)
                        }
                    >
                        {previewIsYT ? (
                            <div className="relative h-full w-full bg-black">
                                <iframe
                                    src={getYouTubeEmbed(youtubeUrl!)}
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    className="absolute inset-0 h-full w-full"
                                />
                            </div>
                        ) : (
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, scale: 1.02 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                className="relative h-full w-full"
                            >
                                <Image
                                    src={images[active]}
                                    alt={`${name} — view ${active + 1}`}
                                    fill
                                    priority
                                    sizes="(min-width: 1024px) 50vw, 100vw"
                                    className="object-cover"
                                />
                            </motion.div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                            <Expand className="h-4 w-4" />
                        </div>
                    </button>
                </DialogTrigger>
                {fullscreenIndex !== null && (
                    <DialogContent className="border-none bg-transparent p-0">
                        <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
                            {isYouTube(fullscreenIndex, youtubeUrl) ? (
                                <iframe
                                    src={getYouTubeEmbed(youtubeUrl!)}
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    className="absolute inset-0 h-full w-full"
                                />
                            ) : (
                                <Image
                                    src={
                                        images[
                                            imageIndex(
                                                fullscreenIndex,
                                                youtubeUrl,
                                            )
                                        ]
                                    }
                                    alt={`${name} — fullscreen view`}
                                    fill
                                    sizes="90vw"
                                    className="object-contain"
                                />
                            )}
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <button
                                data-cursor-hover
                                onClick={() =>
                                    setFullscreenIndex((i) =>
                                        i !== null
                                            ? (i - 1 + total) % total
                                            : 0,
                                    )
                                }
                                className="glass flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:text-primary"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <p className="text-sm text-muted">
                                {fullscreenIndex + 1} / {total}
                            </p>
                            <button
                                data-cursor-hover
                                onClick={() =>
                                    setFullscreenIndex((i) =>
                                        i !== null ? (i + 1) % total : 0,
                                    )
                                }
                                className="glass flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:text-primary"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </DialogContent>
                )}
            </Dialog>

            <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
                {youtubeUrl && (
                    <button
                        onClick={() => handleThumbClick(0)}
                        data-cursor-hover
                        className={cn(
                            "relative aspect-square overflow-hidden rounded-xl border transition-all",
                            fullscreenIndex === 0
                                ? "border-primary opacity-100"
                                : "border-white/10 bg-primary/20 opacity-60 hover:opacity-100 hover:border-primary",
                        )}
                    >
                        <div className="flex h-full w-full items-center justify-center">
                            <Play className="h-6 w-6 text-primary" />
                        </div>
                    </button>
                )}
                {images.map((img, i) => {
                    const idx = youtubeUrl ? i + 1 : i;
                    return (
                        <button
                            key={img}
                            onClick={() => handleThumbClick(idx)}
                            data-cursor-hover
                            className={cn(
                                "relative aspect-square overflow-hidden rounded-xl border transition-all",
                                fullscreenIndex === idx
                                    ? "border-primary opacity-100"
                                    : "border-white/10 opacity-60 hover:opacity-100",
                            )}
                        >
                            <Image
                                src={img}
                                alt={`${name} thumbnail ${i + 1}`}
                                fill
                                sizes="120px"
                                className="object-cover"
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
