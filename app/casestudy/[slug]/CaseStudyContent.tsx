"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CTA from "@/components/CTA";

interface CaseStudy {
    id: string;
    client: string;
    title: string;
    category: string;
    year: string;
    description: string;
    image: string;
    challenge: string;
    solution: string;
    results: string[];
    websiteUrl?: string;
    linkLabel?: string;
}

interface CaseStudyContentProps {
    caseStudy: CaseStudy;
}

export default function CaseStudyContent({ caseStudy }: CaseStudyContentProps) {
    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-40 pb-20 bg-black overflow-hidden">
                <div className="container mx-auto px-6">
                    {/* Back Button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm font-mono uppercase tracking-widest">Back to Home</span>
                        </Link>
                    </motion.div>

                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-sm font-mono text-gray-500 uppercase tracking-widest">
                                {caseStudy.category}
                            </span>
                            <span className="text-gray-600">•</span>
                            <span className="text-sm font-mono text-gray-500">
                                {caseStudy.year}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter">
                            {caseStudy.client}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
                            {caseStudy.title}
                        </p>

                        {caseStudy.websiteUrl && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <a
                                    href={caseStudy.websiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center mt-10 px-8 py-4 border border-white rounded-full hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium tracking-wide uppercase group"
                                >
                                    {caseStudy.linkLabel || "Visit Live Product"}
                                    <ArrowLeft className="ml-2 w-4 h-4 rotate-180 transition-transform group-hover:translate-x-1" />
                                </a>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Hero Image */}
            <section className="relative h-[60vh] bg-black">
                <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={caseStudy.image}
                        alt={caseStudy.title}
                        fill
                        className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
                </motion.div>
            </section>

            {/* Content */}
            <section className="py-32 bg-black">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* Challenge */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                                The Challenge
                            </h2>
                            <p className="text-xl text-gray-300 leading-relaxed">
                                {caseStudy.challenge}
                            </p>
                        </motion.div>

                        {/* Solution */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                                Our Solution
                            </h2>
                            <p className="text-xl text-gray-300 leading-relaxed">
                                {caseStudy.solution}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Results */}
            <section className="py-32 bg-black border-t border-white/10">
                <div className="container mx-auto px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-display font-bold mb-16"
                    >
                        Results
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {caseStudy.results.map((result, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="border-t border-white/20 pt-8"
                            >
                                <p className="text-3xl md:text-4xl font-display font-medium text-white leading-tight">
                                    {result}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <CTA />
        </>
    );
}
