"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import { Code, Rocket, BrainCircuit, ArrowUpRight, Workflow, Layers, Server } from "lucide-react";

const services = [
    {
        icon: <Code className="w-5 h-5" />,
        title: "Web Engineering",
        slug: "web-engineering",
        description: "Next.js architecture with focus on performance and scalability.",
        tags: ["React", "TypeScript", "Node.js"],
    },
    {
        icon: <Rocket className="w-5 h-5" />,
        title: "MVP Sprint",
        slug: "mvp-sprint",
        description: "Rapid prototyping to validate market fit.",
        tags: ["Strategy", "Design", "Dev"],
    },
    {
        icon: <Server className="w-5 h-5" />,
        title: "Systems Architecture",
        slug: "systems-architecture",
        description: "Designing robust, scalable cloud infrastructure and backend systems.",
        tags: ["AWS", "Microservices", "Security"],
    },
    {
        icon: <Workflow className="w-5 h-5" />,
        title: "Automation Development",
        slug: "automation-development",
        description: "Streamlining operations with intelligent workflows.",
        tags: ["n8n", "Zapier", "Scripts"],
    },
    {
        icon: <BrainCircuit className="w-5 h-5" />,
        title: "AI Integration",
        slug: "ai-integration",
        description: "Custom LLM agents and automation workflows.",
        tags: ["OpenAI", "LangChain", "Python"],
    },
    {
        icon: <Layers className="w-5 h-5" />,
        title: "Custom Solutions",
        slug: "custom-solutions",
        description: "Tailored software built for unique business needs.",
        tags: ["SaaS", "Internal Tools", "Dashboards"],
    },
];

function SpotlightCard({ service, index }: { service: typeof services[0], index: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative h-full"
            onMouseMove={handleMouseMove}
        >
            <Link 
                href={`/services/${service.slug}`} 
                className="relative block h-full p-5 md:p-6 lg:p-8 overflow-hidden border border-white/10 bg-[#050505] transition-all duration-500 hover:border-white/20 hover:shadow-[0_8px_30px_rgba(255,255,255,0.05)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded-lg md:rounded-none active:scale-[0.98]"
            >
                {/* Spotlight Background */}
                <motion.div
                    className="pointer-events-none absolute -inset-px transition duration-300 opacity-0 group-hover:opacity-100 hidden md:block"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                650px circle at ${mouseX}px ${mouseY}px,
                                rgba(255,255,255,0.06),
                                transparent 80%
                            )
                        `,
                    }}
                />

                <div className="relative z-10 flex flex-col h-full">
                    <div className="absolute top-2 right-2 md:top-0 md:right-0 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-[-4px] group-hover:translate-y-[4px]">
                        <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-white/50" aria-hidden="true" />
                    </div>

                    <div className="mb-4 md:mb-6 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/[0.03] border border-white/10 text-white/70 group-hover:text-white group-hover:bg-white/[0.08] group-hover:border-white/20 transition-all duration-500">
                        {service.icon}
                    </div>

                    <h3 className="text-base md:text-lg lg:text-xl font-sans font-bold mb-2 md:mb-3 tracking-tight text-white/90 group-hover:text-white transition-colors">
                        {service.title}
                    </h3>

                    <p className="text-sm text-gray-500 mb-6 md:mb-8 leading-relaxed font-sans line-clamp-3 group-hover:text-gray-400 transition-colors">
                        {service.description}
                    </p>

                    <div className="mt-auto pt-3 md:pt-4 border-t border-white/[0.05]">
                        <div className="flex gap-1.5 md:gap-2 flex-wrap">
                            {service.tags.map((tag, i) => (
                                <span key={i} className="text-[9px] md:text-[10px] font-mono text-gray-600 border border-white/5 px-1.5 md:px-2 py-0.5 rounded-full uppercase tracking-wider bg-white/[0.02] group-hover:border-white/10 transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default function Services() {
    return (
        <section className="py-16 md:py-20 lg:py-32 bg-black relative z-10 overflow-hidden" aria-labelledby="services-heading">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto px-4 sm:px-6">
                <div className="mb-12 md:mb-16 lg:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <h2 id="services-heading" className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold mb-4 md:mb-6 tracking-tight">
                            Capabilities
                        </h2>

                        <p className="text-gray-500 font-sans text-base md:text-lg">
                            We deploy focused engineering squads to ship high-impact digital products.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
                    {services.map((service, index) => (
                        <SpotlightCard key={index} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
