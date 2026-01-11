"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error (in production, this could be sent to an error tracking service)
    if (process.env.NODE_ENV === 'production') {
      // Error tracking service call here (e.g., Sentry)
      // logErrorToService(error);
    } else {
      console.error("Application error:", error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 text-white">Oops</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Something went wrong</h2>
        <p className="text-gray-400 mb-8 text-lg md:text-xl leading-relaxed">
          We're sorry for the inconvenience. Please try again or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4 min-h-[56px]"
          >
            <RefreshCw className="w-5 h-5" aria-hidden="true" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-black active:scale-95 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4 min-h-[56px]"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
