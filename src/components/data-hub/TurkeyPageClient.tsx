"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { DataPoint } from "@/lib/worldbank";
import KPICard from "@/components/data-hub/KPICard";
import DataChart, { MultiSeriesItem } from "@/components/data-hub/DataChart";
// ContextBox removed — replaced by static description card
import InfoTooltip from "@/components/data-hub/InfoTooltip";

type TurkeyPeriod = "1m" | "3m" | "1y" | "5y" | "all";
type TurkeyIndicator =
  | "usd_try"
  | "eur_try"
  | "cpi_annual"
  | "policy_rate"
  | "bist100"
  | "reserves_total"
  | "reserves_fx"
  | "reserves_gold"
  | "trade_balance"
  | "cpi_tuik";

const EVDS_SERIES: Record<TurkeyIndicator, string> = {
  usd_try: "TP.DK.USD.A.YTL",
  eur_try: "TP.DK.EUR.A.YTL",
  cpi_annual: "TP.GENENDEKS.T1",      // CPI index (2003=100), fetched with formulas=3 for YoY%
  policy_rate: "TP.BISTTLREF.ORAN",   // BIST TLREF overnight reference rate
  bist100: "TP.MK.F.BILESIK",         // BIST 100 closing price
  reserves_total: "TP.AB.TOPLAM",     // Total reserves (Million USD)
  reserves_fx: "TP.AB.C2",            // FX reserves (Million USD)
  reserves_gold: "TP.AB.C1",          // Gold reserves (Million USD)
  trade_balance: "TP.ODANA6.Q04",     // Trade balance (current account)
  cpi_tuik: "TP.GENENDEKS.T1",       // TURKSTAT CPI (2003=100), fetched with formulas=1 for monthly %
};

/**
 * Per-indicator EVDS formulas code:
 *   "3" = annual YoY % change
 *   "1" = period-over-period (monthly) % change
 */
const FORMULA_SERIES: Partial<Record<TurkeyIndicator, string>> = {
  cpi_annual: "3",
  cpi_tuik: "1",
};

/** @deprecated kept only for loadKpis filter — use FORMULA_SERIES elsewhere */
const YOY_SERIES = new Set<TurkeyIndicator>(["cpi_annual"]);

const INDICATOR_COLORS: Record<TurkeyIndicator, string> = {
  usd_try: "#60A5FA",
  eur_try: "#A78BFA",
  cpi_annual: "#F87171",
  policy_rate: "#FBBF24",
  bist100: "#34D399",
  reserves_total: "#22D3EE",
  reserves_fx: "#38BDF8",
  reserves_gold: "#F59E0B",
  trade_balance: "#FB923C",
  cpi_tuik: "#F97316",
};

