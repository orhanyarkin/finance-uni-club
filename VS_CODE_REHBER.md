# 🎨 VS Code Kurulum ve Kullanım Rehberi

Bu rehber, projeyi VS Code'da en verimli şekilde geliştirmek için gerekli tüm ayarları içerir.

## 🚀 Hızlı Başlangıç

### 1. Projeyi VS Code'da Açın

```bash
cd /Users/orhanyarkin/Documents/web/finance-uni-club
code .
```

### 2. Extension'ları Yükleyin

VS Code açıldığında sağ altta bir bildirim çıkacak:
**"Do you want to install the recommended extensions?"**
→ **"Install All"** butonuna basın.

Veya manuel olarak: `Cmd+Shift+X` ile Extensions panelini açın.

## 📦 Önerilen Extension'lar

### ⚡ Zorunlu Extension'lar (Mutlaka Yükleyin!)

1. **ES7+ React/Redux/React-Native snippets** 
   - ID: `dsznajder.es7-react-js-snippets`
   - React kodları için kısayollar
   - Örnek: `rafce` yazıp Tab = Component oluşturur

2. **Tailwind CSS IntelliSense**
   - ID: `bradlc.vscode-tailwindcss`
   - Tailwind class'larını otomatik tamamlar
   - Renkleri gösterir
   - **ŞART!**

3. **ESLint**
   - ID: `dbaeumer.vscode-eslint`
   - Kod hatalarını gösterir

4. **Prettier - Code formatter**
   - ID: `esbenp.prettier-vscode`
   - Kodu otomatik formatlar
   - Kaydettiğinizde düzenler

### 🎯 Çok Faydalı Extension'lar

5. **Console Ninja**
   - ID: `wallabyjs.console-ninja`
   - console.log'ları editörde gösterir
   - **Süper faydalı!**

6. **Error Lens**
   - ID: `usernamehw.errorlens`
   - Hataları inline gösterir
   - Kırmızı çizgiler yerine açıklama

7. **Auto Import**
   - ID: `steoates.autoimport`
   - Import'ları otomatik ekler

8. **GitLens**
   - ID: `eamodio.gitlens`
   - Git history ve blame gösterir

9. **Auto Rename Tag**
   - ID: `formulahendry.auto-rename-tag`
   - Bir HTML/JSX tag'ini değiştirdiğinizde kapanış tag'i de değişir

10. **Color Highlight**
    - ID: `naumovs.color-highlight`
    - Renk kodlarını görsel olarak gösterir

## ⌨️ Klavye Kısayolları

### Genel Kısayollar:
```
Cmd + P          → Dosya ara ve aç
Cmd + Shift + P  → Komut paleti
Cmd + B          → Sidebar aç/kapa
Cmd + J          → Terminal aç/kapa
Cmd + `          → Terminal'e geç
Cmd + 1, 2, 3    → Editor grupları arası geçiş

Cmd + /          → Yorum satırı
Cmd + D          → Seçili kelimeyi çokla
Cmd + Shift + L  → Tüm aynı kelimeleri seç

Option + Yukarı/Aşağı  → Satırı taşı
Option + Shift + Yukarı/Aşağı → Satırı kopyala

Cmd + F          → Dosyada ara
Cmd + Shift + F  → Tüm projede ara
Cmd + H          → Bul ve değiştir
```

### React/Next.js Kısayolları (ES7 Snippets):
```
rafce   → React Arrow Function Component Export
rfc     → React Function Component
useS    → useState hook
useE    → useEffect hook
useCon  → useContext hook
imp     → import moduleName from 'module'
imn     → import 'module'
```

### Tailwind CSS:
Yazmaya başlayın, otomatik tamamlama çıkacak:
```
bg-     → Background renkleri
text-   → Text renkleri
flex    → Flexbox özellikleri
grid    → Grid özellikleri
```

## 🎯 Projeyi Çalıştırma

### Method 1: Terminal (Önerilen)

1. `Cmd + J` ile terminal'i açın
2. Komutları çalıştırın:

```bash
# İlk seferinde bağımlılıkları yükleyin
npm install

# Development sunucusunu başlatın
npm run dev
```

### Method 2: NPM Scripts Panel

1. Sol sidebar'da **Explorer** (Cmd+Shift+E)
2. En altta **NPM SCRIPTS** bölümü
3. `dev` script'ine tıklayın ▶️

### Method 3: Debug Mode (En Gelişmiş)

1. `Cmd + Shift + D` ile Debug panelini açın
2. Üstten **"Next.js: Debug Full Stack"** seçin
3. Play butonuna (▶️) basın
4. Breakpoint koyabilir, debug yapabilirsiniz

## 📁 Proje Yapısını Keşfetme

### Hızlı Dosya Gezinme:

```
Cmd + P          → Dosya adı yazın (örn: "Hero" → Hero.tsx açılır)
Cmd + Shift + O  → Dosyadaki sembolleri listele (functions, classes)
Cmd + T          → Tüm projede sembol ara
```

### Önemli Dosyalar:

```
src/
├── app/
│   ├── page.tsx         → Ana sayfa
│   ├── layout.tsx       → Root layout
│   └── globals.css      → Global stiller
└── components/
    ├── Navbar.tsx       → Navigation
    ├── Hero.tsx         → Hero section
    ├── Features.tsx     → Özellikler
    └── ...
