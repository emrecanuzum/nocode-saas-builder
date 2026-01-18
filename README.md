# 🚀 NoCode SaaS Builder

Modern, sürükle-bırak destekli web sitesi oluşturucu. Next.js 16, React 19, Tailwind CSS 4 ve Framer Motion ile geliştirilmiştir.

![Builder Arayüzü](/1.png)

## ✨ Özellikler

- **Sürükle-Bırak Düzenleyici**: Blokları sürükleyerek sayfa oluşturun
- **16 Hazır Bileşen**: Navbar'dan Footer'a, Hero'dan Pricing'e tüm ihtiyaçlar
- **Gerçek Zamanlı Önizleme**: Değişiklikleri anında görün
- **Responsive Tasarım**: Mobil, tablet ve masaüstü görünümlerini test edin
- **Kod Dışa Aktarma**: Oluşturduğunuz sayfayı React/Next.js kodu olarak indirin
- **Tema Özelleştirme**: Her bileşen için renk ve arkaplan ayarları

![Bileşen Paneli](/2.png)

## 🧩 Hazır Bileşenler

| Kategori         | Bileşenler                                                                  |
| ---------------- | --------------------------------------------------------------------------- |
| **Layout**       | Navbar, Footer                                                              |
| **Content**      | Hero Section, Benefits Grid, Process Steps, Feature Zig-Zag, FAQ Accordion  |
| **Social Proof** | Trust Logos, Testimonial Grid                                               |
| **Conversion**   | Pricing Table, Final CTA                                                    |
| **Sector**       | Listing Grid, Menu Section, Before/After Slider, Team Grid, Masonry Gallery |

![Önizleme Modu](/3.png)

## 🛠️ Teknoloji Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS 4
- **Animasyonlar**: Framer Motion
- **Sürükle-Bırak**: @dnd-kit
- **İkonlar**: Lucide React
- **State Management**: React Context API

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build
```

## 🏗️ Proje Yapısı

```
src/
├── app/                    # Next.js App Router
├── components/
│   ├── builder/            # Builder UI bileşenleri
│   │   ├── block-item.tsx     # Tek blok wrapper
│   │   ├── canvas.tsx         # Sürükle-bırak canvas
│   │   ├── component-panel.tsx # Sol panel - bileşen listesi
│   │   ├── property-pane.tsx  # Sağ panel - özellik düzenleyici
│   │   └── toolbar.tsx        # Üst araç çubuğu
│   ├── builder-blocks/     # 16 adet hazır bileşen
│   │   ├── navbar/
│   │   ├── hero-section/
│   │   ├── trust-logos/
│   │   └── ...
│   └── ui/                 # Shadcn/UI bileşenleri
├── lib/
│   ├── builder-store.tsx   # Global state yönetimi
│   ├── code-generator.ts   # Kod dışa aktarma
│   ├── registry.tsx        # Bileşen kayıt sistemi
│   └── sample-data.ts      # Örnek veriler
└── types/
    └── builder.ts          # TypeScript tip tanımları
```

## 🎨 Kullanım

1. **Bileşen Ekle**: Sol panelden bileşenleri sürükleyerek canvas'a bırakın
2. **Düzenle**: Bileşene tıklayarak sağ panelden özelliklerini düzenleyin
3. **Sırala**: Bileşenleri sürükleyerek sırasını değiştirin
4. **Önizle**: Toolbar'daki önizleme butonuyla sonucu görün
5. **Dışa Aktar**: "Kodu Görüntüle" ile React kodunu alın veya ZIP olarak indirin

![Kod Dışa Aktarma](/4.png)

## 🔧 Bileşen Özellikleri

Her bileşen şu ortak özellikleri destekler:

- `primaryColor`: Ana tema rengi
- `secondaryColor`: İkincil tema rengi
- `backgroundColor`: Arkaplan rengi
- `backgroundImage`: Arkaplan resmi

## 📝 Lisans

MIT License

---

**Geliştirici**: Emre Can Uzum
