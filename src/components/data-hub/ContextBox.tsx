"use client";

import { Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ContextBoxProps {
  indicatorKey: string;
}

export default function ContextBox({ indicatorKey }: ContextBoxProps) {
  const { t } = useLanguage();

  const titleKey = `datahub.ctx.${indicatorKey}.title`;
  const bodyKey = `datahub.ctx.${indicatorKey}.body`;

  const title = t(titleKey);
  const body = t(bodyKey);

  // If no context available for this indicator, don't render
  if (title === titleKey || body === bodyKey) return null;

  return (
    <div className="bg-slate-900/60 border border-white/[0.07] rounded p-5">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded bg-blue-500/10 text-blue-400 shrink-0 mt-0.5">
          <Info className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-200 mb-1">{title}</h4>
          <p className="text-sm text-slate-400 leading-relaxed">{body}</p>
        </div>
      </div>
    </div>
  );
}
