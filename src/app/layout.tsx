import "./globals.css";
import RollbarProvider from "@/components/RollbarProvider";
import { Inter, Outfit, Plus_Jakarta_Sans, Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://startupvefinanstoplulugu.com"),
  title: {
    default: "Startup & Finans Topluluğu",
    template: "%s | Startup & Finans Topluluğu",
  },
  description: "Ankara Medipol Üniversitesi Startup ve Finans Kulübü. Geleceğin girişimcilerini ve finans liderlerini yetiştiren öğrenci topluluğu.",
  keywords: ["startup", "finans", "girişimcilik", "öğrenci kulübü", "ankara", "medipol", "fintech", "yatırım", "borsa"],
  authors: [{ name: "Startup ve Finans Topluluğu" }],
  creator: "Startup ve Finans Topluluğu",
  publisher: "Startup ve Finans Topluluğu",

  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://startupvefinanstoplulugu.com",
    title: "Startup & Finans Topluluğu",
    description: "Ankara Medipol Üniversitesi Startup ve Finans Kulübü. Geleceğin girişimcilerini ve finans liderlerini yetiştiren öğrenci topluluğu.",
    siteName: "Startup & Finans Topluluğu",
    images: [
      {
        url: "https://startupvefinanstoplulugu.com/assets/images/club_logo.png",
        width: 800,
        height: 600,
        alt: "Startup & Finans Topluluğu Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Startup & Finans Topluluğu",
    description: "Geleceğin girişimcilerini yetiştiriyoruz.",
    images: ["https://startupvefinanstoplulugu.com/assets/images/club_logo.png"],
    creator: "@startupvefinans",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "rHKZwxAunf8m_VZodJKhDGMWMw4x-wVBEfIEuPuXLTU",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = "https://startupvefinanstoplulugu.com";
  
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} ${plusJakarta.variable} ${cormorant.variable} ${plexMono.variable} font-sans antialiased`}>
        <RollbarProvider />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Startup ve Finans Topluluğu",
                "url": baseUrl,
                "logo": `${baseUrl}/assets/images/club_logo.png`,
                "sameAs": [
                  "https://www.linkedin.com/company/startup-ve-finans-toplulu%C4%9Fu/",
                  "https://www.instagram.com/startupvefinans/"
                ],
                "contactPoint": {
                  "@type": "ContactPoint",
                  "email": "startupvefinans@gmail.com",
                  "contactType": "customer support"
                },
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Ankara",
                  "addressCountry": "TR",
                  "streetAddress": "Ankara Medipol Üniversitesi"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Startup ve Finans Topluluğu",
                "url": baseUrl,
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": `${baseUrl}/search?q={search_term_string}`,
                  "query-input": "required name=search_term_string"
                }
              },
              // SiteNavigationElement for Google Sitelinks
              {
                "@context": "https://schema.org",
                "@type": "ItemList",
                "itemListElement": [
                  {
                    "@type": "SiteNavigationElement",
                    "position": 1,
                    "name": "Hakkımızda",
                    "description": "Kulübümüz hakkında bilgi edinin",
                    "url": `${baseUrl}/about`
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 2,
                    "name": "Etkinlikler",
                    "description": "Workshoplar, seminerler ve networking etkinlikleri",
                    "url": `${baseUrl}/events`
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 3,
                    "name": "Blog",
                    "description": "Finans ve girişimcilik yazıları",
                    "url": `${baseUrl}/blog`
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 4,
                    "name": "İşbirliklerimiz",
                    "description": "Sponsor ve ortaklarımız",
                    "url": `${baseUrl}/partnerships`
                  },
                  {
                    "@type": "SiteNavigationElement",
                    "position": 5,
                    "name": "İletişim",
                    "description": "Bize ulaşın",
                    "url": `${baseUrl}/contact`
                  }
                ]
              }
            ])
          }}
        />
        {children}
      </body>
    </html>
  );
}
