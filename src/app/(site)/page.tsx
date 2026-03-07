import Hero from "@/components/Hero";
import BlogGrid from "@/components/BlogGrid";
import EventsCarousel from "@/components/EventsCarousel";
import Stats from "@/components/Stats";
import PartnerLogos from "@/components/PartnerLogos";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY, PARTNERS_QUERY, FEATURED_EVENT_QUERY, EVENTS_QUERY } from "@/sanity/lib/queries";

export const revalidate = 0; // Instant updates (was 60)

export default async function Home() {
  const posts = await client.fetch(POSTS_QUERY);
  const partners = await client.fetch(PARTNERS_QUERY);
  const featuredEvent = await client.fetch(FEATURED_EVENT_QUERY);
  const events = await client.fetch(EVENTS_QUERY);

  return (
    <main className="min-h-screen">
      <Hero featuredEvent={featuredEvent} />
      <Stats />
      <PartnerLogos partners={partners} />
      <BlogGrid posts={posts} limit={3} />
      <EventsCarousel events={events} />
    </main>
  );
}
