"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  label: string;
  value: number | null;
  unit: string;
  year?: number | string;
  change?: number | null;
  live?: boolean;
  loading?: boolean;
  locale?: string;
  /** Force color regardless of value sign */
  colorMode?: "positive" | "negative" | "neutral" | "auto";
}

function formatValue(value: number, unit: string, locale: string): string {
  if (unit === "₺" || unit === "USD" || unit === "B USD" || unit === "Milyar USD") {
    return new Intl.NumberFormat(locale, {
      maximumFractionDigits: unit === "₺" ? 4 : 2,
      minimumFractionDigits: 2,
    }).format(value);
  }
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value);
}

export default function KPICard({
  label,
  value,
  unit,
  year,
  change,
  live = false,
  loading = false,
  locale = "tr-TR",
  colorMode = "auto",
}: KPICardProps) {
  if (loading) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 animate-pulse">
        <div className="h-3 bg-slate-700 rounded w-2/3 mb-3" />
        <div className="h-7 bg-slate-700 rounded w-1/2 mb-2" />
        <div className="h-3 bg-slate-700 rounded w-1/3" />
      </div>
    );
  }

  const getColor = () => {
    if (colorMode === "positive") return "text-emerald-400";
    if (colorMode === "negative") return "text-rose-400";
    if (colorMode === "neutral") return "text-slate-100";
    if (value === null) return "text-slate-400";
    if (value > 0) return "text-emerald-400";
    if (value < 0) return "text-rose-400";
    return "text-slate-100";
  };

  const getChangeColor = (ch: number) => {
    if (ch > 0) return "text-emerald-400";
    if (ch < 0) return "text-rose-400";
    return "text-slate-400";
  };

  const ChangeIcon = change == null ? null : change > 0 ? TrendingUp : change < 0 ? TrendingDown : Minus;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 hover:border-slate-600 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-slate-400 leading-tight">{label}</span>
        {live && (
          <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            LIVE
          </span>
        )}
      </div>

      {/* Value */}
      <div className={`text-2xl font-bold ${getColor()} leading-none mb-1`}>
        {value === null ? (
          <span className="text-slate-500 text-base">—</span>
        ) : (
          <>
            {formatValue(value, unit, locale)}
            {unit && <span className="text-sm font-normal text-slate-400 ml-1">{unit}</span>}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-2">
        {year && <span className="text-[10px] text-slate-500">{year}</span>}
        {change !== null && change !== undefined && ChangeIcon && (
          <span className={`flex items-center gap-0.5 text-xs font-medium ${getChangeColor(change)}`}>
            <ChangeIcon className="w-3 h-3" />
            {Math.abs(change).toFixed(2)}%
          </span>
        )}
      </div>
    </div>
  );
}
