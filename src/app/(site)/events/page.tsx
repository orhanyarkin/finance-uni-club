import { client } from "@/sanity/lib/client";
import { ALL_EVENTS_QUERY } from "@/sanity/lib/queries";
import EventsPageContent from "@/components/EventsPageContent";

export const revalidate = 0;

export const metadata = {
  title: "Etkinlikler | Events",
  description: "Kulübümüzün düzenlediği tüm etkinlikler, workshoplar ve seminerler.",
};

export default async function EventsPage() {
  const events = await client.fetch(ALL_EVENTS_QUERY);
  return <EventsPageContent events={events} />;
}
