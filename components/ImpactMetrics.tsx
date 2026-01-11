"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cache } from "@/lib/cache";
import config from "@/lib/config";

interface CurrencyData {
    code: string;
    symbol: string;
    rate: number;
    isLoaded: boolean;
}

const CACHE_KEY = 'vuce_currency_data';

export default function ImpactMetrics() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [currencyData, setCurrencyData] = useState<CurrencyData>({
        code: "USD",
        symbol: "$",
        rate: 1,
        isLoaded: false
    });

    useEffect(() => {
        const controller = new AbortController();

        const fetchCurrencyInfo = async () => {
            // Check cache first
            const cached = cache.get<CurrencyData>(CACHE_KEY);
            if (cached) {
                setCurrencyData(cached);
                return;
            }

            try {
                // 1. Get Country & Currency Code via IP (likely to fail on privacy-focused mobile browsers)
                const ipRes = await fetch(config.api.ipapi, { signal: controller.signal });
                const userCurrency = ipRes.ok ? (await ipRes.json()).currency || "USD" : "USD";

                // 2. Get Conversion Rate (USD to User Currency)
                // This API is less likely to be blocked, but we still handle failures
                const rateRes = await fetch(config.api.currency, { signal: controller.signal });
                const rateData = rateRes.ok ? await rateRes.json() : { rates: { USD: 1 } };
                const rate = rateData.rates[userCurrency] || 1;

                // 3. Get Currency Symbol
                const symbol = new Intl.NumberFormat(undefined, {
                    style: "currency",
                    currency: userCurrency,
                })
                    .formatToParts(0)
                    .find((part) => part.type === "currency")?.value || "$";

                const data: CurrencyData = {
                    code: userCurrency,
                    symbol: symbol,
                    rate: rate,
                    isLoaded: true
                };

                // Cache the result
                cache.set(CACHE_KEY, data);
                setCurrencyData(data);
            } catch (error) {
                if (error instanceof Error && error.name !== "AbortError") {
                    // Silently fail - currency detection is non-essential
                    // In production, log to error tracking service if needed
                    if (process.env.NODE_ENV === 'development') {
                        console.error("Currency detection skipped:", error.message);
                    }
                    setCurrencyData(prev => ({ ...prev, isLoaded: true }));
                }
            }
        };

        fetchCurrencyInfo();
        return () => controller.abort();
    }, []);

    const formatRevenue = (usdValue: number) => {
        if (!currencyData.isLoaded) return `$100k+`;

        const localValue = usdValue * currencyData.rate;
        const symbol = currencyData.symbol;

        // 1. Indian Numbering System (Lakh/Crore)
        if (currencyData.code === "INR") {
            if (localValue >= 10000000) { // 1 Crore = 10,000,000
                return `${symbol}${(localValue / 10000000).toFixed(1)}Cr+`;
            } else if (localValue >= 100000) { // 1 Lakh = 100,000
                return `${symbol}${Math.round(localValue / 100000)}L+`;
            } else if (localValue >= 1000) {
                return `${symbol}${Math.round(localValue / 1000)}K+`;
            }
            return `${symbol}${Math.round(localValue)}+`;
        }

        // 2. Standard International System (Million/Billion)
        if (localValue >= 1000000000) { // 1 Billion
            return `${symbol}${(localValue / 1000000000).toFixed(1)}B+`;
        } else if (localValue >= 1000000) { // 1 Million
            return `${symbol}${(localValue / 1000000).toFixed(1)}M+`;
        } else if (localValue >= 1000) { // 1 Thousand
            return `${symbol}${Math.round(localValue / 1000)}K+`;
        }

        return `${symbol}${Math.round(localValue)}+`;
    };

    const metrics = [
        {
            value: formatRevenue(100000),
            label: "Client Revenue Enabled",
            description: "Driving real business growth through digital excellence.",
        },
        {
            value: "10K",
            label: "Work Hours Saved",
            description: "Streamlining operations and automating complex workflows.",
        },
        {
            value: "50%",
            label: "Faster Time to Market",
            description: "Accelerated development cycles with our AI-first approach.",
        },
    ];

    return (
        <section id="impact-metrics" ref={ref} className="py-16 md:py-20 lg:py-32 bg-black border-t border-white/10 relative overflow-hidden" aria-labelledby="impact-heading">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-black to-black opacity-50 pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 md:mb-12 lg:mb-20"
                >
                    <h2 id="impact-heading" className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6">Impact by the Numbers</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto font-sans font-semibold text-xs md:text-[10px] uppercase tracking-[0.2em] opacity-80">
                        Quantifiable Results
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="text-center group"
                        >
                            <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-3 md:mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 group-hover:to-white transition-all duration-500 min-h-[80px] md:min-h-[120px] flex items-center justify-center">
                                {!currencyData.isLoaded && metric.value.includes('$') ? (
                                    <span className="inline-block w-32 h-16 md:h-20 bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-pulse rounded bg-[length:200%_100%] animate-shimmer" aria-hidden="true" />
                                ) : (
                                    metric.value
                                )}
                            </div>
                            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-white">{metric.label}</h3>
                            <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-xs mx-auto">
                                {metric.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
