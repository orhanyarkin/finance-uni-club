"use client";

import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  Bar,
  Line,
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

interface DataChartProps {
  data: DataPoint[];
  /** Second series for dual-axis charts */
  data2?: DataPoint[];
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
  if (loading) {
    return (
      <div
        className="bg-slate-800/50 rounded-2xl animate-pulse"
        style={{ height }}
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <div
        className="bg-slate-800/30 rounded-2xl flex items-center justify-center text-slate-500 text-sm"
        style={{ height }}
      >
        No data
      </div>
    );
  }

  const merged = mergeData(data, data2);

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
    stroke: "#334155", // slate-700
    vertical: false,
  };

  const formatXTick = (val: number) => {
    if (dateMode === "timestamp") {
      return new Intl.DateTimeFormat(locale, { month: "short", year: "2-digit" }).format(new Date(val));
    }
    return String(val);
  };

  const formatTooltipLabel = (val: number) => {
    if (dateMode === "timestamp") {
      return new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(new Date(val));
    }
    return String(val);
  };

  const xAxisProps = {
    dataKey: "year",
    tick: { fill: "#94A3B8", fontSize: 11 },
    axisLine: { stroke: "#334155" },
    tickLine: false,
    tickFormatter: formatXTick,
  };

  const yAxisProps = {
    tick: { fill: "#94A3B8", fontSize: 11 },
    axisLine: false,
    tickLine: false,
    tickFormatter: formatY,
  };

  const tooltipProps = {
    contentStyle: {
      backgroundColor: "#1E293B",
      border: "1px solid #334155",
      borderRadius: "12px",
      fontSize: "12px",
      color: "#F1F5F9",
    },
    formatter: formatTooltipValue,
    labelFormatter: formatTooltipLabel,
  };

  if (dualAxis && data2 && data2.length > 0) {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart {...commonProps}>
          <CartesianGrid {...gridProps} />
          <XAxis {...xAxisProps} />
          <YAxis yAxisId="left" {...yAxisProps} />
          <YAxis yAxisId="right" orientation="right" {...yAxisProps} />
          <Tooltip {...tooltipProps} />
          <Legend wrapperStyle={{ fontSize: "11px", color: "#94A3B8" }} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="primary"
            stroke={color}
            strokeWidth={2}
            dot={false}
            name={label}
            connectNulls
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="secondary"
            stroke={SECONDARY_COLOR}
            strokeWidth={2}
            dot={false}
            name={label2}
            connectNulls
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
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart {...commonProps}>
        <CartesianGrid {...gridProps} />
        <XAxis {...xAxisProps} />
        <YAxis {...yAxisProps} />
        <Tooltip {...tooltipProps} />
        <Line
          type="monotone"
          dataKey="primary"
          stroke={color}
          strokeWidth={2.5}
          dot={false}
          name={label}
          connectNulls
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
