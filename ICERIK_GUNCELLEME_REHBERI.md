# 📝 İçerik Güncelleme Rehberi

Bu rehber, web sitesindeki metinleri, görselleri ve içerikleri nasıl güncelleyeceğinizi adım adım açıklar.

## 🎯 Hızlı Başlangıç

```bash
# VS Code'da projeyi açın
code .

# Development sunucusunu başlatın
npm run dev

# http://localhost:3000 adresini açın
# Değişiklikler otomatik güncellenir!
```

---

## 1️⃣ Ana Sayfa (Hero Section)

**Dosya:** `src/components/Hero.tsx`

### Başlık Değiştirme

```typescript
// Satır ~39-43
<motion.h1>
  Geleceğin{" "}
  <span className="gradient-text">
    Girişimcilerini  {/* BURASI DEĞİŞEBİLİR */}
  </span>
  <br />
  Bugün Yetiştiriyoruz  {/* BURASI DEĞİŞEBİLİR */}
</motion.h1>
```

### Alt Başlık Değiştirme

```typescript
// Satır ~47-52
<motion.p>
  Startup ekosistemi ve finans dünyasında... {/* BURASI DEĞİŞEBİLİR */}
</motion.p>
```

### İstatistikler

```typescript
// Satır ~85-96
<div className="text-center">
  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
    200+  {/* SAYI DEĞİŞEBİLİR */}
  </div>
  <div className="text-sm text-text-secondary">
    Toplam Üye  {/* ETIKET DEĞİŞEBİLİR */}
  </div>
</div>
```

---

## 2️⃣ Hakkımızda Bölümü

**Dosya:** `src/components/About.tsx`

### Ana Metin

```typescript
// Satır ~21-30
<p className="text-xl text-text-secondary mb-8 leading-relaxed">
  Startup ve Finans Topluluğu, girişimcilik ruhu...
  {/* Bu paragrafı değiştirin */}
</p>

<p className="text-lg text-text-secondary mb-8 leading-relaxed">
  2023 yılında kurulan topluluğumuz...
  {/* Bu paragrafı değiştirin */}
</p>
```

### Misyon, Vizyon, Değerler

```typescript
// Satır ~36-43
<h3 className="text-xl font-semibold mb-2">Misyonumuz</h3>
<p className="text-text-secondary">
  Öğrencilere girişimcilik ve finans...
  {/* Misyon metnini değiştirin */}
</p>

// Benzer şekilde Vizyon ve Değerler için de değiştirin
```

---

## 3️⃣ Ekibimiz (Team)

**Dosya:** `src/components/Team.tsx`

### Yönetim Kurulu Üyeleri

```typescript
// Satır ~12-35
const board: TeamMember[] = [
  {
    name: "Ahmet Yılmaz",  // İSİM DEĞİŞEBİLİR
    role: "Başkan",        // ÜNVAN DEĞİŞEBİLİR
    photo: "https://...",  // FOTOĞRAF LINKI
    icon: Crown,
  },
  // Diğer üyeler...
];
```

### Gerçek Fotoğraf Kullanımı

```typescript
// Önce fotoğrafı ekleyin:
// public/team/ahmet-yilmaz.jpg

// Sonra linki değiştirin:
photo: "/team/ahmet-yilmaz.jpg",
```

### Komite Üyeleri

```typescript
// Satır ~40-85
const committees = [
  {
    name: "Kurumsal İletişim",  // KOMİTE ADI
    icon: Megaphone,
    color: "from-blue-500 to-cyan-500",  // RENK
    members: [
      {
        name: "Can Öztürk",      // ÜYE ADI
        role: "Komite Başkanı",  // ROLÜ
        photo: "...",            // FOTOĞRAFI
      },
      // Diğer üyeler...
    ],
  },
  // Diğer komiteler...
];
```

---

## 4️⃣ Etkinlikler

**Dosya:** `src/components/EventsCarousel.tsx`

### Etkinlik Ekleme/Düzenleme

```typescript
// Satır ~21-67
const events: Event[] = [
  {
    title: "Blockchain ve Kripto Para Workshop",  // BAŞLIK
    date: "15 Aralık 2025",                       // TARİH
    location: "Konferans Salonu A",               // LOKASYON
    participants: 75,                              // KATILIMCI SAYISI
    category: "Workshop",                          // KATEGORİ
    status: "register",                            // DURUM: register/upcoming/past
    description: "Blockchain teknolojisi...",     // AÇIKLAMA
  },
  // Yeni etkinlik eklemek için buraya ekleyin
];
```

