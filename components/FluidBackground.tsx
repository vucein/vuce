"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FluidBackground() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-black" />

            {/* Animated Orbs */}
            <motion.div
                animate={{
                    x: mousePosition.x * 0.1,
                    y: mousePosition.y * 0.1,
                }}
                transition={{ type: "spring", damping: 50, stiffness: 400 }}
                className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-white/[0.03] rounded-full blur-[120px] mix-blend-screen"
            />

            <motion.div
                animate={{
                    x: mousePosition.x * -0.1,
                    y: mousePosition.y * -0.1,
                }}
                transition={{ type: "spring", damping: 50, stiffness: 400 }}
                className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[100px] mix-blend-screen"
            />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/[0.01] rounded-full blur-[150px] animate-pulse" />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>
    );
}
