import "./globals.css";
import { Inter, Outfit, Plus_Jakarta_Sans } from "next/font/google"; // Keep fonts if used globally, or move to site layout
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  variable: "--font-plus-jakarta",
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
  icons: {
    icon: "/assets/images/club_logo.png",
    apple: "/assets/images/club_logo.png",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://startupvefinanstoplulugu.com",
    title: "Startup & Finans Topluluğu",
    description: "Ankara Medipol Üniversitesi Startup ve Finans Kulübü. Geleceğin girişimcilerini ve finans liderlerini yetiştiren öğrenci topluluğu.",
    siteName: "Startup & Finans Topluluğu",
    images: [
      {
        url: "/assets/images/club_logo.png",
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
    images: ["/assets/images/club_logo.png"],
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
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} ${plusJakarta.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Startup ve Finans Topluluğu",
              "url": "https://startupvefinanstoplulugu.com",
              "logo": "https://startupvefinanstoplulugu.com/assets/images/club_logo.png",
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
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
