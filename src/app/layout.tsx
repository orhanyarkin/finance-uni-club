import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Startup ve Finans Kulübü - Üniversite Topluluğu",
  description: "Startup dünyası ve finans sektörüne meraklı öğrencilerin buluşma noktası. Workshoplar, networking etkinlikleri ve daha fazlası.",
  keywords: "startup, finans, üniversite, kulüp, girişimcilik, yatırım, blockchain, fintech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className={`${inter.className} bg-background text-text-primary antialiased`}>
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}







