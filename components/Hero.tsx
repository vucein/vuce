"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { EtheralShadow } from "./ui/etheral-shadow";
import { ShinyButton } from "./ui/shiny-button";
import { ArrowRight, Video } from "lucide-react";

export default function Hero() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#030303] text-white">
            <EtheralShadow
                className="absolute inset-0 w-full h-full"
                color="rgba(128, 128, 128, 1)"
                animation={{ scale: 100, speed: 90 }}
                noise={{ opacity: 1, scale: 1.2 }}
                sizing="fill"
            >
                <div className="container mx-auto px-4 sm:px-6 z-10 relative">
                    <motion.div
                        style={{ y, opacity }}
                        className="flex flex-col items-center text-center max-w-5xl mx-auto"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.05] font-sans font-bold tracking-tighter mb-4 md:mb-6 lg:mb-8 selection:bg-white/20 px-4"
                        >
                            Build Your MVP. <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
                                Not a Prototype.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-400 max-w-[340px] sm:max-w-lg md:max-w-2xl lg:max-w-3xl mb-6 md:mb-10 lg:mb-12 leading-relaxed font-sans font-light tracking-wide mx-auto px-4"
                        >
                            We engineer scalable, production-ready systems for founders who don't have time to rebuild twice. From zero to launch in 4 weeks.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Link href="/contact" className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4 rounded-full inline-block">
                                <ShinyButton className="w-auto min-w-[200px] sm:min-w-64 text-white">
                                    <span className="flex items-center justify-center gap-2 font-semibold text-sm sm:text-base">
                                        Share Your Requirements
                                    </span>
                                </ShinyButton>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

            </EtheralShadow>
        </section>
    );
}
