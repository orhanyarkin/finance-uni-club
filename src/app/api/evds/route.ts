import { NextRequest, NextResponse } from "next/server";

const EVDS_BASE = "https://evds3.tcmb.gov.tr/igmevdsms-dis/";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const series = searchParams.get("series");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate") ?? "01-01-2999";
  // Optional: formulas (0=level, 1=pct, 3=yoy pct, …) and frequency (1=daily, 5=monthly, …)
  const formulas = searchParams.get("formulas");
  const frequency = searchParams.get("frequency");

  if (!series || !startDate) {
    return NextResponse.json(
      { error: "Missing required params: series, startDate" },
      { status: 400 }
    );
  }

  const apiKey = process.env.EVDS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "EVDS API key not configured" }, { status: 500 });
  }

  // EVDS3 uses path-style params
  let url = `${EVDS_BASE}series=${series}&startDate=${startDate}&endDate=${endDate}&type=json`;
  if (formulas) url += `&formulas=${formulas}`;
  if (frequency) url += `&frequency=${frequency}`;

  try {
    const res = await fetch(url, {
      headers: { key: apiKey },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return NextResponse.json(
        { error: `EVDS3 upstream error: ${res.status}`, body },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=3600" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