```

## 🎨 Tailwind CSS IntelliSense Kullanımı

1. Class name yazmaya başlayın: `className="bg-`
2. Otomatik tamamlama menüsü çıkacak
3. Ok tuşları ile seçin, Enter ile onaylayın
4. Renkleri görmek için class üzerine gelin (hover)

**Örnek:**
```tsx
// "bg-" yazın → tüm background renkleri çıkar
<div className="bg-primary hover:bg-primary-dark">
```

## 🔍 Kod Gezinme

### Definitions ve References:

```
Cmd + Tıklama        → Definition'a git
Cmd + F12            → Definition'ı peek et (mini pencere)
Shift + F12          → Tüm referansları göster
F2                   → Rename (her yerde değişir)
```

**Örnek Kullanım:**
- `Navbar` component'inde → Cmd+Tıklama → Navbar.tsx açılır
- Bir prop ismi üzerinde F2 → İsmi değiştirin → her yerde güncellenir

## 🛠️ Yararlı Komutlar (Cmd+Shift+P)

```
> Format Document              → Dosyayı formatla
> Organize Imports            → Import'ları düzenle
> Sort Imports                → Import'ları alfabetik sırala
> Reload Window               → VS Code'u yenile
> Developer: Reload Window    → Tam reload
```

## 🎨 Tema Önerileri (Opsiyonel)

Güzel görünüm için:

1. **One Dark Pro** - Atom tarzı dark theme
2. **Dracula Official** - Popüler dark theme
3. **Night Owl** - Sarah Drasner'ın teması
4. **Material Theme** - Google Material Design

Kurulum: Extensions → "One Dark Pro" ara → Install

## 💡 Pro İpuçları

### 1. Multi-Cursor Editing
```
Cmd + D              → Seçili kelimeyi çokla
Cmd + Shift + L      → Tüm aynı kelimeleri seç
Option + Tıklama     → İstediğiniz yere cursor ekle
```

**Kullanım:**
- "text-secondary" seçin
- Cmd+D ile tüm benzerlerini seçin
- Hepsini aynı anda değiştirin!

### 2. Emmet Abbreviations

HTML/JSX yazmayı hızlandırır:

```tsx
// Yazın:
div.glass-effect>h2.text-2xl+p.text-secondary

// Tab basın, şuna dönüşür:
<div className="glass-effect">
  <h2 className="text-2xl"></h2>
  <p className="text-secondary"></p>
</div>
```

### 3. Live Server

```bash
npm run dev
```

Sonra `Cmd` + Tıklama ile `http://localhost:3000` linkine basın!

### 4. Auto Save

Otomatik kaydetme zaten açık! (`.vscode/settings.json`)
Her değişiklikte 1 saniye sonra otomatik kaydedilir.

### 5. Zen Mode

Dikkat dağınıklığını azaltmak için:
```
Cmd + K, Z          → Zen Mode (tam ekran, sidebar kapalı)
Esc Esc             → Zen Mode'dan çık
```

## 🐛 Debugging İpuçları

### Console.log Debugging:

```tsx
// Console Ninja extension yüklüyse:
console.log('Değer:', value); // ← Sonuç editörde görünür!
```

### React DevTools:

1. Chrome/Firefox'a [React DevTools](https://react.dev/learn/react-developer-tools) yükleyin
2. `npm run dev` ile çalıştırın
3. Tarayıcıda F12 → Components sekmesi

## 📊 Performance İzleme

VS Code'da terminalde:

```bash
# Production build
npm run build

# Build analizi
npm run build -- --profile
```

## 🆘 Sorun Giderme

### TypeScript Hataları Gözükmüyor:

```
Cmd + Shift + P → "TypeScript: Restart TS Server"
```

### Tailwind IntelliSense Çalışmıyor:

1. `.vscode/settings.json` dosyasını kontrol edin
2. VS Code'u yeniden başlatın
3. Extension'ı disable/enable yapın

### Import'lar Çalışmıyor:

```
Cmd + Shift + P → "Developer: Reload Window"
```

### Node Modules Hatası:

```bash
# Node modules'ı sil ve yeniden yükle
rm -rf node_modules package-lock.json
npm install
```

## 🎓 Öğrenme Kaynakları

- **VS Code Tips**: `Cmd + Shift + P` → "Help: Interactive Playground"
- **Keyboard Shortcuts**: `Cmd + K, Cmd + S`
- **VS Code Docs**: [code.visualstudio.com/docs](https://code.visualstudio.com/docs)

## ✅ Kurulum Checklist

Hazır mısınız? Kontrol edin:

- [ ] VS Code yüklü (son versiyon)
- [ ] Proje VS Code'da açık (`code .`)
- [ ] Önerilen extension'lar yüklü
- [ ] `npm install` çalıştırıldı
- [ ] `npm run dev` çalışıyor
- [ ] Tailwind IntelliSense aktif (class yazarken öneri geliyor)
- [ ] ESLint çalışıyor (hatalar görünüyor)
- [ ] Prettier çalışıyor (Cmd+S ile formatlanıyor)
- [ ] Terminal `Cmd + J` ile açılıyor
- [ ] http://localhost:3000 tarayıcıda açılıyor

---

**🎉 Artık profesyonel bir development environment'ınız var!**

Sorularınız için: README.md ve DEPLOYMENT.md dosyalarına bakın.

**Happy Coding! 🚀**








