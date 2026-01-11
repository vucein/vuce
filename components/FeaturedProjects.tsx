"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const projects = [
    {
        id: "01",
        title: "Vuce.in",
        category: "Brand Strategy",
        image: "/logo.png",
        year: "2025",
        color: "#1a1a1a",
        slug: "vuce-domain-acquisition",
    },
    {
        id: "02",
        title: "Tiger Assets",
        category: "Financial Services",
        image: "/tiger-assets-preview.png",
        year: "Ongoing (2025)",
        color: "#1a1a1a",
        slug: "tiger-assets",
    },
    {
        id: "03",
        title: "Foundation ERP",
        category: "Business Automation",
        image: "/shree-balaji-preview.png",
        year: "2025",
        color: "#1a1a1a",
        slug: "shree-balaji-padmavati-foundation",
    },
    {
        id: "04",
        title: "PinnaclePlus",
        category: "Enterprise SaaS",
        image: "/pinnacle-plus-case-study.png",
        year: "2025",
        color: "#1a1a1a",
        slug: "pinnacleplus",
    },
];

interface CardProps {
    i: number;
    project: typeof projects[0];
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
}

function Card({ i, project, progress, range, targetScale }: CardProps) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "start start"],
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
            <motion.div
                style={{
                    scale,
                    backgroundColor: project.color,
                    top: `calc(-5vh + ${i * 25}px)`,
                }}
                className="flex flex-col relative -top-[25%] h-[500px] w-[1000px] rounded-3xl border border-white/10 p-12 origin-top shadow-2xl"
            >
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-4xl font-display font-bold text-center">{project.title}</h2>
                    <span className="font-mono text-sm text-gray-400">{project.category}</span>
                </div>

                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    <motion.div style={{ scale: imageScale }} className="w-full h-full">
                        <Image
                            fill
                            src={project.image}
                            alt={project.title}
                            className="object-cover"
                        />
                    </motion.div>
                </div>

                <div className="mt-8 flex justify-between items-center">
                    <span className="font-mono text-xs text-gray-500">/{project.id}</span>
                    <Link href={project.slug ? `/casestudy/${project.slug}` : "/work"} className="text-sm font-bold border-b border-white pb-1 hover:opacity-70 transition-opacity">
                        View Case Study
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

export default function FeaturedProjects() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });

    return (
        <section ref={container} className="relative bg-black border-t border-white/10">
            <div className="container mx-auto px-6 pt-32 pb-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">Selected Work</h2>
                    <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">
                        {/* Featured Projects */}
                    </p>
                </motion.div>
            </div>

            <div className="relative pb-32">
                {projects.map((project, i) => {
                    const targetScale = 1 - (projects.length - i) * 0.05;
                    return (
                        <Card
                            key={i}
                            i={i}
                            project={project}
                            progress={scrollYProgress}
                            range={[i * 0.25, 1]}
                            targetScale={targetScale}
                        />
                    );
                })}
            </div>
        </section>
    );
}
