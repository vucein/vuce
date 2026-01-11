import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vuce.in';

  // Static base routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/services',
    '/work',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic Service routes
  const serviceSlugs = [
    'web-engineering',
    'systems-architecture',
    'mvp-sprint',
    'automation-development',
    'ai-integration',
    'custom-solutions'
  ];

  const serviceRoutes = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic Case Study routes
  const caseStudySlugs = [
    'vuce-domain-acquisition',
    'tiger-assets',
    'shree-balaji-padmavati-foundation',
    'pinnacleplus'
  ];

  const caseStudyRoutes = caseStudySlugs.map((slug) => ({
    url: `${baseUrl}/casestudy/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...caseStudyRoutes];
}
