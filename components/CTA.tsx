"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
    return (
        <section className="py-20 md:py-32 bg-black flex items-center justify-center border-t border-white/10">
            <div className="container mx-auto px-4 sm:px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter mb-8 md:mb-12 leading-[1.1]"
                >
                    Let&apos;s get <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                        vucing ?
                    </span>
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <Link
                        href="/contact"
                        className="group inline-flex items-center gap-3 md:gap-4 px-8 md:px-12 py-4 md:py-6 bg-white text-black font-bold text-lg md:text-xl rounded-full hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4 min-h-[56px] md:min-h-[auto] shadow-[0_4px_14px_0_rgba(255,255,255,0.15)] hover:shadow-[0_6px_20px_0_rgba(255,255,255,0.25)]"
                    >
                        Start Your Project
                        <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1 group-active:translate-x-2" aria-hidden="true" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
