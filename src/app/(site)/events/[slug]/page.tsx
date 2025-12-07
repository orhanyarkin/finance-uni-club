import { client } from "@/sanity/lib/client";
import { EVENT_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, MapPin, Clock, ArrowRight, Users } from "lucide-react";
import ShareButton from "@/components/ShareButton";

export const revalidate = 0; // Instant updates for dev

export default async function EventPage({ params }: { params: { slug: string } }) {
  const event = await client.fetch(EVENT_BY_SLUG_QUERY, { slug: params.slug });

  if (!event) {
    notFound();
  }

  const eventDate = new Date(event.date);

  return (
    <main className="min-h-screen bg-background pb-20">
      
      {/* Hero / Cover Image */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        {event.image ? (
            <Image
                src={urlFor(event.image).url()}
                alt={event.title}
                fill
                className="object-cover"
                priority
            />
        ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        {/* Content overlaid on hero */}
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-12 max-w-7xl mx-auto">
            <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
                {event.category || "Etkinlik"}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm md:text-base">
                <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>{eventDate.toLocaleDateString("tr-TR", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>{eventDate.toLocaleTimeString("tr-TR", { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>{event.location}</span>
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
            <div>
                <h2 className="text-2xl font-bold mb-4">Etkinlik Hakkında</h2>
                <div className="prose prose-invert max-w-none text-text-secondary leading-relaxed whitespace-pre-line">
                    {event.description}
                </div>
            </div>

            {/* Google Maps Embed */}
            {event.locationLink && (
                <div className="rounded-2xl overflow-hidden border border-white/10 h-80 relative">
                     {/* 
                       Using an iframe for Google Maps Embed. 
                       Note: A dynamic Embed URL usually requires an API Key for "Place" mode.
                       For free/simple usage without API key, "maps?q=" with an iframe helps but might be restricted.
                       Better approach: Just a link if no API key, OR use the primitive iframe method which might show "Login".
                       Let's try a standard query embed.
                     */}
                    <iframe
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps?q=${encodeURIComponent(event.location)}&output=embed`}
                    ></iframe>
                     {/* Overlay button to open in new tab for better UX */}
                    <a 
                        href={event.locationLink}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors shadow-lg z-10 flex items-center gap-2"
                    >
                        <MapPin className="w-4 h-4" />
                        Haritada Aç
                    </a>
                </div>
            )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
            <div className="glass-effect p-6 rounded-2xl border border-white/5 sticky top-24">
                <h3 className="text-xl font-bold mb-6">Etkinlik Detayları</h3>
                
                <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-white/5 rounded-lg text-primary">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-sm text-text-muted">Tarih</div>
                            <div className="font-medium">{eventDate.toLocaleDateString("tr-TR")}</div>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="p-2 bg-white/5 rounded-lg text-primary">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-sm text-text-muted">Saat</div>
                            <div className="font-medium">{eventDate.toLocaleTimeString("tr-TR", { hour: '2-digit', minute: '2-digit' })}</div>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="p-2 bg-white/5 rounded-lg text-primary">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-sm text-text-muted">Konum</div>
                            <div className="font-medium">{event.location}</div>
                        </div>
                    </div>
                    {event.participants && (
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-white/5 rounded-lg text-primary">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-sm text-text-muted">Katılımcı</div>
                            <div className="font-medium">{event.participants} Kişi</div>
                        </div>
                      </div>
                    )}
                </div>

                <a 
                    href={event.registrationLink || '#'}
                    target="_blank"
                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover-lift transition-all mb-4 ${
                         !event.registrationLink ? 'bg-gray-700 cursor-not-allowed opacity-50' : 'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/25'
                    }`}
                >
                    {event.registrationLink ? 'Kayıt Ol' : 'Kayıtlar Kapalı'}
                    {event.registrationLink && <ArrowRight className="w-5 h-5" />}
                </a>

                 <ShareButton />
            </div>
        </div>
      </div>
    </main>
  );
}
