"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "How long does an MVP development usually take?",
        answer: "Our typical MVP timeline is 4-8 weeks. We focus on core features that provide immediate value to your users, allowing you to launch and iterate quickly.",
    },
    {
        question: "What is your pricing structure?",
        answer: "Every project is unique. We provide custom quotes based on your specific requirements, timeline, and technical complexity. Contact us for a strategic consultation and a detailed estimate.",
    },
    {
        question: "Do you provide post-launch support?",
        answer: "Absolutely. We offer comprehensive maintenance packages to ensure your product remains secure, up-to-date, and scalable as your user base grows.",
    },
    {
        question: "How do you handle IP and ownership?",
        answer: "You own 100% of the code and intellectual property upon final payment. We work as your technical partner, not just a vendor.",
    },
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="py-20 md:py-32 bg-black border-t border-white/10" aria-labelledby="faq-heading">
            <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 md:mb-20"
                >
                    <h2 id="faq-heading" className="text-3xl md:text-5xl font-display font-bold mb-6">Common Questions</h2>
                    <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">
                        Clarity & Transparency
                    </p>
                </motion.div>

                <div className="space-y-3 md:space-y-4" role="list">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="border border-white/10 bg-white/[0.02] overflow-hidden rounded-lg md:rounded-none"
                            role="listitem"
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                aria-expanded={activeIndex === index}
                                aria-controls={`faq-answer-${index}`}
                                id={`faq-question-${index}`}
                                className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[60px] md:min-h-[auto]"
                            >
                                <span className="text-base md:text-lg font-bold pr-4 md:pr-8">{faq.question}</span>
                                <span className="shrink-0 text-white/50" aria-hidden="true">
                                    {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                                </span>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        id={`faq-answer-${index}`}
                                        role="region"
                                        aria-labelledby={`faq-question-${index}`}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-4 md:px-6 pb-4 md:pb-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
