import About from "@/components/About";
import Team from "@/components/Team";
import PartnerLogos from "@/components/PartnerLogos";
import Features from "@/components/Features";

export const metadata = {
  title: "Hakkımızda - Startup ve Finans Kulübü",
  description: "Startup ve Finans Kulübü hakkında bilgi edinin. Ekibimiz, misyonumuz ve değerlerimiz.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20">
      <About />
      <Team />
      <Features />
      <PartnerLogos />
    </main>
  );
}



