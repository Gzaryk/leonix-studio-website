"use client";

import { useEffect } from "react";

export function useLockBodyScroll(locked: boolean) {
    useEffect(() => {
        if (!locked) return;
        const origOverflow = document.body.style.overflow;
        const origPosition = document.body.style.position;
        const origWidth = document.body.style.width;
        const origTop = document.body.style.top;
        const scrollY = window.scrollY;

        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.position = origPosition;
            document.body.style.top = origTop;
            document.body.style.width = origWidth;
            document.body.style.overflow = origOverflow;
            window.scrollTo(0, scrollY);
        };
    }, [locked]);
}
