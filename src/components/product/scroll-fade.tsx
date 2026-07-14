"use client";

import { motion } from "framer-motion";
import { fadeUp, revealViewport } from "@/lib/animations";

export function ScrollFade({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            variants={fadeUp}
            className={className}
        >
            {children}
        </motion.div>
    );
}
