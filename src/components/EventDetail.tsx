"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ArrowLeft, Users, ChevronUp, Share2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { useState, useEffect } from "react";
import ShareButton from "./ShareButton";

export default function EventDetail({ event }: { event: any }) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const eventDate = new Date(event.date);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(progress);
      setShowScrollTop(scrollTop > 500);
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX: readingProgress / 100 }}
      />

      {/* Hero Section - Full Width */}
      <div className="relative w-full h-[50vh] min-h-[400px] max-h-[600px]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          {event.image ? (
            <Image
              src={urlFor(event.image).url()}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/30 via-background to-background" />
          )}
          {/* Multi-layer gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Tüm Etkinlikler</span>
              </Link>
            </motion.div>

            {/* Category Badge */}
            {event.category && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="inline-block bg-primary/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-semibold text-white uppercase tracking-wider mb-4">
                  {event.category}
                </span>
              </motion.div>
            )}

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              {event.title}
            </motion.h1>

            {/* Meta Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 sm:gap-8 text-white/80"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Calendar className="w-5 h-5 text-primary-light" />
                </div>
                <div>
                  <div className="text-xs text-white/60">Tarih</div>
                  <div className="text-sm font-medium">{eventDate.toLocaleDateString("tr-TR", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Clock className="w-5 h-5 text-primary-light" />
                </div>
                <div>
                  <div className="text-xs text-white/60">Saat</div>
                  <div className="text-sm font-medium">{eventDate.toLocaleTimeString("tr-TR", { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <MapPin className="w-5 h-5 text-primary-light" />
                </div>
                <div>
                  <div className="text-xs text-white/60">Konum</div>
                  <div className="text-sm font-medium">{event.location}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-20 -mt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column: Description & Map */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Description Card */}
              <div className="bg-background-secondary/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl shadow-black/10 overflow-hidden">
                <div className="p-8 sm:p-10">
                  <h2 className="text-2xl font-bold mb-6 text-text-primary">Etkinlik Hakkında</h2>
                  <div className="prose prose-lg prose-invert max-w-none text-text-secondary leading-relaxed whitespace-pre-line">
                    {event.description}
                  </div>
                </div>

                {/* Bottom Actions - Matching Blog Style */}
                <div className="px-8 sm:px-10 py-8 border-t border-white/10 bg-background-tertiary/30">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="text-text-secondary text-sm">
                      Bu etkinliği arkadaşlarınla paylaş!
                    </div>
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="w-full sm:w-40">
                          <ShareButton 
                            title={event.title} 
                            text={
                              (event.status === 'open' || event.status === 'upcoming' || !event.status)
                                ? `Startup & Finans Topluluğu seni etkinliğe bekliyor 🚀 | ${event.title}`
                                : `${event.title} -`
                            }
                          />
                        </div>
                      </div>
                  </div>
                </div>
              </div>

              {/* Map Card */}
              {event.locationLink && (
                <div className="bg-background-secondary/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-lg overflow-hidden h-96 relative group">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(event.location)}&output=embed`}
                    className="grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  ></iframe>
                  <a 
                    href={event.locationLink}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute bottom-6 right-6 bg-white text-black px-5 py-3 rounded-xl text-sm font-bold hover:bg-gray-100 transition-all shadow-xl hover:-translate-y-1 flex items-center gap-2 z-10"
                  >
                    <MapPin className="w-4 h-4" />
                    Haritada Görüntüle
                  </a>
                </div>
              )}
            </motion.div>

            {/* Right Column: Sticky Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 space-y-6">
                {/* Info Card */}
                <div className="bg-background-secondary/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl shadow-black/10 p-6">
                  <h3 className="text-xl font-bold mb-6 text-text-primary">Katılım Detayları</h3>
                  
                  <div className="space-y-5 mb-8">
                    {event.participants && (
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-background-tertiary/50">
                        <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs text-text-muted uppercase tracking-wide">Katılımcı</div>
                          <div className="font-semibold text-text-primary">{event.participants} Kişi</div>
                        </div>
                      </div>
                    )}
                    
                    <a 
                      href={event.status === 'open' ? (event.registrationLink || '#') : undefined}
                      target={event.status === 'open' ? "_blank" : undefined}
                      className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg ${
                        event.status !== 'open'
                          ? 'bg-gray-700/50 cursor-not-allowed text-gray-400' 
                          : 'bg-primary hover:bg-primary-dark text-white hover:shadow-primary/30 hover:-translate-y-1'
                      }`}
                      onClick={(e) => {
                        if (event.status !== 'open') e.preventDefault();
                      }}
                    >
                      {event.status === 'open' ? 'Kayıt Ol' : 
                       event.status === 'closed' ? 'Kayıtlar Tamamlandı' : 
                       event.status === 'past' ? 'Bir Dahaki Sefere' : 
                       'Yakında'}
                      {event.status === 'open' && <ArrowRight className="w-5 h-5" />}
                    </a>
                  </div>

                  <div className="border-t border-white/10 pt-6">
                    <Link
                      href="/events"
                      className="inline-flex w-full justify-center items-center gap-2 text-text-secondary hover:text-primary transition-colors text-sm font-medium"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Tüm Etkinliklere Dön
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related Events Placeholder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 mb-20"
          >
            <h3 className="text-2xl font-bold text-text-primary mb-8">Yaklaşan Diğer Etkinlikler</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Placeholder cards */}
              <Link href="/events" className="group">
                <div className="bg-background-secondary/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-2">Yakında</div>
                    <h4 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors mb-2">
                      Daha fazla etkinlik keşfet →
                    </h4>
                    <p className="text-text-secondary text-sm">Etkinlik takvimimize göz atın ve yerinizi ayırtın.</p>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0.8 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 z-50"
      >
        <ChevronUp className="w-5 h-5" />
      </motion.button>
    </main>
  );
}
