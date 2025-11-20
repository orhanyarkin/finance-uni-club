# 🎨 Sponsor Logo Ekleme Rehberi

Bu rehber, sponsor/partner logolarının nasıl ekleneceğini açıklar.

## 📁 Logo Klasörü

Tüm sponsor logoları şu klasöre eklenmelidir:
```
public/sponsors/
```

## 📝 Logo İsimlendirme Kuralları

### 1. İsimli Logolar (Logo + İsim Gösterilecek)

Normal şirket isimleriyle kaydedin:
```
techventures.png
financehub.png
startupboost.png
investpro.png
```

### 2. İsimsiz Logolar (Sadece Logo Gösterilecek)

`nameless_` öneki ile başlatın:
```
nameless_1.png
nameless_2.png
nameless_3.png
```

## 🖼️ Logo Formatları ve Boyutları

### Önerilen Format
- **PNG** (şeffaf arka plan tercih edilir)
- **SVG** (vektörel, en kaliteli)
- **JPG** (küçük dosya boyutu)

### Boyut Önerileri
- **Genişlik:** 200-400px
- **Yükseklik:** 80-120px
- **Aspect Ratio:** 3:1 veya 2:1 (yatay dikdörtgen)
- **Dosya Boyutu:** < 100KB

## 📋 Logo Ekleme Adımları

### Adım 1: Logoyu Hazırlayın

1. Logo dosyanızı hazırlayın (PNG/SVG/JPG)
2. Arka planı şeffaf yapın (PNG/SVG için)
3. Boyutlandırın (önerilen: 300x100px)
4. Optimize edin (dosya boyutunu küçültün)

### Adım 2: Klasöre Ekleyin

```bash
# Logoyu public/sponsors/ klasörüne kopyalayın
cp /path/to/logo.png public/sponsors/
```

### Adım 3: Kod'a Ekleyin

`src/components/PartnerLogos.tsx` dosyasını açın:

```typescript
const partners = [
  { name: "TechVentures", logo: "techventures.png", nameless: false },
  { name: "FinanceHub", logo: "financehub.png", nameless: false },
  
  // YENİ LOGO BURAYA EKLENİR:
  { name: "YeniSirket", logo: "yenisirket.png", nameless: false },
  
  // İsimsiz logo (sadece logo gösterilir):
  { name: "nameless_4", logo: "nameless_4.png", nameless: true },
];
```

### Adım 4: Görsel Kontrolü Yapın

1. `npm run dev` ile sunucuyu çalıştırın
2. Ana sayfada "İşbirliklerimiz" bölümünü kontrol edin
3. Logonun düzgün göründğünden emin olun

## 🎨 Logo Optimizasyonu

### Online Araçlar

**PNG Optimizasyon:**
- [TinyPNG](https://tinypng.com/) - Dosya boyutunu %70 azaltır
- [Compressor.io](https://compressor.io/)

**SVG Optimizasyon:**
- [SVGOMG](https://jakearchibald.github.io/svgomg/)
- [SVG Optimizer](https://petercollingridge.appspot.com/svg-editor)

**Arka Plan Kaldırma:**
- [Remove.bg](https://www.remove.bg/) - Otomatik arka plan kaldırma
- Photoshop / GIMP - Manuel düzenleme

### Terminal ile Optimizasyon

```bash
# ImageMagick ile PNG optimizasyonu
convert logo.png -resize 300x100 -quality 85 logo_optimized.png

# pngquant ile PNG sıkıştırma
pngquant --quality=65-80 logo.png -o logo_compressed.png
```

## 📊 Örnek Logo Yapısı

```
public/sponsors/
├── techventures.png      (İsimli - 250x80px, 45KB)
├── financehub.png        (İsimli - 300x100px, 38KB)
├── startupboost.svg      (İsimli - vektörel, 12KB)
├── nameless_1.png        (İsimsiz - 200x80px, 30KB)
├── nameless_2.png        (İsimsiz - 250x100px, 42KB)
└── investpro.png         (İsimli - 280x90px, 35KB)
```

## 🔄 Toplu Logo Ekleme

Birden fazla logo eklemek için:

```typescript
// PartnerLogos.tsx içinde

const partners = [
  // Mevcut logolar...
  
  // Yeni logoları toplu ekleyin:
  { name: "Acme Corp", logo: "acme.png", nameless: false },
  { name: "Beta Inc", logo: "beta.png", nameless: false },
  { name: "Gamma Ltd", logo: "gamma.png", nameless: false },
  { name: "nameless_5", logo: "nameless_5.png", nameless: true },
  { name: "nameless_6", logo: "nameless_6.png", nameless: true },
];
```

## 🎯 İpuçları

### ✅ Yapılması Gerekenler

- Şeffaf arka plan kullanın (PNG/SVG)
- Logoyu optimize edin (< 100KB)
- Tutarlı boyutlar kullanın
- Yüksek çözünürlük kullanın (Retina için @2x)

### ❌ Yapılmaması Gerekenler

- Çok büyük dosyalar (> 500KB)
- Düşük çözünürlük
- Beyaz arka plan (dark theme'de görünmez)
- Orantısız boyutlar

## 🚀 Gelişmiş Özellikler

### Next.js Image Optimization Kullanımı

Gelecekte gerçek logoları eklerken şu kodu kullanın:

```typescript
import Image from "next/image";

// PartnerLogos.tsx içinde:
<Image
  src={`/sponsors/${partner.logo}`}
  alt={partner.nameless ? "Partner Logo" : partner.name}
  width={200}
  height={80}
  className="object-contain"
/>
```

Bu sayede Next.js otomatik olarak:
- Lazy loading yapar
- WebP formatına çevirir
- Boyutları optimize eder

## 📞 Destek

Sorularınız için:
- GitHub Issues
- Email: startupvefinanstoplulugu@gmail.com

---

**🎨 Logo eklemeyi başarıyla tamamladınız mı? Harika! 🎉**




