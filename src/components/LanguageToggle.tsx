"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-14 h-8 bg-background-tertiary rounded-full border border-white/10" />
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setLanguage(language === "tr" ? "en" : "tr")}
      className="relative w-14 h-8 bg-background-tertiary rounded-full p-1 transition-colors duration-300 border border-white/10 flex items-center justify-between px-2"
      aria-label="Toggle language"
    >
      <motion.div
        className="absolute inset-1 w-6 h-6 bg-primary rounded-full"
        initial={false}
        animate={{
          x: language === "tr" ? 0 : 20,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      <span className={`text-xs font-bold z-10 ${language === "tr" ? "text-white" : "text-text-muted"}`}>
        TR
      </span>
      <span className={`text-xs font-bold z-10 ${language === "en" ? "text-white" : "text-text-muted"}`}>
        EN
      </span>
    </motion.button>
  );
}

