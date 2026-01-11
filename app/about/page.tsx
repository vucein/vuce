"use client";

import { motion } from "framer-motion";
import CTA from "@/components/CTA";

export default function AboutPage() {
    return (
        <>
            <section className="pt-32 pb-20 bg-black">
                <div className="container mx-auto px-6 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-8xl font-display font-bold mb-8 uppercase tracking-tighter"
                    >
                        About Vuce
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light"
                    >
                        We are a collective of designers, engineers, and strategists dedicated to building the future of the web.
                        Founded on the belief that great software should be both beautiful and powerful.
                    </motion.p>
                </div>
            </section>

            <section className="py-20 bg-black">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-10 uppercase tracking-tighter">Our Philosophy</h2>
                            <div className="space-y-8 text-lg md:text-xl text-zinc-400 font-light leading-relaxed">
                                <p>
                                    At Vuce, we believe in the power of minimalism. We strip away the unnecessary to focus on what truly matters:
                                    the user experience. Our designs are clean, intuitive, and focused on conversion.
                                </p>
                                <p>
                                    But beauty is nothing without performance. We obsess over every line of code, ensuring that our installations
                                    are lightning-fast, accessible, and scalable. We use the latest technologies to build products that stand the test of time.
                                </p>
                                <p>
                                    We are not just a service provider; we are your partner. We work closely with you to understand your business
                                    goals and translate them into digital reality.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-32 bg-black border-t border-white/5">
                <div className="container mx-auto px-6 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-display font-bold mb-16 uppercase tracking-tighter"
                    >
                        The Team
                    </motion.h2>

                    <div className="flex justify-center">
                        {[
                            {
                                name: "Vedant Chalke",
                                role: "Founder",
                                image: "/vedant.png"
                            }
                        ].map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className="group text-center"
                            >
                                <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-8 rounded-full overflow-hidden border border-white/10 bg-zinc-900 transition-all duration-700">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-display font-bold mb-2 text-white">{member.name}</h3>
                                <p className="text-zinc-500 text-xs md:text-sm uppercase tracking-[0.3em]">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <CTA />
        </>
    );
}
