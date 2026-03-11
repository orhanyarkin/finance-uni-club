"use client";

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
      <div className="flex items-center gap-0.5 bg-background-tertiary rounded-md p-0.5 border border-white/10">
        <div className="w-9 h-7 rounded" />
        <div className="w-9 h-7 rounded" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-0.5 bg-background-tertiary rounded-md p-0.5 border border-white/10">
      {(["tr", "en"] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`px-3 py-1 rounded text-xs font-bold transition-all duration-200 ${
            language === lang
              ? "bg-primary text-white shadow-sm"
              : "text-text-muted hover:text-white"
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
