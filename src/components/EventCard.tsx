"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";

interface Event {
  title: string;
  slug: { current: string }; // Updated for slug object
  date: string;
  location: string;
  locationLink?: string;
  description: string;
  registrationLink?: string;
  status?: string;
  category?: string;
  participants?: number;
}

interface EventCardProps {
  event: Event;
  config?: any;
}

  const defaultConfig = {
    open: {
      label: "Kayıt Ol",
      color: "from-green-600 to-emerald-600",
      badgeColor: "bg-green-600 text-white",
      buttonColor: "bg-green-600 hover:bg-green-700",
    },
    upcoming: {
      label: "Yakında",
      color: "from-blue-600 to-cyan-600",
      badgeColor: "bg-blue-600 text-white",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    closed: {
        label: "Kayıtlar Tamamlandı",
        color: "from-orange-500 to-red-500",
        badgeColor: "bg-orange-500 text-white",
        buttonColor: "bg-orange-500/50 cursor-not-allowed",
    },
    past: {
      label: "Geçmiş",
      color: "from-gray-600 to-gray-700",
      badgeColor: "bg-gray-600 text-white",
      buttonColor: "bg-gray-600 cursor-not-allowed",
    },
    default: {
        label: "Etkinlik",
        color: "from-primary to-purple-600",
        badgeColor: "bg-primary text-white",
        buttonColor: "bg-primary hover:bg-primary-dark",
    }
  };

export default function EventCard({ event, config = defaultConfig }: EventCardProps) {
  // Status önceliği: Explicit status -> Date logic backup (optional)
  const status = (event.status as keyof typeof defaultConfig) || 'upcoming';
  const statusStyle = config[status] || defaultConfig.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-[#0B0F1A] border border-white/10 rounded-3xl overflow-hidden hover:border-primary/30 transition-colors group flex flex-col h-full shadow-2xl"
    >
      {/* Event Header - Fixed height */}
      <div className={`bg-gradient-to-br ${statusStyle.color} p-4 sm:p-6 relative min-h-[140px] flex flex-col`}>
        <div className="flex justify-between items-start mb-3 sm:mb-4">
          <span className="bg-white text-gray-900 font-semibold px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm shadow-sm">
            {event.category || "Etkinlik"}
          </span>
          <span className={`${statusStyle.badgeColor} backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm`}>
             {status === 'upcoming' ? 'Yakında' : 
              status === 'closed' ? 'Kayıtlar Tamamlandı' :
              status === 'past' ? 'Geçmiş' : 'Kayıt Ol'}
          </span>
        </div>
        <Link href={`/events/${event.slug?.current || '#'}`} className="block mt-auto">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white line-clamp-2 hover:text-primary transition-colors cursor-pointer min-h-[56px] sm:min-h-[64px]">
            {event.title}
          </h3>
        </Link>
      </div>

      {/* Event Details - Flex grow for consistent height */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        {/* Description - Fixed height */}
        <p className="text-text-secondary text-sm sm:text-base line-clamp-3 mb-4 min-h-[60px] sm:min-h-[72px]">
          {event.description}
        </p>

        {/* Meta info - Always at bottom */}
        <div className="space-y-2 sm:space-y-3 mt-auto">
          <div className="flex items-center space-x-2 sm:space-x-3 text-text-secondary text-sm">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
            <span className="truncate">{new Date(event.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</span>
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
              <span>{event.participants} Katılımcı</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
// Correcting the component logic in the edit below.
