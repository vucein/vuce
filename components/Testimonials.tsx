"use client";

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Testimonials() {
    return (
        <section className="py-16 md:py-24 lg:py-32 bg-black border-t border-white/10" aria-labelledby="testimonials-heading">
            <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 md:space-y-12 lg:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-4 md:space-y-6 lg:space-y-12 text-center">
                    <h2 id="testimonials-heading" className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-display font-bold text-white">Client Stories</h2>
                    <p className="text-base md:text-lg text-gray-400 px-4">Trusted by founders and engineering teams building the future. Here's what they have to say about working with us.</p>
                </div>

                <div className="grid gap-4 sm:gap-5 md:gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-rows-2">
                    <Card className="grid grid-rows-[auto_1fr] gap-8 sm:col-span-2 sm:p-6 lg:row-span-2 bg-white/[0.03] border-white/10 backdrop-blur-sm">
                        <CardHeader>
                            <span className="text-white/60 text-sm uppercase tracking-widest font-medium">Nexus Corp</span>
                        </CardHeader>
                        <CardContent>
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p className="text-xl font-medium text-white leading-relaxed">Vuce transformed the way we approach product development. Their engineering expertise and design sensibility helped us ship features 3x faster. The attention to detail and commitment to quality is unmatched - they&apos;re not just developers, they&apos;re true partners in innovation.</p>

                                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                                    <Avatar className="size-12">
                                        <AvatarImage
                                            src=""
                                            alt="Sarah Jenkins"
                                            height="400"
                                            width="400"
                                            loading="lazy"
                                        />
                                        <AvatarFallback>SJ</AvatarFallback>
                                    </Avatar>

                                    <div>
                                        <cite className="text-sm font-medium text-white not-italic">Sarah Jenkins</cite>
                                        <span className="text-gray-500 block text-sm">CTO, Nexus Corp</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>
                    <Card className="md:col-span-2 bg-white/[0.03] border-white/10 backdrop-blur-sm">
                        <CardContent className="h-full pt-6">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p className="text-xl font-medium text-white">Incredible speed without compromising quality. The best development partner we&apos;ve worked with. A real gold mine for startups.</p>

                                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                                    <Avatar className="size-12">
                                        <AvatarImage
                                            src=""
                                            alt="Michael Chen"
                                            height="400"
                                            width="400"
                                            loading="lazy"
                                        />
                                        <AvatarFallback>MC</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <cite className="text-sm font-medium text-white not-italic">Michael Chen</cite>
                                        <span className="text-gray-500 block text-sm">Founder, Stratos</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>
                    <Card className="bg-white/[0.03] border-white/10 backdrop-blur-sm">
                        <CardContent className="h-full pt-6">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p className="text-white">Their AI integration capabilities gave us a massive competitive advantage. Highly recommend!</p>

                                <div className="grid items-center gap-3 [grid-template-columns:auto_1fr]">
                                    <Avatar className="size-12">
                                        <AvatarImage
                                            src=""
                                            alt="Elena Rodriguez"
                                            height="400"
                                            width="400"
                                            loading="lazy"
                                        />
                                        <AvatarFallback>ER</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <cite className="text-sm font-medium text-white not-italic">Elena Rodriguez</cite>
                                        <span className="text-gray-500 block text-sm">Product Lead, Aether</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>
                    <Card className="bg-white/[0.03] border-white/10 backdrop-blur-sm">
                        <CardContent className="h-full pt-6">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p className="text-white">Outstanding work on our platform redesign. This is one of the best teams we&apos;ve collaborated with!</p>

                                <div className="grid grid-cols-[auto_1fr] gap-3">
                                    <Avatar className="size-12">
                                        <AvatarImage

                                            alt="David Park"
                                            height="400"
                                            width="400"
                                            loading="lazy"
                                        />
                                        <AvatarFallback>DP</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium text-white">David Park</p>
                                        <span className="text-gray-500 block text-sm">CEO, Horizon Labs</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
