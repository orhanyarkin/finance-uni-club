"use client";

import { motion } from "framer-motion";
import { Lightbulb, Users2, BookOpen, Rocket, Network, Trophy } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Lightbulb,
      title: "Workshop ve Eğitimler",
      description: "Girişimcilik, yatırım, blockchain ve fintech konularında uzmanlardan eğitimler alın.",
    },
    {
      icon: Users2,
      title: "Networking Etkinlikleri",
      description: "Sektör profesyonelleri, girişimciler ve yatırımcılarla tanışma fırsatı yakalayın.",
    },
    {
      icon: BookOpen,
      title: "Mentörlük Programı",
      description: "Deneyimli mentörlerden birebir rehberlik alarak kariyer yolculuğunuzu hızlandırın.",
    },
    {
      icon: Rocket,
      title: "Startup Projelerine Destek",
      description: "Kendi startup projenizi hayata geçirmek için gerekli destek ve kaynakları bulun.",
    },
    {
      icon: Network,
      title: "Sektör Bağlantıları",
      description: "Finans ve teknoloji sektöründeki lider şirketlerle iş birliği imkanları.",
    },
    {
      icon: Trophy,
      title: "Yarışma ve Hackathonlar",
      description: "Yeteneklerinizi sergileyin, ödüller kazanın ve kariyerinize değer katın.",
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
            Neler <span className="gradient-text">Sunuyoruz?</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Üyelerimize sağladığımız fırsatlar ve imkanlar
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
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
                  {feature.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}









