"use client";

import { createContext, useContext, useState, useEffect } from "react";

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
    // Navbar - ana linkler
    "nav.home": "Ana Sayfa",
    "nav.about": "Hakkımızda",
    "nav.explore": "Keşfet",
    "nav.contact": "İletişim",
    "nav.joinClub": "Kulübe Katıl",
    "nav.blog": "Blog",
    "nav.events": "Etkinlikler",
    "nav.team": "Ekibimiz",
    "nav.partnerships": "İşbirliklerimiz",

    // Navbar - mega menu section başlıkları
    "nav.sections.content": "İçerikler",
    "nav.sections.community": "Topluluk",
    "nav.sections.support": "Destek",
    "nav.sections.featured": "Öne Çıkanlar",

    // Navbar - mega menu items
    "nav.menu.blog": "Blog Yazıları",
    "nav.menu.blog.desc": "Finans ve girişimcilik içerikleri",
    "nav.menu.events": "Etkinlikler",
    "nav.menu.events.desc": "Yaklaşan ve geçmiş etkinlikler",
    "nav.menu.partnerships": "İşbirliklerimiz",
    "nav.menu.partnerships.desc": "Sponsor ve ortaklarımız",
    "nav.menu.faq": "SSS",
    "nav.menu.faq.desc": "Sıkça sorulan sorular",
    "nav.menu.contact": "İletişim",
    "nav.menu.contact.desc": "Bize ulaşın",

    // Navbar - featured labels
    "nav.featured.blog": "Öne Çıkan Blog",
    "nav.latest.blog": "Son Blog",
    "nav.featured.event": "Öne Çıkan Etkinlik",
    "nav.upcoming.event": "Yaklaşan Etkinlik",

    // Navbar - mobile menu
    "nav.mobile.copyright": "Tüm hakları saklıdır.",

    // Hero
    "hero.title1": "Geleceğin",
    "hero.title2": "Girişimcilerini",
    "hero.title3": "Bugün Yetiştiriyoruz",
    "hero.subtitle": "Finans, işletme, teknoloji ve girişimcilik alanlarında kendini geliştirmek isteyen öğrencilerin buluşma noktası. Eğitimler, mentörlük programları ve networking etkinlikleriyle kariyer yolculuğunuzda yanınızdayız.",
    "hero.cta1": "Kulübe Katıl",
    "hero.cta2": "Etkinlikleri Keşfet",
    "hero.stat1": "Toplam Üye",
    "hero.stat2": "Etkinlik",
    "hero.stat3": "İşbirliği",

    // Stats
    "stats.title": "Rakamlarla Kulübümüz",
    "stats.subtitle": "Başarılarımız ve büyüyen topluluğumuz hakkında bilgiler",
    "stats.members": "Toplam Üye",
    "stats.members.desc": "Farklı bölümlerden öğrenciler",
    "stats.events": "Düzenlenen Etkinlik",
    "stats.events.desc": "Workshop, seminer ve networking",
    "stats.experience": "Yıllık Deneyim",
    "stats.experience.desc": "2023'ten beri aktif",
    "stats.partnerships": "İşbirliklerimiz",
    "stats.partnerships.desc": "Sektör liderleri ile partnerlikler",

    // Blog
    "blog.title": "Blog Yazılarımız",
    "blog.subtitle": "Finans dünyası ve startup ekosistemi hakkında güncel içerikler",
    "blog.readMore": "Devamını Oku",
    "blog.latest": "Son Yazılar",
    "blog.viewAll": "Tüm Yazıları Gör",

    // Finance
    "finance.title": "Canlı Piyasa Verileri",
    "finance.subtitle": "Borsa İstanbul ve döviz kurları",
    "finance.lastUpdate": "Son güncelleme",
    "finance.disclaimer": "Veriler yalnızca bilgilendirme amaçlıdır. Yatırım kararları alırken profesyonel danışmanlık alınız.",

    // Events
    "events.title": "Etkinliklerimiz",
    "events.subtitle": "Yaklaşan ve geçmiş etkinliklerimiz",
    "events.viewAll": "Tüm Etkinlikleri Gör",
    "events.joinCta": "Topluluğumuza Katılın",
    "events.ctaDesc": "WhatsApp grubumuzda etkinliklerden ilk siz haberdar olun.",
    "events.joinWhatsapp": "WhatsApp'a Katıl",
    "events.open": "Kayıt Açık",
    "events.closed": "Kayıt Kapalı",
    "events.past": "Geçmiş",
    "events.upcoming": "Yaklaşan",
    "events.register": "Kayıt Ol",
    "events.viewDetails": "Detayları Gör",

    // Partners
    "partners.title": "İşbirliklerimiz",
    "partners.subtitle": "Sponsor ve ortaklarımız",

    // Footer
    "footer.description": "Finans, teknoloji ve girişimcilik alanlarında kendini geliştirmek isteyen öğrencilerin buluşma noktası. Geleceği birlikte inşa ediyoruz.",
    "footer.newsletter": "Bültene Abone Ol",
    "footer.newsletterDesc": "Etkinlikler ve haberlerden haberdar olmak için e-posta adresinizi bırakın.",
    "footer.copyright": "Tüm hakları saklıdır.",
    "footer.club": "Kulübümüz",
    "footer.resources": "Kaynaklar",
    "footer.legal": "Yasal",
    "footer.address": "Adres",

    // Hero stats
    "hero.stat1.label": "Aktif Üye",
    "hero.stat2.label": "Etkinlik",
    "hero.stat3.label": "Partner",

    // Hero featured event card
    "hero.featuredEvent": "Öne Çıkan Etkinlik",
    "hero.time": "Zaman",
    "hero.location": "Lokasyon",

    // Event status buttons (Hero + EventCard)
    "events.status.closedBtn": "Kayıtlar Tamamlandı",
    "events.status.pastBtn": "Etkinlik Tamamlandı",
    "events.status.upcomingBtn": "Yakında",

    // Event misc
    "events.participants": "Katılımcı",
    "events.defaultCategory": "Etkinlik",

    // Events section (carousel)
    "events.allSubtitle": "Katılabileceğiniz heyecan verici workshop, seminer ve networking etkinlikleri",
    "events.allAccessTitle": "Tüm Etkinliklere Erişim İçin Kulübe Katılın",
    "events.allAccessDesc": "Kulüp üyesi olarak tüm etkinliklerimize öncelikli katılım hakkı kazanın ve networking imkanlarından yararlanın.",
    "events.allAccessBtn": "Kulübe Katıl",

    // Events page (/events)
    "events.pageSubtitle": "Geleceğe yön veren workshoplar, ilham veren konuşmalar ve network fırsatları.",
    "events.upcomingSection": "Yaklaşan Etkinlikler",
    "events.pastSection": "Geçmiş Etkinlikler",
    "events.noEvents": "Henüz planlanmış bir etkinlik bulunmuyor.",
    "events.specialCategory": "Özel Etkinlik",

    // About page
    "about.title": "Hakkımızda",
    "about.desc1": "Ankara Medipol Üniversitesi Start-up ve Finans Topluluğu, finans, işletme, teknoloji, sağlık ve girişimcilik gibi alanlarda kendini geliştirmek isteyen öğrencileri bir araya getiren dinamik ve yenilikçi bir öğrenci topluluğudur.",
    "about.desc2": "Sektör profesyonelleriyle buluşmalar, finansal okuryazarlık eğitimleri, teknik geziler, iş ve staj imkanları, interaktif workshoplar ve geniş network olanakları sunarak öğrencilerin hem teorik bilgilerini artırmalarına hem de pratik deneyim kazanmalarına destek oluyoruz.",
    "about.mission.title": "Misyonumuz",
    "about.mission.desc": "Üyelerimizin finans, teknoloji ve girişimcilik alanlarındaki gelişmeleri yakından takip etmelerini sağlamak, onları iş dünyasına hazırlamak ve kariyer yolculuklarında rehberlik etmek.",
    "about.vision.title": "Vizyonumuz",
    "about.vision.desc": "Girişimcilik ve finans dünyasına ilgi duyan herkesin kendini geliştirebileceği, bilgiye ulaşabileceği ve değerli bağlantılar kurabileceği bir ortam oluşturmak.",
    "about.values.title": "Değerlerimiz",
    "about.values.desc": "Finansal okuryazarlık, sürekli öğrenme, iş birliği, yenilikçilik ve topluma değer katma ilkelerini benimsiyoruz.",
    "about.founded": "Kuruluş Yılımız",
    "about.yearsExp": "Yıllık Deneyim",
    "about.eventsCount": "Etkinlik",
    "about.membersCount": "Toplam Üye",
    "about.partnershipsCount": "İşbirliklerimiz",
    "about.quote": "Geleceği şekillendiren girişimcilerin yetiştiği topluluk",

    // Features section
    "features.title1": "Neler",
    "features.title2": "Sunuyoruz?",
    "features.subtitle": "Üyelerimize sağladığımız fırsatlar ve imkanlar",
    "features.workshops.title": "Workshop ve Eğitimler",
    "features.workshops.desc": "Girişimcilik, yatırım, blockchain ve fintech konularında uzmanlardan eğitimler alın.",
    "features.networking.title": "Networking Etkinlikleri",
    "features.networking.desc": "Sektör profesyonelleri, girişimciler ve yatırımcılarla tanışma fırsatı yakalayın.",
    "features.mentorship.title": "Mentörlük Programı",
    "features.mentorship.desc": "Deneyimli mentörlerden birebir rehberlik alarak kariyer yolculuğunuzu hızlandırın.",
    "features.startup.title": "Girişimcilik Desteği",
    "features.startup.desc": "Etkinliklerimizde deneyimli girişimcilerin tecrübelerini dinleyin, fikir edinin ve bağlantılar kurun.",
    "features.industry.title": "Sektör Bağlantıları",
    "features.industry.desc": "Finans ve teknoloji sektöründeki lider şirketlerle iş birliği imkanları.",
    "features.discounts.title": "Üyelere Özel İndirimler",
    "features.discounts.desc": "Anlaşmalı iş ortaklarımızda özel indirimler ve ayrıcalıklardan yararlanın.",

    // Partnerships page
    "partnerships.title": "İşbirliklerimiz ve",
    "partnerships.titleHighlight": "Fırsatlar",
    "partnerships.subtitle": "Kulüp üyelerimize özel ayrıcalıklar, indirimler ve fırsatlar dünyası.",
    "partnerships.visitSite": "Siteyi Ziyaret Et",
    "partnerships.showLocation": "Konumu Göster",
    "partnerships.defaultDesc": "Startup ve Finans Kulübü üyelerine özel indirim.",
    "partnerships.noPartners": "Henüz iş ortağı bulunmuyor.",

    // SSS / FAQ page
    "sss.title": "Sıkça Sorulan Sorular",
    "sss.subtitle": "Kulübümüz hakkında merak ettiklerinizi burada bulabilirsiniz",
    "sss.cta.title": "Sorunuz mu var?",
    "sss.cta.desc": "Burada cevabını bulamadığınız sorularınız için bize ulaşabilirsiniz",
    "sss.cta.btn": "WhatsApp'tan Sor",
    "sss.q1": "Kulübe nasıl üye olabilirim?",
    "sss.a1": "WhatsApp grubumuz üzerinden bize katılabilirsiniz. Üyelik ücretsizdir ve tüm öğrencilere açıktır. Etkinliklerimize katılarak aktif üye olabilirsiniz.",
    "sss.q2": "Etkinlikler ücretsiz mi?",
    "sss.a2": "Evet, tüm etkinliklerimiz kulüp üyelerine ve üniversite öğrencilerine ücretsizdir. İstisnai durumlarda ücret gerekebilir.",
    "sss.q3": "Hangi üniversiteden öğrenciler katılabilir?",
    "sss.a3": "Etkinliklerimiz tüm üniversitelerin öğrencilerine açıktır. Finans ve girişimcilik alanına ilgi duyan herkes aramıza katılabilir.",
    "sss.q4": "Sponsorluklarınız nasıl çalışıyor?",
    "sss.a4": "Partnerlerimiz üyelerimize özel indirimler ve fırsatlar sunuyor. Detaylı bilgi için İşbirliklerimiz sayfamızı ziyaret edebilirsiniz.",
    "sss.q5": "Yönetim kuruluna nasıl başvurabilirim?",
    "sss.a5": "Her akademik yılın başında yeni üye alımları gerçekleştiriyoruz. Başvuru dönemlerini Instagram hesabımızdan takip edebilirsiniz.",
    "sss.q6": "Etkinlik önerisi yapabilir miyim?",
    "sss.a6": "Tabii ki! Etkinlik önerilerinizi WhatsApp grubumuzdan veya e-posta ile bizimle paylaşabilirsiniz. Tüm öneriler değerlendirilir.",
    "sss.q7": "İndirimlerden nasıl faydalanabilirim?",
    "sss.a7": "Etkinliklerimizde veya açtığımız stantlarda topluluğumuza üye olarak S&F Üye Kartı edinebilir, bu kart sayesinde tüm indirimlerden yararlanabilirsiniz.",

    // Contact page
    "contact.title": "Bizimle",
    "contact.titleHighlight": "İletişime Geçin",
    "contact.subtitle": "Sorularınız, önerileriniz veya işbirliği teklifleri için bize ulaşabilirsiniz.",
    "contact.instagram.desc": "Güncel duyurular ve etkinliklerden haberdar olmak için takip edin.",
    "contact.instagram.action": "Takip Et",
    "contact.whatsapp.desc": "Sorularınız ve toplulukla iletişim için grubumuza katılın.",
    "contact.whatsapp.action": "Gruba Katıl",
    "contact.email.desc": "İşbirlikleri ve resmi görüşmeler için bize yazın.",
    "contact.email.action": "Mail Gönder",
    "contact.visitUs": "Bizi Ziyaret Edin",
    "contact.getDirections": "Haritada Yol Tarifi Al",
    "contact.email.title": "E-Posta",
    "contact.university": "Ankara Medipol Üniversitesi",

    // Team section
    "team.board.title": "Yönetim Kurulu",
    "team.board.subtitle": "Kulübümüzü yöneten liderlik ekibimiz ve komite üyelerimiz",
    "team.committees.title": "Komitelerimiz",
    "team.committees.subtitle": "Yönetim kurulu üyelerimizin komite bazında görev dağılımı",
    "team.comingSoon": "Yakında",
    "team.committee.corporate": "Kurumsal İletişim",
    "team.committee.sponsorship": "Sponsorluk",
    "team.committee.events": "Etkinlik",
    "team.committee.audit": "Denetim Kurulu",
    "team.committee.social": "Sosyal Medya",

    // Footer
    "footer.brand.desc": "Girişimcilik ve finans dünyasında kariyer yapmak isteyen öğrencilerin buluşma noktası. Geleceği birlikte inşa ediyoruz.",
    "footer.club.title": "Kulübümüz",
    "footer.club.about": "Hakkımızda",
    "footer.club.events": "Etkinlikler",
    "footer.club.team": "Ekibimiz",
    "footer.club.contact": "İletişim",
    "footer.resources.title": "Kaynaklar",
    "footer.resources.blog": "Blog",
    "footer.resources.news": "Haberler",
    "footer.resources.faq": "SSS",
    "footer.resources.other": "Kaynaklar",
    "footer.resources.comingSoon": "Yakında",
    "footer.legal.title": "Yasal",
    "footer.legal.privacy": "Gizlilik Politikası",
    "footer.legal.terms": "Kullanım Şartları",
    "footer.legal.cookies": "Çerez Politikası",
    "footer.university": "Ankara Medipol Üniversitesi",
    "footer.copyrightText": "Startup & Finans Topluluğu. Tüm hakları saklıdır.",

    // Brand
    "brand.shortName": "Startup & Finans",
    "brand.fullName": "Startup & Finans Topluluğu",

    // Blog detail page
    "blog.detail.allPosts": "Tüm Yazılar",
    "blog.detail.shareMsg": "Bu yazı faydalı olduysa paylaşmayı unutmayın!",
    "blog.detail.otherPosts": "Diğer Yazılar",
    "blog.detail.relatedTitle": "Benzer Yazılar",
    "blog.detail.discoverMore": "Daha fazla yazı keşfet →",
    "blog.detail.discoverDesc": "Blog sayfamızda tüm içeriklerimize göz atın.",

    // Event detail page
    "event.detail.allEvents": "Tüm Etkinlikler",
    "event.detail.date": "Tarih",
    "event.detail.time": "Saat",
    "event.detail.location": "Konum",
    "event.detail.aboutTitle": "Etkinlik Hakkında",
    "event.detail.shareMsg": "Bu etkinliği arkadaşlarınla paylaş!",
    "event.detail.viewOnMap": "Haritada Görüntüle",
    "event.detail.detailsTitle": "Katılım Detayları",
    "event.detail.participants": "Katılımcı",
    "event.detail.peopleUnit": "Kişi",
    "event.detail.register": "Kayıt Ol",
    "event.detail.closed": "Kayıtlar Tamamlandı",
    "event.detail.ended": "Bir Dahaki Sefere",
    "event.detail.soon": "Yakında",
    "event.detail.backAll": "Tüm Etkinliklere Dön",
    "event.detail.relatedTitle": "Yaklaşan Diğer Etkinlikler",
    "event.detail.comingSoon": "Yakında",
    "event.detail.discoverMore": "Daha fazla etkinlik keşfet →",
    "event.detail.discoverDesc": "Etkinlik takvimimize göz atın ve yerinizi ayırtın.",
    "event.detail.shareInvite": "Startup & Finans Topluluğu seni etkinliğe bekliyor 🚀",

    // Share button
    "share.button": "Paylaş",
    "share.title": "Paylaşım Seçenekleri",
    "share.copyNote": "(Link kopyalanır)",
    "share.copied": "Kopyalandı!",
    "share.copy": "Linki Kopyala",
  },
  en: {
    // Navbar - ana linkler
    "nav.home": "Home",
    "nav.about": "About",
    "nav.explore": "Explore",
    "nav.contact": "Contact",
    "nav.joinClub": "Join Club",
    "nav.blog": "Blog",
    "nav.events": "Events",
    "nav.team": "Team",
    "nav.partnerships": "Partnerships",

    // Navbar - mega menu section başlıkları
    "nav.sections.content": "Content",
    "nav.sections.community": "Community",
    "nav.sections.support": "Support",
    "nav.sections.featured": "Featured",

    // Navbar - mega menu items
    "nav.menu.blog": "Blog Posts",
    "nav.menu.blog.desc": "Finance and entrepreneurship articles",
    "nav.menu.events": "Events",
    "nav.menu.events.desc": "Upcoming and past events",
    "nav.menu.partnerships": "Partnerships",
    "nav.menu.partnerships.desc": "Our sponsors and partners",
    "nav.menu.faq": "FAQ",
    "nav.menu.faq.desc": "Frequently asked questions",
    "nav.menu.contact": "Contact",
    "nav.menu.contact.desc": "Get in touch with us",

    // Navbar - featured labels
    "nav.featured.blog": "Featured Blog",
    "nav.latest.blog": "Latest Blog",
    "nav.featured.event": "Featured Event",
    "nav.upcoming.event": "Upcoming Event",

    // Navbar - mobile menu
    "nav.mobile.copyright": "All rights reserved.",

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
    "stats.members": "Total Members",
    "stats.members.desc": "Students from different departments",
    "stats.events": "Events Organized",
    "stats.events.desc": "Workshops, seminars and networking",
    "stats.experience": "Years of Experience",
    "stats.experience.desc": "Active since 2023",
    "stats.partnerships": "Partnerships",
    "stats.partnerships.desc": "Partnerships with industry leaders",

    // Blog
    "blog.title": "Our Blog Posts",
    "blog.subtitle": "Current content about the finance world and startup ecosystem",
    "blog.readMore": "Read More",
    "blog.latest": "Latest Posts",
    "blog.viewAll": "View All Posts",

    // Finance
    "finance.title": "Live Market Data",
    "finance.subtitle": "Borsa Istanbul and exchange rates",
    "finance.lastUpdate": "Last updated",
    "finance.disclaimer": "Data is for informational purposes only. Please seek professional advice before making investment decisions.",

    // Events
    "events.title": "Our Events",
    "events.subtitle": "Upcoming and past events",
    "events.viewAll": "View All Events",
    "events.joinCta": "Join Our Community",
    "events.ctaDesc": "Be the first to know about events in our WhatsApp group.",
    "events.joinWhatsapp": "Join WhatsApp",
    "events.open": "Registration Open",
    "events.closed": "Registration Closed",
    "events.past": "Past",
    "events.upcoming": "Upcoming",
    "events.register": "Register",
    "events.viewDetails": "View Details",

    // Partners
    "partners.title": "Our Partnerships",
    "partners.subtitle": "Our sponsors and partners",

    // Footer
    "footer.description": "Meeting point for students who want to build a career in entrepreneurship and finance. Building the future together.",
    "footer.newsletter": "Subscribe to Newsletter",
    "footer.newsletterDesc": "Leave your email address to stay informed about events and news.",
    "footer.copyright": "All rights reserved.",
    "footer.club": "Our Club",
    "footer.resources": "Resources",
    "footer.legal": "Legal",
    "footer.address": "Address",

    // Hero stats
    "hero.stat1.label": "Active Members",
    "hero.stat2.label": "Events",
    "hero.stat3.label": "Partners",

    // Hero featured event card
    "hero.featuredEvent": "Featured Event",
    "hero.time": "Time",
    "hero.location": "Location",

    // Event status buttons (Hero + EventCard)
    "events.status.closedBtn": "Registration Closed",
    "events.status.pastBtn": "Event Ended",
    "events.status.upcomingBtn": "Coming Soon",

    // Event misc
    "events.participants": "Participants",
    "events.defaultCategory": "Event",

    // Events section (carousel)
    "events.allSubtitle": "Exciting workshops, seminars and networking events you can attend",
    "events.allAccessTitle": "Join the Club for Access to All Events",
    "events.allAccessDesc": "As a club member, gain priority access to all our events and benefit from networking opportunities.",
    "events.allAccessBtn": "Join the Club",

    // Events page (/events)
    "events.pageSubtitle": "Future-shaping workshops, inspiring talks and networking opportunities.",
    "events.upcomingSection": "Upcoming Events",
    "events.pastSection": "Past Events",
    "events.noEvents": "No events planned yet.",
    "events.specialCategory": "Special Event",

    // About page
    "about.title": "About Us",
    "about.desc1": "Ankara Medipol University Startup & Finance Community is a dynamic and innovative student community that brings together students who want to develop themselves in finance, business, technology, health and entrepreneurship.",
    "about.desc2": "We support students to increase their theoretical knowledge and gain practical experience by offering meetings with industry professionals, financial literacy trainings, technical visits, job and internship opportunities, interactive workshops and extensive networking.",
    "about.mission.title": "Our Mission",
    "about.mission.desc": "To ensure our members closely follow developments in finance, technology and entrepreneurship, prepare them for the business world, and guide them on their career journey.",
    "about.vision.title": "Our Vision",
    "about.vision.desc": "To create an environment where everyone interested in entrepreneurship and finance can develop themselves, access knowledge, and build valuable connections.",
    "about.values.title": "Our Values",
    "about.values.desc": "We embrace the principles of financial literacy, continuous learning, collaboration, innovation and adding value to society.",
    "about.founded": "Year Founded",
    "about.yearsExp": "Years of Experience",
    "about.eventsCount": "Events",
    "about.membersCount": "Total Members",
    "about.partnershipsCount": "Partnerships",
    "about.quote": "The community where future entrepreneurs are raised",

    // Features section
    "features.title1": "What Do",
    "features.title2": "We Offer?",
    "features.subtitle": "Opportunities and benefits we provide to our members",
    "features.workshops.title": "Workshops & Training",
    "features.workshops.desc": "Get training from experts on entrepreneurship, investment, blockchain and fintech.",
    "features.networking.title": "Networking Events",
    "features.networking.desc": "Meet industry professionals, entrepreneurs and investors.",
    "features.mentorship.title": "Mentorship Program",
    "features.mentorship.desc": "Accelerate your career journey with one-on-one guidance from experienced mentors.",
    "features.startup.title": "Startup Support",
    "features.startup.desc": "Listen to experienced entrepreneurs at our events, gain insights and build connections.",
    "features.industry.title": "Industry Connections",
    "features.industry.desc": "Collaboration opportunities with leading companies in finance and technology.",
    "features.discounts.title": "Member-Exclusive Discounts",
    "features.discounts.desc": "Enjoy special discounts and privileges at our partner businesses.",

    // Partnerships page
    "partnerships.title": "Our Partnerships &",
    "partnerships.titleHighlight": "Opportunities",
    "partnerships.subtitle": "A world of exclusive privileges, discounts and opportunities for club members.",
    "partnerships.visitSite": "Visit Website",
    "partnerships.showLocation": "Show Location",
    "partnerships.defaultDesc": "Exclusive discount for Startup & Finance Club members.",
    "partnerships.noPartners": "No partners yet.",

    // SSS / FAQ page
    "sss.title": "Frequently Asked Questions",
    "sss.subtitle": "Find answers to your questions about our club here",
    "sss.cta.title": "Have a question?",
    "sss.cta.desc": "Reach out to us for questions you couldn't find answers to here",
    "sss.cta.btn": "Ask on WhatsApp",
    "sss.q1": "How can I become a member?",
    "sss.a1": "You can join us through our WhatsApp group. Membership is free and open to all students. You can become an active member by attending our events.",
    "sss.q2": "Are events free?",
    "sss.a2": "Yes, all our events are free for club members and university students. Fees may be required in exceptional cases.",
    "sss.q3": "Students from which universities can participate?",
    "sss.a3": "Our events are open to students from all universities. Anyone interested in finance and entrepreneurship can join us.",
    "sss.q4": "How do your sponsorships work?",
    "sss.a4": "Our partners offer exclusive discounts and opportunities to our members. For more details, visit our Partnerships page.",
    "sss.q5": "How can I apply for the board?",
    "sss.a5": "We recruit new members at the beginning of each academic year. You can follow our Instagram account for application periods.",
    "sss.q6": "Can I suggest an event?",
    "sss.a6": "Of course! You can share your event suggestions with us via WhatsApp or email. All suggestions are considered.",
    "sss.q7": "How can I benefit from discounts?",
    "sss.a7": "You can get an S&F Member Card by joining our community at our events or booths, and use this card to benefit from all discounts.",

    // Contact page
    "contact.title": "Get In",
    "contact.titleHighlight": "Touch With Us",
    "contact.subtitle": "You can reach us for your questions, suggestions or collaboration proposals.",
    "contact.instagram.desc": "Follow us to stay updated on announcements and events.",
    "contact.instagram.action": "Follow",
    "contact.whatsapp.desc": "Join our group for your questions and to connect with the community.",
    "contact.whatsapp.action": "Join Group",
    "contact.email.desc": "Write to us for collaborations and official discussions.",
    "contact.email.action": "Send Email",
    "contact.visitUs": "Visit Us",
    "contact.getDirections": "Get Directions on Map",
    "contact.email.title": "Email",
    "contact.university": "Ankara Medipol University",

    // Team section
    "team.board.title": "Board of Directors",
    "team.board.subtitle": "Our leadership team and committee members who run the club",
    "team.committees.title": "Our Committees",
    "team.committees.subtitle": "Task distribution of our board members by committee",
    "team.comingSoon": "Coming Soon",
    "team.committee.corporate": "Corporate Communications",
    "team.committee.sponsorship": "Sponsorship",
    "team.committee.events": "Events",
    "team.committee.audit": "Audit Board",
    "team.committee.social": "Social Media",

    // Footer
    "footer.brand.desc": "Meeting point for students who want to build a career in entrepreneurship and finance. Building the future together.",
    "footer.club.title": "Our Club",
    "footer.club.about": "About Us",
    "footer.club.events": "Events",
    "footer.club.team": "Our Team",
    "footer.club.contact": "Contact",
    "footer.resources.title": "Resources",
    "footer.resources.blog": "Blog",
    "footer.resources.news": "News",
    "footer.resources.faq": "FAQ",
    "footer.resources.other": "Resources",
    "footer.resources.comingSoon": "Coming Soon",
    "footer.legal.title": "Legal",
    "footer.legal.privacy": "Privacy Policy",
    "footer.legal.terms": "Terms of Use",
    "footer.legal.cookies": "Cookie Policy",
    "footer.university": "Ankara Medipol University",
    "footer.copyrightText": "Startup & Finance Community. All rights reserved.",

    // Brand
    "brand.shortName": "Startup & Finance",
    "brand.fullName": "Startup & Finance Community",

    // Blog detail page
    "blog.detail.allPosts": "All Posts",
    "blog.detail.shareMsg": "If you found this post helpful, don't forget to share!",
    "blog.detail.otherPosts": "Other Posts",
    "blog.detail.relatedTitle": "Related Posts",
    "blog.detail.discoverMore": "Discover more posts →",
    "blog.detail.discoverDesc": "Browse all our content on the blog page.",

    // Event detail page
    "event.detail.allEvents": "All Events",
    "event.detail.date": "Date",
    "event.detail.time": "Time",
    "event.detail.location": "Location",
    "event.detail.aboutTitle": "About the Event",
    "event.detail.shareMsg": "Share this event with your friends!",
    "event.detail.viewOnMap": "View on Map",
    "event.detail.detailsTitle": "Participation Details",
    "event.detail.participants": "Participants",
    "event.detail.peopleUnit": "People",
    "event.detail.register": "Register",
    "event.detail.closed": "Registration Closed",
    "event.detail.ended": "Maybe Next Time",
    "event.detail.soon": "Coming Soon",
    "event.detail.backAll": "Back to All Events",
    "event.detail.relatedTitle": "Other Upcoming Events",
    "event.detail.comingSoon": "Coming Soon",
    "event.detail.discoverMore": "Discover more events →",
    "event.detail.discoverDesc": "Check our event calendar and reserve your spot.",
    "event.detail.shareInvite": "Startup & Finance Community is waiting for you at the event 🚀",

    // Share button
    "share.button": "Share",
    "share.title": "Share Options",
    "share.copyNote": "(Link will be copied)",
    "share.copied": "Copied!",
    "share.copy": "Copy Link",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("tr");

  // On mount: restore saved preference OR detect browser language
  useEffect(() => {
    const saved = localStorage.getItem("lang") as Language | null;
    if (saved === "en" || saved === "tr") {
      setLanguage(saved);
    } else {
      // No saved preference — use browser language
      const browserLang = (navigator.language || "").toLowerCase();
      if (browserLang.startsWith("en")) setLanguage("en");
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.tr] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
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
