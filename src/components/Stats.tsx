"use client";

import { motion } from "framer-motion";
import { Users, Calendar, TrendingUp, Award } from "lucide-react";

export default function Stats() {
  const stats = [
    {
      icon: Users,
      value: "200+",
      label: "Toplam Üye",
      description: "Farklı bölümlerden öğrenciler",
    },
    {
      icon: Calendar,
      value: "30+",
      label: "Düzenlenen Etkinlik",
      description: "Workshop, seminer ve networking",
    },
    {
      icon: TrendingUp,
      value: "2+",
      label: "Yıllık Deneyim",
      description: "2023'ten beri aktif",
    },
    {
      icon: Award,
      value: "10+",
      label: "İşbirliklerimiz",
      description: "Sektör liderleri ile partnerlikler",
    },
  ];

  return (
    <section className="py-24 bg-background-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Rakamlarla <span className="gradient-text">Kulübümüz</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Başarılarımız ve büyüyen topluluğumuz hakkında bilgiler
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect rounded-xl p-8 hover-lift group"
              >
                <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <div className="text-4xl font-bold text-text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-text-primary mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-text-secondary">
                  {stat.description}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}






