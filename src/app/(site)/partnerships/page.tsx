import { client } from "@/sanity/lib/client";
import { PARTNERS_QUERY } from "@/sanity/lib/queries";
import PartnershipsPageContent from "@/components/PartnershipsPageContent";

export const revalidate = 0;

export const metadata = {
  title: "İşbirliklerimiz | Partnerships",
  description: "Kulüp üyelerimize özel indirimler ve işbirlikleri.",
};

export default async function PartnershipsPage() {
  const partners = await client.fetch(PARTNERS_QUERY);
  return <PartnershipsPageContent partners={partners} />;
}
