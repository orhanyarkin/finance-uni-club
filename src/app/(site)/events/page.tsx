import { client } from "@/sanity/lib/client";
import { ALL_EVENTS_QUERY } from "@/sanity/lib/queries";
import EventCard from "@/components/EventCard";

export const revalidate = 0;

export const metadata = {
  title: "Etkinlikler - Startup ve Finans Kulübü",
  description: "Kulübümüzün düzenlediği tüm etkinlikler, workshoplar ve seminerler.",
};

export default async function EventsPage() {
  const events = await client.fetch(ALL_EVENTS_QUERY);

  // Process events to add status logic
  const processedEvents = events.map((e: any) => {
    const eventDate = new Date(e.date);
    const now = new Date();
    let status = 'upcoming';
    if (eventDate < now) status = 'past';
    else if (e.registrationLink) status = 'register';
    
    return {
      ...e,
      status,
      category: e.category || (e.isFeatured ? "Özel Etkinlik" : "Etkinlik"),
      participants: e.participants
    };
  });

  const upcomingEvents = processedEvents.filter((e: any) => e.status !== 'past');
  const pastEvents = processedEvents.filter((e: any) => e.status === 'past');

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Etkinliklerimiz</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Geleceğe yön veren workshoplar, ilham veren konuşmalar ve network fırsatları.
          </p>
        </div>

        {/* Upcoming Events Section */}
        {upcomingEvents.length > 0 && (
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-primary pl-4">
              Yaklaşan Etkinlikler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event: any) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* Past Events Section */}
        {pastEvents.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-text-secondary mb-8 pl-4 border-l-4 border-slate-700">
              Geçmiş Etkinlikler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-80 hover:opacity-100 transition-opacity duration-300">
              {pastEvents.map((event: any) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </div>
        )}

        {events.length === 0 && (
            <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-2xl text-slate-400">Henüz planlanmış bir etkinlik bulunmuyor.</p>
            </div>
        )}

      </div>
    </main>
  );
}
