"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// This component wraps the children and animates them on route change
// Note: Next.js App Router page transitions are tricky.
// We'll use a simpler "curtain" effect that triggers on pathname change.

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence>
            <motion.div
                key={pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                {children}
            </motion.div>

            {/* Curtain Effect */}
            <motion.div
                key={pathname + "-curtain-top"}
                className="fixed inset-0 bg-black z-[9999] pointer-events-none"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ originY: 0 }}
            />
            <motion.div
                key={pathname + "-curtain-bottom"}
                className="fixed inset-0 bg-black z-[9999] pointer-events-none"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ originY: 1 }}
            />
        </AnimatePresence>
    );
}
