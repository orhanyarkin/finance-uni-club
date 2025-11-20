"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, Euro, Bitcoin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Dummy data - Borsa MCP ile değiştirilecek
const marketData = {
  bist100: {
    value: "9,847.23",
    change: "+2.34%",
    trend: "up" as const,
  },
  usdtry: {
    value: "34.12",
    change: "+0.15%",
    trend: "up" as const,
  },
  eurtry: {
    value: "37.45",
    change: "-0.08%",
    trend: "down" as const,
  },
  gold: {
    value: "2,654.32",
    change: "+1.02%",
    trend: "up" as const,
  },
};

export default function FinanceWidgets() {
  const { t } = useLanguage();

  const widgets = [
    {
      title: "BIST 100",
      value: marketData.bist100.value,
      change: marketData.bist100.change,
      trend: marketData.bist100.trend,
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "USD/TRY",
      value: `₺${marketData.usdtry.value}`,
      change: marketData.usdtry.change,
      trend: marketData.usdtry.trend,
      icon: DollarSign,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "EUR/TRY",
      value: `₺${marketData.eurtry.value}`,
      change: marketData.eurtry.change,
      trend: marketData.eurtry.trend,
      icon: Euro,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Altın (Ons)",
      value: `$${marketData.gold.value}`,
      change: marketData.gold.change,
      trend: marketData.gold.trend,
      icon: Bitcoin,
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">{t("finance.title")}</span>
          </h2>
          <p className="text-lg text-text-secondary">
            {t("finance.subtitle")}
          </p>
          <p className="text-sm text-text-muted mt-2">
            Son güncelleme: {new Date().toLocaleTimeString("tr-TR")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {widgets.map((widget, index) => {
            const Icon = widget.icon;
            const TrendIcon = widget.trend === "up" ? TrendingUp : TrendingDown;
            const trendColor = widget.trend === "up" ? "text-green-500" : "text-red-500";

            return (
              <motion.div
                key={widget.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect rounded-xl p-6 hover-lift group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`bg-gradient-to-r ${widget.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <TrendIcon className={`w-5 h-5 ${trendColor}`} />
                </div>

                <h3 className="text-text-secondary text-sm font-medium mb-2">
                  {widget.title}
                </h3>

                <div className="flex items-end justify-between">
                  <div className="text-2xl font-bold text-text-primary">
                    {widget.value}
                  </div>
                  <div className={`text-sm font-semibold ${trendColor}`}>
                    {widget.change}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-text-muted">
            📊 Veriler yalnızca bilgilendirme amaçlıdır. Yatırım kararları alırken profesyonel danışmanlık alınız.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

