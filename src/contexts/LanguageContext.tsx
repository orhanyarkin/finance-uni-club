"use client";

import { createContext, useContext, useState } from "react";

type Language = "tr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Çeviriler
const translations = {
  tr: {
    // Navbar
    "nav.home": "Ana Sayfa",
    "nav.blog": "Blog",
    "nav.about": "Hakkımızda",
    "nav.events": "Etkinlikler",
    "nav.team": "Ekibimiz",
    "nav.contact": "İletişim",
    "nav.joinClub": "Kulübe Katıl",
    
    // Hero
    "hero.title1": "Geleceğin",
    "hero.title2": "Girişimcilerini",
    "hero.title3": "Bugün Yetiştiriyoruz",
    "hero.subtitle": "Startup ekosistemi ve finans dünyasında kariyer yapmak isteyen öğrencilerin buluşma noktası. Workshoplar, mentörlük programları ve networking etkinlikleriyle yolunuzu aydınlatıyoruz.",
    "hero.cta1": "Kulübe Katıl",
    "hero.cta2": "Etkinlikleri Keşfet",
    "hero.stat1": "Toplam Üye",
    "hero.stat2": "Etkinlik",
    "hero.stat3": "İşbirliği",
    
    // Stats
    "stats.title": "Rakamlarla Kulübümüz",
    "stats.subtitle": "Başarılarımız ve büyüyen topluluğumuz hakkında bilgiler",
    
    // Blog
    "blog.title": "Blog Yazılarımız",
    "blog.subtitle": "Finans dünyası ve startup ekosistemi hakkında güncel içerikler",
    "blog.readMore": "Devamını Oku",
    "blog.latest": "Son Yazılar",
    
    // Finance
    "finance.title": "Canlı Piyasa Verileri",
    "finance.subtitle": "Borsa İstanbul ve döviz kurları",
    
    // Footer
    "footer.description": "Girişimcilik ve finans dünyasında kariyer yapmak isteyen öğrencilerin buluşma noktası. Geleceği birlikte inşa ediyoruz.",
    "footer.newsletter": "Bültene Abone Ol",
    "footer.newsletterDesc": "Etkinlikler ve haberlerden haberdar olmak için e-posta adresinizi bırakın.",
    "footer.copyright": "Tüm hakları saklıdır.",
  },
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.blog": "Blog",
    "nav.about": "About",
    "nav.events": "Events",
    "nav.team": "Team",
    "nav.contact": "Contact",
    "nav.joinClub": "Join Club",
    
    // Hero
    "hero.title1": "Educating",
    "hero.title2": "Future Entrepreneurs",
    "hero.title3": "Today",
    "hero.subtitle": "Meeting point for students who want to build a career in the startup ecosystem and finance world. We illuminate your path with workshops, mentorship programs and networking events.",
    "hero.cta1": "Join Club",
    "hero.cta2": "Explore Events",
    "hero.stat1": "Total Members",
    "hero.stat2": "Events",
    "hero.stat3": "Partnerships",
    
    // Stats
    "stats.title": "Our Club in Numbers",
    "stats.subtitle": "Information about our achievements and growing community",
    
    // Blog
    "blog.title": "Our Blog Posts",
    "blog.subtitle": "Current content about the finance world and startup ecosystem",
    "blog.readMore": "Read More",
    "blog.latest": "Latest Posts",
    
    // Finance
    "finance.title": "Live Market Data",
    "finance.subtitle": "Borsa Istanbul and exchange rates",
    
    // Footer
    "footer.description": "Meeting point for students who want to build a career in entrepreneurship and finance. Building the future together.",
    "footer.newsletter": "Subscribe to Newsletter",
    "footer.newsletterDesc": "Leave your email address to stay informed about events and news.",
    "footer.copyright": "All rights reserved.",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("tr");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.tr] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}



