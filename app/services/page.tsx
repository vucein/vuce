"use client";

import { motion } from "framer-motion";
import { Code, Rocket, BrainCircuit, Workflow, Layers, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import CTA from "@/components/CTA";

const services = [
    {
        icon: <Code className="w-12 h-12" />,
        title: "Web Engineering",
        slug: "web-engineering",
        description: "Next.js architecture with focus on performance and scalability.",
        features: ["React", "TypeScript", "Node.js"],
    },
    {
        icon: <Rocket className="w-12 h-12" />,
        title: "MVP Sprint",
        slug: "mvp-sprint",
        description: "Rapid prototyping to validate market fit.",
        features: ["Strategy", "Design", "Dev"],
    },
    {
        icon: <Workflow className="w-12 h-12" />,
        title: "Automation Development",
        slug: "automation-development",
        description: "Streamlining operations with intelligent workflows.",
        features: ["n8n", "Zapier", "Scripts"],
    },
    {
        icon: <Layers className="w-12 h-12" />,
        title: "Custom Solutions",
        slug: "custom-solutions",
        description: "Tailored software built for unique business needs.",
        features: ["SaaS", "Internal Tools", "Dashboards"],
    },
    {
        icon: <BrainCircuit className="w-12 h-12" />,
        title: "AI Integration",
        slug: "ai-integration",
        description: "Custom LLM agents and automation workflows.",
        features: ["OpenAI", "LangChain", "Python"],
    },
];

export default function ServicesPage() {
    return (
        <>
            <section className="pt-32 pb-20 bg-black min-h-screen">
                <div className="container mx-auto px-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-display font-bold mb-8 text-white"
                    >
                        Our Services
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl mb-24"
                    >
                        Comprehensive digital solutions tailored to your business needs.
                        We combine design, engineering, and strategy to deliver exceptional results.
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <Link href={`/services/${service.slug}`} key={index} className="block h-full">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="group h-full p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 rounded relative overflow-hidden"
                                >
                                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <ArrowUpRight className="w-6 h-6 text-white" />
                                    </div>

                                    <div className="mb-8 p-4 bg-black border border-white/10 inline-flex rounded group-hover:scale-110 transition-transform duration-300 text-white">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-2xl font-display font-bold mb-4 text-white">{service.title}</h3>
                                    <p className="text-gray-400 mb-8 leading-relaxed">
                                        {service.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {service.features.map((feature, i) => (
                                            <span key={i} className="text-xs font-mono text-gray-500 border border-white/10 px-2 py-1 uppercase tracking-wider rounded-full">
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            <CTA />
        </>
    );
}
