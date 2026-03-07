"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import EventCard from "@/components/EventCard";

interface Event {
  _id: string;
  title: string;
  titleEn?: string;
  slug: { current: string };
  date: string;
  location?: string;
  description?: string;
  descriptionEn?: string;
  status?: string;
  category?: string;
  isFeatured?: boolean;
  participants?: number;
  [key: string]: unknown;
}

interface EventsPageContentProps {
  events: Event[];
}

export default function EventsPageContent({ events }: EventsPageContentProps) {
  const { t } = useLanguage();

  const processedEvents = events.map((e) => ({
    ...e,
    status: e.status || (new Date(e.date) < new Date() ? "past" : "upcoming"),
    category: e.category,
    participants: e.participants,
  }));

  const upcomingEvents = processedEvents.filter((e) => e.status !== "past");
  const pastEvents = processedEvents.filter((e) => e.status === "past");

  return (
    <main className="min-h-screen pt-36 sm:pt-40 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">{t("events.title")}</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            {t("events.pageSubtitle")}
          </p>
        </div>

        {/* Upcoming Events Section */}
        {upcomingEvents.length > 0 && (
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-primary pl-4">
              {t("events.upcomingSection")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <EventCard key={event._id} event={event as any} />
              ))}
            </div>
          </div>
        )}

        {/* Past Events Section */}
        {pastEvents.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-text-secondary mb-8 pl-4 border-l-4 border-slate-700">
              {t("events.pastSection")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-80 hover:opacity-100 transition-opacity duration-300">
              {pastEvents.map((event) => (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <EventCard key={event._id} event={event as any} />
              ))}
            </div>
          </div>
        )}

        {events.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-2xl text-slate-400">{t("events.noEvents")}</p>
          </div>
        )}

      </div>
    </main>
  );
}
