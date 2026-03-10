import { NextRequest, NextResponse } from "next/server";
import { WB_INDICATORS, IndicatorKey, DataPoint, scaleToBillions } from "@/lib/worldbank";

const BASE_URL = "https://data360api.worldbank.org";
const LARGE_VALUE_INDICATORS = new Set<IndicatorKey>(["reserves", "fdi"]);

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const indicator = searchParams.get("indicator") as IndicatorKey | null;
  const country = searchParams.get("country");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!indicator || !country || !from || !to) {
    return NextResponse.json(
      { error: "Missing required params: indicator, country, from, to" },
      { status: 400 }
    );
  }

  const indicatorId = WB_INDICATORS[indicator];
  if (!indicatorId) {
    return NextResponse.json({ error: `Unknown indicator: ${indicator}` }, { status: 400 });
  }

  const url = `${BASE_URL}/data360/data?DATABASE_ID=WB_WDI&INDICATOR=${indicatorId}&REF_AREA=${country}&timePeriodFrom=${from}&timePeriodTo=${to}`;

  try {
    const res = await fetch(url, { next: { revalidate: 86400 } });

    if (!res.ok) {
      return NextResponse.json(
        { error: `World Bank API error: ${res.status}` },
        { status: res.status }
      );
    }

    const json = await res.json();
    const items = json.value ?? [];

    let points: DataPoint[] = items
      .filter((item: { OBS_VALUE: string }) => item.OBS_VALUE !== null && item.OBS_VALUE !== "")
      .map((item: { OBS_VALUE: string; TIME_PERIOD: string }) => ({
        year: parseInt(item.TIME_PERIOD, 10),
        value: parseFloat(item.OBS_VALUE),
      }))
      .filter((p: DataPoint) => !isNaN(p.year) && !isNaN(p.value))
      .sort((a: DataPoint, b: DataPoint) => a.year - b.year);

    if (LARGE_VALUE_INDICATORS.has(indicator)) {
      points = scaleToBillions(points);
    }

    return NextResponse.json({ data: points }, {
      headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
