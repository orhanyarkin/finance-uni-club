"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import EventCard from "@/components/EventCard";

interface Event {
  title: string;
  date: string;
  location: string;
  description: string;
  registrationLink?: string;
  status?: string;
  category?: string;
  participants?: number;
}

interface EventsCarouselProps {
  events?: any[];
}

export default function EventsCarousel({ events = [] }: EventsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Process events to use Sanity status
  const processedEvents = events.map((e: any) => {
    return {
      ...e,
      // Fallback: If no status from Sanity, use basic date logic
      status: e.status || (new Date(e.date) < new Date() ? 'past' : 'upcoming'),
      category: e.category || "Etkinlik", 
      participants: e.participants
    };
  });
  
  const displayEvents = processedEvents.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <section id="events" className="py-12 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
        >
            <div className="flex flex-col items-center justify-center text-center">
                <Link href="/events" className="group inline-block mb-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold inline-flex items-center gap-2 sm:gap-3">
                        <span className="gradient-text group-hover:text-primary transition-colors">Etkinliklerimiz</span>
                        <motion.span
                            initial={{ x: -10, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="inline-flex"
                        >
                            <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-primary group-hover:translate-x-2 transition-transform duration-300" />
                        </motion.span>
                    </h2>
                </Link>
                <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto px-4">
                    Katılabileceğiniz heyecan verici workshop, seminer ve networking etkinlikleri
                </p>
            </div>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Events Grid - Responsive */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {displayEvents.slice(0, 3).map((event: any, idx: number) => (
              <EventCard key={`${event.title}-${idx}`} event={event} />
            ))}
          </div>

          {/* Dots Indicator Removed */}
        </div>

        {/* Call to Action - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-effect rounded-2xl p-6 sm:p-8 md:p-12 text-center mt-10 sm:mt-16"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
            Tüm Etkinliklere Erişim İçin Kulübe Katılın
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-text-secondary mb-6 sm:mb-8 max-w-2xl mx-auto">
            Kulüp üyesi olarak tüm etkinliklerimize öncelikli katılım hakkı kazanın 
            ve networking imkanlarından yararlanın.
          </p>
          <a
            href="https://chat.whatsapp.com/BTDpU4G758206p2s6JZlEc?mode=wwt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary hover:bg-primary-dark text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-all duration-300 hover-lift glow-effect"
          >
            Kulübe Katıl
          </a>
        </motion.div>
      </div>
    </section>
  );
}
