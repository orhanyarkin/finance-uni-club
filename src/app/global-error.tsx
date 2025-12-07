"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Instagram, MessageCircle, Mail } from "lucide-react";
import "./globals.css"; // Styles might be needed if they load critically

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="tr">
      <body className="bg-background text-text-primary">
        <main className="min-h-screen flex items-center justify-center bg-background px-4">
          <div className="text-center max-w-lg mx-auto">
            {/* Logo - Büyük */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-8">
              <Image
                src="/assets/images/club_logo.png"
                alt="Startup & Finans Kulübü"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Bakım Mesajı - Olumlu */}
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Bakımdayız
            </h1>
            <p className="text-text-secondary text-lg mb-2">
              Sizin için daha iyi bir deneyim sunmak için çalışıyoruz.
            </p>
            <p className="text-text-secondary mb-8">
              Lütfen daha sonra tekrar deneyin. 🚀
            </p>

            {/* Butonlar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => reset()}
                className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-primary/25"
              >
                Tekrar Dene
              </button>
              <a
                href="/"
                className="border border-white/20 hover:border-primary text-white hover:text-primary px-8 py-3 rounded-full font-semibold transition-all duration-300"
              >
                Ana Sayfa
              </a>
            </div>

            {/* Yardım Bölümü */}
            <div className="mt-16 pt-8 border-t border-white/10">
              <p className="text-text-secondary text-sm mb-6">
                Yardıma mı ihtiyacınız var?
              </p>
              <div className="flex justify-center gap-6">
                <a
                  href="https://www.instagram.com/startupvefinanstoplulugu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 hover:bg-pink-500/20 text-text-muted hover:text-pink-400 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://chat.whatsapp.com/BTDpU4G758206p2s6JZlEc?mode=wwt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 hover:bg-green-500/20 text-text-muted hover:text-green-400 transition-all duration-300"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-6 h-6" />
                </a>
                <a
                  href="mailto:startupvefinanstoplulugu@gmail.com"
                  className="p-3 rounded-full bg-white/5 hover:bg-primary/20 text-text-muted hover:text-primary transition-all duration-300"
                  aria-label="E-posta"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
