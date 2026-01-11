"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Cpu, Layout, Target, LifeBuoy } from "lucide-react";

const features = [
    { icon: <Zap />, title: "Fast Delivery", description: "Rapid iteration cycles to get you to market faster." },
    { icon: <Shield />, title: "Clean Engineering", description: "Scalable, maintainable, and robust codebases." },
    { icon: <Cpu />, title: "AI-First Workflow", description: "Leveraging AI for efficiency and innovation." },
    { icon: <Layout />, title: "Modern UI", description: "Award-winning aesthetics and user experiences." },
    { icon: <Target />, title: "Strategic Thinking", description: "We build with your business goals in mind." },
    { icon: <LifeBuoy />, title: "Long-term Support", description: "We're here for the long haul to help you scale." },
];

export default function WhyVuce() {
    return (
        <section className="py-16 md:py-24 lg:py-32 bg-black border-t border-white/10" aria-labelledby="why-vuce-heading">
            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-10 md:mb-16 lg:mb-20"
                >
                    <h2 id="why-vuce-heading" className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6">Why Vuce?</h2>
                    <p className="text-base md:text-lg text-gray-400 max-w-2xl">
                        We combine technical expertise with creative vision to deliver exceptional results.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-black p-6 md:p-8 lg:p-10 hover:bg-white/5 transition-colors duration-300"
                        >
                            <div className="mb-4 md:mb-6 text-white w-8 h-8 md:w-10 md:h-10">{feature.icon}</div>
                            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-white">{feature.title}</h3>
                            <p className="text-sm md:text-base text-gray-400 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
