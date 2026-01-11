import { notFound } from "next/navigation";
import CaseStudyContent from "./CaseStudyContent";

// Case study data - shared with Gallery4
const caseStudies = [
    {
        id: "vuce-domain-acquisition",
        client: "Vuce",
        title: "Vuce.in — Strategic Brand Domain Acquisition",
        category: "Brand Strategy",
        year: "2025",
        description: "Securing a premium digital asset to anchor a high-end technology studio's long-term identity.",
        image: "/logo.png",
        challenge: "In an era where digital scarcity is accelerating, securing a short, brandable, 4-letter .in domain is a complex negotiation problem. We faced an environment where high-recall domains are often locked behind inflated speculative pricing or held by brokers who prioritize short-term profit over brand utility. Settling for a secondary domain—using hyphens, prefixes, or awkward regional suffixes—was not an option for a studio focused on premium engineering and long-term IP development.",
        solution: "We approached this acquisition as a brand valuation and capital asset investment problem. Instead of a typical marketing-led pursuit, we applied a rigorous strategic framework: evaluating the domain's long-term brand equity against the opportunity cost of alternative names. We bypassed speculative brokers to engage in a disciplined, direct negotiation. The strategy was to secure a neutral, pronounceable, and extensible foundation that could scale from a services studio into a broader product and platform ecosystem. Ownership was viewed through the lens of longevity and market trust.",
        results: [
            "Premium 4-Letter Asset Ownership",
            "Institutional Brand Credibility",
            "Scalable Foundation for Future IP",
        ],
    },
    {
        id: "tiger-assets",
        client: "Tiger Assets",
        title: "Institutional-Grade Investment Platform",
        category: "Financial Services",
        year: "Ongoing (2025)",
        description: "Partnering with a premier Indian equity PMS firm to build their institutional digital identity from the ground up.",
        image: "/tiger-assets-preview.png",
        websiteUrl: "https://tigerassets.co.in",
        linkLabel: "Visit Website",
        challenge: "Tiger Assets selected Vuce as their exclusive strategic partner to build their digital identity from the ground up. Operating in a strictly regulated environment where trust is currency, they needed a debut platform that would immediately signal institutional maturity to sophisticated High Net Worth Individuals (HNIs). The challenge is not rebranding, but 'branding zero-to-one': translating their offline expertise into a flawless, SEBI-compliant digital footprint that avoids retail marketing tropes and establishes instant credibility from Day 1.",
        solution: "We are currently engaged in a long-term partnership with Tiger Assets to engineer their complete digital identity. Our ongoing work involves designing a minimalist, content-first interface that prioritizes their investment philosophy and risk management frameworks. We are building a scalable CMS architecture to allow for compliant, effortless updates to disclosures and performance reports. This is an active collaboration to define the digital standard for institutional trust.",
        results: [
            "Active Web Identity Development",
            "Establishing Institutional Brand Standards",
            "Ongoing Infrastructure Engineering",
        ],
    },
    {
        id: "shree-balaji-padmavati-foundation",
        client: "Shree Balaji Padmavati Foundation",
        title: "End-to-End Digital Transformation & Custom ERP",
        category: "Business Automation",
        year: "2025",
        description: "Transforming offline operations into a fully digital ecosystem with automated receipts, recurring donation models, integrated logistics, and custom ERP for complete operational visibility.",
        image: "/shree-balaji-preview.png",
        websiteUrl: "https://tirupatibalajitemplecharkop.com",
        linkLabel: "Visit Website",
        challenge: "The Foundation faced critical operational and scalability challenges due to a legacy offline-first model. Manual, fragmented processes caused frequent errors in Seva fulfillment, lack of real-time donation tracking, and limited financial auditability. Existing ERP systems were too generic to handle the Foundation's domain-specific workflows, including donation-linked compliance, ritual scheduling, and integrated donor management. Without proper data tracking, forecasting revenue and ensuring operational reliability was nearly impossible, making the organization heavily dependent on sporadic, physical one-time contributions.",
        solution: "Vuce executed a comprehensive digital transformation by designing and building a fully custom, in-house ERP system from scratch, tailored to the Foundation's unique operational needs. Key innovations included:\n\n- Full Operational Visibility: A central dashboard providing real-time tracking of donations, Seva fulfillment, and workflow status, eliminating the operational blind spots.\n- Automated Receipting Engine: Receipts are automatically generated and sent to donors via WhatsApp and Email, ensuring compliance and reducing administrative overhead.\n- Recurring Donation System: Implemented a subscription-based recurring donation model, providing predictable revenue streams and financial stability.\n- Integrated Logistics Automation (In Development): Deep integrations with delivery partners to automatically generate delivery orders for Prasadam, streamlining the digital-to-physical fulfillment pipeline.\n- Offline Dependency Removal: All critical processes migrated from offline to cloud-based digital workflows, drastically reducing errors and manual intervention.\n\nThis solution not only optimized day-to-day operations but also empowered the Foundation to scale efficiently, increase donor engagement, and unlock new revenue opportunities.",
        results: [
            "30% Reduction in Operational Costs through Process Automation",
            "Predictable Monthly Recurring Revenue from Subscriptions",
            "Elimination of Offline Dependency, enabling full digital control",
            "End-to-End Visibility and Data Tracking for Donations and Workflows",
            "Scalable Infrastructure for Future Expansion and Integration"
        ],
    },
    {
        id: "pinnacleplus",
        client: "PinnaclePlus",
        title: "Enterprise Pricing & Content Automation",
        category: "AI & SaaS Engineering",
        year: "2025",
        description: "Architecting a geo-aware pricing engine and human-in-the-loop AI content system for scalable growth.",
        image: "/pinnacle-plus-case-study.png",
        websiteUrl: "https://pinnacleplus.store",
        challenge: "PinnaclePlus faced two critical bottlenecks inhibiting international scale: a rigid, flat pricing model that failed to capture global market value, and a manual content workflow that capped growth. They needed a system that could dynamically adapt pricing by region while automating content velocity without sacrificing quality.",
        solution: "We engineered a ground-up geo-aware pricing infrastructure that detects user location at the edge and serves currency-specific storefronts (India/US). Simultaneously, we architected an AI content pipeline with human verify-loops, enabling automated high-quality publishing at scale. No off-the-shelf tools; pure custom engineering.",
        results: [
            "Scaled to ₹2L+ MRR monthly",
            "80% reduction in OpEx",
            "Zero-touch business automation",
        ],
    },
];

export function generateStaticParams() {
    return caseStudies.map((study) => ({
        slug: study.id,
    }));
}

export default async function CaseStudyPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const caseStudy = caseStudies.find((study) => study.id === slug);

    if (!caseStudy) {
        notFound();
    }

    return <CaseStudyContent caseStudy={caseStudy} />;
}
