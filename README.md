# 🚀 Startup ve Finans Topluluğu — Web Sitesi

> **[www.startupvefinanstoplulugu.com](https://www.startupvefinanstoplulugu.com)**

Ankara Medipol Üniversitesi Startup ve Finans Topluluğu'nun resmi web sitesi. Next.js, Sanity CMS, Tailwind CSS ve Framer Motion ile geliştirilmiş modern, çok dilli ve çok temalı bir platform.

---

## ✨ Özellikler

- 🌓 **Dark / Light Tema** — Kullanıcı tercihine göre otomatik algılama
- 🌍 **Türkçe / İngilizce** — Tüm içerikler iki dilde, tek tıkla geçiş
- 📝 **Blog Sistemi** — Sanity CMS üzerinden yönetilen blog yazıları
- 🎪 **Etkinlik Yönetimi** — Kayıt durumu, detay sayfaları ve carousel gösterimi
- � **Ekip Sayfası** — Yönetim kurulu ve komite üyeleri
- 🤝 **İşbirlikleri** — Partner logoları carousel sistemi
- 📱 **Tam Responsive** — Mobil, tablet ve masaüstü uyumlu
- 🎨 **Framer Motion** — Akıcı animasyonlar ve glassmorphism efektleri
- 🔍 **SEO Optimize** — Sitemap, robots.txt, Open Graph, yapılandırılmış veri

---

## 🛠️ Teknoloji Stack

| Kategori | Teknoloji |
|----------|-----------|
| **Framework** | Next.js (App Router) |
| **UI** | React |
| **Dil** | TypeScript |
| **Styling** | Tailwind CSS |
| **Animasyonlar** | Framer Motion |
| **CMS** | Sanity (Headless CMS) |
| **İkonlar** | Lucide React, Tabler Icons |
| **Deploy** | Vercel |

---

## 🌐 Sayfalar

| Sayfa | Açıklama |
|-------|----------|
| **Ana Sayfa** | Hero, istatistikler, son blog yazıları, etkinlikler |
| **Hakkımızda** | Kulüp bilgileri, yönetim kurulu, komiteler, sunulan hizmetler |
| **Blog** | Finans, girişimcilik ve teknoloji hakkında içerikler |
| **Etkinlikler** | Geçmiş ve gelecek etkinlikler, detay sayfaları |
| **İletişim** | İletişim bilgileri |
| **İşbirlikleri** | Partner kuruluşlar |
| **SSS** | Sıkça Sorulan Sorular |
| **Yasal** | Gizlilik Politikası, Kullanım Şartları, Çerez Politikası |

---

## 📦 Kurulum

### Gereksinimler

- **Node.js** ≥ 18
- **npm** ≥ 9

### 1. Bağımlılıkları yükleyin

```bash
npm install
```

### 2. Development sunucusunu başlatın

```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

### 3. Production build

```bash
npm run build
npm start
```

---

## 📁 Proje Yapısı

```
finance-uni-club/
├── src/
│   ├── app/
│   │   ├── (site)/              # Sayfa rotaları
│   │   │   ├── page.tsx         # Ana sayfa
│   │   │   ├── about/           # Hakkımızda
│   │   │   ├── blog/            # Blog listesi & detay
│   │   │   ├── events/          # Etkinlikler & detay
│   │   │   ├── contact/         # İletişim
│   │   │   ├── partnerships/    # İşbirlikleri
│   │   │   ├── sss/             # Sıkça Sorulan Sorular
│   │   │   └── legal/           # Gizlilik, Şartlar, Çerezler
│   │   ├── api/                 # API rotaları
│   │   ├── layout.tsx           # Ana layout & meta bilgileri
│   │   ├── sitemap.ts           # Dinamik sitemap
│   │   ├── robots.ts            # robots.txt
│   │   ├── error.tsx            # Hata sayfası
│   │   ├── not-found.tsx        # 404 sayfası
│   │   └── globals.css          # Global stiller
│   ├── components/              # UI bileşenleri
│   ├── contexts/                # React context'ler (dil yönetimi)
│   ├── data/                    # Statik veriler
│   ├── lib/                     # Yardımcı fonksiyonlar
│   └── sanity/                  # Sanity CMS şemaları & client
├── public/
│   ├── assets/                  # Görseller
│   └── sponsors/                # İşbirliği logoları
├── next.config.mjs              # Next.js konfigürasyonu
├── tailwind.config.ts           # Tailwind konfigürasyonu
├── sanity.config.ts             # Sanity konfigürasyonu
├── tsconfig.json                # TypeScript konfigürasyonu
└── package.json                 # Bağımlılıklar & scriptler
```

---

## 🚀 Deploy

Proje **Vercel** üzerinde barındırılmaktadır. `main` branch'e yapılan her push otomatik olarak canlıya alınır.

---

## 🔗 Bağlantılar

| Platform | Link |
|----------|------|
| 🌐 Web Sitesi | [startupvefinanstoplulugu.com](https://www.startupvefinanstoplulugu.com) |
| 📸 Instagram | [@startupvefinanstoplulugu](https://www.instagram.com/startupvefinanstoplulugu) |
| 💬 WhatsApp | [Topluluk Grubuna Katıl](https://chat.whatsapp.com/BTDpU4G758206p2s6JZlEc) |
| 📧 E-posta | startupvefinanstoplulugu@gmail.com |

---

## 📄 Lisans

Bu proje MIT lisansı altındadır.

---

<p align="center">
  <b>Made with ❤️ by Startup ve Finans Topluluğu</b><br>
  <sub>Ankara Medipol Üniversitesi — © 2023 – 2026</sub>
</p>
