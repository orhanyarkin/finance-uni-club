"use client";

import { TrendingUp, Mail, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { title: "Hakkımızda", href: "#about" },
      { title: "Etkinlikler", href: "#events" },
      { title: "Ekibimiz", href: "#team" },
      { title: "İletişim", href: "#contact" },
    ],
    resources: [
      { title: "Blog", href: "#" },
      { title: "Haberler", href: "#" },
      { title: "SSS", href: "#" },
      { title: "Kaynaklar", href: "#" },
    ],
    legal: [
      { title: "Gizlilik Politikası", href: "#" },
      { title: "Kullanım Şartları", href: "#" },
      { title: "Çerez Politikası", href: "#" },
    ],
  };

  return (
    <footer id="contact" className="bg-background-secondary border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-primary p-2 rounded-lg glow-effect">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Startup & Finans</h3>
                <p className="text-sm text-text-secondary">Kulübü</p>
              </div>
            </div>
            <p className="text-text-secondary mb-6 leading-relaxed">
              Girişimcilik ve finans dünyasında kariyer yapmak isteyen öğrencilerin 
              buluşma noktası. Geleceği birlikte inşa ediyoruz.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/startupvefinanstoplulugu"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background-tertiary hover:bg-primary p-3 rounded-lg transition-all duration-300 hover-lift"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background-tertiary hover:bg-primary p-3 rounded-lg transition-all duration-300 hover-lift"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background-tertiary hover:bg-primary p-3 rounded-lg transition-all duration-300 hover-lift"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:startupvefinanstoplulugu@gmail.com"
                className="bg-background-tertiary hover:bg-primary p-3 rounded-lg transition-all duration-300 hover-lift"
                aria-label="E-posta"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links - Kurumsal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kurumsal</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links - Kaynaklar */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kaynaklar</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links - Yasal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Yasal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="glass-effect rounded-xl p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h4 className="text-2xl font-bold mb-2">Bültene Abone Ol</h4>
              <p className="text-text-secondary">
                Etkinlikler ve haberlerden haberdar olmak için e-posta adresinizi bırakın.
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 bg-background-tertiary border border-white/10 rounded-lg px-4 py-3 text-white placeholder-text-muted focus:outline-none focus:border-primary transition-colors"
              />
              <a
                href="https://chat.whatsapp.com/BTDpU4G758206p2s6JZlEc?mode=wwt"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover-lift whitespace-nowrap"
              >
                Kulübe Katıl
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-text-secondary text-sm">
              © {currentYear} Startup ve Finans Kulübü. Tüm hakları saklıdır.
            </p>
            <p className="text-text-secondary text-sm">
              Made with ❤️ by Startup ve Finans Kulübü
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}






