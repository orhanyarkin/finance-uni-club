"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Calendar, TrendingUp, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

interface StatItem {
  icon: React.ElementType;
  value: string;
  labelKey: string;
  descKey: string;
}

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState(0);

  const match = value.match(/^(\d+)(.*)$/);
  const targetNum = match ? parseInt(match[1]) : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    if (!isInView) return;

    const duration = 1400;
    const startTime = performance.now();

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * targetNum));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, targetNum]);

  return (
    <div ref={ref} className="text-4xl font-bold text-text-primary mb-2 tabular-nums">
      {displayed}{suffix}
    </div>
  );
}

export default function Stats() {
  const { t } = useLanguage();

  const stats: StatItem[] = [
    {
      icon: Users,
      value: "500+",
      labelKey: "stats.members",
      descKey: "stats.members.desc",
    },
    {
      icon: Calendar,
      value: "20+",
      labelKey: "stats.events",
      descKey: "stats.events.desc",
    },
    {
      icon: TrendingUp,
      value: "2+",
      labelKey: "stats.experience",
      descKey: "stats.experience.desc",
    },
    {
      icon: Award,
      value: "10+",
      labelKey: "stats.partnerships",
      descKey: "stats.partnerships.desc",
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-background-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Link href="/about" className="group inline-block mb-4">
            <h2 className="text-4xl md:text-5xl font-bold transition-colors group-hover:text-primary">
              {t("stats.title").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="gradient-text">{t("stats.title").split(" ").slice(-1)}</span>
              <motion.span
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="inline-flex align-middle ml-3"
              >
                <ArrowRight className="w-8 h-8 sm:w-10 sm:h-10 text-primary group-hover:translate-x-2 transition-transform duration-300" />
              </motion.span>
            </h2>
          </Link>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            {t("stats.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 hover:shadow-xl hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <AnimatedCounter value={stat.value} />
                <div className="text-lg font-semibold text-text-primary mb-1">
                  {t(stat.labelKey)}
                </div>
                <div className="text-sm text-text-secondary">
                  {t(stat.descKey)}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
