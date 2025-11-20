"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function PartnerLogos() {
  // Gerçek sponsor listesi - public/sponsors/sponsor/ klasöründen
  // nameless_ ile başlayanlar sadece logo, diğerleri logo + isim
  const partners = [
    { name: "Devil's Coffee Shop", logo: "Devil's Coffee Shop.png", nameless: false },
    { name: "Di Hola Coffe & Art", logo: "Di Hola Coffe & Art.png", nameless: false },
    { name: "Hamart Atölye Cafe", logo: "Hamart Atölye Cafe.png", nameless: false },
    { name: "Miniera Coffee", logo: "Miniera Coffee.png", nameless: false },
    { name: "nameless_ekleristan", logo: "nameless_ekleristan.png", nameless: true },
    { name: "nameless_fresh_pasta", logo: "nameless_fresh_pasta.png", nameless: true },
    { name: "nameless_waffle_levent", logo: "nameless_waffle_levent.png", nameless: true },
  ];

  return (
    <section className="py-12 border-y border-white/10 bg-background-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-text-secondary text-sm uppercase tracking-wider">
            İşbirliklerimiz
          </p>
        </motion.div>

        {/* Infinite Scroll Animation */}
        <div className="relative overflow-hidden">
          <motion.div
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
            className="flex space-x-12 items-center"
          >
            {/* Double the partners array for seamless loop */}
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 px-6 py-4 glass-effect rounded-xl min-w-[220px] hover:border-primary/50 hover:scale-105 transition-all duration-300 flex items-center justify-center group"
              >
                <div className="flex flex-col items-center justify-center gap-3 w-full">
                  {/* Logo */}
                  <div className="relative w-full h-20 flex items-center justify-center">
                    <Image
                      src={`/sponsors/sponsor/${partner.logo}`}
                      alt={partner.nameless ? "İşbirliği Partneri" : partner.name}
                      width={180}
                      height={80}
                      className="object-contain max-h-20 w-auto group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* İsim (sadece nameless olmayanlar için) */}
                  {!partner.nameless && (
                    <p className="text-text-secondary font-semibold text-sm text-center leading-tight">
                      {partner.name}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}






