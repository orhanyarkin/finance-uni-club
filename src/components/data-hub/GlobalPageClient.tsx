"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, BarChart2, TrendingUp, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { DataPoint, IndicatorKey, CountryCode, getLatest } from "@/lib/worldbank";
import KPICard from "@/components/data-hub/KPICard";
import DataChart from "@/components/data-hub/DataChart";
import ContextBox from "@/components/data-hub/ContextBox";

type PeriodKey = "10" | "20" | "30" | "all";
type ChartType = "line" | "bar";

const CURRENT_YEAR = new Date().getFullYear();

const COUNTRIES: { code: CountryCode; flag: string }[] = [
  { code: "TUR", flag: "🇹🇷" },
  { code: "USA", flag: "🇺🇸" },
  { code: "DEU", flag: "🇩🇪" },
  { code: "CHN", flag: "🇨🇳" },
  { code: "KOR", flag: "🇰🇷" },
  { code: "BRA", flag: "🇧🇷" },
  { code: "IND", flag: "🇮🇳" },
  { code: "JPN", flag: "🇯🇵" },
];

const INDICATORS: IndicatorKey[] = [
  "gdp_growth",
  "inflation",
  "unemployment",
  "exports",
  "gdp_per_capita",
  "reserves",
  "fdi",
];

const KPI_INDICATORS: IndicatorKey[] = [
  "gdp_growth",
  "inflation",
  "unemployment",
  "gdp_per_capita",
  "fdi",
];

const INDICATOR_COLORS: Record<IndicatorKey, string> = {
  gdp_growth: "#60A5FA",
  inflation: "#F87171",
  unemployment: "#FBBF24",
  exports: "#34D399",
  gdp_per_capita: "#A78BFA",
  reserves: "#22D3EE",
  fdi: "#FB923C",
};

function getPeriodYears(period: PeriodKey): { from: number; to: number } {
  const to = CURRENT_YEAR;
  if (period === "all") return { from: 1960, to };
  return { from: to - parseInt(period), to };
}

interface InitialData {
  country: CountryCode;
  indicator: IndicatorKey;
  period: PeriodKey;
  data: DataPoint[];
}

interface Props {
  initialData?: InitialData;
}

