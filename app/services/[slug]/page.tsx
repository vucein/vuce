"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Zap, BarChart3, Globe, Code, BrainCircuit, Rocket, Workflow, Layers, Server } from "lucide-react";
import Link from "next/link";
import CTA from "@/components/CTA";

// Service Data Definition
const servicesData: Record<string, {
    title: string;
    description: string;
    icon: any;
    longDescription: string;
    features: string[];
    process: { title: string; description: string }[];
    benefits: string[];
}> = {
    "web-engineering": {
        title: "Web Engineering",
        description: "Next.js architecture with focus on performance and scalability.",
        icon: Code,
        longDescription: "We build high-performance, SEO-optimized web applications using cutting-edge technologies. Our engineering-first approach ensures your digital assets are scalable, secure, and lightning-fast.",
        features: ["Next.js App Router Architecture", "Server-Side Rendering (SSR) & Static Generation", "Headless CMS Integration", "Advanced Performance Optimization"],
        process: [
            { title: "Architecture Design", description: "Planning scalable system architecture." },
            { title: "Component Development", description: "Building reusable, accessible UI components." },
            { title: "Integration", description: "Connecting APIs and backend services." },
            { title: "Optimization", description: "Fine-tuning Core Web Vitals." }
        ],
        benefits: ["Lightning Fast Load Times", "SEO Dominance", "Scalable Infrastructure", "Pixel-Perfect UI"]
    },
    "systems-architecture": {
        title: "Systems Architecture",
        description: "Designing robust, scalable cloud infrastructure and backend systems.",
        icon: Server,
        longDescription: "We architect the backbone of high-traffic digital systems. From database optimization to cloud infrastructure strategy, we ensure your platform can handle growth without compromise.",
        features: ["Cloud Infrastructure (AWS/GCP)", "Microservices Orchestration", "Database Performance Tuning", "Security & Compliance Audits"],
        process: [
            { title: "Capacity Planning", description: "Evaluating load and throughput requirements." },
            { title: "Service Mapping", description: "Designing independent, resilient modules." },
            { title: "Scalability Setup", description: "Implementing auto-scaling and caching." },
            { title: "Disaster Recovery", description: "Ensuring 99.9% availability." }
        ],
        benefits: ["Infinite Scalability", "Hardened Security", "Lower Infrastructure Costs", "High Availability"]
    },
    "mvp-sprint": {
        title: "MVP Sprint",
        description: "Rapid prototyping to validate market fit.",
        icon: Rocket,
        longDescription: "Turn your idea into a working product in weeks, not months. Our MVP Sprint is designed for startups and visionaries who need to validate their market hypothesis quickly without sacrificing quality.",
        features: [" rapid Prototyping", "Core Feature Implementation", "User-Centric Design", "Analytics Setup"],
        process: [
            { title: "Scope Definition", description: "Identifying core value proposition." },
            { title: "Rapid One-Week Sprint", description: "Intense development cycle." },
            { title: "Launch & Iterate", description: "Deploying to early adopters." },
            { title: "Feedback Loop", description: "Gathering insights for V2." }
        ],
        benefits: ["Fastest Time to Market", "Cost-Effective Validation", "Investor-Ready Product", "Agile Iteration"]
    },
    "automation-development": {
        title: "Automation Development",
        description: "Streamlining operations with intelligent workflows.",
        icon: Workflow,
        longDescription: "Eliminate repetitive tasks and reduce human error. We maintain complex business logic into automated workflows using n8n, Zapier, and custom scripts, freeing your team to focus on high-value work.",
        features: ["Workflow Analysis & Mapping", "n8n & Zapier Integration", "Custom Scripting (Python/Node.js)", "API Connectors"],
        process: [
            { title: "Audit", description: "Analyzing current manual workflows." },
            { title: "Strategy", description: "Designing the automation architecture." },
            { title: "Implementation", description: "Building and testing workflows." },
            { title: "Monitoring", description: "Ensuring reliability and uptime." }
        ],
        benefits: ["Reduced Operational Costs", "Eliminated Human Error", "24/7 Productivity", "Scalable Operations"]
    },
    "custom-solutions": {
        title: "Custom Solutions",
        description: "Tailored software built for unique business needs.",
        icon: Layers,
        longDescription: "Off-the-shelf software often falls short. We build bespoke software solutions tailored exactly to your unique business requirements, from internal dashboards to complex SaaS platforms.",
        features: ["Bespoke SaaS Development", "Internal Tooling & Dashboards", "Legacy System Modernization", "Cloud Infrastructure"],
        process: [
            { title: "Requirements Gathering", description: "Deep dive into business needs." },
            { title: "Solution Design", description: "Architecting the custom system." },
            { title: "Agile Development", description: "Iterative build process." },
            { title: "Deployment & Training", description: "Launch and team onboarding." }
        ],
        benefits: ["Perfect Fit for Business", "Owned IP", "Competitive Advantage", "Total Control"]
    },
    "ai-integration": {
        title: "AI Integration",
        description: "Custom LLM agents and automation workflows.",
        icon: BrainCircuit,
        longDescription: "Leverage the power of Artificial Intelligence. We integrate Large Language Models (LLMs) and build custom AI agents that can chat with your data, automate support, and generate insights.",
        features: ["Custom LLM Agents", "RAG (Retrieval-Augmented Generation)", "OpenAI & Anthropic Integration", "AI-Powered Analytics"],
        process: [
            { title: "Data Preparation", description: "Cleaning and structuring data." },
            { title: "Model Selection", description: "Choosing the right AI mode." },
            { title: "Integration", description: "Building the AI interface." },
            { title: "Fine-Tuning", description: "Optimizing responses." }
        ],
        benefits: ["Automated Customer Support", "Data-Driven Insights", "Enhanced User Experience", "Future-Proofing"]
    }
};

export default function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const service = servicesData[slug];

    if (!service) {
        notFound();
    }

    const Icon = service.icon;

    return (
        <div className="bg-black min-h-screen text-white pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-5xl">
                <Link href="/services" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/10">
                        <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">{service.title}</h1>
                    <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl mb-12">
                        {service.longDescription}
                    </p>
                </motion.div>

                <div className="h-px bg-white/10 w-full my-16" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Features */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-3xl font-display font-bold mb-8">Key Features</h2>
                        <ul className="space-y-4">
                            {service.features.map((feature, i) => (
                                <li key={i} className="flex items-start">
                                    <CheckCircle2 className="w-6 h-6 text-white mr-4 shrink-0" />
                                    <span className="text-lg text-gray-300">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Benefits */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/5 border border-white/10 rounded-3xl p-8"
                    >
                        <h2 className="text-2xl font-display font-bold mb-6">Why Choose This?</h2>
                        <div className="space-y-6">
                            {service.benefits.map((benefit, i) => (
                                <div key={i} className="flex items-center">
                                    <Zap className="w-5 h-5 text-yellow-400 mr-4" />
                                    <span className="text-white font-medium">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="h-px bg-white/10 w-full my-16" />

                {/* Process */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-display font-bold mb-12 text-center">How We Execute</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {service.process.map((step, i) => (
                            <div key={i} className="relative p-6 border border-white/10 rounded-2xl bg-white/[0.02]">
                                <span className="absolute -top-3 -left-3 w-8 h-8 bg-white text-black font-bold flex items-center justify-center rounded-full text-sm">
                                    {i + 1}
                                </span>
                                <h3 className="text-xl font-bold mb-2 mt-2">{step.title}</h3>
                                <p className="text-sm text-gray-400">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
            <CTA />
        </div>
    );
}
