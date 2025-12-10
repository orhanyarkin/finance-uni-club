import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://startupvefinanstoplulugu.com';

  // Get all events and blog posts for dynamic routes
  const query = groq`{
    "events": *[_type == "event"] { "slug": slug.current, _updatedAt },
    "posts": *[_type == "post"] { "slug": slug.current, _updatedAt }
  }`;

  let events: any[] = [];
  let posts: any[] = [];

  try {
    const result = await client.fetch(query);
    events = result.events || [];
    posts = result.posts || [];
  } catch (error) {
    console.error('Sitemap fetch error:', error);
    // Continue with static routes even if dynamic data fails
  }

  const eventUrls = events.map((event: any) => ({
    url: `${baseUrl}/events/${event.slug}`,
    lastModified: new Date(event._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const postUrls = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/partnerships`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/sss`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...eventUrls,
    ...postUrls,
  ];
}
