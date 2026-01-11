"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export default function BookingWidget() {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ namespace: "ready-to-scale-your-vision" });
            cal("ui", {
                hideEventTypeDetails: false,
                layout: "month_view",
            });
        })();
    }, []);

    return (
        <section className="py-24 md:py-40 bg-black relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-white/[0.02] to-black" />

            {/* Subtle glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm p-8 md:p-12 lg:p-16">
                    {/* Horizontal Layout */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-16">
                        {/* Left Side - Content */}
                        <div className="flex-1 text-center lg:text-left">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-sm text-gray-300">Free 30-min Strategy Session</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 leading-tight">
                                Ready to scale your vision?
                            </h2>
                            <p className="text-gray-400 text-base md:text-lg mb-8 leading-relaxed max-w-xl lg:max-w-none">
                                Book a free strategy session with our engineering team. We&apos;ll discuss your technical challenges and outline a roadmap for success.
                            </p>

                            {/* Features - Horizontal row */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3">
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <Calendar className="w-4 h-4 text-white/70" />
                                    <span>Technical Audit</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <Clock className="w-4 h-4 text-white/70" />
                                    <span>Timeline & Budget</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                    </svg>
                                    <span>Roadmap</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                    </svg>
                                    <span>Priority Support</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - CTA */}
                        <div className="flex flex-col items-center lg:items-end shrink-0">
                            <button
                                data-cal-link="vuce-media-o7smjp/ready-to-scale-your-vision"
                                data-cal-namespace="ready-to-scale-your-vision"
                                data-cal-config='{"layout":"month_view"}'
                                className="inline-flex items-center justify-center gap-3 bg-white text-black font-bold py-4 px-10 rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 cursor-pointer text-lg group"
                            >
                                <span>Schedule Consultation</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <p className="text-gray-500 text-sm mt-4">No commitment required</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
