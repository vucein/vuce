/**
 * Structured Data (JSON-LD) for SEO
 * Adds Organization and WebSite schema
 */
export default function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vuce.in';

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Vuce",
    "url": baseUrl,
    "logo": `${baseUrl}/Logobackground.png`,
    "description": "We build powerful digital experiences. Website Development, MVP Development, and AI Solutions.",
    "sameAs": [
      // Add social media URLs when available
      // "https://twitter.com/vuce",
      // "https://linkedin.com/company/vuce.in",
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Vuce",
    "url": baseUrl,
    "description": "We build powerful digital experiences. Website Development, MVP Development, and AI Solutions.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
