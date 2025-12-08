import { client } from "@/sanity/lib/client";
import { EVENT_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import EventDetail from "@/components/EventDetail";

export const revalidate = 60; // Revalidate every minute

export default async function EventPage({ params }: { params: { slug: string } }) {
  const event = await client.fetch(EVENT_BY_SLUG_QUERY, { slug: params.slug });

  if (!event) {
    notFound();
  }

  return <EventDetail event={event} />;
}
