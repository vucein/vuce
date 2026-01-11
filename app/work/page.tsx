"use client";

import { motion } from "framer-motion";
import ProjectList from "@/components/ProjectList";
import BookingWidget from "@/components/BookingWidget";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export default function WorkPage() {
    return (
        <>
            <section className="pt-40 pb-20 bg-black">
                <div className="container mx-auto px-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-9xl font-display font-bold mb-8 tracking-tighter"
                    >
                        WORK
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-12"
                    >
                        <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
                            A curated selection of digital products, platforms, and experiences engineered for impact.
                        </p>
                        <div className="mt-8 md:mt-0 text-right">
                            <p className="font-mono text-sm text-gray-500 uppercase tracking-widest">
                                Selected Cases <br /> 2023 — 2025
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <ProjectList />

            <BookingWidget />

            <FAQ />

            <CTA />
        </>
    );
}
