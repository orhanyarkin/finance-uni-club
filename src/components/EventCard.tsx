"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Event {
  title: string;
  titleEn?: string;
  slug: { current: string };
  date: string;
  location: string;
  locationLink?: string;
  description: string;
  descriptionEn?: string;
  registrationLink?: string;
  status?: string;
  category?: string;
  participants?: number;
}

interface EventCardProps {
  event: Event;
  config?: any;
}

const eventCategoryEn: Record<string, string> = {
  "Workshop": "Workshop",
  "Seminer": "Seminar",
  "Networking": "Networking",
  "Panel": "Panel",
  "Eğitim": "Training",
  "Etkinlik": "Event",
  "Konferans": "Conference",
  "Webinar": "Webinar",
};

const statusStyles = {
  open: {
    color: "from-green-600 to-emerald-600",
    badgeColor: "bg-green-600 text-white",
  },
  upcoming: {
    color: "from-blue-600 to-cyan-600",
    badgeColor: "bg-blue-600 text-white",
  },
  closed: {
    color: "from-orange-500 to-red-500",
    badgeColor: "bg-orange-500 text-white",
  },
  past: {
    color: "from-gray-600 to-gray-700",
    badgeColor: "bg-gray-600 text-white",
  },
  default: {
    color: "from-primary to-purple-600",
    badgeColor: "bg-primary text-white",
  }
};

export default function EventCard({ event, config }: EventCardProps) {
  const { t, language } = useLanguage();
  const status = (event.status as keyof typeof statusStyles) || 'upcoming';
  const styles = (config && config[status]) || statusStyles[status] || statusStyles.default;

  const displayTitle = language === 'en' ? (event.titleEn || event.title) : event.title;
  const displayDescription = language === 'en' ? (event.descriptionEn || event.description) : event.description;
  const dateLocale = language === 'en' ? 'en-US' : 'tr-TR';

  const badgeLabel = status === 'open' ? t("events.open")
    : status === 'closed' ? t("events.status.closedBtn")
    : status === 'past' ? t("events.past")
    : t("events.status.upcomingBtn");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-[#0B0F1A] border border-white/10 rounded-3xl overflow-hidden hover:border-primary/30 transition-colors group flex flex-col h-full shadow-2xl"
    >
      {/* Event Header */}
      <div className={`bg-gradient-to-br ${styles.color} p-4 sm:p-6 relative min-h-[140px] flex flex-col`}>
        <div className="flex justify-between items-start mb-3 sm:mb-4">
          <span className="bg-white text-gray-900 font-semibold px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm shadow-sm">
            {language === "en"
              ? (eventCategoryEn[event.category || ""] || event.category || t("events.defaultCategory"))
              : (event.category || t("events.defaultCategory"))}
          </span>
          <span className={`${styles.badgeColor} backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm`}>
            {badgeLabel}
          </span>
        </div>
        <Link href={`/events/${event.slug?.current || '#'}`} className="block mt-auto">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white line-clamp-2 hover:text-primary transition-colors cursor-pointer min-h-[56px] sm:min-h-[64px]">
            {displayTitle}
          </h3>
        </Link>
      </div>

      {/* Event Details */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        <p className="text-text-secondary text-sm sm:text-base line-clamp-3 mb-4 min-h-[60px] sm:min-h-[72px]">
          {displayDescription}
        </p>

        <div className="space-y-2 sm:space-y-3 mt-auto">
          <div className="flex items-center space-x-2 sm:space-x-3 text-text-secondary text-sm">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
            <span className="truncate">
              <time suppressHydrationWarning>
                {new Date(event.date).toLocaleDateString(dateLocale, { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Istanbul' })}
              </time>
            </span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3 text-text-secondary text-sm">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
            {event.locationLink ? (
              <a
                href={event.locationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate hover:text-primary transition-colors underline-offset-4 hover:underline z-10 relative"
                onClick={(e) => e.stopPropagation()}
              >
                {event.location}
              </a>
            ) : (
              <span className="truncate">{event.location}</span>
            )}
          </div>
          {event.participants !== undefined && (
            <div className="flex items-center space-x-2 sm:space-x-3 text-text-secondary text-sm">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
              <span>{event.participants} {t("events.participants")}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
