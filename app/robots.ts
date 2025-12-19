import type { MetadataRoute } from 'next';

const BASE_URL = 'https://trojka.mk';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          // Faceted/filter URLs (avoid indexation of variants)
          '/*?q=',
          '/*?sizes=',
          '/*?type=',
          '/*?collection=',
          '/*?isFeatured=',
          '/*?minPrice=',
          '/*?maxPrice=',
          '/*?page=',
          '/*?sort=',
          // Auth and account pages should be noindex in-page, but safe to disallow crawl as well
          '/**/login',
          '/**/register',
          '/**/cart',
          '/**/checkout',
          '/**/profile',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}


