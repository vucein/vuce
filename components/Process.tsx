"use client";

import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { Telescope, Lightbulb, Wrench, BarChart3, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const processSteps = [
    {
        id: "01",
        title: "Discovery",
        description: "Together, we dive into your world. A brainstorming session where your challenges meet our creative thinking.",
        icon: <Telescope className="w-6 h-6" />,
        details: [
            "We analyze your current infrastructure and pinpoint bottlenecks.",
            "We map out your business goals and key performance indicators.",
            "We identify the highest-impact areas for automation and AI integration."
        ]
    },
    {
        id: "02",
        title: "Analysis",
        description: "We map out the terrain. Detailed blueprints and architectural plans to ensure a robust foundation.",
        icon: <Lightbulb className="w-6 h-6" />,
        details: [
            "We create detailed technical specifications and user flows.",
            "We select the optimal tech stack for your specific needs.",
            "We design a scalable architecture that grows with your business."
        ]
    },
    {
        id: "03",
        title: "Execution",
        description: "We build the engine. Agile development sprints with continuous feedback loops to ensure alignment.",
        icon: <Wrench className="w-6 h-6" />,
        details: [
            "We develop your solution using best-in-class coding standards.",
            "We implement rigorous testing protocols to ensure reliability.",
            "We conduct regular demos to keep you involved in the process."
        ]
    },
    {
        id: "04",
        title: "Scale",
        description: "We ignite the boosters. Launch, monitor, and optimize for sustained growth and peak performance.",
        icon: <BarChart3 className="w-6 h-6" />,
        details: [
            "We deploy your solution to production with zero downtime.",
            "We monitor performance and optimize for maximum efficiency.",
            "We provide ongoing support and feature enhancements."
        ]
    }
];

const ProcessCard = ({
    step,
    index,
    progress,
    range,
    targetScale,
    isMobile
}: {
    step: typeof processSteps[0];
    index: number;
    progress: MotionValue<number>;
    range: number[];
    targetScale: number;
    isMobile: boolean;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start start"],
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);



    // Spotlight Effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div ref={containerRef} className="h-[80vh] md:h-screen flex items-start justify-center sticky top-0 pt-8 md:pt-16">
            <motion.div
                style={{
                    scale,
                    top: `calc(${index * 25}px)`,
                }}
                className="relative flex flex-col w-full max-w-[1000px] h-[450px] md:h-[500px] bg-[#0A0A0A] border border-white/10 rounded-none overflow-hidden p-6 md:p-12 transform-gpu origin-top"
                onMouseMove={handleMouseMove}
            >
                {/* Spotlight Background */}
                <motion.div
                    className="pointer-events-none absolute -inset-px transition duration-300 opacity-0 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                650px circle at ${mouseX}px ${mouseY}px,
                                rgba(255,255,255,0.03),
                                transparent 80%
                            )
                        `,
                    }}
                />

                <div className="grid grid-cols-1 md:grid-cols-5 h-full relative z-10 gap-8">
                    {/* Left Column: ID and Title */}
                    <div className="md:col-span-2 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-12">
                        <div>
                            <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 border border-white/10 bg-white/5 text-[10px] md:text-xs font-mono text-gray-400 mb-4 md:mb-6 backdrop-blur-sm">
                                (Step {step.id})
                            </span>
                            <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tighter text-white">
                                {step.title}
                            </h2>
                        </div>

                        {/* Desktop Icon position */}
                        <div className="hidden md:flex items-center justify-center w-16 h-16 bg-white/5 border border-white/10 text-white">
                            {step.icon}
                        </div>
                    </div>

                    {/* Right Column: Description and Details */}
                    <div className="md:col-span-3 flex flex-col justify-between pl-0 md:pl-4">
                        <div className="flex md:hidden items-center justify-between mb-4">
                            <div className="flex items-center justify-center w-12 h-12 bg-white/5 border border-white/10 text-white">
                                {step.icon}
                            </div>
                        </div>

                        <div>
                            <p className="text-lg md:text-2xl text-gray-300 font-sans font-medium leading-relaxed mb-4 md:mb-6">
                                {step.description}
                            </p>
                        </div>

                        {/* Expanded Details - Desktop Only */}
                        <div className="mt-auto hidden md:block">
                            <ul className="space-y-3 pb-6 border-t border-white/10 pt-6">
                                {step.details.map((detail, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-gray-400 font-sans">
                                        <span className="w-1.5 h-1.5 bg-white/40 mt-1.5 md:mt-2 shrink-0" />
                                        <span className="text-xs md:text-base leading-relaxed">{detail}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default function Process() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

    return (
        <section className="bg-black relative py-[20px]" ref={containerRef}>
            <div className="container mx-auto px-6 mb-5">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-7xl font-sans font-bold tracking-tighter text-white mb-4 md:mb-6">
                        How We Work.
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl font-sans font-light">
                        A systematic approach to building engineered chaos.
                    </p>
                </motion.div>
            </div>

            <div className="relative container mx-auto px-6 pb-5">
                {processSteps.map((step, i) => {
                    // Calculate stacking scale
                    const targetScale = 1 - ((processSteps.length - i) * 0.05);
                    return (
                        <ProcessCard
                            key={i}
                            index={i}
                            step={step}
                            progress={scrollYProgress}
                            range={[i * 0.25, 1]}
                            targetScale={targetScale}
                            isMobile={isMobile}
                        />
                    );
                })}
            </div>
        </section>
    );
}
