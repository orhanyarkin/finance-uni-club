"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Search, BarChart2, ChevronDown } from "lucide-react";
import * as AllFlags from "country-flag-icons/react/3x2";
import { useLanguage } from "@/contexts/LanguageContext";
import { DataPoint, IndicatorKey, CountryCode, getLatest } from "@/lib/worldbank";
import KPICard from "@/components/data-hub/KPICard";
import DataChart from "@/components/data-hub/DataChart";
import ContextBox from "@/components/data-hub/ContextBox";

function FlagIcon({ iso2, className }: { iso2: string; className?: string }) {
  const Comp = AllFlags[iso2.toUpperCase() as keyof typeof AllFlags] as React.FC<{ className?: string; title?: string }> | undefined;
  if (!Comp) return null;
  return <Comp className={className} title="" />;
}

type PeriodKey = "10" | "20" | "30" | "all";
type ChartType = "line" | "bar";

const CURRENT_YEAR = new Date().getFullYear();

/** ISO 3166-1 alpha-3 → alpha-2 mapping for country-flag-icons */
const COUNTRY_ISO2: Record<string, string> = {
  TUR: "tr", USA: "us", CHN: "cn", JPN: "jp", DEU: "de", IND: "in",
  GBR: "gb", FRA: "fr", ITA: "it", BRA: "br", CAN: "ca", RUS: "ru",
  KOR: "kr", AUS: "au", ESP: "es", MEX: "mx", IDN: "id", SAU: "sa",
  NLD: "nl", CHE: "ch", ARG: "ar", POL: "pl", SWE: "se", BEL: "be",
  NOR: "no", ARE: "ae", ISR: "il", SGP: "sg", HKG: "hk", MYS: "my",
  THA: "th", PHL: "ph", VNM: "vn", BGD: "bd", PAK: "pk", EGY: "eg",
  NGA: "ng", ZAF: "za", COL: "co", CHL: "cl", AUT: "at", DNK: "dk",
  FIN: "fi", GRC: "gr", PRT: "pt", CZE: "cz", ROU: "ro", HUN: "hu",
  UKR: "ua", KAZ: "kz", NZL: "nz",
};