### Etkinlik Durumları

```typescript
status: "register"   // 🟢 Yeşil - Kayıt açık
status: "upcoming"   // 🔵 Mavi - Yakında
status: "past"       // ⚫ Gri - Geçmiş
```

---

## 5️⃣ Özellikler (Features)

**Dosya:** `src/components/Features.tsx`

### Özellik Kartları

```typescript
// Satır ~8-43
const features = [
  {
    icon: Lightbulb,
    title: "Workshop ve Eğitimler",  // BAŞLIK
    description: "Girişimcilik, yatırım...",  // AÇIKLAMA
  },
  // Diğer özellikler...
];
```

### Yeni Özellik Ekleme

```typescript
import { YourIcon } from "lucide-react";  // İkon import edin

// features array'ine ekleyin:
{
  icon: YourIcon,
  title: "Yeni Özellik",
  description: "Açıklama metni buraya...",
},
```

---

## 6️⃣ İşbirliklerimiz (Sponsors)

**Dosya:** `src/components/PartnerLogos.tsx`

### Logo Ekleme

**Adım 1:** Logo dosyasını ekleyin
```bash
# Logoyu kopyalayın
cp logo.png public/sponsors/techventures.png
```

**Adım 2:** Koda ekleyin
```typescript
// Satır ~8-19
const partners = [
  { 
    name: "TechVentures",           // Sponsor adı
    logo: "techventures.png",       // Dosya adı
    nameless: false                 // true = sadece logo, false = logo + isim
  },
  { 
    name: "nameless_1", 
    logo: "nameless_1.png", 
    nameless: true                  // Sadece logo gösterilir
  },
  // Yeni sponsor buraya ekleyin...
];
```

**Detaylı rehber:** `SPONSOR_LOGO_REHBERI.md`

---

## 7️⃣ Footer (Alt Kısım)

**Dosya:** `src/components/Footer.tsx`

### Sosyal Medya Linkleri

```typescript
// Instagram (Satır ~48-56)
<a href="https://www.instagram.com/startupvefinanstoplulugu">
  <Instagram />
</a>

// LinkedIn (Satır ~57-65)
<a href="#">  {/* LINKEDIN LİNKİ BURAYA */}
  <Linkedin />
</a>

// Twitter (Satır ~66-74)
<a href="#">  {/* TWITTER LİNKİ BURAYA */}
  <Twitter />
</a>

// E-posta (Satır ~75-82)
<a href="mailto:startupvefinanstoplulugu@gmail.com">
  <Mail />
</a>
```

### Footer Linkleri

```typescript
// Satır ~93-109
const footerLinks = {
  company: [
    { title: "Hakkımızda", href: "#about" },
    { title: "Etkinlikler", href: "#events" },
    // Yeni linkler ekleyebilirsiniz
  ],
  resources: [
    { title: "Blog", href: "#" },
    // Yeni kaynaklar ekleyebilirsiniz
  ],
  // ...
};
```

---

## 8️⃣ İstatistikler (Stats)

**Dosya:** `src/components/Stats.tsx`

### Sayıları Güncelleme

```typescript
// Satır ~7-32
const stats = [
  {
    icon: Users,
    value: "200+",                     // SAYI
    label: "Toplam Üye",               // ETIKET
    description: "Farklı bölümlerden...",  // AÇIKLAMA
  },
  // Diğer istatistikler...
];
```

---

## 🎨 Renkler ve Tema

**Dosya:** `tailwind.config.ts`

### Ana Renkler

```typescript
// Satır ~10-25
colors: {
  primary: {
    DEFAULT: "#375BD2",  // Ana mavi
    dark: "#2A4AB3",     // Koyu mavi
    light: "#4A6FE8",    // Açık mavi
  },
  background: {
    DEFAULT: "#0B0F1E",      // Ana arka plan
    secondary: "#141823",     // İkincil arka plan
    tertiary: "#1A1F2E",     // Üçüncül arka plan
  },
  // Renkleri değiştirin
}
```

---

## 🖼️ Görsel Ekleme Rehberi

### 1. Ekip Fotoğrafları

```bash
# Fotoğrafları ekleyin
mkdir -p public/team
cp ahmet-yilmaz.jpg public/team/

# Team.tsx'te kullanın
photo: "/team/ahmet-yilmaz.jpg"
```

