"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <button
            className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl"
            data-cursor-hover
          >
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="h-full w-full"
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
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
              <Expand className="h-4 w-4" />
            </div>
          </button>
        </DialogTrigger>
        <DialogContent className="border-none bg-transparent p-0">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
            <Image
              src={images[active]}
              alt={`${name} — fullscreen view`}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
        {images.map((img, i) => (
          <button
            key={img}
            onClick={() => setActive(i)}
            data-cursor-hover
            className={cn(
              "relative aspect-square overflow-hidden rounded-xl border transition-all",
              active === i
                ? "border-primary opacity-100"
                : "border-white/10 opacity-60 hover:opacity-100"
            )}
          >
            <Image src={img} alt={`${name} thumbnail ${i + 1}`} fill sizes="120px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
