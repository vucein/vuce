"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
    useEffect(() => {
        // Respect user's motion preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            return; // Skip smooth scroll if user prefers reduced motion
        }

        // Dynamically import Lenis to avoid SSR issues
        // Using any type for dynamic import since Lenis types may not be available
        let lenis: any = null;
        let rafId: number;

        const initSmoothScroll = async () => {
            try {
                const Lenis = (await import("lenis")).default;

                lenis = new Lenis({
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    orientation: "vertical",
                    gestureOrientation: "vertical",
                    smoothWheel: true,
                    wheelMultiplier: 1,
                    touchMultiplier: 2,
                    infinite: false,
                });

                function raf(time: number) {
                    lenis.raf(time);
                    rafId = requestAnimationFrame(raf);
                }

                rafId = requestAnimationFrame(raf);
            } catch (error) {
                // Silently fail - smooth scroll is non-essential
                // In production, log to error tracking service if needed
                if (process.env.NODE_ENV === 'development') {
                    console.error("Smooth scroll initialization failed:", error);
                }
            }
        };

        initSmoothScroll();

        return () => {
            if (lenis) {
                lenis.destroy();
            }
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
        };
    }, []);

    return null;
}
