import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 text-white">
                    404
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                    Page Not Found
                </h2>
                <p className="text-gray-400 mb-8 text-lg md:text-xl leading-relaxed">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4 shadow-[0_4px_14px_0_rgba(255,255,255,0.15)] hover:shadow-[0_6px_20px_0_rgba(255,255,255,0.25)] min-h-[56px]"
                >
                    <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                    Back to Home
                </Link>
            </div>
        </div>
    );
}