const COUNTRIES: CountryCode[] = [
  "TUR", "USA", "CHN", "JPN", "DEU", "IND", "GBR", "FRA", "ITA", "BRA",
  "CAN", "RUS", "KOR", "AUS", "ESP", "MEX", "IDN", "SAU", "NLD", "CHE",
  "ARG", "POL", "SWE", "BEL", "NOR", "ARE", "ISR", "SGP", "HKG", "MYS",
  "THA", "PHL", "VNM", "BGD", "PAK", "EGY", "NGA", "ZAF", "COL", "CHL",
  "AUT", "DNK", "FIN", "GRC", "PRT", "CZE", "ROU", "HUN", "UKR", "KAZ", "NZL",
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
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = COUNTRIES.filter((code) =>
    t(`datahub.country.${code}`)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const sortedFilteredCountries = [...filteredCountries].sort((a, b) =>
    t(`datahub.country.${a}`).localeCompare(
      t(`datahub.country.${b}`),
      language === "tr" ? "tr" : "en"
    )
  );

  const periods: PeriodKey[] = ["10", "20", "30", "all"];
  const latestYear = chartData.length > 0 ? Math.max(...chartData.map((d) => d.year)) : null;

  return (
    <div className="space-y-6">
      {/* Country Selector */}
      <div className="bg-slate-900/80 border border-white/[0.07] rounded p-4">
        <div className="relative" ref={dropdownRef}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder={t("datahub.global.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShowDropdown(true); }}
              onFocus={() => setShowDropdown(true)}
              className="w-full pl-9 pr-10 py-2.5 bg-slate-800/60 border border-white/[0.07] rounded-sm text-sm text-slate-200 placeholder:text-slate-600 placeholder:font-mono placeholder:text-xs focus:outline-none focus:border-blue-500/40 transition-colors"
            />
            <ChevronDown
              className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`}
            />
          </div>

          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#0a1929] border border-white/[0.07] rounded-sm shadow-2xl z-20 overflow-hidden">
              <div className="max-h-72 overflow-y-auto">
                {sortedFilteredCountries.length === 0 ? (
                  <div className="px-4 py-3 font-mono text-xs text-slate-500 uppercase tracking-widest">
                    {language === "tr" ? "Sonuç bulunamadı" : "No results"}
                  </div>
                ) : (
                  sortedFilteredCountries.map((code) => (
                    <button
                      key={code}
                      onClick={() => {
                        setCountry(code);
                        setSearchQuery("");
                        setShowDropdown(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left ${
                        country === code
                          ? "bg-blue-500/15 text-blue-300"
                          : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                      }`}
                    >
                      <FlagIcon iso2={COUNTRY_ISO2[code] ?? ""} className="w-5 h-4 rounded-[2px] flex-shrink-0" />
                      <span className="flex-1">{t(`datahub.country.${code}`)}</span>
                      {country === code && (
                        <span className="font-mono text-[10px] text-blue-400">✓</span>
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Country Banner + Period Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 flex items-center justify-center bg-slate-800/60 border border-white/[0.07] rounded-sm">
            <FlagIcon iso2={COUNTRY_ISO2[country] ?? ""} className="w-7 h-5 rounded-[2px]" />
          </span>
          <div>
            <div className="font-semibold text-white">{t(`datahub.country.${country}`)}</div>
            <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">{country}</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mr-1.5">
            {t("datahub.global.periodLabel")}
          </span>
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-sm font-mono text-[10px] uppercase tracking-wider transition-all ${
                period === p
                  ? "bg-blue-600/80 text-white"
                  : "bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-white/[0.07]"
              }`}
            >
              {t(`datahub.period.${p}`)}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 min-h-[100px]">
        {KPI_INDICATORS.map((ind, i) => {
          const pts = kpiData[ind];
          const latest = pts ? getLatest(pts) : null;
          return (
            <motion.div
              key={ind}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.35, ease: "easeOut" }}
            >
              <KPICard
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
            </motion.div>
          );
        })}
      </div>

      {/* Indicator Tabs */}
      <div className="flex flex-wrap gap-1.5">
        {INDICATORS.map((ind) => (
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

      {/* Main Chart */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="group relative bg-slate-900/80 border border-white/[0.07] rounded p-4 overflow-hidden"
      >
        {/* Left accent bar on hover */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-200 mb-0.5">
              {t(`datahub.ind.${activeIndicator}.label`)}
            </h3>
            {latestYear && (
              <span className="font-mono text-[10px] text-slate-500">
                {latestYear} {t("datahub.global.dataNoteYear")}
              </span>
            )}
          </div>
          {/* Chart type toggle */}
          <div className="flex items-center gap-1 bg-slate-800/60 border border-white/[0.07] rounded-sm p-1">
            <button
              onClick={() => setChartType("line")}
              className={`px-2.5 py-1 rounded-sm font-mono text-[10px] uppercase tracking-wider transition-all ${
                chartType === "line" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              {t("datahub.global.lineChart")}
            </button>
            <button
              onClick={() => setChartType("bar")}
              className={`px-2.5 py-1 rounded-sm font-mono text-[10px] uppercase tracking-wider transition-all flex items-center gap-1 ${
                chartType === "bar" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <BarChart2 className="w-3 h-3" />
              {t("datahub.global.barChart")}
            </button>
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
        ) : (
          <>
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
            <div className="flex justify-end mt-2">
              <span className="font-mono text-[10px] text-slate-600">{t("datahub.global.sourceLabel")}</span>
            </div>
          </>
        )}
      </motion.div>

      {/* Mini Chart Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Inflation vs Unemployment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="group relative bg-slate-900/80 border border-white/[0.07] rounded p-4 overflow-hidden"
        >
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />
          <h4 className="font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-3">
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
        </motion.div>

        {/* GDP per Capita */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
          className="group relative bg-slate-900/80 border border-white/[0.07] rounded p-4 overflow-hidden"
        >
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />
          <h4 className="font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-3">
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
        </motion.div>
      </div>

      {/* Context Box */}
      <ContextBox indicatorKey={activeIndicator} />
    </div>
  );
}
