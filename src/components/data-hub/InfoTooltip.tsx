"use client";

import { Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface InfoTooltipProps {
  indicatorKey: string;
  source?: "evds" | "worldbank";
}

export default function InfoTooltip({ indicatorKey, source }: InfoTooltipProps) {
  const { t, language } = useLanguage();

  const desc = t(`datahub.ind.${indicatorKey}.info.desc`);
  const freq = t(`datahub.ind.${indicatorKey}.info.freq`);

  // If no translation found, don't render
  if (!desc || desc === `datahub.ind.${indicatorKey}.info.desc`) return null;

  const sourceLabel =
    source === "worldbank"
      ? "World Bank WDI"
      : source === "evds"
      ? language === "tr" ? "TCMB EVDS3" : "CBRT EVDS3"
      : null;

  const freqLabel = language === "tr" ? "Güncelleme" : "Frequency";
  const sourceTitle = language === "tr" ? "Kaynak" : "Source";

  return (
    <span className="relative group inline-flex items-center ml-1.5">
      <Info className="w-3.5 h-3.5 text-slate-500 hover:text-slate-300 transition-colors cursor-default flex-shrink-0" />
      {/* Tooltip card */}
      <span
        className="
          pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30
          w-64 opacity-0 group-hover:opacity-100
          transition-opacity duration-150
        "
      >
        <span className="block bg-[#0a1929] border border-white/[0.10] rounded shadow-2xl p-3.5 text-left">
          <span className="block text-[11px] text-slate-200 leading-relaxed mb-3">{desc}</span>
          <span className="block space-y-2 border-t border-white/[0.07] pt-2.5">
            <span className="flex items-start gap-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 w-16 shrink-0 mt-px">{freqLabel}</span>
              <span className="font-mono text-[10px] text-slate-300 leading-snug">{freq}</span>
            </span>
            {sourceLabel && (
              <span className="flex items-start gap-2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 w-16 shrink-0 mt-px">{sourceTitle}</span>
                <span className="font-mono text-[10px] text-slate-300 leading-snug">{sourceLabel}</span>
              </span>
            )}
          </span>
        </span>
        {/* Caret */}
        <span className="block w-2 h-2 bg-[#0a1929] border-r border-b border-white/[0.10] rotate-45 mx-auto -mt-1" />
      </span>
    </span>
  );
}
