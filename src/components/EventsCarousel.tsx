"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Users, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

type EventStatus = "register" | "upcoming" | "past";

interface Event {
  title: string;
  date: string;
  location: string;
  participants: number;
  category: string;
  status: EventStatus;
  description: string;
}

export default function EventsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const events: Event[] = [
    {
      title: "Blockchain ve Kripto Para Workshop",
      date: "15 Aralık 2025",
      location: "Konferans Salonu A",
      participants: 75,
      category: "Workshop",
      status: "register",
      description: "Blockchain teknolojisi ve kripto paralar hakkında kapsamlı eğitim.",
    },
    {
      title: "Startup Pitch Night",
      date: "22 Aralık 2025",
      location: "İnovasyon Merkezi",
      participants: 100,
      category: "Networking",
      status: "upcoming",
      description: "Girişimcilerin projelerini yatırımcılara sunma fırsatı.",
    },
    {
      title: "Finansal Okuryazarlık Semineri",
      date: "10 Kasım 2025",
      location: "Online (Zoom)",
      participants: 150,
      category: "Seminer",
      status: "past",
      description: "Kişisel finans yönetimi ve yatırım stratejileri.",
    },
    {
      title: "FinTech Summit 2025",
      date: "28 Aralık 2025",
      location: "Ana Konferans Salonu",
      participants: 200,
      category: "Conference",
      status: "register",
      description: "Fintech sektöründeki en son gelişmeler ve trendler.",
    },
    {
      title: "Yapay Zeka ve Finans",
      date: "5 Ocak 2026",
      location: "Teknopark",
      participants: 80,
      category: "Workshop",
      status: "upcoming",
      description: "AI'ın finans sektöründeki uygulamaları ve geleceği.",
    },
    {
      title: "Girişimcilik Paneli",
      date: "1 Kasım 2025",
      location: "Amfi 1",
      participants: 120,
      category: "Panel",
      status: "past",
      description: "Başarılı girişimcilerle deneyim paylaşımı.",
    },
  ];

  const statusConfig = {
    register: {
      label: "Kayıt Ol",
      color: "from-green-500 to-emerald-500",
      badgeColor: "bg-green-500/20 text-green-300",
      buttonColor: "bg-green-600 hover:bg-green-700",
    },
    upcoming: {
      label: "Yakında",
      color: "from-blue-500 to-cyan-500",
      badgeColor: "bg-blue-500/20 text-blue-300",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    past: {
      label: "Bir Dahaki Sefere",
      color: "from-gray-500 to-gray-600",
      badgeColor: "bg-gray-500/20 text-gray-400",
      buttonColor: "bg-gray-600 cursor-not-allowed",
    },
  };

  // Auto-rotate
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % events.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused, events.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
    setIsPaused(false);
  };

  // Get visible events (current + 2 next for desktop)
  const getVisibleEvents = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(events[(currentIndex + i) % events.length]);
    }
    return visible;
  };

  return (
    <section id="events" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Etkinliklerimiz</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Katılabileceğiniz heyecan verici workshop, seminer ve networking etkinlikleri
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons - Desktop */}
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 bg-primary/20 hover:bg-primary/40 backdrop-blur-sm p-3 rounded-full transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 bg-primary/20 hover:bg-primary/40 backdrop-blur-sm p-3 rounded-full transition-all"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Events Grid */}
          <div
            className="grid md:grid-cols-3 gap-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Mobile: Show only current event */}
            <div className="md:hidden">
              <EventCard event={events[currentIndex]} config={statusConfig} />
            </div>

            {/* Desktop: Show 3 events */}
            <div className="hidden md:contents">
              {getVisibleEvents().map((event, idx) => (
                <EventCard key={`${event.title}-${idx}`} event={event} config={statusConfig} />
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {events.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex ? "bg-primary w-8" : "bg-text-muted/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-effect rounded-2xl p-12 text-center mt-16"
        >
          <h3 className="text-3xl font-bold mb-4">
            Tüm Etkinliklere Erişim İçin Kulübe Katılın
          </h3>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Kulüp üyesi olarak tüm etkinliklerimize öncelikli katılım hakkı kazanın 
            ve networking imkanlarından yararlanın.
          </p>
          <a
            href="https://chat.whatsapp.com/BTDpU4G758206p2s6JZlEc?mode=wwt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover-lift glow-effect"
          >
            Kulübe Katıl
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function EventCard({ event, config }: { event: Event; config: any }) {
  const statusStyle = config[event.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-effect rounded-xl overflow-hidden hover-lift group"
    >
      {/* Event Header */}
      <div className={`bg-gradient-to-br ${statusStyle.color} p-6`}>
        <div className="flex justify-between items-start mb-4">
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white">
            {event.category}
          </span>
          <span className={`${statusStyle.badgeColor} backdrop-blur-sm px-3 py-1 rounded-full text-sm`}>
            {statusStyle.label}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-white">
          {event.title}
        </h3>
      </div>

      {/* Event Details */}
      <div className="p-6 space-y-4">
        <p className="text-text-secondary">
          {event.description}
        </p>

        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-text-secondary">
            <Calendar className="w-5 h-5 text-primary" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center space-x-3 text-text-secondary">
            <MapPin className="w-5 h-5 text-primary" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center space-x-3 text-text-secondary">
            <Users className="w-5 h-5 text-primary" />
            <span>{event.participants} Katılımcı</span>
          </div>
        </div>

        <button
          disabled={event.status === "past"}
          className={`w-full ${statusStyle.buttonColor} text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 group-hover:glow-effect mt-6 ${
            event.status === "past" ? "opacity-50" : ""
          }`}
        >
          <span>{statusStyle.label}</span>
          {event.status !== "past" && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </motion.div>
  );
}