export default function GlobalPageClient({ initialData }: Props) {
  const { t, language } = useLanguage();
  const locale = language === "tr" ? "tr-TR" : "en-US";

  const [country, setCountry] = useState<CountryCode>(initialData?.country ?? "TUR");
  const [period, setPeriod] = useState<PeriodKey>(initialData?.period ?? "20");
  const [activeIndicator, setActiveIndicator] = useState<IndicatorKey>(
    initialData?.indicator ?? "gdp_growth"
  );
  const [chartType, setChartType] = useState<ChartType>("line");
  const [searchQuery, setSearchQuery] = useState("");

  const [chartData, setChartData] = useState<DataPoint[]>(initialData?.data ?? []);
  const [kpiData, setKpiData] = useState<Partial<Record<IndicatorKey, DataPoint[]>>>({});
  const [loadingChart, setLoadingChart] = useState(false);
  const [loadingKpis, setLoadingKpis] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { from, to } = getPeriodYears(period);

  const fetchProxy = useCallback(async (indicator: IndicatorKey, fromY: number, toY: number): Promise<DataPoint[]> => {
    const url = `/api/worldbank?indicator=${indicator}&country=${country}&from=${fromY}&to=${toY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.data ?? [];
  }, [country]);

  const loadChart = useCallback(async () => {
    setLoadingChart(true);
    setError(null);
    try {
      const data = await fetchProxy(activeIndicator, from, to);
      setChartData(data);
    } catch {
      setError(t("datahub.global.error"));
    } finally {
      setLoadingChart(false);
    }
  }, [activeIndicator, from, to, t, fetchProxy]);

  const loadKpis = useCallback(async () => {
    setLoadingKpis(true);
    const { from: kpiFrom, to: kpiTo } = getPeriodYears("10");
    const results = await Promise.allSettled(
      KPI_INDICATORS.map(async (ind) => {
        const data = await fetchProxy(ind, kpiFrom, kpiTo);
        return { ind, data };
      })
    );
    const newKpiData: Partial<Record<IndicatorKey, DataPoint[]>> = {};
    results.forEach((r) => {
      if (r.status === "fulfilled") {
        newKpiData[r.value.ind] = r.value.data;
      }
    });
    setKpiData(newKpiData);
    setLoadingKpis(false);
  }, [fetchProxy]);

  useEffect(() => { loadChart(); }, [loadChart]);
  useEffect(() => { loadKpis(); }, [loadKpis]);

  const filteredCountries = COUNTRIES.filter((c) =>
    t(`datahub.country.${c.code}`)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const periods: PeriodKey[] = ["10", "20", "30", "all"];
  const latestYear = chartData.length > 0 ? Math.max(...chartData.map((d) => d.year)) : null;

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-5 h-5 text-blue-400" />
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                {t("datahub.global.sourceBadge")}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
              {t("datahub.global.heroTitle")}
            </h1>
            <p className="text-sm text-slate-400">{t("datahub.global.heroSub")}</p>
          </div>
        </div>
      </div>

      {/* Country Selector */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder={t("datahub.global.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filteredCountries.map(({ code, flag }) => (
            <button
              key={code}
              onClick={() => setCountry(code)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                country === code
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                  : "bg-slate-700/50 text-slate-300 border border-slate-600/50 hover:bg-slate-700 hover:text-white"
              }`}
            >
              <span>{flag}</span>
              <span>{t(`datahub.country.${code}`)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Country Banner + Period Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 rounded-xl">
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="font-semibold text-white">{t(`datahub.country.${country}`)}</div>
            <div className="text-xs text-slate-500">{country}</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-500 mr-1">{t("datahub.global.periodLabel")}:</span>
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                period === p
                  ? "bg-blue-500 text-white"
                  : "bg-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              {t(`datahub.period.${p}`)}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {KPI_INDICATORS.map((ind) => {
          const pts = kpiData[ind];
          const latest = pts ? getLatest(pts) : null;
          return (
            <KPICard
              key={ind}
              label={t(`datahub.ind.${ind}.label`)}
              value={latest?.value ?? null}
              unit={t(`datahub.ind.${ind}.unit`)}
              year={latest?.year}
              loading={loadingKpis}
              locale={locale}
              colorMode={
                ind === "inflation" ? "negative" :
                ind === "unemployment" ? "negative" :
                "auto"
              }
            />
          );
        })}
      </div>

      {/* Indicator Tabs */}
      <div className="flex flex-wrap gap-1.5">
        {INDICATORS.map((ind) => (
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

      {/* Main Chart */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-200">
              {t(`datahub.ind.${activeIndicator}.label`)}
            </h3>
            {latestYear && (
              <span className="text-xs text-slate-500">
                {latestYear} {t("datahub.global.dataNoteYear")}
              </span>
            )}
          </div>
          {/* Chart type toggle */}
          <div className="flex items-center gap-1 bg-slate-700/50 rounded-lg p-1">
            <button
              onClick={() => setChartType("line")}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                chartType === "line" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              {t("datahub.global.lineChart")}
            </button>
            <button
              onClick={() => setChartType("bar")}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                chartType === "bar" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5 inline mr-1" />
              {t("datahub.global.barChart")}
            </button>
          </div>
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
            type={chartType}
            color={INDICATOR_COLORS[activeIndicator]}
            unit={t(`datahub.ind.${activeIndicator}.unit`)}
            label={t(`datahub.ind.${activeIndicator}.label`)}
            locale={locale}
            loading={loadingChart}
            height={300}
          />
        )}
      </div>

      {/* Mini Chart Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Inflation vs Unemployment */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4">
          <h4 className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
            {t("datahub.ind.inflation.label")} vs {t("datahub.ind.unemployment.label")}
          </h4>
          <DataChart
            data={kpiData["inflation"] ?? []}
            data2={kpiData["unemployment"] ?? []}
            dualAxis
            color={INDICATOR_COLORS["inflation"]}
            unit={t("datahub.ind.inflation.unit")}
            unit2={t("datahub.ind.unemployment.unit")}
            label={t("datahub.ind.inflation.label")}
            label2={t("datahub.ind.unemployment.label")}
            locale={locale}
            loading={loadingKpis}
            height={180}
          />
        </div>

        {/* GDP per Capita */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4">
          <h4 className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
            {t("datahub.ind.gdp_per_capita.label")}
          </h4>
          <DataChart
            data={kpiData["gdp_per_capita"] ?? []}
            color={INDICATOR_COLORS["gdp_per_capita"]}
            unit={t("datahub.ind.gdp_per_capita.unit")}
            label={t("datahub.ind.gdp_per_capita.label")}
            locale={locale}
            loading={loadingKpis}
            height={180}
          />
        </div>
      </div>

      {/* Context Box */}
      <ContextBox indicatorKey={activeIndicator} />
    </div>
  );
}
