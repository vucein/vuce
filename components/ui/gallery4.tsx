"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

import { motion } from "framer-motion";

import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

export interface Gallery4Item {
    id: string;
    title: string;
    description: string;
    href: string;
    image: string;
}

export interface Gallery4Props {
    title?: string;
    description?: string;
    items?: Gallery4Item[];
}


const data = [
    {
        id: "vuce-domain-acquisition",
        title: "Vuce.in: Strategic Domain Acquisition",
        description: "How We Acquired Vuce.in for Rs.89k.",
        href: "/casestudy/vuce-domain-acquisition",
        image: "/logo.png",
    },
    {
        id: "tiger-assets",
        title: "Tiger Assets: Institutional Investment Platform",
        description: "Ongoing partnership to build a high-trust, regulatory-compliant digital identity for a premier Indian equity PMS firm.",
        href: "https://tigerassets.co.in",
        image: "/tiger-assets-preview.png",
    },
    {
        id: "shree-balaji-padmavati-foundation",
        title: "Shree Balaji Padmavati Foundation: Offline-to-Cloud Transformation",
        description: "A custom-built revenue engine, automated receipting, recurring donations, and logistics integration engineered to scale operations and cut costs by 30%.",
        href: "https://tirupatibalajitemplecharkop.com",

        image: "/shree-balaji-preview.png",
    },
    {
        id: "pinnacleplus",
        title: "PinnaclePlus: Geo-Pricing & Content Automation",
        description: "Scale to ₹2L+ MRR with a custom geo-aware pricing engine and AI content pipeline.",
        href: "https://pinnacleplus.store",
        image: "/pinnacle-plus-case-study.png",
    },
];



const Gallery4 = ({
    title = "Case Studies",
    description = "Discover how leading companies and developers are leveraging modern web technologies.",
    items = data,
}: Gallery4Props) => {
    const [carouselApi, setCarouselApi] = useState<CarouselApi>();
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    // 👇 Autoplay for discrete "1,2,3 -> 2,3,4" motion
    const plugin = useRef(
        Autoplay({
            delay: 3600,
            stopOnInteraction: true,
        })
    );

    useEffect(() => {
        if (!carouselApi) return;

        const updateSelection = () => {
            setCanScrollPrev(carouselApi.canScrollPrev());
            setCanScrollNext(carouselApi.canScrollNext());
            setCurrentSlide(carouselApi.selectedScrollSnap());
        };

        updateSelection();
        carouselApi.on("select", updateSelection);

        return () => {
            carouselApi.off("select", updateSelection);
        };
    }, [carouselApi]);

    return (
        <section className="py-32 bg-black border-t border-white/10">
            <div className="container mx-auto px-6">
                {/* Header - WhyVuce inspired */}
                <div className="mb-14 flex items-end justify-between lg:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-4"
                    >
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
                            {title}
                        </h2>
                        <p className="text-gray-400 max-w-2xl">{description}</p>
                    </motion.div>

                    {/* Arrows */}
                    <div className="hidden shrink-0 gap-2 md:flex">
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => carouselApi?.scrollPrev()}
                            disabled={!canScrollPrev}
                            className="text-white hover:bg-white/10"
                        >
                            <ArrowLeft className="size-5" />
                        </Button>

                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => carouselApi?.scrollNext()}
                            disabled={!canScrollNext}
                            className="text-white hover:bg-white/10"
                        >
                            <ArrowRight className="size-5" />
                        </Button>
                    </div>
                </div>

                {/* Carousel */}
                <Carousel
                    setApi={setCarouselApi}
                    plugins={[plugin.current]}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                    onMouseEnter={() => plugin.current.stop()}
                    onMouseLeave={() => plugin.current.play()}
                >
                    <CarouselContent className="-ml-4">
                        {items.map((item) => (
                            <CarouselItem
                                key={item.id}
                                className="pl-4 md:basis-1/2 lg:basis-1/3"
                            >
                                <Link href={`/casestudy/${item.id}`} className="group block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded">
                                    <div className="relative aspect-[1.8/2.4] overflow-hidden bg-white/5 border border-white/10 transition-all duration-500 group-hover:border-white/20 group-hover:shadow-[0_8px_30px_rgba(255,255,255,0.08)]">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                        <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 text-white">
                                            <h3 className="mb-2 text-lg md:text-xl font-semibold">
                                                {item.title}
                                            </h3>
                                            <p className="mb-3 md:mb-4 line-clamp-2 text-xs md:text-sm text-gray-300">
                                                {item.description}
                                            </p>
                                            <span className="inline-flex items-center text-xs md:text-sm font-medium">
                                                Read more
                                                <ArrowRight className="ml-2 size-3 md:size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>


            </div>
        </section>
    );
};

export { Gallery4 };
