"use client";

import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Kulübe nasıl üye olabilirim?",
    answer: "WhatsApp grubumuz üzerinden bize katılabilirsiniz. Üyelik ücretsizdir ve tüm öğrencilere açıktır. Etkinliklerimize katılarak aktif üye olabilirsiniz."
  },
  {
    question: "Etkinlikler ücretsiz mi?",
    answer: "Evet, tüm etkinliklerimiz kulüp üyelerine ve üniversite öğrencilerine ücretsizdir. Bazı özel workshoplar için kayıt gerekebilir."
  },
  {
    question: "Hangi üniversiteden öğrenciler katılabilir?",
    answer: "Etkinliklerimiz tüm üniversitelerin öğrencilerine açıktır. Finans ve girişimcilik alanına ilgi duyan herkes aramıza katılabilir."
  },
  {
    question: "Sponsorluklarınız nasıl çalışıyor?",
    answer: "Partnerlerimiz üyelerimize özel indirimler ve fırsatlar sunuyor. Detaylı bilgi için İşbirliklerimiz sayfamızı ziyaret edebilirsiniz."
  },
  {
    question: "Yönetim kuruluna nasıl başvurabilirim?",
    answer: "Her akademik yılın başında yeni üye alımları gerçekleştiriyoruz. Başvuru dönemlerini Instagram hesabımızdan takip edebilirsiniz."
  },
  {
    question: "Etkinlik önerisi yapabilir miyim?",
    answer: "Tabii ki! Etkinlik önerilerinizi WhatsApp grubumuzdan veya e-posta ile bizimle paylaşabilirsiniz. Tüm öneriler değerlendirilir."
  },
];

export default function SSSPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen pt-20">
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Sıkça Sorulan Sorular</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Kulübümüz hakkında merak ettiklerinizi burada bulabilirsiniz
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#0B0F1A] border border-white/10 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </span>
                  <div className="shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-primary" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-text-secondary" />
                    )}
                  </div>
                </button>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-5"
                  >
                    <p className="text-text-secondary leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Sorunuz mu var?
              </h3>
              <p className="text-text-secondary mb-6">
                Burada cevabını bulamadığınız sorularınız için bize ulaşabilirsiniz
              </p>
              <a
                href="https://chat.whatsapp.com/BTDpU4G758206p2s6JZlEc?mode=wwt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover-lift"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp'tan Sor
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
