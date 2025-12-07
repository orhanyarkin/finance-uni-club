"use client";

import { Mail, Instagram, MessageCircle, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    club: [
      { title: "Hakkımızda", href: "/about" },
      { title: "Etkinlikler", href: "/events" },
      { title: "Ekibimiz", href: "/about#team" },
      { title: "İletişim", href: "https://chat.whatsapp.com/BTDpU4G758206p2s6JZlEc?mode=wwt", external: true },
    ],
    resources: [
      { title: "Blog", href: "/blog" },
      { title: "Haberler", href: "#", comingSoon: true },
      { title: "SSS", href: "/sss" },
      { title: "Kaynaklar", href: "#", comingSoon: true },
    ],
    legal: [
      { title: "Gizlilik Politikası", href: "/legal/privacy" },
      { title: "Kullanım Şartları", href: "/legal/terms" },
      { title: "Çerez Politikası", href: "/legal/cookies" },
    ],
  };

  return (
    <footer id="contact" className="bg-black border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand with Club Logo */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6 group">
              <div className="relative w-12 h-12 overflow-hidden shrink-0">
                <Image
                  src="/assets/images/club_logo.png"
                  alt="Startup & Finans Topluluğu Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                Startup & Finans
              </span>
            </Link>
            <p className="text-slate-400 mb-6 leading-relaxed font-normal text-sm">
              Girişimcilik ve finans dünyasında kariyer yapmak isteyen öğrencilerin 
              buluşma noktası. Geleceği birlikte inşa ediyoruz.
            </p>
            <a 
              href="https://maps.app.goo.gl/syUu7YhmeRPrmfjG7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 text-slate-400 hover:text-white transition-colors mb-6 text-sm group/address"
            >
              <MapPin className="w-5 h-5 shrink-0 text-primary group-hover/address:text-red-500 transition-colors" />
              <span>Hacı Bayram, Talatpaşa Blv No: 4, 06050 Altındağ/Ankara</span>
            </a>
            <div className="flex space-x-4">
              <a
                href="https://maps.app.goo.gl/syUu7YhmeRPrmfjG7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-red-500 transition-colors"
                aria-label="Konum"
              >
                <MapPin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/startupvefinanstoplulugu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://chat.whatsapp.com/BTDpU4G758206p2s6JZlEc?mode=wwt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-green-500 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="mailto:startupvefinanstoplulugu@gmail.com"
                className="text-slate-500 hover:text-white transition-colors"
                aria-label="E-posta"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links - Kulübümüz */}
          <div>
            <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-wider">Kulübümüz</h4>
            <ul className="space-y-3">
              {footerLinks.club.map((link) => (
                <li key={link.title}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-primary transition-colors text-sm"
                    >
                      {link.title}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-primary transition-colors text-sm"
                    >
                      {link.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Links - Kaynaklar */}
          <div>
            <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-wider">Kaynaklar</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.title}>
                  {link.comingSoon ? (
                    <span className="text-slate-600 text-sm cursor-not-allowed">
                      {link.title} <span className="text-xs">(Yakında)</span>
                    </span>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-primary transition-colors text-sm"
                    >
                      {link.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Links - Yasal */}
          <div>
            <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-wider">Yasal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-primary transition-colors text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-500 text-sm">
              © {currentYear} Startup ve Finans Kulübü. Tüm hakları saklıdır.
            </p>
            <p className="text-slate-500 text-sm flex items-center gap-1">
              Made with <span className="text-red-500">❤️</span> by Startup ve Finans Kulübü
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
