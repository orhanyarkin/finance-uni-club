"use client";

import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { DataPoint } from "@/lib/worldbank";
import KPICard from "@/components/data-hub/KPICard";
import DataChart from "@/components/data-hub/DataChart";
import ContextBox from "@/components/data-hub/ContextBox";

type TurkeyPeriod = "1m" | "3m" | "1y" | "5y" | "all";
type TurkeyIndicator =
  | "usd_try"
  | "eur_try"
  | "cpi_annual"
  | "policy_rate"
  | "bist100"
  | "reserves"
  | "trade_balance";

const EVDS_SERIES: Record<TurkeyIndicator, string> = {
  usd_try: "TP.DK.USD.A.YTL",
  eur_try: "TP.DK.EUR.A.YTL",
  cpi_annual: "TP.GENENDEKS.T1",      // CPI index (2003=100), fetched with formulas=3 for YoY%
  policy_rate: "TP.PY.P02.ON",        // TCMB overnight lending rate
  bist100: "TP.MK.F.BILESIK",         // BIST 100 closing price
  reserves: "TP.AB.B1",
  trade_balance: "TP.ODANA6.Q04",     // Mal Dengesi (current account)
};

/** Series that should be fetched with formulas=3 (annual YoY % change) */
const YOY_SERIES = new Set<TurkeyIndicator>(["cpi_annual"]);

const INDICATOR_COLORS: Record<TurkeyIndicator, string> = {
  usd_try: "#60A5FA",
  eur_try: "#A78BFA",
  cpi_annual: "#F87171",
  policy_rate: "#FBBF24",
  bist100: "#34D399",
  reserves: "#22D3EE",
  trade_balance: "#FB923C",
};

const KPI_INDICATORS: TurkeyIndicator[] = ["usd_try", "cpi_annual", "policy_rate", "bist100"];
const TAB_INDICATORS: TurkeyIndicator[] = [
  "usd_try",
  "eur_try",
  "cpi_annual",
  "policy_rate",
  "bist100",
  "reserves",
  "trade_balance",
];

function getDateRange(period: TurkeyPeriod): { startDate: string; endDate: string } {
  const end = new Date();
  const start = new Date();

  if (period === "1m") start.setMonth(start.getMonth() - 1);
  else if (period === "3m") start.setMonth(start.getMonth() - 3);
  else if (period === "1y") start.setFullYear(start.getFullYear() - 1);
  else if (period === "5y") start.setFullYear(start.getFullYear() - 5);
  else start.setFullYear(2000); // all

  const fmt = (d: Date) =>
    `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;

  return { startDate: fmt(start), endDate: fmt(end) };
}

interface EVDSItem {
  Tarih: string;
  [key: string]: string;
}

function parseEVDSData(json: { items: EVDSItem[] }, seriesCode: string): DataPoint[] {
  if (!json?.items || json.items.length === 0) return [];
  // EVDS3 response uses underscores: "TP.DK.USD.A.YTL" → "TP_DK_USD_A_YTL"
  // When formulas param is used, field name gets a suffix: "TP_GENENDEKS_T1-3"
  const baseKey = seriesCode.replace(/\./g, "_");
  // Dynamically find the matching field key in the response (handles formula suffixes)
  const sampleItem = json.items[0];
  const fieldKey =
    Object.keys(sampleItem).find(
      (k) => k === baseKey || k.startsWith(baseKey + "-")
    ) ?? baseKey;
  return json.items
    .map((item: EVDSItem) => {
      const dateStr: string = item.Tarih ?? "";
      const valStr: string = item[fieldKey] ?? "";
      const value = parseFloat(valStr.replace(",", "."));
      if (isNaN(value)) return null;
      // Parse date: "01-01-2024" or "2024-01-01" or "Oca 2024"
      let date: Date | null = null;
      if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
        const [d, m, y] = dateStr.split("-");
        date = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
      } else if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        date = new Date(dateStr);
      } else {
        date = new Date(dateStr);
      }
      if (!date || isNaN(date.getTime())) return null;
      return { year: date.getTime(), value };
    })
    .filter((x): x is DataPoint => x !== null)
    .sort((a, b) => a.year - b.year);
}

async function fetchEVDS(
  series: string,
  startDate: string,
  endDate: string,
  formulas?: string
): Promise<DataPoint[]> {
  let url = `/api/evds?series=${encodeURIComponent(series)}&startDate=${startDate}&endDate=${endDate}`;
  if (formulas) url += `&formulas=${formulas}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("EVDS fetch failed");
  const json = await res.json();
  return parseEVDSData(json, series);
}

interface KpiMeta {
  value: number | null;
  date: string;
  loading: boolean;
}

