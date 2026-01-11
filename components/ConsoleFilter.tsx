"use client";

import { useEffect } from "react";

/**
 * Filters out known/expected console warnings that we cannot resolve directly
 * but have verified are non-issues (e.g. library-specific warnings).
 */
export default function ConsoleFilter() {
    useEffect(() => {
        // Developer Hiring Message
        console.log(
            "%cInterested in what we're building? We're hiring!\n%cDrop your details at %chr@vuce.in",
            "font-weight: bold; font-size: 16px; color: #fff; background-color: #000; padding: 4px 8px; border-radius: 4px;",
            "color: #aaa; font-size: 12px; margin-top: 4px;",
            "color: #fff; font-weight: bold; text-decoration: underline;"
        );

        // Store the original console.warn
        const originalWarn = console.warn;

        // Override console.warn
        console.warn = (...args) => {
            // Check if the warning message contains the specific Framer Motion warning
            const warningText = args[0]?.toString() || "";
            if (warningText.includes("Please ensure that the container has a non-static position")) {
                // Suppress this specific warning
                return;
            }

            // Otherwise, pass through to the original logger
            originalWarn.apply(console, args);
        };

        // No cleanup returned: we want this filter to persist
    }, []);

    return null;
}
