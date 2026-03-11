import { unstable_cache } from "next/cache";
import DataHubPreviewClient from "@/components/DataHubPreviewClient";
import type { DataPoint } from "@/lib/worldbank";

const EVDS_BASE = "https://evds3.tcmb.gov.tr/igmevdsms-dis/";
const WB_BASE = "https://data360api.worldbank.org";

function getLastMonths(n: number): { startDate: string; endDate: string } {
  const end = new Date();
  const start = new Date();
  start.setMonth(start.getMonth() - n);
  const fmt = (d: Date) =>
    `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
  return { startDate: fmt(start), endDate: fmt(end) };
}

interface EVDSItem {
  Tarih: string;
  [key: string]: string;
}

function parseEVDS(json: { items?: EVDSItem[] }, seriesCode: string): DataPoint[] {
  const items = json?.items ?? [];
  if (items.length === 0) return [];
  const baseKey = seriesCode.replace(/\./g, "_");
  const fieldKey =
    Object.keys(items[0]).find((k) => k === baseKey || k.startsWith(baseKey + "-")) ?? baseKey;
  return items
    .map((item) => {
      const v = parseFloat((item[fieldKey] ?? "").replace(",", "."));
      if (isNaN(v)) return null;
      const dateStr = item.Tarih ?? "";
      let ms: number;
      if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
        const [d, m, y] = dateStr.split("-");
        ms = new Date(parseInt(y), parseInt(m) - 1, parseInt(d)).getTime();
      } else {
        ms = new Date(dateStr).getTime();
      }
      if (isNaN(ms)) return null;
      return { year: ms, value: v };
    })
    .filter((p): p is DataPoint => p !== null)
    .sort((a, b) => a.year - b.year);
}

async function fetchEVDSSeries(
  series: string,
  startDate: string,
  endDate: string,
  formulas?: string
): Promise<DataPoint[]> {
  const apiKey = process.env.EVDS_API_KEY;
  if (!apiKey) return [];
  let url = `${EVDS_BASE}series=${encodeURIComponent(series)}&startDate=${startDate}&endDate=${endDate}&type=json`;
  if (formulas) url += `&formulas=${formulas}`;
  try {
    const res = await fetch(url, { headers: { key: apiKey }, cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    return parseEVDS(json, series);
  } catch {
    return [];
  }
}

async function fetchWBSeries(indicatorId: string, country: string, fromYear: number): Promise<DataPoint[]> {
  const toYear = new Date().getFullYear();
  const url = `${WB_BASE}/data360/data?DATABASE_ID=WB_WDI&INDICATOR=${indicatorId}&REF_AREA=${country}&timePeriodFrom=${fromYear}&timePeriodTo=${toYear}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    const data: { value?: Array<{ OBS_VALUE: string; TIME_PERIOD: string }> } = await res.json();
    return (data.value ?? [])
      .filter((i) => i.OBS_VALUE && i.OBS_VALUE !== "")
      .map((i) => ({ year: parseInt(i.TIME_PERIOD, 10), value: parseFloat(i.OBS_VALUE) }))
      .filter((p) => !isNaN(p.year) && !isNaN(p.value))
      .sort((a, b) => a.year - b.year);
  } catch {
    return [];
  }
}

const scaleBillion = (pts: DataPoint[]): DataPoint[] =>
  pts.map((p) => ({ ...p, value: p.value / 1000 }));

export interface PreviewData {
  // Latest single values (KPI cards)
  usd_try: number | null;
  cpi_annual: number | null;
  policy_rate: number | null;
  bist100: number | null;
  gdp_growth: number | null;
  // Time series — national reserves (3-series, Milyar USD)
  reserves_total_series: DataPoint[];
  reserves_fx_series: DataPoint[];
  reserves_gold_series: DataPoint[];
  // Time series — global GDP growth comparison
  gdp_tur_series: DataPoint[];     // TUR GDP growth last 10 years (WB)
  gdp_usa_series: DataPoint[];     // USA GDP growth last 10 years (WB)
}

const getPreviewData = unstable_cache(
  async (): Promise<PreviewData> => {
    const { startDate, endDate } = getLastMonths(6);
    const cpiStart = getLastMonths(8).startDate;
    const reservesStart = getLastMonths(18).startDate;
    const year = new Date().getFullYear();

    const [
      usd_try_series,
      cpi_series,
      policy_series,
      bist100_series,
      reserves_total_raw,
      reserves_fx_raw,
      reserves_gold_raw,
      gdp_tur_series,
      gdp_usa_series,
    ] = await Promise.all([
      fetchEVDSSeries("TP.DK.USD.A.YTL", startDate, endDate),
      fetchEVDSSeries("TP.GENENDEKS.T1", cpiStart, endDate, "3"),
      fetchEVDSSeries("TP.BISTTLREF.ORAN", startDate, endDate),
      fetchEVDSSeries("TP.MK.F.BILESIK", startDate, endDate),
      fetchEVDSSeries("TP.AB.TOPLAM", reservesStart, endDate),
      fetchEVDSSeries("TP.AB.C2", reservesStart, endDate),
      fetchEVDSSeries("TP.AB.C1", reservesStart, endDate),
      fetchWBSeries("WB_WDI_NY_GDP_MKTP_KD_ZG", "TUR", year - 10),
      fetchWBSeries("WB_WDI_NY_GDP_MKTP_KD_ZG", "USA", year - 10),
    ]);

    const last = (arr: DataPoint[]) => (arr.length > 0 ? arr[arr.length - 1].value : null);

    return {
      usd_try: last(usd_try_series),
      cpi_annual: last(cpi_series),
      policy_rate: last(policy_series),
      bist100: last(bist100_series),
      gdp_growth: last(gdp_tur_series),
      reserves_total_series: scaleBillion(reserves_total_raw),
      reserves_fx_series: scaleBillion(reserves_fx_raw),
      reserves_gold_series: scaleBillion(reserves_gold_raw),
      gdp_tur_series,
      gdp_usa_series,
    };
  },
  ["datahub-preview"],
  { revalidate: 10800 } // 3 hours
);

export default async function DataHubPreview() {
  const data = await getPreviewData();
  return <DataHubPreviewClient data={data} />;
}