export default function TurkeyPageClient() {
  const { t, language } = useLanguage();
  const locale = language === "tr" ? "tr-TR" : "en-US";

  const [period, setPeriod] = useState<TurkeyPeriod>("1y");
  const [activeIndicator, setActiveIndicator] = useState<TurkeyIndicator>("usd_try");
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [loadingChart, setLoadingChart] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [kpiMeta, setKpiMeta] = useState<Record<TurkeyIndicator, KpiMeta>>(() => {
    const initial: Partial<Record<TurkeyIndicator, KpiMeta>> = {};
    KPI_INDICATORS.forEach((k) => { initial[k] = { value: null, date: "", loading: true }; });
    return initial as Record<TurkeyIndicator, KpiMeta>;
  });

  const loadKpis = useCallback(async () => {
    const { startDate } = getDateRange("1y");

    // Separate YoY series (need formulas=3) from level series
    const levelIndicators = KPI_INDICATORS.filter((k) => !YOY_SERIES.has(k));
    const yoyIndicators = KPI_INDICATORS.filter((k) => YOY_SERIES.has(k));

    try {
      const newMeta: Partial<Record<TurkeyIndicator, KpiMeta>> = {};

      // Fetch level series combined
      if (levelIndicators.length > 0) {
        const combined = levelIndicators.map((k) => EVDS_SERIES[k]).join("-");
        const url = `/api/evds?series=${encodeURIComponent(combined)}&startDate=${startDate}&endDate=01-01-2999`;
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          levelIndicators.forEach((ind) => {
            const data = parseEVDSData(json, EVDS_SERIES[ind]);
            const last = data[data.length - 1];
            newMeta[ind] = {
              value: last?.value ?? null,
              date: last
                ? new Intl.DateTimeFormat(locale, { month: "short", year: "numeric" }).format(new Date(last.year))
                : "",
              loading: false,
            };
          });
        }
      }

      // Fetch YoY series individually with formulas=3
      await Promise.all(
        yoyIndicators.map(async (ind) => {
          try {
            const data = await fetchEVDS(EVDS_SERIES[ind], startDate, "01-01-2999", "3");
            const last = data[data.length - 1];
            newMeta[ind] = {
              value: last?.value ?? null,
              date: last
                ? new Intl.DateTimeFormat(locale, { month: "short", year: "numeric" }).format(new Date(last.year))
                : "",
              loading: false,
            };
          } catch {
            newMeta[ind] = { value: null, date: "", loading: false };
          }
        })
      );

      setKpiMeta((prev) => ({ ...prev, ...(newMeta as Record<TurkeyIndicator, KpiMeta>) }));
    } catch {
      KPI_INDICATORS.forEach((ind) => {
        setKpiMeta((prev) => ({ ...prev, [ind]: { ...prev[ind], loading: false } }));
      });
    }
  }, [locale]);

  const loadChart = useCallback(async () => {
    setLoadingChart(true);
    setError(null);
    const { startDate, endDate } = getDateRange(period);
    const formulas = YOY_SERIES.has(activeIndicator) ? "3" : undefined;
    try {
      const data = await fetchEVDS(EVDS_SERIES[activeIndicator], startDate, endDate, formulas);
      setChartData(data);
    } catch {
      setError(t("datahub.turkey.error"));
    } finally {
      setLoadingChart(false);
    }
  }, [activeIndicator, period, t]);

  useEffect(() => { loadKpis(); }, [loadKpis]);
  useEffect(() => { loadChart(); }, [loadChart]);

  const periods: TurkeyPeriod[] = ["1m", "3m", "1y", "5y", "all"];

  const latestDate =
    chartData.length > 0
      ? new Intl.DateTimeFormat(locale, { month: "short", year: "numeric" }).format(
          new Date(chartData[chartData.length - 1].year)
        )
      : null;

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🇹🇷</span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              {t("datahub.turkey.liveBadge")}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            {t("datahub.turkey.heroTitle")}
          </h1>
          <p className="text-sm text-slate-400">{t("datahub.turkey.heroSub")}</p>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {KPI_INDICATORS.map((ind) => {
          const meta = kpiMeta[ind];
          return (
            <KPICard
              key={ind}
              label={t(`datahub.ind.${ind}.label`)}
              value={meta?.value ?? null}
              unit={t(`datahub.ind.${ind}.unit`)}
              year={meta?.date}
              live
              loading={meta?.loading}
              locale={locale}
              colorMode="neutral"
            />
          );
        })}
      </div>

      {/* Period + Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {TAB_INDICATORS.map((ind) => (
            <button
              key={ind}
              onClick={() => setActiveIndicator(ind)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeIndicator === ind
                  ? "text-white border"
                  : "bg-slate-700/40 text-slate-400 border border-transparent hover:text-white hover:bg-slate-700"
              }`}
              style={
                activeIndicator === ind
                  ? {
                      backgroundColor: `${INDICATOR_COLORS[ind]}20`,
                      borderColor: `${INDICATOR_COLORS[ind]}50`,
                      color: INDICATOR_COLORS[ind],
                    }
                  : {}
              }
            >
              {t(`datahub.ind.${ind}.tab`)}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                period === p
                  ? "bg-blue-500 text-white"
                  : "bg-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              {t(`datahub.turkey.period.${p}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-200">
              {t(`datahub.ind.${activeIndicator}.label`)}
            </h3>
            {latestDate && <span className="text-xs text-slate-500">{latestDate}</span>}
          </div>
          <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            EVDS3
          </span>
        </div>

        {error ? (
          <div className="flex flex-col items-center justify-center h-60 gap-3 text-slate-500">
            <span className="text-sm">{error}</span>
            <button
              onClick={loadChart}
              className="px-4 py-2 text-xs bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-colors"
            >
              {t("datahub.global.retry")}
            </button>
          </div>
        ) : (
          <DataChart
            data={chartData}
            type="line"
            color={INDICATOR_COLORS[activeIndicator]}
            unit={t(`datahub.ind.${activeIndicator}.unit`)}
            label={t(`datahub.ind.${activeIndicator}.label`)}
            locale={locale}
            loading={loadingChart}
            height={300}
            dateMode="timestamp"
          />
        )}
      </div>

      {/* 2x2 Mini Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* TÜFE vs Policy Rate */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4">
          <h4 className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
            {t("datahub.ind.cpi_annual.label")} vs {t("datahub.ind.policy_rate.label")}
          </h4>
          <MiniChart indicator="cpi_annual" indicator2="policy_rate" period={period} locale={locale} t={t} />
        </div>

        {/* BIST 100 */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4">
          <h4 className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
            {t("datahub.ind.bist100.label")}
          </h4>
          <MiniChart indicator="bist100" period={period} locale={locale} t={t} />
        </div>

        {/* Reserves */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4">
          <h4 className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
            {t("datahub.ind.reserves.label")}
          </h4>
          <MiniChart indicator="reserves" period={period} locale={locale} t={t} />
        </div>

        {/* Trade Balance */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4">
          <h4 className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
            {t("datahub.ind.trade_balance.label")}
          </h4>
          <MiniChart indicator="trade_balance" period={period} locale={locale} t={t} />
        </div>
      </div>

      {/* Context Box */}
      <ContextBox
        indicatorKey={
          activeIndicator === "usd_try" || activeIndicator === "eur_try"
            ? "usd_try"
            : activeIndicator === "cpi_annual"
            ? "cpi_annual"
            : activeIndicator
        }
      />
    </div>
  );
}

/** Small helper component for mini charts that fetches its own data */
function MiniChart({
  indicator,
  indicator2,
  period,
  locale,
  t,
}: {
  indicator: TurkeyIndicator;
  indicator2?: TurkeyIndicator;
  period: TurkeyPeriod;
  locale: string;
  t: (key: string) => string;
}) {
  const [data, setData] = useState<DataPoint[]>([]);
  const [data2, setData2] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const { startDate, endDate } = getDateRange(period);

    // If either series needs YoY, fetch them separately; otherwise combine
    const needsYoy1 = YOY_SERIES.has(indicator);
    const needsYoy2 = indicator2 ? YOY_SERIES.has(indicator2) : false;

    if (needsYoy1 || needsYoy2) {
      // Fetch separately to apply individual formulas
      const p1 = fetchEVDS(EVDS_SERIES[indicator], startDate, endDate, needsYoy1 ? "3" : undefined);
      const p2 = indicator2
        ? fetchEVDS(EVDS_SERIES[indicator2], startDate, endDate, needsYoy2 ? "3" : undefined)
        : Promise.resolve([]);
      Promise.all([p1, p2])
        .then(([d1, d2]) => { setData(d1); if (indicator2) setData2(d2); })
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      const series = indicator2
        ? `${EVDS_SERIES[indicator]}-${EVDS_SERIES[indicator2]}`
        : EVDS_SERIES[indicator];
      fetch(`/api/evds?series=${encodeURIComponent(series)}&startDate=${startDate}&endDate=${endDate}`)
        .then((r) => r.json())
        .then((json) => {
          setData(parseEVDSData(json, EVDS_SERIES[indicator]));
          if (indicator2) setData2(parseEVDSData(json, EVDS_SERIES[indicator2]));
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [indicator, indicator2, period]);

  return (
    <DataChart
      data={data}
      data2={indicator2 ? data2 : undefined}
      dualAxis={!!indicator2}
      color={INDICATOR_COLORS[indicator]}
      unit={t(`datahub.ind.${indicator}.unit`)}
      unit2={indicator2 ? t(`datahub.ind.${indicator2}.unit`) : undefined}
      label={t(`datahub.ind.${indicator}.label`)}
      label2={indicator2 ? t(`datahub.ind.${indicator2}.label`) : undefined}
      locale={locale}
      loading={loading}
      height={160}
      dateMode="timestamp"
    />
  );
}
