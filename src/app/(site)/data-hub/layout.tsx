"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe, Flag } from "lucide-react";

export default function DataHubLayout({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  const pathname = usePathname();

  const tabs = [
    { href: "/data-hub/global", label: t("datahub.tab.global"), icon: Globe },
    { href: "/data-hub/turkey", label: t("datahub.tab.turkey"), icon: Flag },
  ];

  return (
    <div className="min-h-screen bg-slate-900 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="flex gap-1.5 mb-8 bg-slate-800/60 p-1.5 rounded-2xl w-fit border border-slate-700/60">
          {tabs.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </div>

        {children}
      </div>
    </div>
  );
}
