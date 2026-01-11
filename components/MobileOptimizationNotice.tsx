"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Monitor } from "lucide-react";

export default function MobileOptimizationNotice() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if device is mobile (width < 768px)
        const checkMobile = () => {
            if (window.innerWidth < 768) {
                // Check if user has already dismissed it this session
                const hasDismissed = sessionStorage.getItem("vuce_mobile_notice_dismissed");
                if (!hasDismissed) {
                    setIsVisible(true);
                }
            }
        };

        // Initial check
        checkMobile();

        // Optional: Listen for resize, though usually not needed for mobile load
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const dismiss = () => {
        setIsVisible(false);
        sessionStorage.setItem("vuce_mobile_notice_dismissed", "true");
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-6 left-6 right-6 z-[100] md:hidden"
                >
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#050505]/90 p-5 shadow-2xl backdrop-blur-xl">
                        {/* Ambient Glow */}
                        <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-[50px]" />

                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white">
                                <Monitor className="w-5 h-5" />
                            </div>

                            <div className="flex-1 pt-0.5">
                                <h3 className="text-sm font-bold text-white mb-1">
                                    Desktop Recommended
                                </h3>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    For the full experience, we recommend viewing Vuce on a desktop display.
                                </p>
                            </div>

                            <button
                                onClick={dismiss}
                                className="flex-shrink-0 text-gray-500 hover:text-white transition-colors p-1"
                                aria-label="Dismiss"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
