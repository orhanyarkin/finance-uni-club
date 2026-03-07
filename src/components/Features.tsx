"use client";

import { motion } from "framer-motion";
import { Lightbulb, Users2, BookOpen, Rocket, Network, Tag } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Features() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Lightbulb,
      titleKey: "features.workshops.title",
      descKey: "features.workshops.desc",
    },
    {
      icon: Users2,
      titleKey: "features.networking.title",
      descKey: "features.networking.desc",
    },
    {
      icon: BookOpen,
      titleKey: "features.mentorship.title",
      descKey: "features.mentorship.desc",
    },
    {
      icon: Rocket,
      titleKey: "features.startup.title",
      descKey: "features.startup.desc",
    },
    {
      icon: Network,
      titleKey: "features.industry.title",
      descKey: "features.industry.desc",
    },
    {
      icon: Tag,
      titleKey: "features.discounts.title",
      descKey: "features.discounts.desc",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("features.title1")} <span className="gradient-text">{t("features.title2")}</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            {t("features.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect rounded-xl p-8 hover-lift group"
              >
                <div className="bg-gradient-to-br from-primary to-accent-cyan w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {t(feature.descKey)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
