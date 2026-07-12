"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 400, mass: 0.4 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      setIsHovering(Boolean(target.closest("[data-cursor-hover]")));
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  if (isTouch) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      style={{ x, y, opacity: isVisible ? 1 : 0 }}
    >
      <motion.div
        animate={{
          width: isHovering ? 56 : 32,
          height: isHovering ? 56 : 32,
          backgroundColor: isHovering ? "rgba(255,122,0,0.15)" : "rgba(255,122,0,0)",
          borderColor: isHovering ? "rgba(255,122,0,0.9)" : "rgba(255,255,255,0.7)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="rounded-full border-[1.5px]"
      />
    </motion.div>
  );
}
