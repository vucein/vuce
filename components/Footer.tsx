import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black py-12 md:py-16 lg:py-20" role="contentinfo">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 lg:gap-12 mb-12 md:mb-16 lg:mb-20">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="mb-4 md:mb-6 block focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4 rounded w-fit">
                            <Image
                                src="/logo.png"
                                alt="VUCE Logo"
                                width={120}
                                height={120}
                                className="h-16 w-16 md:h-20 md:w-20"
                                priority={false}
                            />
                        </Link>
                        <p className="text-gray-400 max-w-md text-base md:text-lg leading-relaxed">
                            We build powerful digital experiences for forward-thinking companies.
                            Websites, MVPs, and AI solutions.
                        </p>
                    </div>

                    <nav aria-label="Footer navigation">
                        <h4 className="text-white font-bold mb-4 md:mb-6 text-base md:text-lg">Sitemap</h4>
                        <ul className="space-y-3 md:space-y-4">
                            <li><Link href="/services" className="link-underline text-gray-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded inline-block">Services</Link></li>
                            <li><Link href="/work" className="link-underline text-gray-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded inline-block">Work</Link></li>
                            <li><Link href="/about" className="link-underline text-gray-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded inline-block">About</Link></li>
                            <li><Link href="/contact" className="link-underline text-gray-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded inline-block">Contact</Link></li>
                        </ul>
                    </nav>

                    <nav aria-label="Social links">
                        <h4 className="text-white font-bold mb-4 md:mb-6 text-base md:text-lg">Socials</h4>
                        <ul className="space-y-3 md:space-y-4">
                            <li><a href="#" className="link-underline text-gray-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded inline-block" aria-label="Twitter / X">Twitter / X</a></li>
                            <li><a href="#" className="link-underline text-gray-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded inline-block" aria-label="LinkedIn">LinkedIn</a></li>
                            <li><a href="#" className="link-underline text-gray-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded inline-block" aria-label="Instagram">Instagram</a></li>
                            <li><a href="#" className="link-underline text-gray-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded inline-block" aria-label="GitHub">GitHub</a></li>
                        </ul>
                    </nav>
                </div>

                <div className="pt-6 md:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs md:text-sm">
                        © {new Date().getFullYear()} Vuce. All rights reserved.
                    </p>
                    <nav aria-label="Legal links" className="flex flex-wrap justify-center gap-4 md:gap-6">
                        <Link href="#" className="link-underline text-gray-500 hover:text-white text-xs md:text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded">Privacy Policy</Link>
                        <Link href="#" className="link-underline text-gray-500 hover:text-white text-xs md:text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded">Terms of Service</Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
