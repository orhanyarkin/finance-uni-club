"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mail, Instagram, MapPin, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();

  const contactMethods = [
    {
      icon: Instagram,
      title: "Instagram",
      descKey: "contact.instagram.desc",
      actionKey: "contact.instagram.action",
      href: "https://www.instagram.com/startupvefinanstoplulugu",
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
      hoverBg: "hover:bg-pink-500/20",
      borderColor: "hover:border-pink-500/50"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      descKey: "contact.whatsapp.desc",
      actionKey: "contact.whatsapp.action",
      href: "https://chat.whatsapp.com/BTDpU4G758206p2s6JZlEc?mode=wwt",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      hoverBg: "hover:bg-green-500/20",
      borderColor: "hover:border-green-500/50"
    },
    {
      icon: Mail,
      title: "E-Posta",
      descKey: "contact.email.desc",
      actionKey: "contact.email.action",
      href: "mailto:startupvefinanstoplulugu@gmail.com",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      hoverBg: "hover:bg-blue-500/20",
      borderColor: "hover:border-blue-500/50"
    }
  ];

  return (
    <main className="min-h-screen pt-36 sm:pt-40 pb-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t("contact.title")} <span className="gradient-text">{t("contact.titleHighlight")}</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={method.title}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group bg-[#0B0F1A] border border-white/10 rounded-2xl p-8 hover-lift transition-all duration-300 ${method.borderColor}`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${method.bgColor} ${method.hoverBg}`}>
                  <Icon className={`w-7 h-7 ${method.color}`} />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {method.title}
                </h3>

                <p className="text-text-secondary mb-6 min-h-[48px]">
                  {t(method.descKey)}
                </p>

                <div className="flex items-center gap-2 font-medium text-white group-hover:gap-3 transition-all">
                  {t(method.actionKey)}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Location Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Address Info */}
          <div className="glass-effect rounded-2xl p-8 border border-white/10 flex flex-col justify-center">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-lg shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{t("contact.visitUs")}</h3>
                <p className="text-lg text-text-secondary mb-1 font-medium">
                  Ankara Medipol Üniversitesi
                </p>
                <p className="text-text-muted leading-relaxed">
                  Hacı Bayram, Talatpaşa Blv No: 4<br />
                  06050 Altındağ/Ankara
                </p>
              </div>
            </div>

            <a
              href="https://maps.app.goo.gl/y5GoEkxUSQptrFq29"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white/5 hover:bg-white/10 text-white py-4 rounded-xl font-medium transition-all duration-300 border border-white/10 flex items-center justify-center gap-2 group"
            >
              <span>{t("contact.getDirections")}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Map Widget */}
          <div className="h-[300px] lg:h-auto min-h-[300px] rounded-2xl overflow-hidden border border-white/10 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3059.252024719821!2d32.8429090771887!3d39.935751984771144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f344bac7d2b%3A0xe6e6907e384e6350!2sAnkara%20Medipol%20%C3%9Cniversitesi%20Merkez%20Kamp%C3%BCs!5e0!3m2!1str!2str!4v1765226042962!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
