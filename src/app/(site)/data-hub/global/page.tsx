import { Metadata } from "next";
import { fetchWBData, scaleToBillions } from "@/lib/worldbank";
import GlobalPageClient from "@/components/data-hub/GlobalPageClient";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Data Hub — Global | Startup & Finance Community",
  description: "Explore global economic indicators powered by World Bank Data360.",
};

export default async function GlobalPage() {
  let initialData = undefined;

  try {
    const currentYear = new Date().getFullYear();
    const fromYear = currentYear - 20;
    let data = await fetchWBData("gdp_growth", "TUR", fromYear, currentYear);
    // No scaling needed for % indicators
    initialData = {
      country: "TUR" as const,
      indicator: "gdp_growth" as const,
      period: "20" as const,
      data,
    };
  } catch {
    // If SSR fetch fails, client will load its own data
  }

  return <GlobalPageClient initialData={initialData} />;
}
