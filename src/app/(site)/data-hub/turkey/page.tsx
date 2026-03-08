import { Metadata } from "next";
import TurkeyPageClient from "@/components/data-hub/TurkeyPageClient";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Data Hub — Turkey | Startup & Finance Community",
  description: "Live Turkish economic data powered by CBRT EVDS3.",
};

export default function TurkeyPage() {
  return <TurkeyPageClient />;
}
