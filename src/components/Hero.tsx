"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Users, Calendar, Award, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

interface HeroProps {
  featuredEvent?: any;
}

export default function Hero({ featuredEvent }: HeroProps) {
  const { t, language } = useLanguage();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40 sm:pt-36 lg:pt-32">
      {/* Keynote style is cleaner, relying on the global gradient */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white mb-6 sm:mb-8 leading-[1.1] tracking-tighter"
            >
              {t("hero.title1")}{" "}
              <span className="text-primary">
                {t("hero.title2")}
              </span>
              <br />
              {t("hero.title3")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-slate-400 mb-8 sm:mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
            >
              <a
                href="https://chat.whatsapp.com/BTDpU4G758206p2s6JZlEc?mode=wwt"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-lg shadow-primary/25 flex items-center space-x-2 w-full sm:w-auto justify-center"
              >
                <span>{t("hero.cta1")}</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#events"
                className="text-white hover:text-primary px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 w-full sm:w-auto text-center border border-white/10 hover:border-primary/50 hover:bg-white/5"
              >
                {t("hero.cta2")}
              </a>
            </motion.div>

            {/* Trust Indicators - Minimalist */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 sm:mt-16 flex items-center justify-center lg:justify-start gap-6 sm:gap-12 text-slate-500"
            >
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-xs sm:text-sm uppercase tracking-wider">{t("hero.stat1.label")}</div>
              </div>
              <div className="w-px h-12 bg-white/10"></div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">20+</div>
                <div className="text-xs sm:text-sm uppercase tracking-wider">{t("hero.stat2.label")}</div>
              </div>
              <div className="w-px h-12 bg-white/10"></div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">10+</div>
                <div className="text-xs sm:text-sm uppercase tracking-wider">{t("hero.stat3.label")}</div>
              </div>
            </motion.div>
          </div>

          {/* Right Visual - Keynote Style Card */}
          {featuredEvent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex-1 w-full max-w-lg lg:max-w-none relative"
            >
              {/* Main Card - Solid Dark with Border */}
              <div className="relative bg-[#0B0F1A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl group">
                {/* Card Header Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary/20 to-purple-900/20 relative overflow-hidden">
                  {featuredEvent.image && (
                    <div className="absolute inset-0">
                      <Image 
                        src={urlFor(featuredEvent.image).url()} 
                        alt={featuredEvent.title} 
                        fill
                        className="object-cover opacity-60" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] to-transparent"></div>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-6">
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">{t("hero.featuredEvent")}</span>
                  </div>
                </div>
                
                <div className="p-5 sm:p-8 relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <Link href={`/events/${featuredEvent.slug?.current}`}>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight hover:text-primary transition-colors cursor-pointer">{language === 'en' ? (featuredEvent.titleEn || featuredEvent.title) : featuredEvent.title}</h3>
                    </Link>
                  </div>

                  {/* Event Details - Clean List */}
                  <div className="space-y-5 mb-8">
                    <div className="flex items-center gap-4 text-slate-300 group/item">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover/item:bg-primary/20 transition-colors">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-500">{t("hero.time")}</div>
                        <div className="font-medium">
                          <time suppressHydrationWarning>
                            {new Date(featuredEvent.date).toLocaleDateString(language === 'en' ? 'en-US' : 'tr-TR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                          </time>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-slate-300 group/item">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover/item:bg-primary/20 transition-colors">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-500">{t("hero.location")}</div>
                        <div className="font-medium relative z-20">
                          {featuredEvent.locationLink ? (
                            <a 
                              href={featuredEvent.locationLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-primary transition-colors hover:underline block"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {featuredEvent.location}
                            </a>
                          ) : (
                            <span>{featuredEvent.location}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="mt-8">
                    {(() => {
                      const status = featuredEvent.status || 'upcoming';
                      const isOpen = status === 'open';
                      const isClosed = status === 'closed';
                      const isPast = status === 'past';
                      
                      const link = isOpen ? (featuredEvent.registrationLink || "#") : undefined;
                      const text = isOpen ? t("events.register") : isClosed ? t("events.status.closedBtn") : isPast ? t("events.status.pastBtn") : t("events.status.upcomingBtn");
                      const disabledClass = !isOpen ? "opacity-75 cursor-not-allowed bg-slate-200 text-slate-500" : "bg-white text-black hover:bg-slate-200";

                      return (
                         <a 
                          href={isOpen ? link : undefined} 
                          target={isOpen ? "_blank" : undefined}
                          className={`w-full py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 group/btn ${disabledClass}`}
                          onClick={(e) => { if (!isOpen) e.preventDefault(); }}
                        >
                          {text}
                          {isOpen && <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />}
                        </a>
                      );
                    })()}
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements - Minimalist */}
              <div className="absolute -top-4 -right-4 w-full h-full border border-white/5 rounded-3xl -z-10"></div>
              <div className="absolute -bottom-4 -left-4 w-full h-full border border-white/5 rounded-3xl -z-20"></div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}






