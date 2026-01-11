"use client";

import { motion } from "framer-motion";

const audiences = [
    "Founders",
    "Early-Stage Startups",
    "Product Teams",
    "Engineering Leaders",
    "Growing Enterprises",
];

export default function WhoWeBuildFor() {
    return (
        <section className="py-20 border-y border-white/10 bg-black">
            <div className="container mx-auto px-6 text-center">
                <p className="text-sm text-gray-500 uppercase tracking-widest mb-12">
                    Who We Build For
                </p>

                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                    {audiences.map((item, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: index * 0.07 }}
                            className="text-xl md:text-2xl font-display font-semibold text-gray-500 hover:text-white transition-colors cursor-default"
                        >
                            {item}
                        </motion.span>
                    ))}
                </div>
            </div>
        </section>
    );
}

