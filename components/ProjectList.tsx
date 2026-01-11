"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    year: string;
    tags: string[];
    featured: boolean;
}

const projects: Project[] = [
    {
        id: "vuce-domain-acquisition",
        title: "Vuce.in",
        category: "Brand Strategy",
        description: "How We Acquired Vuce.in for Rs.89k as a strategic brand asset.",
        image: "/logo.png",
        year: "2025",
        tags: ["Brand Identity", "Domain Strategy", "Digital Assets"],
        featured: false,
    },
    {
        id: "tiger-assets",
        title: "Tiger Assets",
        category: "Financial Services",
        description: "Institutional-grade investment platform defining the digital standard for trust in Indian PMS.",
        image: "/tiger-assets-preview.png",
        year: "2025",
        tags: ["PMS", "SEBI Compliance", "Institutional UX"],
        featured: false,
    },
    {
        id: "shree-balaji-padmavati-foundation",
        title: "Shree Balaji Foundation",
        category: "Business Automation",
        description: "End-to-end offline-to-cloud transformation with custom ERP and delivery automation.",
        image: "/shree-balaji-preview.png",
        year: "2025",
        tags: ["ERP", "Automation", "CRM"],
        featured: true,
    },
    {
        id: "pinnacleplus",
        title: "PinnaclePlus",
        category: "Enterprise SaaS",
        description: "Geo-aware pricing engine and AI content pipeline scaling high-velocity business growth.",
        image: "/pinnacle-plus-case-study.png",
        year: "2025",
        tags: ["AI SaaS", "Geo-Pricing", "Automation"],
        featured: true,
    },
];

const featuredProjects = projects.filter(p => p.featured);
const otherProjects = projects.filter(p => !p.featured);

export default function ProjectList() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <section className="py-20 bg-black">
            <div className="container mx-auto px-6">
                {/* Featured Projects - Bento Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {featuredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                        >
                            <Link
                                href={`/casestudy/${project.id}`}
                                className="group block relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/5 border border-white/10"
                                onMouseEnter={() => setHoveredId(project.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {/* Image */}
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                                {/* Content */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                                    {/* Top - Category & Year */}
                                    <div className="flex justify-between items-start">
                                        <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/80">
                                            {project.category}
                                        </span>
                                        <span className="text-sm text-white/50 font-mono">{project.year}</span>
                                    </div>

                                    {/* Bottom - Title & CTA */}
                                    <div>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tags.map((tag: string) => (
                                                <span key={tag} className="text-xs text-white/50 font-mono">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 group-hover:translate-x-2 transition-transform">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-400 mb-4 max-w-md">{project.description}</p>
                                        <div className="inline-flex items-center gap-2 text-white font-medium">
                                            <span>View Case Study</span>
                                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Border Effect */}
                                <motion.div
                                    className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover:border-white/20 transition-colors pointer-events-none"
                                />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Other Projects - Smaller Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {otherProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link
                                href={`/casestudy/${project.id}`}
                                className="group block relative aspect-[3/4] overflow-hidden rounded-xl bg-white/5 border border-white/10"
                                onMouseEnter={() => setHoveredId(project.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {/* Image */}
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                                {/* Content */}
                                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                                    <span className="text-xs text-white/50 font-mono mb-2">{project.category}</span>
                                    <h3 className="text-xl font-display font-bold text-white mb-1 group-hover:translate-x-1 transition-transform">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 line-clamp-2">{project.description}</p>

                                    {/* Arrow */}
                                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/0 group-hover:bg-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                                        <ArrowUpRight className="w-4 h-4 text-black" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* View All Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <Link
                        href="/work"
                        className="inline-flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                    >
                        <span className="text-lg">Explore all projects</span>
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
