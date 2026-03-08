"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe, Flag } from "lucide-react";
import { motion } from "framer-motion";

export default function DataHubLayout({ children }: { children: React.ReactNode }) {
  const { t, language } = useLanguage();
  const pathname = usePathname();

  const tabs = [
    { href: "/data-hub/turkey", label: t("datahub.tab.turkey"), icon: Flag },
    { href: "/data-hub/global", label: t("datahub.tab.global"), icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-[#05101e] pt-40 sm:pt-36 pb-16" lang={language === "tr" ? "tr" : "en"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation — spring-animated sliding pill */}
        <div className="flex justify-center mb-8">
          <div className="relative flex border border-white/[0.07] p-1 rounded bg-slate-900/60 gap-0">
            {tabs.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-medium transition-colors ${
                    isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="tab-pill"
                      className="absolute inset-0 bg-blue-600/80 rounded-sm shadow-lg shadow-blue-900/30"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
