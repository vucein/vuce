"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Work", href: "/work" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false); // Keeps track of >100px generally
    const [isVisible, setIsVisible] = useState(true);
    const [isPill, setIsPill] = useState(false); // Controls the shape
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isImpactVisible, setIsImpactVisible] = useState(false); // Track if Impact section is in view

    useEffect(() => {
        // Intersection Observer to detect "Impact by Numbers" section
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsImpactVisible(entry.isIntersecting);
            },
            { threshold: 0.1 } // Trigger when 10% of the section is visible
        );

        const impactSection = document.getElementById("impact-metrics");
        if (impactSection) {
            observer.observe(impactSection);
        }

        return () => {
            if (impactSection) observer.unobserve(impactSection);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const heroHeight = window.innerHeight;

            // 1. Determine Shape (Pill vs Full)
            // Strict rule: No pill inside Hero section
            if (currentScrollY > heroHeight - 100) {
                setIsPill(true);
            } else {
                setIsPill(false);
            }

            // 2. Determine Visibility
            const isAtTop = currentScrollY < 50; // "Approaching top screen"
            const isInHero = currentScrollY < heroHeight - 100;

            if (isAtTop) {
                // Always show Main Navbar at the very top
                setIsVisible(true);
            } else if (isInHero) {
                // HIDE in the middle of Hero section (User request: "only appear when top screen is approached")
                setIsVisible(false);
            } else if (isImpactVisible) {
                // Force hide at Impact section
                setIsVisible(false);
            } else {
                // Standard Smart Scroll logic outside Hero
                if (currentScrollY > lastScrollY) {
                    setIsVisible(false); // Scroll Down -> Hide
                } else {
                    setIsVisible(true);  // Scroll Up -> Show
                }
            }

            setLastScrollY(currentScrollY);
            setIsScrolled(currentScrollY > heroHeight - 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY, isVisible, isImpactVisible]);

    return (
        <>
            {/* Navbar Animation Wrapper */}
            <AnimatePresence mode="sync">
                <motion.nav
                    key={isPill ? "pill" : "hero"}
                    initial="hidden" // Always animate in from hidden state
                    animate={isVisible ? "visible" : "hidden"}
                    exit="hidden"
                    variants={{
                        visible: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: isPill ? 0.35 : 0.5, // 0.5s easing for Main Navbar
                                ease: "easeInOut",
                            }
                        },
                        hidden: {
                            y: -100, // Simple slide up
                            opacity: 0,
                            transition: {
                                duration: 0.35,
                                ease: "easeInOut",
                            }
                        }
                    }}
                    className={cn(
                        "fixed z-50 left-1/2 -translate-x-1/2",
                        isPill
                            ? "hidden md:block top-4 w-[90%] md:w-[700px] rounded-full border border-white/10 bg-black/80 backdrop-blur-md py-3 px-8 shadow-2xl"
                            : "top-0 w-full border-b border-transparent bg-transparent py-6"
                    )}
                >
                    <div className={cn(
                        "flex items-center justify-between",
                        isPill ? "w-full" : "container mx-auto px-6"
                    )}>
                        <Link
                            href="/"
                            className="z-50 relative block"
                        >
                            <Image
                                src="/logo.png"
                                alt="VUCE"
                                width={60}
                                height={60}
                                className="h-20 w-20"
                            />
                        </Link>

                        {/* Desktop Menu */}
                        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "link-underline text-sm font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4 rounded",
                                        isPill
                                            ? "text-gray-400 hover:text-white"
                                            : "text-white/90 hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/contact"
                                className={cn(
                                    "px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4 min-h-[44px] flex items-center",
                                    isPill
                                        ? "border border-white/20 hover:bg-white hover:text-black"
                                        : "bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white hover:text-black drop-shadow-lg"
                                )}
                            >
                                Start Project
                            </Link>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-menu"
                            className={cn(
                                "md:hidden z-50 relative transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded",
                                isScrolled ? "text-white" : "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                            )}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
                        </button>
                    </div>
                </motion.nav>
            </AnimatePresence>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center md:hidden"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Mobile navigation menu"
                    >
                        <nav className="flex flex-col items-center gap-6 md:gap-8 px-6 w-full" aria-label="Mobile navigation">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-2xl md:text-3xl font-display font-bold text-white hover:text-gray-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4 rounded px-4 py-2 min-h-[56px] flex items-center"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="mt-4 px-8 py-4 text-lg font-medium border-2 border-white rounded-full hover:bg-white hover:text-black transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4 min-h-[56px] flex items-center"
                            >
                                Start Project
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
