import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/studio/', // Hide admin panel from search engines
    },
    sitemap: 'https://startupvefinanstoplulugu.com/sitemap.xml',
  };
}
