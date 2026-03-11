"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Flag, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import KPICard from "@/components/data-hub/KPICard";
import DataChart, { MultiSeriesItem } from "@/components/data-hub/DataChart";
import type { PreviewData } from "@/components/DataHubPreview";

interface Props {
  data: PreviewData;
}

type Tab = "national" | "global";

export default function DataHubPreviewClient({ data }: Props) {
  const { t, language } = useLanguage();
  const locale = language === "tr" ? "tr-TR" : "en-US";
  const [tab, setTab] = useState<Tab>("national");

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: "national", label: t("datahub.preview.tabNational"), icon: Flag },
    { key: "global", label: t("datahub.preview.tabGlobal"), icon: Globe },
  ];

  const gdpSeries: MultiSeriesItem[] = [
    {
      data: data.gdp_tur_series,
      color: "#34D399",
      label: language === "tr" ? "Türkiye" : "Turkey",
    },
    {
      data: data.gdp_usa_series,
      color: "#F59E0B",
      label: "USA",
    },
  ];

  const reservesSeries: MultiSeriesItem[] = [
    {
      data: data.reserves_total_series,
      color: "#22D3EE",
      label: language === "tr" ? "Toplam" : "Total",
    },
    {
      data: data.reserves_fx_series,
      color: "#38BDF8",
      label: language === "tr" ? "Döviz" : "FX",
    },
    {
      data: data.reserves_gold_series,
      color: "#F59E0B",
      label: language === "tr" ? "Altın" : "Gold",
    },
  ];

  return (
    <section className="py-16 relative overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header (centered, clickable) ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <Link href="/data-hub" className="group inline-block">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
              {t("datahub.preview.title")}
              <ArrowRight className="inline-block w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
            </h2>
          </Link>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            {t("datahub.preview.subtitle")}
          </p>
        </motion.div>

        {/* ── Tab Switcher (centered) ── */}
        <div className="flex justify-center mb-8">
          <div className="relative flex items-center gap-0 bg-slate-900/60 border border-white/[0.07] rounded-sm p-1">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className="relative flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-medium transition-colors"
              >
                {tab === key && (
                  <motion.span
                    layoutId="preview-tab-pill"
                    className="absolute inset-0 bg-blue-600/80 rounded-sm shadow-lg shadow-blue-900/30"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                <span className={`relative z-10 flex items-center gap-2 ${tab === key ? "text-white" : "text-slate-400 hover:text-slate-200"}`}>
                  <Icon className="w-4 h-4" />
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Content ── */}
        {tab === "national" ? (
          <motion.div
            key="national"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <KPICard
                label={t("datahub.ind.usd_try.label")}
                value={data.usd_try}
                unit={t("datahub.ind.usd_try.unit")}
                locale={locale}
                colorMode="neutral"
                indicatorKey="usd_try"
                tooltipSource="evds"
              />
              <KPICard
                label={t("datahub.ind.cpi_annual.label")}
                value={data.cpi_annual}
                unit={t("datahub.ind.cpi_annual.unit")}
                locale={locale}
                colorMode="negative"
                indicatorKey="cpi_annual"
                tooltipSource="evds"
              />
              <KPICard
                label={t("datahub.ind.policy_rate.label")}
                value={data.policy_rate}
                unit={t("datahub.ind.policy_rate.unit")}
                locale={locale}
                colorMode="neutral"
                indicatorKey="policy_rate"
                tooltipSource="evds"
              />
              <KPICard
                label={t("datahub.ind.bist100.label")}
                value={data.bist100}
                unit={t("datahub.ind.bist100.unit")}
                locale={locale}
                colorMode="positive"
                indicatorKey="bist100"
                tooltipSource="evds"
              />
            </div>

            {/* MB Reserves 3-Series Chart */}
            <div className="group relative bg-slate-900/80 border border-white/[0.07] rounded p-4">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-cyan-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center rounded-l" />
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                    {t("datahub.ind.reserves_total.label")}
                  </span>
                  <span className="font-mono text-[9px] text-slate-600">
                    · {language === "tr" ? "Son 18 Ay" : "Last 18 Months"}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-slate-600">
                  {language === "tr" ? "Kaynak: TCMB EVDS" : "Source: CBRT EVDS"}
                </span>
              </div>
              <DataChart
                multiSeries={reservesSeries}
                unit="Milyar USD"
                locale={locale}
                height={160}
                dateMode="timestamp"
              />
              {/* Legend */}
              <div className="flex items-center gap-4 mt-2 justify-end">
                {reservesSeries.map((s) => (
                  <div key={s.label} className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 inline-block rounded" style={{ backgroundColor: s.color }} />
                    <span className="font-mono text-[9px] text-slate-500">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex justify-center mt-6">
              <Link
                href="/data-hub/turkey"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 hover:text-blue-200 rounded font-mono text-xs uppercase tracking-wider transition-all group"
              >
                {t("datahub.preview.cta")}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>

        ) : (
          <motion.div
            key="global"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-slate-900/80 border border-white/[0.07] rounded p-4 text-center">
                <div className="text-3xl font-bold text-white mb-1">51</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                  {language === "tr" ? "Ülke" : "Countries"}
                </div>
              </div>
              <div className="bg-slate-900/80 border border-white/[0.07] rounded p-4 text-center">
                <div className="text-3xl font-bold text-white mb-1">7</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                  {language === "tr" ? "Gösterge" : "Indicators"}
                </div>
              </div>
              <div className="bg-slate-900/80 border border-white/[0.07] rounded p-4 text-center">
                <div className={`text-3xl font-bold mb-1 ${
                  data.gdp_growth !== null && data.gdp_growth >= 0 ? "text-emerald-400" : "text-rose-400"
                }`}>
                  {data.gdp_growth !== null
                    ? `${data.gdp_growth > 0 ? "+" : ""}${data.gdp_growth.toFixed(1)}%`
                    : "—"}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                  {language === "tr" ? "TUR GSYİH Büyüme" : "TUR GDP Growth"}
                </div>
              </div>
            </div>

            {/* GDP Growth Chart — Turkey vs USA */}
            <div className="group relative bg-slate-900/80 border border-white/[0.07] rounded p-4">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-emerald-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center rounded-l" />
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                  {language === "tr"
                    ? "GSYİH Büyümesi — Türkiye vs ABD"
                    : "GDP Growth — Turkey vs USA"}
                </span>
                <span className="font-mono text-[10px] text-slate-600">
                  {language === "tr" ? "Kaynak: World Bank" : "Source: World Bank"}
                </span>
              </div>
              <DataChart
                multiSeries={gdpSeries}
                unit="%"
                locale={locale}
                height={160}
                dateMode="year"
              />
            </div>

            {/* CTA */}
            <div className="flex justify-center mt-6">
              <Link
                href="/data-hub/global"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 hover:text-blue-200 rounded font-mono text-xs uppercase tracking-wider transition-all group"
              >
                {t("datahub.preview.cta")}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
