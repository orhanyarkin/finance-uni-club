"use client";

import { useState, useEffect, useRef } from "react";
import { animate } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import InfoTooltip from "@/components/data-hub/InfoTooltip";

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
  /** If set, renders an InfoTooltip icon next to the label */
  indicatorKey?: string;
  tooltipSource?: "evds" | "worldbank";
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
  indicatorKey,
  tooltipSource,
}: KPICardProps) {
  const [displayValue, setDisplayValue] = useState<number | null>(null);
  const prevValueRef = useRef<number>(0);

  useEffect(() => {
    if (value === null) {
      setDisplayValue(null);
      return;
    }
    const from = prevValueRef.current;
    prevValueRef.current = value;
    const controls = animate(from, value, {
      duration: 1.0,
      ease: "easeOut",
      onUpdate: (v) => setDisplayValue(v),
    });
    return controls.stop;
  }, [value]);

  if (loading) {
    return (
      <div className="bg-slate-900/80 border border-white/[0.07] rounded p-4 animate-pulse">
        <div className="h-2.5 bg-slate-800 rounded w-2/3 mb-3" />
        <div className="h-8 bg-slate-800 rounded w-1/2 mb-2" />
        <div className="h-2.5 bg-slate-800 rounded w-1/3" />
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
    <div className="bg-slate-900/80 border border-white/[0.07] rounded p-4 hover:border-blue-500/25 transition-colors">
      {/* Header */}
      <div className="flex items-center gap-1 mb-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500 leading-tight">
          {label}
        </span>
        {indicatorKey && (
          <InfoTooltip indicatorKey={indicatorKey} source={tooltipSource} />
        )}
      </div>

      {/* Value */}
      <div className={`text-3xl font-bold tracking-tight ${getColor()} leading-none mb-1`}>
        {displayValue === null ? (
          <span className="text-slate-500 text-2xl">—</span>
        ) : (
          <>
            {formatValue(displayValue, unit, locale)}
            {unit && <span className="font-mono text-sm font-normal text-slate-400 ml-1.5">{unit}</span>}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-2">
        {year && <span className="font-mono text-[10px] text-slate-500">{year}</span>}
        {change !== null && change !== undefined && ChangeIcon && (
          <span className={`flex items-center gap-0.5 font-mono text-[10px] ${getChangeColor(change)}`}>
            <ChangeIcon className="w-3 h-3" />
            {Math.abs(change).toFixed(2)}%
          </span>
        )}
      </div>
    </div>
  );
}
