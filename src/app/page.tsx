import Hero from "@/components/Hero";
import FinanceWidgets from "@/components/FinanceWidgets";
import BlogGrid from "@/components/BlogGrid";
import EventsCarousel from "@/components/EventsCarousel";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Stats />
      <FinanceWidgets />
      <BlogGrid limit={3} />
      <EventsCarousel />
    </main>
  );
}






