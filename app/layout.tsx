import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import MobileOptimizationNotice from "@/components/MobileOptimizationNotice";
import StructuredData from "@/components/StructuredData";
import ConsoleFilter from "@/components/ConsoleFilter";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://vuce.in'),
  title: {
    default: "Vuce | Digital Experiences",
    template: "%s | Vuce"
  },
  description: "We build powerful digital experiences. Website Development, MVP Development, and AI Solutions.",
  keywords: ["web development", "MVP", "Next.js", "React", "AI solutions", "digital experiences"],
  authors: [{ name: "Vuce" }],
  creator: "Vuce",
  publisher: "Vuce",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Vuce",
    title: "Vuce | Digital Experiences",
    description: "We build powerful digital experiences. Website Development, MVP Development, and AI Solutions.",
    images: [{
      url: "/logo.png",
      width: 1200,
      height: 630,
      alt: "Vuce"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vuce | Digital Experiences",
    description: "We build powerful digital experiences.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} bg-black text-white antialiased selection:bg-white selection:text-black relative`}>
        <ConsoleFilter />
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <SmoothScroll />
        <MobileOptimizationNotice />
        <div className="grain" />
        <Navbar />
        <main id="main-content" className="min-h-screen relative z-10">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
