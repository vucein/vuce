"use client";

import { motion } from "framer-motion";

export default function Marquee() {
    return (
        <section className="py-8 md:py-10 border-y border-white/10 bg-black overflow-hidden" aria-hidden="true">
            <motion.div
                className="flex whitespace-nowrap gap-12 md:gap-16"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            >
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex gap-12 md:gap-16 items-center">
                        <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5">
                            TRUSTED BY INDUSTRY LEADERS
                        </span>
                        <span className="w-2 h-2 md:w-3 md:h-3 bg-white/20 rounded-full" aria-hidden="true" />
                        <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5">
                            SCALABLE ARCHITECTURE
                        </span>
                        <span className="w-2 h-2 md:w-3 md:h-3 bg-white/20 rounded-full" aria-hidden="true" />
                        <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5">
                            REVENUE-DRIVEN DESIGN
                        </span>
                        <span className="w-2 h-2 md:w-3 md:h-3 bg-white/20 rounded-full" aria-hidden="true" />
                        <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5">
                            ENTERPRISE GRADE SECURITY
                        </span>
                        <span className="w-2 h-2 md:w-3 md:h-3 bg-white/20 rounded-full" aria-hidden="true" />
                    </div>
                ))}
            </motion.div>
        </section>
    );
}
