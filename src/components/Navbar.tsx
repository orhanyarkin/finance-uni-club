"use client";

import { useState, useEffect } from "react";
import { Menu, X, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { title: "Ana Sayfa", href: "/" },
    { title: "Hakkımızda", href: "/about" },
    { title: "Etkinliklerimiz", href: "/events" },
    { title: "İşbirliklerimiz", href: "/partnerships" },
    { title: "İletişim", href: "/contact" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-background/90 backdrop-blur-lg border-b border-white/10 py-3 shadow-lg" 
          : "bg-background/60 backdrop-blur-md py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-14 h-14 overflow-hidden shrink-0">
              <Image
                src="/assets/images/club_logo.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-bold text-lg tracking-tight text-white group-hover:text-primary transition-colors">
              Startup & Finans Topluluğu
            </span>
          </Link>

          {/* Desktop Menu - Clean Links */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  {item.title}
                </Link>
              </motion.div>
            ))}
            
            {/* Language Toggle Removed */}
            
            <motion.a
              href="https://chat.whatsapp.com/BTDpU4G758206p2s6JZlEc?mode=wwt"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40"
            >
              Kulübe Katıl
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-text-primary hover:text-primary transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-text-muted/10"
          >
            <div className="px-4 pt-2 pb-4 space-y-3">
              <div className="relative w-20 h-20 shrink-0">
                <Image 
                  src="/assets/images/club_logo.png" 
                  alt="Startup & Finans Kulübü Logo" 
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="block px-4 py-3 text-text-secondary hover:text-text-primary hover:bg-text-primary/5 rounded-lg transition-all font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              
              
              
              <a
                href="https://chat.whatsapp.com/BTDpU4G758206p2s6JZlEc?mode=wwt"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center text-text-primary border border-text-primary/20 hover:border-primary hover:text-primary px-5 py-3 rounded-lg font-medium transition-all"
              >
                {t("nav.joinClub")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}






