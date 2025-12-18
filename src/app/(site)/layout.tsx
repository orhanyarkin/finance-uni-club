import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import SnowEffect from "@/components/SnowEffect";
import { client } from "@/sanity/lib/client";
import { NAVBAR_CONTENT_QUERY } from "@/sanity/lib/queries";

// Revalidate every hour
export const revalidate = 3600;

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch navbar content
  const featuredData = await client.fetch(NAVBAR_CONTENT_QUERY);

  return (
    <Providers>
      <SnowEffect />
      <div className="flex min-h-screen flex-col">
        <Navbar featuredData={featuredData} />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </Providers>
  );
}
