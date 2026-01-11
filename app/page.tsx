import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Marquee from "@/components/Marquee";
import { Gallery4 } from "@/components/ui/gallery4";
import WhyVuce from "@/components/WhyVuce";
import Process from "@/components/Process";

import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import ImpactMetrics from "@/components/ImpactMetrics";
import FAQ from "@/components/FAQ";

import StickyCTA from "@/components/StickyCTA";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Hero />
      <Marquee />
      <ImpactMetrics />
      <Services />
      <Gallery4 />
      <WhyVuce />
      <Process />

      <TechStack />

      {/* <Testimonials /> */}
      <FAQ />
      <CTA />
      <StickyCTA />
    </div>
  );
}