### 2. Sponsor Logoları

```bash
# Logoları ekleyin
cp logo.png public/sponsors/techventures.png

# PartnerLogos.tsx'te kullanın
{ name: "TechVentures", logo: "techventures.png", nameless: false }
```

### 3. Favicon

```bash
# Favicon ekleyin
cp favicon.ico public/favicon.ico

# Layout.tsx otomatik bulacak
```

---

## ⚡ Hızlı Değişiklik Örnekleri

### Kulüp Adını Değiştirmek

**1. Navbar ve Footer:**
```typescript
// Navbar.tsx ve Footer.tsx dosyalarında
<h1 className="text-xl font-bold">Startup & Finans</h1>
// Değiştirin ↓
<h1 className="text-xl font-bold">Yeni Kulüp Adı</h1>
```

**2. Meta Title:**
```typescript
// src/app/layout.tsx
export const metadata = {
  title: "Startup ve Finans Kulübü...",  // BURASI
};
```

### İletişim Bilgilerini Değiştirmek

**E-posta:**
```typescript
// Footer.tsx'te tüm
"startupvefinanstoplulugu@gmail.com"
// yerlerini değiştirin
```

**WhatsApp Linki:**
```typescript
// Tüm dosyalarda
"https://chat.whatsapp.com/BTDpU4G758206p2s6JZlEc"
// linkini değiştirin
```

---

## 🔍 İçerik Bulma İpuçları

### VS Code'da Arama

```bash
# Tüm projede ara
Cmd + Shift + F

# Örnek: "Kulübe Katıl" yazan tüm yerleri bulun
# Değiştirecekseniz "Replace" kullanın
```

### Dosya Hızlı Açma

```bash
Cmd + P

# Yazın:
"Hero"     → Hero.tsx açılır
"Team"     → Team.tsx açılır
"Footer"   → Footer.tsx açılır
```

---

## ✅ Güncelleme Checklist

İçerik güncellerken kontrol edin:

### Ana Sayfa
- [ ] Hero başlığı
- [ ] Hero alt başlığı
- [ ] İstatistikler (3 kutu)
- [ ] CTA butonları

### Hakkımızda
- [ ] Giriş paragrafı
- [ ] Detay paragrafı
- [ ] Misyon metni
- [ ] Vizyon metni
- [ ] Değerler metni
- [ ] Kuruluş yılı
- [ ] İstatistik kutuları (4 adet)

### Ekibimiz
- [ ] Yönetim kurulu (4 kişi)
  - [ ] İsimler
  - [ ] Ünvanlar
  - [ ] Fotoğraflar
- [ ] Komiteler (5 adet)
  - [ ] Komite adları
  - [ ] Üye isimleri (3'er kişi)
  - [ ] Fotoğraflar

### Etkinlikler
- [ ] Etkinlik başlıkları
- [ ] Tarihler
- [ ] Lokasyonlar
- [ ] Açıklamalar
- [ ] Durumlar (register/upcoming/past)

### İşbirliklerimiz
- [ ] Sponsor logoları eklenmiş
- [ ] Logo isimleri doğru
- [ ] nameless_ logoları ayarlanmış

### Footer
- [ ] Sosyal medya linkleri
- [ ] E-posta adresi
- [ ] Link bölümleri
- [ ] Copyright yılı

---

## 🆘 Yardım

### Bir Şey Bozuldu mu?

```bash
# Değişiklikleri geri alın
git checkout src/components/Hero.tsx

# Veya tüm değişiklikleri geri alın
git checkout .
```

### Canlı Önizleme Çalışmıyor

```bash
# Sunucuyu yeniden başlatın
Ctrl + C  (durdur)
npm run dev  (başlat)
```

### Hata Aldım

```bash
# Hataları görmek için
npm run lint

# Otomatik düzelt
npm run lint -- --fix
```

---

## 📞 İletişim

Sorularınız için:
- WhatsApp: [Kulübe Katılın](https://chat.whatsapp.com/BTDpU4G758206p2s6JZlEc)
- Instagram: [@startupvefinanstoplulugu](https://www.instagram.com/startupvefinanstoplulugu)
- E-posta: startupvefinanstoplulugu@gmail.com

---

**💡 İpucu:** Değişiklik yaparken `Cmd + S` ile sık sık kaydedin. 
Tarayıcıda otomatik güncellenecektir! ⚡




