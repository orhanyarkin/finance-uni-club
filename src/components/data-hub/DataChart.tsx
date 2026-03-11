"use client";

import { useId, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  BarChart,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
} from "recharts";
import { DataPoint } from "@/lib/worldbank";

interface SeriesConfig {
  dataKey: string;
  color: string;
  label: string;
  yAxisId?: "left" | "right";
}

/** Multi-series item for togglable multi-line charts (e.g. reserves breakdown) */
export interface MultiSeriesItem {
  data: DataPoint[];
  color: string;
  label: string;
}

interface DataChartProps {
  data?: DataPoint[];
  /** Second series for dual-axis charts */
  data2?: DataPoint[];
  /** Multi-series mode: renders N lines with toggle badges. When provided, data/data2 are ignored. */
  multiSeries?: MultiSeriesItem[];
  type?: "line" | "bar";
  series?: SeriesConfig[];
  color?: string;
  unit?: string;
  unit2?: string;
  label?: string;
  label2?: string;
  dualAxis?: boolean;
  locale?: string;
  loading?: boolean;
  height?: number;
  /** "year" = WB annual data (year numbers), "timestamp" = EVDS ms timestamps */
  dateMode?: "year" | "timestamp";
}

const DEFAULT_COLOR = "#60A5FA"; // blue-400
const SECONDARY_COLOR = "#F59E0B"; // amber-400

function mergeMultiSeries(series: MultiSeriesItem[]): Record<string, unknown>[] {
  const map: Record<number, Record<string, unknown>> = {};
  series.forEach((s, i) => {
    const key = `s${i}`;
    s.data.forEach((p) => {
      if (!map[p.year]) map[p.year] = { year: p.year };
      map[p.year][key] = p.value;
    });
  });
  return Object.values(map).sort((a, b) => (a.year as number) - (b.year as number));
}

function mergeData(primary: DataPoint[], secondary?: DataPoint[]): Record<string, unknown>[] {
  if (!secondary) return primary.map((p) => ({ year: p.year, primary: p.value }));

  const map: Record<number, Record<string, unknown>> = {};
  primary.forEach((p) => { map[p.year] = { year: p.year, primary: p.value }; });
  secondary.forEach((p) => {
    if (map[p.year]) { map[p.year].secondary = p.value; }
    else { map[p.year] = { year: p.year, secondary: p.value }; }
  });
  return Object.values(map).sort((a, b) => (a.year as number) - (b.year as number));
}

