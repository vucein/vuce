"use client";

import { motion } from "framer-motion";
import VuceLeadEngine from "@/components/VuceLeadEngine";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-black pt-28 md:pt-40 pb-20 px-6 relative overflow-hidden">
            {/* Background elements to match UI vibe */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.03)_0%,_transparent_50%)] pointer-events-none" />

            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Reversed on mobile: Form on top, Copy below */}
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-16 lg:gap-32 items-start">

                    {/* Strategic Copy (Order 2 on mobile, Left on desktop) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-12 lg:space-y-16"
                    >
                        <div className="space-y-6 lg:space-y-8">
                            <h1 className="text-5xl md:text-8xl font-display font-bold text-white tracking-tighter leading-[0.9] flex flex-col">
                                <span>Engineering</span>
                                <span className="text-zinc-600">The Future.</span>
                            </h1>
                            <p className="text-lg md:text-2xl text-zinc-400 font-light leading-relaxed max-w-lg">
                                We solve high-stakes engineering problems for ambitious teams. Whether it's 0-to-1 building or enterprise-scale optimization, we are your strategic partner.
                            </p>
                        </div>

                        <div className="space-y-10 lg:space-y-12">
                            <div className="space-y-6">
                                <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">Our Expertise</h3>
                                <ul className="space-y-4">
                                    {[
                                        "Custom ERP & Internal Systems",
                                        "AI & Automation Pipelines",
                                        "High-Performance Web Platforms",
                                        "Strategic Architectural Audits"
                                    ].map((item) => (
                                        <li key={item} className="text-zinc-200 text-base md:text-lg flex items-center gap-4 group">
                                            <span className="w-1.5 h-1.5 bg-zinc-700 group-hover:bg-white transition-colors duration-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-10 lg:pt-12 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
                                <div className="space-y-2">
                                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">General Inquiry</h4>
                                    <a href="mailto:hello@vuce.in" className="text-white hover:text-zinc-400 transition-colors text-lg md:text-xl font-display leading-none">hello@vuce.in</a>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Partnerships</h4>
                                    <a href="mailto:partnerships@vuce.in" className="text-white hover:text-zinc-400 transition-colors text-lg md:text-xl font-display leading-none">partnerships@vuce.in</a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Lead Engine Form (Order 1 on mobile, Right on desktop) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full lg:sticky lg:top-40 mb-10 lg:mb-0"
                    >
                        <div className="relative group">
                            {/* Accent Glow */}
                            <div className="absolute -inset-0.5 bg-gradient-to-b from-white/10 to-transparent rounded-[1.5rem] md:rounded-[2.1rem] blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                            <VuceLeadEngine className="!max-w-none !bg-[#050505] !border-white/5 !p-6 md:!p-16 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)]" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
