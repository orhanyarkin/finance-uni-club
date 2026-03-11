"use client";

import { useEffect } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";

/** Syncs <html lang="..."> with the selected language so CSS text-transform
 *  uppercase uses the correct locale rules (avoids Turkish İ in English mode). */
function LangSync() {
  const { language } = useLanguage();
  useEffect(() => {
    document.documentElement.lang = language === "tr" ? "tr" : "en";
  }, [language]);
  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <LanguageProvider>
        <LangSync />
        {children}
      </LanguageProvider>
    </ThemeProvider>
  );
}