const KPI_INDICATORS: TurkeyIndicator[] = ["usd_try", "cpi_annual", "policy_rate", "bist100"];
const TAB_INDICATORS: TurkeyIndicator[] = [
  "usd_try",
  "eur_try",
  "cpi_annual",
  "policy_rate",
  "bist100",
  "reserves_total",
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

function parseEVDSData(json: { items: EVDSItem[] }, seriesCode: string, scaleBillion = false): DataPoint[] {
  if (!json?.items || json.items.length === 0) return [];
  const baseKey = seriesCode.replace(/\./g, "_");
  const sampleItem = json.items[0];
  const fieldKey =
    Object.keys(sampleItem).find(
      (k) => k === baseKey || k.startsWith(baseKey + "-")
    ) ?? baseKey;
  return json.items
    .map((item: EVDSItem) => {
      const dateStr: string = item.Tarih ?? "";
      const valStr: string = item[fieldKey] ?? "";
      const rawValue = parseFloat(valStr.replace(",", "."));
      if (isNaN(rawValue)) return null;
      const value = scaleBillion ? rawValue / 1000 : rawValue;
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
  const [activeIndicator, setActiveIndicator] = useState<TurkeyIndicator>("reserves_total");
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [reservesMulti, setReservesMulti] = useState<MultiSeriesItem[]>([]);
  const [loadingChart, setLoadingChart] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [kpiMeta, setKpiMeta] = useState<Record<TurkeyIndicator, KpiMeta>>(() => {
    const initial: Partial<Record<TurkeyIndicator, KpiMeta>> = {};
    KPI_INDICATORS.forEach((k) => { initial[k] = { value: null, date: "", loading: true }; });
    return initial as Record<TurkeyIndicator, KpiMeta>;
  });

  const loadKpis = useCallback(async () => {
    const { startDate } = getDateRange("1y");

    const levelIndicators = KPI_INDICATORS.filter((k) => !YOY_SERIES.has(k));
    const yoyIndicators = KPI_INDICATORS.filter((k) => YOY_SERIES.has(k));

    try {
      const newMeta: Partial<Record<TurkeyIndicator, KpiMeta>> = {};

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

    // Reserves tab: fetch all 3 series simultaneously
    if (activeIndicator === "reserves_total") {
      try {
        const [total, fx, gold] = await Promise.all([
          fetchEVDS(EVDS_SERIES.reserves_total, startDate, endDate),
          fetchEVDS(EVDS_SERIES.reserves_fx, startDate, endDate),
          fetchEVDS(EVDS_SERIES.reserves_gold, startDate, endDate),
        ]);
        const scale = (pts: DataPoint[]) => pts.map((p) => ({ ...p, value: p.value / 1000 }));
        setReservesMulti([
          { data: scale(total), color: INDICATOR_COLORS.reserves_total, label: t("datahub.ind.reserves_total.label") },
          { data: scale(fx),    color: INDICATOR_COLORS.reserves_fx,    label: t("datahub.ind.reserves_fx.label") },
          { data: scale(gold),  color: INDICATOR_COLORS.reserves_gold,  label: t("datahub.ind.reserves_gold.label") },
        ]);
        setChartData([]);
      } catch {
        setError(t("datahub.turkey.error"));
      } finally {
        setLoadingChart(false);
      }
      return;
    }

    setReservesMulti([]);
    const formulas = FORMULA_SERIES[activeIndicator];
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
      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 min-h-[100px]">
        {KPI_INDICATORS.map((ind, i) => {
          const meta = kpiMeta[ind];
          return (
            <motion.div
              key={ind}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.35, ease: "easeOut" }}
            >
              <KPICard
                label={t(`datahub.ind.${ind}.label`)}
                value={meta?.value ?? null}
                unit={t(`datahub.ind.${ind}.unit`)}
                year={meta?.date}
                loading={meta?.loading}
                locale={locale}
                colorMode="neutral"
                indicatorKey={ind}
                tooltipSource="evds"
              />
            </motion.div>
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
              className={`px-3 py-1.5 rounded-sm font-mono text-[10px] uppercase tracking-wider transition-all ${
                activeIndicator === ind
                  ? "text-white border"
                  : "bg-slate-800/60 text-slate-400 border border-white/[0.07] hover:text-white hover:bg-slate-800"
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
              className={`px-2.5 py-1.5 rounded-sm font-mono text-[10px] uppercase tracking-wider transition-all ${
                period === p
                  ? "bg-blue-600/80 text-white"
                  : "bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-white/[0.07]"
              }`}
            >
              {t(`datahub.turkey.period.${p}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="group relative bg-slate-900/80 border border-white/[0.07] rounded p-4"
      >
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-200 mb-0.5 flex items-center gap-1">
              {t(`datahub.ind.${activeIndicator}.label`)}
              <InfoTooltip indicatorKey={activeIndicator} source="evds" />
            </h3>
            {latestDate && !reservesMulti.length && (
              <span className="font-mono text-[10px] text-slate-500">{latestDate}</span>
            )}
          </div>
        </div>

        {error ? (
          <div className="flex flex-col items-center justify-center h-60 gap-3 text-slate-500">
            <span className="text-sm">{error}</span>
            <button
              onClick={loadChart}
              className="px-4 py-2 font-mono text-[10px] uppercase tracking-wider bg-blue-500/20 text-blue-400 rounded-sm hover:bg-blue-500/30 transition-colors"
            >
              {t("datahub.global.retry")}
            </button>
          </div>
        ) : activeIndicator === "reserves_total" ? (
          <>
            <DataChart
              multiSeries={reservesMulti}
              unit="Milyar USD"
              locale={locale}
              loading={loadingChart}
              height={300}
              dateMode="timestamp"
            />
            <div className="flex justify-end mt-2">
              <span className="font-mono text-[10px] text-slate-600">{t("datahub.turkey.sourceLabel")}</span>
            </div>
          </>
        ) : (
          <>
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
            <div className="flex justify-end mt-2">
              <span className="font-mono text-[10px] text-slate-600">{t("datahub.turkey.sourceLabel")}</span>
            </div>
          </>
        )}
      </motion.div>

      {/* 2x2 Mini Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* TÜFE vs Policy Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="group relative bg-slate-900/80 border border-white/[0.07] rounded p-4"
        >
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />
          <h4 className="font-mono text-[10px] uppercase tracking-widest text-slate-300 mb-3 flex items-center gap-1">
            {t("datahub.ind.cpi_annual.label")} vs {t("datahub.ind.policy_rate.label")}
            <InfoTooltip indicatorKey="cpi_annual" source="evds" />
          </h4>
          <MiniChart indicator="cpi_annual" indicator2="policy_rate" period={period} locale={locale} t={t} />
        </motion.div>

        {/* BIST 100 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.07, ease: "easeOut" }}
          className="group relative bg-slate-900/80 border border-white/[0.07] rounded p-4"
        >
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-emerald-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />
          <h4 className="font-mono text-[10px] uppercase tracking-widest text-slate-300 mb-3 flex items-center gap-1">
            {t("datahub.ind.bist100.label")}
            <InfoTooltip indicatorKey="bist100" source="evds" />
          </h4>
          <MiniChart indicator="bist100" period={period} locale={locale} t={t} />
        </motion.div>

        {/* TÜİK CPI Monthly */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.07, ease: "easeOut" }}
          className="group relative bg-slate-900/80 border border-white/[0.07] rounded p-4"
        >
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-orange-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />
          <h4 className="font-mono text-[10px] uppercase tracking-widest text-slate-300 mb-3 flex items-center gap-1">
            {t("datahub.ind.cpi_tuik.label")}
            <InfoTooltip indicatorKey="cpi_tuik" source="evds" />
          </h4>
          <MiniChart indicator="cpi_tuik" period={period} locale={locale} t={t} />
        </motion.div>

        {/* Trade Balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.14, ease: "easeOut" }}
          className="group relative bg-slate-900/80 border border-white/[0.07] rounded p-4"
        >
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-orange-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />
          <h4 className="font-mono text-[10px] uppercase tracking-widest text-slate-300 mb-3 flex items-center gap-1">
            {t("datahub.ind.trade_balance.label")}
            <InfoTooltip indicatorKey="trade_balance" source="evds" />
          </h4>
          <MiniChart indicator="trade_balance" period={period} locale={locale} t={t} />
        </motion.div>
      </div>

      {/* Data Importance Description */}
      <div className="bg-slate-900/60 border border-white/[0.07] rounded p-5">
        <h4 className="text-sm font-semibold text-slate-200 mb-2">
          {t("datahub.turkey.aboutData.title")}
        </h4>
        <p className="text-sm text-slate-400 leading-relaxed">
          {t("datahub.turkey.aboutData.body")}
        </p>
      </div>
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
  scaleBillion = false,
}: {
  indicator: TurkeyIndicator;
  indicator2?: TurkeyIndicator;
  period: TurkeyPeriod;
  locale: string;
  t: (key: string) => string;
  scaleBillion?: boolean;
}) {
  const [data, setData] = useState<DataPoint[]>([]);
  const [data2, setData2] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const { startDate, endDate } = getDateRange(period);

    const formula1 = FORMULA_SERIES[indicator];
    const formula2 = indicator2 ? FORMULA_SERIES[indicator2] : undefined;

    const applyScale = (pts: DataPoint[]) =>
      scaleBillion ? pts.map((p) => ({ ...p, value: p.value / 1000 })) : pts;

    if (formula1 || formula2) {
      // Need per-series formula → fetch each series independently
      const p1 = fetchEVDS(EVDS_SERIES[indicator], startDate, endDate, formula1);
      const p2 = indicator2
        ? fetchEVDS(EVDS_SERIES[indicator2], startDate, endDate, formula2)
        : Promise.resolve([]);
      Promise.all([p1, p2])
        .then(([d1, d2]) => { setData(applyScale(d1)); if (indicator2) setData2(d2); })
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      // No formula needed → batch both series in one request
      const series = indicator2
        ? `${EVDS_SERIES[indicator]}-${EVDS_SERIES[indicator2]}`
        : EVDS_SERIES[indicator];
      fetch(`/api/evds?series=${encodeURIComponent(series)}&startDate=${startDate}&endDate=${endDate}`)
        .then((r) => r.json())
        .then((json) => {
          setData(applyScale(parseEVDSData(json, EVDS_SERIES[indicator])));
          if (indicator2) setData2(parseEVDSData(json, EVDS_SERIES[indicator2]));
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [indicator, indicator2, period, scaleBillion]);

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
