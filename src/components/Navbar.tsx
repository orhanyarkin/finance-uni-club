"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, HelpCircle, Calendar, Newspaper, Users, Handshake, Mail, ArrowRight, Instagram, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// X (Twitter) icon - custom since lucide doesn't have the new X logo
const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

interface FeaturedData {
  latestPost?: {
    title: string;
    slug: { current: string };
  };
  latestEvent?: {
    title: string;
    slug: { current: string };
  };
}

interface NavbarProps {
  featuredData?: FeaturedData;
}

export default function Navbar({ featuredData }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Scroll eşiğini artırdık ve logic'i basitleştirdik
          const isScrolled = window.scrollY > 50;
          setScrolled(isScrolled);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Dropdown açıldığında body scroll'u kilitleme (Mobil için)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleMouseEnter = (dropdown: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // Süreyi biraz kısalttık ama yeterli
  };

  // Keşfet mega menü içeriği
  const exploreContent = {
    sections: [
      {
        title: "İçerikler",
        items: [
          { title: "Blog Yazıları", href: "/blog", icon: Newspaper, description: "Finans ve girişimcilik içerikleri" },
          { title: "Etkinlikler", href: "/events", icon: Calendar, description: "Yaklaşan ve geçmiş etkinlikler" },
        ]
      },
      {
        title: "Topluluk",
        items: [
          { title: "İşbirliklerimiz", href: "/partnerships", icon: Handshake, description: "Sponsor ve ortaklarımız" },
        ]
      },
      {
        title: "Destek",
        items: [
          { title: "SSS", href: "/sss", icon: HelpCircle, description: "Sıkça sorulan sorular" },
          { title: "İletişim", href: "/contact", icon: Mail, description: "Bize ulaşın" },
        ]
      },
    ],
  };

  // Mobil menü items
  const mobileMenuItems = [
    { title: "Hakkımızda", href: "/about", icon: Users },
    { title: "Blog", href: "/blog", icon: Newspaper },
    { title: "Etkinlikler", href: "/events", icon: Calendar },
    { title: "İşbirliklerimiz", href: "/partnerships", icon: Handshake },
    { title: "SSS", href: "/sss", icon: HelpCircle },
    { title: "İletişim", href: "/contact", icon: Mail },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isOpen || activeDropdown
            ? "bg-[#0a0e17] border-b border-white/[0.08] py-3 shadow-lg" // Menü açıkken tam mat
            : scrolled
              ? "bg-[#0a0e17]/80 backdrop-blur-md border-b border-white/[0.08] py-3 shadow-lg" // Scroll yaparken cam efekti
              : "bg-transparent py-4 sm:py-5" // En tepedeyken şeffaf
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group relative z-[101]">
              <div className={`relative transition-all duration-300 ${scrolled ? 'w-10 h-10' : 'w-12 h-12'} overflow-hidden shrink-0`}>
                <Image
                  src="/assets/images/club_logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className={`font-bold transition-all duration-300 ${scrolled ? 'text-base' : 'text-lg'} tracking-tight text-white group-hover:text-primary shadow-black drop-shadow-md`}>
                {/* Mobilde sadece "Startup & Finans", masaüstünde tam isim */}
                <span className="lg:hidden">Startup & Finans</span>
                <span className="hidden lg:inline">Startup & Finans Topluluğu</span>
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-2" ref={dropdownRef}>
              {/* Hakkımızda */}
              <Link
                href="/about"
                className={`px-4 py-2 font-medium text-white/90 hover:text-white transition-colors drop-shadow-md ${scrolled ? 'text-sm' : 'text-base'}`}
              >
                Hakkımızda
              </Link>
              
              {/* Keşfet Mega Menu */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => handleMouseEnter('explore')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`flex items-center gap-1.5 px-4 py-2 font-medium transition-colors drop-shadow-md ${
                    activeDropdown === 'explore' 
                      ? 'text-white' 
                      : 'text-white/90 hover:text-white'
                  } ${scrolled ? 'text-sm' : 'text-base'}`}
                >
                  Keşfet
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'explore' ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {activeDropdown === 'explore' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 pt-2 w-[600px] xl:w-[680px] origin-top-right"
                    onMouseEnter={() => handleMouseEnter('explore')}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Invisible bridge to prevent closing */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-transparent" />
                    
                    {/* Glass card with SOLID dark background */}
                    <div className="relative bg-[#0c1222] border border-white/[0.1] rounded-3xl shadow-2xl shadow-black/50 overflow-hidden">
                        {/* Top gradient accent */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                        
                        <div className="relative p-6 z-10">
                          {/* Main Grid */}
                          <div className="grid grid-cols-3 gap-6">
                            {exploreContent.sections.map((section) => (
                              <div key={section.title}>
                                <h4 className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-4 px-3">
                                  {section.title}
                                </h4>
                                <div className="space-y-1">
                                  {section.items.map((item) => (
                                    <Link
                                      key={item.title}
                                      href={item.href}
                                      onClick={() => setActiveDropdown(null)}
                                      className="flex items-start gap-3 p-3 rounded-2xl hover:bg-white/[0.04] transition-all duration-200 group"
                                    >
                                      <div className="p-2.5 rounded-xl bg-white/[0.04] text-white/50 group-hover:text-primary group-hover:bg-primary/10 transition-all duration-200 shrink-0">
                                        <item.icon className="w-4 h-4" />
                                      </div>
                                      <div className="min-w-0 pt-0.5">
                                        <div className="font-medium text-white/90 text-sm group-hover:text-white transition-colors">
                                          {item.title}
                                        </div>
                                        <div className="text-xs text-white/40 mt-0.5 leading-relaxed">
                                          {item.description}
                                        </div>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Featured Section - Dinamik */}
                          {(featuredData?.latestPost || featuredData?.latestEvent) && (
                            <div className="mt-6 pt-6 border-t border-white/[0.06]">
                              <h4 className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-4 px-3">
                                Son Güncellemeler
                              </h4>
                              <div className="grid grid-cols-2 gap-4">
                                {featuredData?.latestPost && (
                                  <Link
                                    href={`/blog/${featuredData.latestPost.slug.current}`}
                                    onClick={() => setActiveDropdown(null)}
                                    className="group relative flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-primary/[0.08] to-transparent border border-white/[0.06] hover:border-primary/30 hover:bg-primary/[0.12] transition-all duration-300"
                                  >
                                    <div className="p-3 rounded-xl bg-primary/20 text-primary shrink-0">
                                      <Newspaper className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Son Blog</div>
                                      <div className="font-medium text-white/90 text-sm truncate group-hover:text-white transition-colors">
                                        {featuredData.latestPost.title}
                                      </div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                                  </Link>
                                )}
                                {featuredData?.latestEvent && (
                                  <Link
                                    href={`/events/${featuredData.latestEvent.slug.current}`}
                                    onClick={() => setActiveDropdown(null)}
                                    className="group relative flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-emerald-500/[0.08] to-transparent border border-white/[0.06] hover:border-emerald-500/30 hover:bg-emerald-500/[0.12] transition-all duration-300"
                                  >
                                    <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                                      <Calendar className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">Yaklaşan Etkinlik</div>
                                      <div className="font-medium text-white/90 text-sm truncate group-hover:text-white transition-colors">
                                        {featuredData.latestEvent.title}
                                      </div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                                  </Link>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* İletişim */}
              <Link
                href="/contact"
                className={`px-4 py-2 font-medium text-white/90 hover:text-white transition-colors drop-shadow-md ${scrolled ? 'text-sm' : 'text-base'}`}
              >
                İletişim
              </Link>

              {/* CTA Button */}
              <a
                href="https://chat.whatsapp.com/BTDpU4G758206p2s6JZlEc?mode=wwt"
                target="_blank"
                rel="noopener noreferrer"
                className={`ml-4 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] ${scrolled ? 'px-5 py-2 text-sm' : 'px-6 py-2.5 text-base'}`}
              >
                Kulübe Katıl
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white hover:text-primary transition-colors p-2 relative z-[101]"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-[#0a0e17] lg:hidden pt-28" // pt-28 (112px) increased from pt-20 to avoid overlap
          >
            <div className="h-full overflow-y-auto px-4 pb-10 flex flex-col">
              {/* Featured in Mobile */}
              {(featuredData?.latestPost || featuredData?.latestEvent) && (
                <div className="mb-6 space-y-3 pb-6 border-b border-white/[0.06] shrink-0">
                  {featuredData?.latestPost && (
                    <Link
                      href={`/blog/${featuredData.latestPost.slug.current}`}
                      className="flex items-center gap-3 px-4 py-3.5 bg-primary/10 rounded-2xl border border-primary/20 hover:bg-primary/15 transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="p-2.5 rounded-xl bg-primary/20">
                        <Newspaper className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-bold text-primary uppercase tracking-wider">Son Blog</div>
                        <div className="text-white/90 text-sm font-medium truncate mt-0.5">{featuredData.latestPost.title}</div>
                      </div>
                    </Link>
                  )}
                  {featuredData?.latestEvent && (
                    <Link
                      href={`/events/${featuredData.latestEvent.slug.current}`}
                      className="flex items-center gap-3 px-4 py-3.5 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 hover:bg-emerald-500/15 transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="p-2.5 rounded-xl bg-emerald-500/20">
                        <Calendar className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Yaklaşan Etkinlik</div>
                        <div className="text-white/90 text-sm font-medium truncate mt-0.5">{featuredData.latestEvent.title}</div>
                      </div>
                    </Link>
                  )}
                </div>
              )}

              {/* Menu Items */}
              <div className="space-y-1 flex-1">
                {mobileMenuItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3.5 text-white/70 hover:text-white hover:bg-white/[0.04] rounded-2xl transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="w-5 h-5 text-primary/80" />
                      <span className="font-medium text-lg">{item.title}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Footer Section */}
              <div className="mt-8 pt-6 border-t border-white/[0.06] space-y-6 shrink-0">
                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <a
                    href="https://chat.whatsapp.com/BTDpU4G758206p2s6JZlEc?mode=wwt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-primary hover:bg-primary/90 text-white px-5 py-4 rounded-2xl font-semibold transition-all shadow-lg shadow-primary/20 text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Kulübe Katıl
                  </a>
                </motion.div>

                {/* Social & Contact */}
                <div className="flex flex-col items-center gap-4 pb-6">
                  <div className="flex items-center gap-4">
                    <a 
                      href="https://www.instagram.com/startupvefinans/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-white/5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a 
                      href="https://www.linkedin.com/company/startup-ve-finans-toplulu%C4%9Fu/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-white/5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a 
                      href="https://twitter.com/startupvefinans" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-white/5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <XIcon />
                    </a>
                  </div>
                  <div className="text-center">
                    <a href="mailto:startupvefinans@gmail.com" className="text-sm text-white/50 hover:text-white/80 transition-colors">
                      startupvefinans@gmail.com
                    </a>
                    <div className="text-[10px] text-white/30 mt-2">
                      © 2025 Startup & Finans Topluluğu
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
