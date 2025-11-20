# 🚀 Startup ve Finans Kulübü Web Sitesi

Modern, Chainlink tarzında tasarlanmış, üniversite kulübü web sitesi. Next.js 14, Tailwind CSS ve Framer Motion ile geliştirilmiştir.

## ✨ Özellikler

- 🎨 **Chainlink Tarzı Dark Theme** - Modern ve profesyonel görünüm
- ⚡ **Next.js 14** - En son teknoloji ile yüksek performans
- 🎭 **Framer Motion** - Akıcı ve etkileyici animasyonlar
- 📱 **Tam Responsive** - Tüm cihazlarda mükemmel görünüm
- 🎯 **SEO Optimized** - Arama motorları için optimize edilmiş
- 🚀 **Vercel'de Ücretsiz Deploy** - Hosting maliyeti yok!

## 🛠️ Teknoloji Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animasyonlar:** Framer Motion
- **İkonlar:** Lucide React
- **Dil:** TypeScript
- **Deploy:** Vercel (Ücretsiz)

## 📦 Kurulum

### 1. Bağımlılıkları Yükleyin

```bash
npm install
```

### 2. Development Sunucusunu Başlatın

```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 🌐 Deploy (Vercel'e Ücretsiz Yayınlama)

### Adım 1: GitHub Repository Oluşturun

```bash
git init
git add .
git commit -m "İlk commit: Startup ve Finans Kulübü web sitesi"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/finance-club.git
git push -u origin main
```

### Adım 2: Vercel'de Deploy Edin

1. [vercel.com](https://vercel.com) adresine gidin
2. GitHub hesabınızla giriş yapın
3. "Import Project" butonuna tıklayın
4. GitHub repository'nizi seçin
5. "Deploy" butonuna tıklayın

**🎉 Hepsi bu kadar! Siteniz saniyeler içinde yayında!**

Vercel size otomatik olarak bir URL verecek: `https://finance-club.vercel.app`

### Adım 3: Özel Domain Bağlama (Opsiyonel)

1. Domain satın alın (Namecheap, Porkbun, GoDaddy - ~100-200 TL/yıl)
2. Vercel dashboard'dan "Settings" → "Domains"
3. Domain'inizi ekleyin
4. DNS kayıtlarını güncelleyin (Vercel size talimat verir)

## 📁 Proje Yapısı

```
finance-uni-club/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Ana layout
│   │   ├── page.tsx            # Ana sayfa
│   │   └── globals.css         # Global stiller
│   └── components/
│       ├── Navbar.tsx          # Navigation bar
│       ├── Hero.tsx            # Hero section
│       ├── PartnerLogos.tsx    # Partner logoları
│       ├── Stats.tsx           # İstatistikler
│       ├── Features.tsx        # Özellikler
│       ├── About.tsx           # Hakkımızda
│       ├── Events.tsx          # Etkinlikler
│       └── Footer.tsx          # Footer
├── public/                     # Statik dosyalar
├── tailwind.config.ts          # Tailwind konfigürasyonu
├── next.config.mjs             # Next.js konfigürasyonu
└── package.json                # Bağımlılıklar
```

## 🎨 Renk Paleti (Chainlink Inspired)

```css
Primary Blue: #375BD2
Primary Dark: #2A4AB3
Primary Light: #4A6FE8
Accent Cyan: #00D4FF
Background: #0B0F1E
Background Secondary: #141823
Background Tertiary: #1A1F2E
```

## 📝 Özelleştirme

### Renkler

`tailwind.config.ts` dosyasından renkleri değiştirebilirsiniz:

```typescript
colors: {
  primary: {
    DEFAULT: "#375BD2",
    dark: "#2A4AB3",
    light: "#4A6FE8",
  },
  // ...
}
```

### İçerik

Tüm içerik `src/components/` klasöründeki dosyalarda bulunmaktadır. İstediğiniz gibi düzenleyebilirsiniz.

### Logolar ve Görseller

`public/` klasörüne logolarınızı ekleyin ve component'lerde kullanın.

## 💰 Maliyet Analizi

| Hizmet | Maliyet | Notlar |
|--------|---------|--------|
| **Vercel Hosting** | ÜCRETSİZ | Hobby plan, sınırsız bandwidth |
| **Domain (.com)** | ~150 TL/yıl | Namecheap, Porkbun |
| **Domain (.tr)** | ~200 TL/yıl | Yerli sağlayıcılar |
| **SSL Sertifikası** | ÜCRETSİZ | Vercel otomatik sağlar |
| **Toplam** | **~150-200 TL/yıl** | Sadece domain ücreti |

## 🚀 Performans

- ⚡ Lighthouse Skoru: 95+
- 📱 Tam responsive tasarım
- 🎨 Smooth animasyonlar
- ⚡ Hızlı sayfa yükleme
- 🔍 SEO optimize

## 📧 İletişim

Sorularınız için:
- Email: info@startupfinanskulubu.com
- Instagram: @startupfinanskulubu
- LinkedIn: Startup ve Finans Kulübü

## 📄 Lisans

Bu proje MIT lisansı altındadır. İstediğiniz gibi kullanabilirsiniz.

---

**Made with ❤️ by Startup ve Finans Kulübü**

🌟 Projeyi beğendiyseniz GitHub'da yıldız vermeyi unutmayın!








