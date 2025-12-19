import About from "@/components/About";
import Team from "@/components/Team";
import Features from "@/components/Features";

export const metadata = {
  title: "Hakkımızda",
  description: "Startup ve Finans Kulübü hakkında bilgi edinin. Ekibimiz, misyonumuz ve değerlerimiz.",
};

import { client } from "@/sanity/lib/client";
import { TEAM_QUERY } from "@/sanity/lib/queries";

export const revalidate = 0;

export default async function AboutPage() {
  const teamMembers = await client.fetch(TEAM_QUERY);

  return (
    <main className="min-h-screen pt-20">
      <About />
      <Team members={teamMembers} />
      <Features />
    </main>
  );
}
