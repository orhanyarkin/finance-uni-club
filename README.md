# Startup ve Finans Topluluğu — Web Sitesi

> **[www.startupvefinanstoplulugu.com](https://www.startupvefinanstoplulugu.com)**

Ankara Medipol Üniversitesi Startup ve Finans Topluluğu'nun resmi web sitesi. Next.js, Sanity CMS, Tailwind CSS ve Framer Motion ile geliştirilmiş modern, çok dilli bir platform.

---

## Özellikler

- **Dark Tema** — Tüm site koyu tema üzerine tasarlanmış
- **Türkçe / İngilizce** — Tüm içerikler iki dilde, navbar'dan tek tıkla geçiş
- **Blog Sistemi** — Sanity CMS üzerinden yönetilen blog yazıları (TR + EN)
- **Etkinlik Yönetimi** — Kayıt durumu, detay sayfaları ve carousel gösterimi
- **Ekip Sayfası** — Yönetim kurulu ve komite üyeleri
- **İşbirlikleri** — Partner logoları infinite-scroll carousel
- **Veri Merkezi** — Canlı ekonomi verileri (EVDS + World Bank)
- **Tam Responsive** — Mobil, tablet ve masaüstü uyumlu
- **Framer Motion** — Scroll animasyonları, sayaçlar, tab geçişleri
- **SEO Optimize** — Sitemap, robots.txt, Open Graph, yapılandırılmış veri

---

## Teknoloji Stack

| Kategori | Teknoloji |
|----------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **UI** | React 19 |
| **Dil** | TypeScript 5.9 |
| **Styling** | Tailwind CSS 3.4 |
| **Animasyonlar** | Framer Motion 11.3 |
| **CMS** | Sanity (project: g988hc9r, dataset: production) |
| **Grafikler** | Recharts |
| **İkonlar** | Lucide React |
| **Deploy** | Vercel |

---

## Sayfalar

| Sayfa | Açıklama |
|-------|----------|
| **Ana Sayfa** | Hero, istatistikler, TradingView ticker, son blog yazıları, etkinlikler, Veri Merkezi önizlemesi |
| **Hakkımızda** | Kulüp bilgileri, misyon/vizyon, komiteler, sunulan hizmetler |
| **Blog** | Finans ve girişimcilik içerikleri (TR + EN) |
| **Etkinlikler** | Geçmiş ve yaklaşan etkinlikler, detay sayfaları |
| **Veri Merkezi** | Ulusal (TCMB EVDS) ve Küresel (World Bank) ekonomik veriler |
| **İletişim** | İletişim bilgileri ve harita |
| **İşbirlikleri** | Partner kuruluşlar |
| **SSS** | Sıkça Sorulan Sorular |
| **Yasal** | Gizlilik Politikası, Kullanım Şartları, Çerez Politikası |

---

## Veri Merkezi

Sitenin öne çıkan özelliği olan `/data-hub` bölümü iki alt sayfadan oluşur:

### Ulusal (`/data-hub/turkey`)
- Kaynak: **TCMB EVDS3 API** (server-side proxy ile, API key client'a hiç çıkmaz)
- Göstergeler: USD/TRY, EUR/TRY, TÜFE Yıllık %, TCMB Faizi, BIST 100, Toplam/Döviz/Altın Rezervleri, Dış Ticaret Dengesi, TÜİK TÜFE Aylık %
- Ana grafik: 3-serili rezerv grafiği (Toplam / Döviz / Altın)
- Mini grafikler: TÜFE vs Faiz, BIST 100, TÜİK TÜFE, Dış Ticaret
- Dönem seçici: 1Ay / 3Ay / 1Yıl / 5Yıl / Tümü

### Küresel (`/data-hub/global`)
- Kaynak: **World Bank Data360 API** (`/api/worldbank` proxy üzerinden)
- 51 ülke, 7 gösterge: GSYİH Büyümesi, Enflasyon, İşsizlik, Kişi Başı GSYİH, İhracat/GSYİH, Rezervler, FDI
- Ülke arama, dönem seçici (10/20/30/Tümü), çizgi ve çubuk grafik seçeneği
- Mini grafikler: Enflasyon vs İşsizlik, Kişi Başı GSYİH

### API Proxy Mimarisi
```
Tarayıcı  →  /api/evds       →  TCMB EVDS3
Tarayıcı  →  /api/worldbank  →  World Bank Data360
```
EVDS API anahtarı Vercel'de environment variable olarak tutulur, client'a hiç çıkmaz.

### Ana Sayfa Önizlemesi (`DataHubPreview`)
- Server component (ISR, 3 saat cache)
- Ulusal tab: 4 KPI kartı + 3-serili rezerv grafiği
- Küresel tab: İstatistik kartları + Türkiye vs ABD GSYİH büyümesi karşılaştırması

---

## i18n

Harici kütüphane kullanılmaz, custom React Context ile yönetilir.

```
src/contexts/LanguageContext.tsx   # Tüm TR ve EN çeviriler (~150+ anahtar)
```

- `useLanguage()` hook'u: `{ language, setLanguage, t }`
- Varsayılan dil: Türkçe (`"tr"`)
- `LanguageToggle` bileşeni Navbar'da (masaüstü + mobil)
- Sanity içerikleri (blog, etkinlik) TR ve EN alanlarına sahip; EN seçilince fallback TR'ye döner

**Türkçe büyük İ sorunu:** HTML `lang` attribute'u dil değişince `Providers.tsx` içindeki `LangSync` bileşeni tarafından dinamik olarak güncellenir (`document.documentElement.lang`), böylece CSS `text-transform: uppercase` doğru locale kurallarını uygular.

---

## TradingView

`TradingViewTicker` bileşeni Navbar içinde sticky olarak tüm sayfalarda görünür:
- Semboller: S&P 500, NASDAQ 100, BTC, ETH, Altın, USD/TRY, EUR/TRY, Brent
- Her zaman dark tema (site temasından bağımsız)
- `next.config.mjs` CSP'si `*.tradingview.com` izin listesine eklenmiş

---

## Proje Yapısı

```
finance-uni-club/
├── src/
│   ├── app/
│   │   ├── (site)/
│   │   │   ├── page.tsx              # Ana sayfa
│   │   │   ├── layout.tsx            # Navbar + Ticker + Footer wrapper
│   │   │   ├── about/
│   │   │   ├── blog/
│   │   │   ├── events/
│   │   │   ├── contact/
│   │   │   ├── partnerships/
│   │   │   ├── sss/
│   │   │   ├── legal/
│   │   │   └── data-hub/
│   │   │       ├── layout.tsx        # Tab navigasyonu (Ulusal / Küresel)
│   │   │       ├── turkey/page.tsx
│   │   │       └── global/page.tsx
│   │   ├── api/
│   │   │   ├── evds/route.ts         # TCMB EVDS3 proxy
│   │   │   └── worldbank/route.ts    # World Bank proxy
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Providers.tsx             # ThemeProvider + LanguageProvider + LangSync
│   │   ├── LanguageToggle.tsx
│   │   ├── TradingViewTicker.tsx
│   │   ├── DataHubPreview.tsx        # Server component (ISR önizleme)
│   │   ├── DataHubPreviewClient.tsx  # Client component (tab/grafik)
│   │   └── data-hub/
│   │       ├── KPICard.tsx
│   │       ├── DataChart.tsx         # Recharts wrapper (line/bar/multi-series)
│   │       ├── InfoTooltip.tsx       # Hover bilgi kartı
│   │       ├── TurkeyPageClient.tsx
│   │       └── GlobalPageClient.tsx
│   ├── contexts/
│   │   └── LanguageContext.tsx       # i18n context + tüm çeviriler
│   ├── lib/
│   │   └── worldbank.ts              # World Bank fetch utility
│   └── sanity/
│       ├── schemaTypes/              # post, event, partner, teamMember
│       └── lib/queries.ts            # GROQ sorguları
├── next.config.mjs                   # CSP, image domains
├── tailwind.config.ts
└── package.json
```

---

## Ortam Değişkenleri

Vercel'de tanımlı (yerel `.env.local` gerekir):

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=g988hc9r
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=...
EVDS_API_KEY=...           # TCMB EVDS3 API anahtarı (sadece server-side)
```

---

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Development sunucusu
npm run dev
# → http://localhost:3000

# Production build
npm run build && npm start
```

> **Not:** `node_modules` repodan hariç tutulmuştur. Vercel deploy'unda otomatik yüklenir.

---

## Deploy

`main` branch'e yapılan her push, Vercel üzerinde otomatik olarak canlıya alınır.

- **URL:** [www.startupvefinanstoplulugu.com](https://www.startupvefinanstoplulugu.com)
- **Platform:** Vercel (Edge Network)
- **Cache:** World Bank verileri 24 saat, EVDS verileri her istekte taze

---

## Bağlantılar

| Platform | Link |
|----------|------|
| Web Sitesi | [startupvefinanstoplulugu.com](https://www.startupvefinanstoplulugu.com) |
| Instagram | [@startupvefinanstoplulugu](https://www.instagram.com/startupvefinanstoplulugu) |
| WhatsApp | [Topluluk Grubuna Katıl](https://chat.whatsapp.com/BTDpU4G758206p2s6JZlEc) |
| E-posta | startupvefinanstoplulugu@gmail.com |

---

<p align="center">
  <b>Made with ❤️ by Startup ve Finans Topluluğu</b><br>
  <sub>Ankara Medipol Üniversitesi — © 2023 – 2026</sub>
</p>
