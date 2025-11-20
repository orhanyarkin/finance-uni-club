"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 bg-background-secondary/50">
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
              Hakkımızda
            </h2>
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              Startup ve Finans Topluluğu, girişimcilik ruhu taşıyan ve finans dünyasına ilgi duyan 
              üniversite öğrencilerinin bir araya geldiği dinamik bir topluluktur.
            </p>
            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              2023 yılında kurulan topluluğumuz, bugüne kadar 200'den fazla öğrenciye ulaşmış 
              ve 30'dan fazla başarılı etkinlik düzenlemiştir. Amacımız, üyelerimize teorik bilginin 
              yanı sıra pratik deneyim kazandırmak ve sektör ile güçlü bağlantılar kurmalarına 
              yardımcı olmaktır.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Misyonumuz</h3>
                  <p className="text-text-secondary">
                    Öğrencilere girişimcilik ve finans alanında kaliteli eğitim, mentörlük ve 
                    networking imkanları sunarak kariyer gelişimlerine katkı sağlamak.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Vizyonumuz</h3>
                  <p className="text-text-secondary">
                    Türkiye'nin en etkili öğrenci topluluklarından biri olarak, geleceğin 
                    girişimcilerini ve finans liderlerini yetiştirmek.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Değerlerimiz</h3>
                  <p className="text-text-secondary">
                    Yenilikçilik, iş birliği, sürekli öğrenme ve topluma değer katma 
                    ilkelerini benimsiyoruz.
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
                <div className="text-xl text-white/80">Kuruluş Yılımız</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background-tertiary rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">2+</div>
                  <div className="text-sm text-text-secondary">Yıllık Deneyim</div>
                </div>
                <div className="bg-background-tertiary rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">30+</div>
                  <div className="text-sm text-text-secondary">Etkinlik</div>
                </div>
                <div className="bg-background-tertiary rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">200+</div>
                  <div className="text-sm text-text-secondary">Toplam Üye</div>
                </div>
                <div className="bg-background-tertiary rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">10+</div>
                  <div className="text-sm text-text-secondary">İşbirliklerimiz</div>
                </div>
              </div>

              <div className="bg-background-tertiary rounded-xl p-6">
                <p className="text-text-secondary text-center italic">
                  "Geleceği şekillendiren öğrencilerin buluşma noktası"
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






