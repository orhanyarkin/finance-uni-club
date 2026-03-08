export type IndicatorKey =
  | "gdp_growth"
  | "inflation"
  | "unemployment"
  | "gdp_per_capita"
  | "exports"
  | "reserves"
  | "fdi";

export const WB_INDICATORS: Record<IndicatorKey, string> = {
  gdp_growth: "WB_WDI_NY_GDP_MKTP_KD_ZG",
  inflation: "WB_WDI_FP_CPI_TOTL_ZG",
  unemployment: "WB_WDI_SL_UEM_TOTL_ZS",
  gdp_per_capita: "WB_WDI_NY_GDP_PCAP_CD",
  exports: "WB_WDI_NE_EXP_GNFS_ZS",
  reserves: "WB_WDI_FI_RES_TOTL_CD",
  fdi: "WB_WDI_BX_KLT_DINV_CD_WD",
};

export type CountryCode =
  | "TUR" | "USA" | "CHN" | "JPN" | "DEU" | "IND" | "GBR" | "FRA" | "ITA" | "BRA"
  | "CAN" | "RUS" | "KOR" | "AUS" | "ESP" | "MEX" | "IDN" | "SAU" | "NLD" | "CHE"
  | "ARG" | "POL" | "SWE" | "BEL" | "NOR" | "ARE" | "ISR" | "SGP" | "HKG" | "MYS"
  | "THA" | "PHL" | "VNM" | "BGD" | "PAK" | "EGY" | "NGA" | "ZAF" | "COL" | "CHL"
  | "AUT" | "DNK" | "FIN" | "GRC" | "PRT" | "CZE" | "ROU" | "HUN" | "UKR" | "KAZ" | "NZL";

export interface DataPoint {
  year: number;
  value: number;
}

interface WBApiItem {
  OBS_VALUE: string;
  TIME_PERIOD: string;
  INDICATOR: string;
  REF_AREA: string;
  LATEST_DATA: boolean;
}

interface WBApiResponse {
  count: number;
  value: WBApiItem[];
}

const BASE_URL = "https://data360api.worldbank.org";

export async function fetchWBData(
  indicator: IndicatorKey,
  country: CountryCode,
  fromYear: number,
  toYear: number
): Promise<DataPoint[]> {
  const indicatorId = WB_INDICATORS[indicator];
  const url = `${BASE_URL}/data360/data?DATABASE_ID=WB_WDI&INDICATOR=${indicatorId}&REF_AREA=${country}&timePeriodFrom=${fromYear}&timePeriodTo=${toYear}`;

  const res = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`World Bank API error: ${res.status}`);
  }

  const data: WBApiResponse = await res.json();

  if (!data.value || data.value.length === 0) {
    return [];
  }

  return data.value
    .filter((item) => item.OBS_VALUE !== null && item.OBS_VALUE !== "")
    .map((item) => ({
      year: parseInt(item.TIME_PERIOD, 10),
      value: parseFloat(item.OBS_VALUE),
    }))
    .filter((item) => !isNaN(item.year) && !isNaN(item.value))
    .sort((a, b) => a.year - b.year);
}

/** Scale large USD values (reserves, FDI) to billions */
export function scaleToBillions(points: DataPoint[]): DataPoint[] {
  return points.map((p) => ({ ...p, value: p.value / 1_000_000_000 }));
}

/** Get latest non-null value and its year */
export function getLatest(points: DataPoint[]): { value: number; year: number } | null {
  if (points.length === 0) return null;
  const last = [...points].reverse().find((p) => !isNaN(p.value));
  return last ?? null;
}
