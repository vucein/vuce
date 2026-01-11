"use client";

import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function StickyCTA() {
    const { scrollY } = useScroll();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        return scrollY.on("change", (latest) => {
            if (latest > 800) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        });
    }, [scrollY]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50"
                >
                    <Link
                        href="/contact"
                        className="flex items-center gap-2 md:gap-3 bg-white text-black px-4 md:px-6 py-3 md:py-3.5 rounded-full font-bold text-sm md:text-base shadow-[0_4px_14px_0_rgba(255,255,255,0.2)] hover:shadow-[0_6px_20px_0_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[48px] md:min-h-[auto]"
                        aria-label="Start your project"
                    >
                        <span className="hidden sm:inline">Start Project</span>
                        <span className="sm:hidden">Start</span>
                        <ArrowRight className="w-4 h-4 md:w-4 md:h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