export default function DataChart({
  data,
  data2,
  multiSeries,
  type = "line",
  color = DEFAULT_COLOR,
  unit = "",
  unit2 = "",
  label = "Value",
  label2 = "Value 2",
  dualAxis = false,
  locale = "tr-TR",
  loading = false,
  height = 280,
  dateMode = "year",
}: DataChartProps) {
  // Unique IDs to avoid SVG gradient conflicts when multiple charts render simultaneously
  const uid = useId().replace(/:/g, "");
  const gradPrimary = `gp${uid}`;
  const gradSecondary = `gs${uid}`;
  const [hiddenSeries, setHiddenSeries] = useState<Set<number>>(new Set());

  if (loading) {
    return (
      <div
        className="bg-slate-900/60 border border-white/[0.07] rounded animate-pulse"
        style={{ height }}
      />
    );
  }

  if (!multiSeries && (!data || data.length === 0)) {
    return (
      <div
        className="bg-slate-900/40 border border-white/[0.07] rounded flex items-center justify-center text-slate-500 text-sm"
        style={{ height }}
      >
        No data
      </div>
    );
  }

  const merged = mergeData(data ?? [], data2);

  const formatY = (val: number) =>
    new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(val);

  const formatTooltipValue = (val: unknown, name: unknown): [string, string] => {
    const numVal = typeof val === "number" ? val : parseFloat(String(val ?? 0));
    const nameStr = String(name ?? "");
    const u = nameStr === label2 ? unit2 : unit;
    return [new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(numVal) + (u ? ` ${u}` : ""), nameStr];
  };

  const commonProps = {
    data: merged,
    margin: { top: 5, right: 10, left: 0, bottom: 5 },
  };

  const gridProps = {
    strokeDasharray: "3 3",
    stroke: "#1e293b",
    vertical: false,
  };

  const formatXTick = (val: number) => {
    if (dateMode === "timestamp") {
      return new Intl.DateTimeFormat(locale, { month: "short", year: "2-digit" }).format(new Date(val));
    }
    return String(val);
  };

  const formatTooltipLabel = (val: unknown) => {
    const num = typeof val === "number" ? val : Number(val);
    if (dateMode === "timestamp") {
      return new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(new Date(num));
    }
    return String(num);
  };

  const xAxisProps = {
    dataKey: "year",
    tick: { fill: "#64748B", fontSize: 10 },
    axisLine: { stroke: "#1e293b" },
    tickLine: false,
    tickFormatter: formatXTick,
  };

  const yAxisProps = {
    tick: { fill: "#64748B", fontSize: 10 },
    axisLine: false,
    tickLine: false,
    tickFormatter: formatY,
  };

  const tooltipProps = {
    contentStyle: {
      backgroundColor: "#0f1f33",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "4px",
      fontSize: "11px",
      color: "#F1F5F9",
      padding: "10px 13px",
    },
    formatter: formatTooltipValue,
    labelFormatter: formatTooltipLabel,
    cursor: { stroke: "rgba(255,255,255,0.06)", strokeWidth: 1 },
  };

  // ── Multi-series mode (e.g. reserves breakdown with toggle) ──────────────
  if (multiSeries && multiSeries.length > 0) {
    const allEmpty = multiSeries.every((s) => s.data.length === 0);
    if (allEmpty) {
      return (
        <div className="bg-slate-900/40 border border-white/[0.07] rounded flex items-center justify-center text-slate-500 text-sm" style={{ height }}>
          No data
        </div>
      );
    }
    const msData = mergeMultiSeries(multiSeries);
    const toggleSeries = (i: number) => {
      setHiddenSeries((prev) => {
        const next = new Set(prev);
        if (next.has(i)) next.delete(i); else next.add(i);
        return next;
      });
    };
    const msTooltipFormatter = (val: unknown, name: unknown): [string, string] => {
      const numVal = typeof val === "number" ? val : parseFloat(String(val ?? 0));
      const nameStr = String(name ?? "");
      return [new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(numVal) + (unit ? ` ${unit}` : ""), nameStr];
    };
    return (
      <div>
        {/* Toggle badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {multiSeries.map((s, i) => (
            <button
              key={i}
              onClick={() => toggleSeries(i)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm font-mono text-[10px] uppercase tracking-wider border transition-all ${
                hiddenSeries.has(i)
                  ? "bg-transparent text-slate-500 border-white/[0.07]"
                  : "text-white border-transparent"
              }`}
              style={hiddenSeries.has(i) ? {} : { backgroundColor: `${s.color}20`, borderColor: `${s.color}50`, color: s.color }}
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: hiddenSeries.has(i) ? "#475569" : s.color }} />
              {s.label}
            </button>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={height}>
          <ComposedChart data={msData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <defs>
              {multiSeries.map((s, i) => (
                <linearGradient key={i} id={`${uid}ms${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={s.color} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={s.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid {...gridProps} />
            <XAxis {...xAxisProps} />
            <YAxis {...yAxisProps} />
            <Tooltip
              contentStyle={tooltipProps.contentStyle}
              formatter={msTooltipFormatter}
              labelFormatter={formatTooltipLabel}
              cursor={tooltipProps.cursor}
            />
            {multiSeries.map((s, i) => (
              <Area
                key={i}
                type="monotone"
                dataKey={`s${i}`}
                stroke={s.color}
                strokeWidth={hiddenSeries.has(i) ? 0 : 2}
                fill={`url(#${uid}ms${i})`}
                fillOpacity={hiddenSeries.has(i) ? 0 : 1}
                dot={false}
                activeDot={hiddenSeries.has(i) ? false : { r: 4, strokeWidth: 0, fill: s.color }}
                name={s.label}
                connectNulls
                animationDuration={700}
                animationEasing="ease-out"
                hide={hiddenSeries.has(i)}
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (dualAxis && data2 && data2.length > 0) {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart {...commonProps}>
          <defs>
            <linearGradient id={gradPrimary} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.22} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
            <linearGradient id={gradSecondary} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={SECONDARY_COLOR} stopOpacity={0.22} />
              <stop offset="95%" stopColor={SECONDARY_COLOR} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid {...gridProps} />
          <XAxis {...xAxisProps} />
          <YAxis yAxisId="left" {...yAxisProps} />
          <YAxis yAxisId="right" orientation="right" {...yAxisProps} />
          <Tooltip {...tooltipProps} />
          <Legend wrapperStyle={{ fontSize: "10px", color: "#64748B" }} />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="primary"
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradPrimary})`}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0, fill: color }}
            name={label}
            connectNulls
            animationDuration={700}
            animationEasing="ease-out"
          />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="secondary"
            stroke={SECONDARY_COLOR}
            strokeWidth={2}
            fill={`url(#${gradSecondary})`}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0, fill: SECONDARY_COLOR }}
            name={label2}
            connectNulls
            animationDuration={700}
            animationEasing="ease-out"
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }

  if (type === "bar") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart {...commonProps}>
          <CartesianGrid {...gridProps} />
          <XAxis {...xAxisProps} />
          <YAxis {...yAxisProps} />
          <Tooltip {...tooltipProps} />
          <Bar
            dataKey="primary"
            fill={color}
            name={label}
            radius={[3, 3, 0, 0]}
            maxBarSize={40}
            fillOpacity={0.85}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  // Default: Area chart with gradient fill
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart {...commonProps}>
        <defs>
          <linearGradient id={gradPrimary} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.22} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid {...gridProps} />
        <XAxis {...xAxisProps} />
        <YAxis {...yAxisProps} />
        <Tooltip {...tooltipProps} />
        <Area
          type="monotone"
          dataKey="primary"
          stroke={color}
          strokeWidth={2}
          fill={`url(#${gradPrimary})`}
          dot={false}
          activeDot={{ r: 4, strokeWidth: 0, fill: color }}
          name={label}
          connectNulls
          animationDuration={700}
          animationEasing="ease-out"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
