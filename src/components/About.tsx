"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="pb-24 bg-background-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t("about.title")}
            </h2>
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              {t("about.desc1")}
            </p>
            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              {t("about.desc2")}
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t("about.mission.title")}</h3>
                  <p className="text-text-secondary">
                    {t("about.mission.desc")}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t("about.vision.title")}</h3>
                  <p className="text-text-secondary">
                    {t("about.vision.desc")}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t("about.values.title")}</h3>
                  <p className="text-text-secondary">
                    {t("about.values.desc")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="glass-effect rounded-2xl p-8 space-y-6">
              <div className="bg-gradient-to-br from-primary to-accent-cyan rounded-xl p-8 text-center">
                <div className="text-6xl font-bold text-white mb-2">2023</div>
                <div className="text-xl text-white/80">{t("about.founded")}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background-tertiary rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">2+</div>
                  <div className="text-sm text-text-secondary">{t("about.yearsExp")}</div>
                </div>
                <div className="bg-background-tertiary rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">20+</div>
                  <div className="text-sm text-text-secondary">{t("about.eventsCount")}</div>
                </div>
                <div className="bg-background-tertiary rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-text-secondary">{t("about.membersCount")}</div>
                </div>
                <div className="bg-background-tertiary rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">10+</div>
                  <div className="text-sm text-text-secondary">{t("about.partnershipsCount")}</div>
                </div>
              </div>

              <div className="bg-background-tertiary rounded-xl p-6">
                <p className="text-xl text-text-muted italic max-w-2xl mx-auto border-l-4 border-primary pl-4 py-2 bg-white/5 rounded-r-xl">
                  &quot;{t("about.quote")}&quot;
                </p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent-cyan/20 rounded-full blur-2xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
