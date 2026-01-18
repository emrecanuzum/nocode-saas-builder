# NoCode SaaS Builder

Modern, sürükle-bırak destekli web sitesi oluşturucu. Next.js 16, React 19, Tailwind CSS 4 ve Framer Motion ile geliştirilmiştir.

## Özellikler

- **Sürükle-Bırak Düzenleyici**: Blokları sürükleyerek sayfa oluşturun
- **16 Hazır Bileşen**: Navbar'dan Footer'a, Hero'dan Pricing'e tüm ihtiyaçlar
- **Gerçek Zamanlı Önizleme**: Değişiklikleri anında görün
- **Responsive Tasarım**: Mobil, tablet ve masaüstü görünümlerini test edin
- **Kod Dışa Aktarma**: Oluşturduğunuz sayfayı React/Next.js kodu olarak indirin
- **Tema Özelleştirme**: Her bileşen için renk ve arkaplan ayarları

<img width="1679" height="952" alt="1" src="https://github.com/user-attachments/assets/5fbc8183-3810-42bf-bcff-e3e55b26b75c" />
<img width="1679" height="957" alt="2" src="https://github.com/user-attachments/assets/31f4f91c-bbda-4f42-b3e5-a88554bdbb46" />

---

> [!UYARI] > **Kullanım Uyarıları:**
>
> - Canvas kendi içinde Drag & Drop (sürükle bırak) olarak çalışıyor. **Canvas'a component eklemek için çift tıklamalısınız.**
> - Bazı componentler görüntülenme animasyonları sebebiyle canvas'ta görünmeyebilir. Bu durumda **önizleme moduna girip tekrar düzenleme moduna geçiniz.**
> - Düzenleme modundayken eklediğiniz Navbar, üst toolbar'ı kapatabilir. Bu durumda sayfanın **en altındaki "Düzenlemeye Dön" butonunu** kullanabilirsiniz.

---

## Sürükle-Bırak Sistemi

Builder, **@dnd-kit** kütüphanesi üzerine kurulmuştur ve şu özellikleri sunar:

### Temel İşlevler

| İşlev              | Açıklama                                                     |
| ------------------ | ------------------------------------------------------------ |
| **Bileşen Ekleme** | Sol panelden bileşeni sürükleyip canvas'a bırakın            |
| **Sıralama**       | Canvas üzerindeki bileşenleri sürükleyerek yeniden sıralayın |
| **Seçim**          | Bileşene tıklayarak özellik panelini açın                    |
| **Silme**          | Seçili bileşeni toolbar'dan veya klavye ile silin            |
| **Kopyalama**      | Mevcut bileşeni çoğaltın                                     |

### Builder Arayüzü

```
┌─────────────────────────────────────────────────────────────────┐
│                         TOOLBAR                                  │
│  [Önizle] [Viewport: 📱 💻 🖥️] [Kodu Görüntüle] [ZIP İndir]      │
├──────────┬──────────────────────────────────┬───────────────────┤
│          │                                  │                   │
│  SOL     │         CANVAS                   │    SAĞ PANEL      │
│  PANEL   │                                  │                   │
│          │    Sürükle-Bırak Alanı           │   Özellik         │
│ Bileşen  │                                  │   Düzenleyici     │
│ Listesi  │    [Navbar]                      │                   │
│          │    [Hero Section]                │   • Metin         │
│ • Layout │    [Trust Logos]                 │   • Renk          │
│ • Content│    [Benefits Grid]               │   • Medya         │
│ • Social │    ...                           │   • Toggle        │
│ • Convert│                                  │   • Dizi          │
│ • Sector │                                  │                   │
│          │                                  │                   │
└──────────┴──────────────────────────────────┴───────────────────┘
```

---

## Bileşen Detayları

Her bileşen aşağıdaki **ortak özellikleri** destekler:

| Özellik           | Tip      | Açıklama                 |
| ----------------- | -------- | ------------------------ |
| `primaryColor`    | `string` | Ana tema rengi (hex/rgb) |
| `secondaryColor`  | `string` | İkincil tema rengi       |
| `backgroundColor` | `string` | Arkaplan rengi           |
| `backgroundImage` | `string` | Arkaplan resmi URL'i     |

---

### LAYOUT BİLEŞENLERİ

#### 1. Navbar (Navigation Bar)

Sayfanın üst kısmında sabit duran navigasyon çubuğu.

| Özellik                  | Tip                                        | Açıklama                           |
| ------------------------ | ------------------------------------------ | ---------------------------------- |
| `logo.src`               | `string`                                   | Logo resmi URL'i                   |
| `logo.alt`               | `string`                                   | Logo alt metni                     |
| `logo.href`              | `string`                                   | Logo tıklandığında gidilecek sayfa |
| `menuItems`              | `LinkItem[]`                               | Menü linkleri dizisi               |
| `menuItems[].label`      | `string`                                   | Link metni                         |
| `menuItems[].href`       | `string`                                   | Link adresi                        |
| `menuItems[].isExternal` | `boolean`                                  | Yeni sekmede aç                    |
| `ctaButton`              | `ButtonConfig`                             | Sağdaki aksiyon butonu             |
| `ctaButton.label`        | `string`                                   | Buton metni                        |
| `ctaButton.href`         | `string`                                   | Buton linki                        |
| `ctaButton.variant`      | `primary \| secondary \| ghost \| outline` | Buton stili                        |
| `sticky`                 | `boolean`                                  | Scroll'da sabit kal                |
| `transparent`            | `boolean`                                  | Şeffaf arkaplan                    |

---

#### 2. Footer

Sayfa alt bilgisi - linkler, sosyal medya ve telif hakkı.

| Özellik                  | Tip                                                                             | Açıklama                                   |
| ------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------ |
| `logo.src`               | `string`                                                                        | Footer logo URL'i                          |
| `description`            | `string`                                                                        | Şirket açıklaması                          |
| `contactInfo.address`    | `string`                                                                        | Adres                                      |
| `contactInfo.phone`      | `string`                                                                        | Telefon                                    |
| `contactInfo.email`      | `string`                                                                        | E-posta                                    |
| `columns`                | `FooterColumn[]`                                                                | Link kolonları                             |
| `columns[].title`        | `string`                                                                        | Kolon başlığı                              |
| `columns[].links`        | `LinkItem[]`                                                                    | Kolon linkleri                             |
| `socialLinks`            | `SocialLink[]`                                                                  | Sosyal medya ikonları                      |
| `socialLinks[].platform` | `facebook \| twitter \| instagram \| linkedin \| youtube \| tiktok \| whatsapp` | Platform                                   |
| `socialLinks[].href`     | `string`                                                                        | Profil linki                               |
| `copyright`              | `string`                                                                        | Telif hakkı metni                          |
| `bottomLinks`            | `LinkItem[]`                                                                    | Alt kısım linkleri (Gizlilik, Şartlar vb.) |

---

### CONTENT BİLEŞENLERİ

#### 3. Hero Section

Ana sayfa girişi - büyük başlık, açıklama ve CTA butonları.

| Özellik               | Tip                       | Açıklama                               |
| --------------------- | ------------------------- | -------------------------------------- |
| `heading`             | `string`                  | Ana başlık                             |
| `subtext`             | `string`                  | Alt açıklama                           |
| `alignment`           | `left \| center \| right` | İçerik hizalama                        |
| `primaryButton`       | `ButtonConfig`            | Ana CTA butonu                         |
| `secondaryButton`     | `ButtonConfig`            | İkincil buton                          |
| `media.type`          | `image \| video`          | Medya tipi                             |
| `media.src`           | `string`                  | Medya URL'i                            |
| `media.alt`           | `string`                  | Alt metin                              |
| `media.poster`        | `string`                  | Video poster resmi                     |
| `socialProof.text`    | `string`                  | Sosyal kanıt metni ("1000+ kullanıcı") |
| `socialProof.avatars` | `string[]`                | Avatar URL'leri                        |
| `overlay`             | `boolean`                 | Karartma overlay'i                     |
| `overlayOpacity`      | `number`                  | Overlay opaklığı (0-100)               |
| `overlayColor`        | `string`                  | Overlay rengi                          |

---

#### 4. Benefits Grid

İkon, başlık ve açıklamadan oluşan avantaj kartları.

| Özellik                  | Tip           | Açıklama                              |
| ------------------------ | ------------- | ------------------------------------- |
| `title`                  | `string`      | Bölüm başlığı                         |
| `subtitle`               | `string`      | Bölüm alt başlığı                     |
| `columns`                | `2 \| 3 \| 4` | Kolon sayısı                          |
| `benefits`               | `array`       | Avantaj listesi                       |
| `benefits[].icon`        | `string`      | Lucide ikon adı (ör: "Zap", "Shield") |
| `benefits[].title`       | `string`      | Avantaj başlığı                       |
| `benefits[].description` | `string`      | Avantaj açıklaması                    |

---

#### 5. Process Steps

Numaralı süreç adımları.

| Özellik               | Tip                      | Açıklama                  |
| --------------------- | ------------------------ | ------------------------- |
| `title`               | `string`                 | Bölüm başlığı             |
| `subtitle`            | `string`                 | Alt başlık                |
| `variant`             | `horizontal \| vertical` | Yatay veya dikey yerleşim |
| `showArrows`          | `boolean`                | Adımlar arası ok göster   |
| `steps`               | `array`                  | Adım listesi              |
| `steps[].number`      | `number`                 | Adım numarası             |
| `steps[].icon`        | `string`                 | Lucide ikon adı           |
| `steps[].title`       | `string`                 | Adım başlığı              |
| `steps[].description` | `string`                 | Adım açıklaması           |

---

#### 6. Feature Zig-Zag

Sağ-sol değişen görsel ve metin blokları.

| Özellik                  | Tip              | Açıklama             |
| ------------------------ | ---------------- | -------------------- |
| `features`               | `array`          | Özellik listesi      |
| `features[].title`       | `string`         | Özellik başlığı      |
| `features[].description` | `string`         | Özellik açıklaması   |
| `features[].media.type`  | `image \| video` | Medya tipi           |
| `features[].media.src`   | `string`         | Medya URL'i          |
| `features[].bullets`     | `string[]`       | Madde işaretli liste |
| `features[].ctaButton`   | `ButtonConfig`   | Aksiyon butonu       |

---

#### 7. FAQ Accordion

Açılır-kapanır soru-cevap bölümü.

| Özellik            | Tip       | Açıklama                    |
| ------------------ | --------- | --------------------------- |
| `title`            | `string`  | Bölüm başlığı               |
| `subtitle`         | `string`  | Alt başlık                  |
| `allowMultiple`    | `boolean` | Birden fazla açık kalabilir |
| `items`            | `array`   | Soru-cevap listesi          |
| `items[].question` | `string`  | Soru                        |
| `items[].answer`   | `string`  | Cevap                       |

---

### SOCIAL PROOF BİLEŞENLERİ

#### 8. Trust Logos

Güvenilen marka logoları karuseli.

| Özellik        | Tip       | Açıklama                     |
| -------------- | --------- | ---------------------------- |
| `title`        | `string`  | Bölüm başlığı                |
| `animated`     | `boolean` | Otomatik kayma animasyonu    |
| `grayscale`    | `boolean` | Gri tonlama efekti           |
| `logos`        | `array`   | Logo listesi                 |
| `logos[].src`  | `string`  | Logo URL'i                   |
| `logos[].alt`  | `string`  | Logo alt metni               |
| `logos[].href` | `string`  | Tıklandığında gidilecek link |

---

#### 9. Testimonial Grid

Müşteri yorumları kartları.

| Özellik                  | Tip       | Açıklama            |
| ------------------------ | --------- | ------------------- |
| `title`                  | `string`  | Bölüm başlığı       |
| `subtitle`               | `string`  | Alt başlık          |
| `columns`                | `2 \| 3`  | Kolon sayısı        |
| `showRating`             | `boolean` | Yıldız puanı göster |
| `testimonials`           | `array`   | Yorum listesi       |
| `testimonials[].avatar`  | `string`  | Kullanıcı fotoğrafı |
| `testimonials[].name`    | `string`  | Kullanıcı adı       |
| `testimonials[].title`   | `string`  | Unvan               |
| `testimonials[].company` | `string`  | Şirket              |
| `testimonials[].rating`  | `number`  | Puan (1-5)          |
| `testimonials[].comment` | `string`  | Yorum metni         |

---

### CONVERSION BİLEŞENLERİ

#### 10. Pricing Table

Fiyatlandırma planları karşılaştırması.

| Özellik                        | Tip            | Açıklama                |
| ------------------------------ | -------------- | ----------------------- |
| `title`                        | `string`       | Bölüm başlığı           |
| `subtitle`                     | `string`       | Alt başlık              |
| `billingToggle.monthly`        | `string`       | Aylık etiket            |
| `billingToggle.yearly`         | `string`       | Yıllık etiket           |
| `billingToggle.yearlyDiscount` | `string`       | İndirim badge'i         |
| `plans`                        | `array`        | Plan listesi            |
| `plans[].name`                 | `string`       | Plan adı                |
| `plans[].price`                | `string`       | Fiyat                   |
| `plans[].period`               | `string`       | Periyot ("/ay", "/yıl") |
| `plans[].description`          | `string`       | Plan açıklaması         |
| `plans[].isPopular`            | `boolean`      | "Popüler" badge'i       |
| `plans[].badge`                | `string`       | Özel badge metni        |
| `plans[].features`             | `array`        | Özellik listesi         |
| `plans[].features[].text`      | `string`       | Özellik metni           |
| `plans[].features[].included`  | `boolean`      | Dahil mi?               |
| `plans[].ctaButton`            | `ButtonConfig` | Plan seçim butonu       |

---

#### 11. Final CTA

Sayfa sonu büyük çağrı-aksiyon bölümü.

| Özellik           | Tip                          | Açıklama             |
| ----------------- | ---------------------------- | -------------------- |
| `heading`         | `string`                     | Ana başlık           |
| `subtext`         | `string`                     | Alt açıklama         |
| `backgroundStyle` | `gradient \| solid \| image` | Arkaplan stili       |
| `backgroundImage` | `string`                     | Arkaplan resmi URL'i |
| `ctaButton`       | `ButtonConfig`               | Ana buton            |
| `secondaryButton` | `ButtonConfig`               | İkincil buton        |

---

### SECTOR BİLEŞENLERİ

#### 12. Listing Grid

Ürün, emlak veya araç listeleme kartları.

| Özellik                   | Tip           | Açıklama                       |
| ------------------------- | ------------- | ------------------------------ |
| `title`                   | `string`      | Bölüm başlığı                  |
| `subtitle`                | `string`      | Alt başlık                     |
| `columns`                 | `2 \| 3 \| 4` | Kolon sayısı                   |
| `showFilters`             | `boolean`     | Filtre dropdown'ları göster    |
| `filterOptions`           | `array`       | Filtre seçenekleri             |
| `filterOptions[].label`   | `string`      | Filtre etiketi                 |
| `filterOptions[].options` | `string[]`    | Seçenekler                     |
| `items`                   | `array`       | Ürün listesi                   |
| `items[].image`           | `string`      | Ürün görseli                   |
| `items[].title`           | `string`      | Ürün başlığı                   |
| `items[].price`           | `string`      | Fiyat                          |
| `items[].priceLabel`      | `string`      | Fiyat etiketi ("Başlangıç")    |
| `items[].features`        | `string[]`    | Özellikler (["2023", "Dizel"]) |
| `items[].badge`           | `string`      | Ürün badge'i                   |
| `items[].href`            | `string`      | Detay linki                    |

---

#### 13. Menu Section

Restoran menüsü veya hizmet listesi.

| Özellik               | Tip                         | Açıklama                  |
| --------------------- | --------------------------- | ------------------------- |
| `title`               | `string`                    | Bölüm başlığı             |
| `subtitle`            | `string`                    | Alt başlık                |
| `layout`              | `tabs \| accordion \| grid` | Görünüm stili             |
| `showImages`          | `boolean`                   | Ürün görselleri göster    |
| `categories`          | `array`                     | Kategori listesi          |
| `categories[].name`   | `string`                    | Kategori adı              |
| `categories[].icon`   | `string`                    | Kategori ikonu            |
| `items`               | `array`                     | Menü öğeleri              |
| `items[].name`        | `string`                    | Ürün adı                  |
| `items[].description` | `string`                    | Açıklama                  |
| `items[].price`       | `string`                    | Fiyat                     |
| `items[].image`       | `string`                    | Ürün görseli              |
| `items[].badge`       | `string`                    | Badge ("Yeni", "Popüler") |
| `items[].isNew`       | `boolean`                   | Yeni ürün badge'i         |
| `items[].isPopular`   | `boolean`                   | Popüler badge'i           |

---

#### 14. Before/After Slider

İnteraktif önce-sonra karşılaştırma slider'ı.

| Özellik           | Tip                      | Açıklama                    |
| ----------------- | ------------------------ | --------------------------- |
| `title`           | `string`                 | Bölüm başlığı               |
| `subtitle`        | `string`                 | Alt başlık                  |
| `beforeImage.src` | `string`                 | "Önce" görseli URL'i        |
| `beforeImage.alt` | `string`                 | Alt metin                   |
| `afterImage.src`  | `string`                 | "Sonra" görseli URL'i       |
| `afterImage.alt`  | `string`                 | Alt metin                   |
| `beforeLabel`     | `string`                 | Sol etiket ("Önce")         |
| `afterLabel`      | `string`                 | Sağ etiket ("Sonra")        |
| `defaultPosition` | `number`                 | Başlangıç pozisyonu (0-100) |
| `orientation`     | `horizontal \| vertical` | Slider yönü                 |

---

#### 15. Team Grid

Takım üyeleri kartları.

| Özellik                 | Tip            | Açıklama                     |
| ----------------------- | -------------- | ---------------------------- |
| `title`                 | `string`       | Bölüm başlığı                |
| `subtitle`              | `string`       | Alt başlık                   |
| `columns`               | `2 \| 3 \| 4`  | Kolon sayısı                 |
| `showBio`               | `boolean`      | Biyografi göster             |
| `showSocialLinks`       | `boolean`      | Sosyal medya linkleri göster |
| `members`               | `array`        | Üye listesi                  |
| `members[].image`       | `string`       | Fotoğraf URL'i               |
| `members[].name`        | `string`       | İsim                         |
| `members[].title`       | `string`       | Unvan                        |
| `members[].bio`         | `string`       | Biyografi                    |
| `members[].socialLinks` | `SocialLink[]` | Sosyal medya linkleri        |

---

#### 16. Masonry Gallery

Pinterest tarzı masonry galeri.

| Özellik                | Tip                                       | Açıklama            |
| ---------------------- | ----------------------------------------- | ------------------- |
| `title`                | `string`                                  | Bölüm başlığı       |
| `subtitle`             | `string`                                  | Alt başlık          |
| `columns`              | `2 \| 3 \| 4`                             | Kolon sayısı        |
| `gap`                  | `sm \| md \| lg`                          | Boşluk boyutu       |
| `enableLightbox`       | `boolean`                                 | Büyütme lightbox'ı  |
| `showCategories`       | `boolean`                                 | Kategori filtreleri |
| `images`               | `array`                                   | Görsel listesi      |
| `images[].src`         | `string`                                  | Görsel URL'i        |
| `images[].alt`         | `string`                                  | Alt metin           |
| `images[].aspectRatio` | `square \| portrait \| landscape \| auto` | En-boy oranı        |
| `images[].category`    | `string`                                  | Kategori            |

---

## Kullanım

1. **Bileşen Ekle**: Sol panelden bileşenleri sürükleyerek canvas'a bırakın
2. **Düzenle**: Bileşene tıklayarak sağ panelden özelliklerini düzenleyin
3. **Sırala**: Bileşenleri sürükleyerek sırasını değiştirin
4. **Önizle**: Toolbar'daki önizleme butonuyla sonucu görün
5. **Dışa Aktar**: "Kodu Görüntüle" ile React kodunu alın veya ZIP olarak indirin

<img width="1662" height="957" alt="3" src="https://github.com/user-attachments/assets/43e69f5d-5b1a-4325-adfb-7ac6b36163c0" />
<img width="1659" height="956" alt="4" src="https://github.com/user-attachments/assets/d97399eb-dbc2-4555-b978-d5c809421ec7" />

---

## Teknoloji Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS 4
- **Animasyonlar**: Framer Motion
- **Sürükle-Bırak**: @dnd-kit
- **İkonlar**: Lucide React
- **State Management**: React Context API

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build
```

## Proje Yapısı

```
src/
├── app/                    # Next.js App Router
├── components/
│   ├── builder/            # Builder UI bileşenleri
│   │   ├── builder-canvas.tsx    # Sürükle-bırak canvas
│   │   ├── builder-header.tsx    # Üst araç çubuğu
│   │   ├── builder-sidebar.tsx   # Sol panel - bileşen listesi
│   │   ├── builder-properties.tsx # Sağ panel - özellik düzenleyici
│   │   ├── array-item-editor.tsx # Dizi öğesi düzenleyici
│   │   ├── color-picker-field.tsx # Renk seçici
│   │   └── code-preview-modal.tsx # Kod önizleme modal
│   ├── builder-blocks/     # 16 adet hazır bileşen
│   │   ├── navbar/
│   │   ├── hero-section/
│   │   ├── trust-logos/
│   │   ├── benefits-grid/
│   │   ├── process-steps/
│   │   ├── feature-zigzag/
│   │   ├── pricing-table/
│   │   ├── testimonial-grid/
│   │   ├── faq-accordion/
│   │   ├── final-cta/
│   │   ├── footer/
│   │   ├── listing-grid/
│   │   ├── menu-section/
│   │   ├── before-after-slider/
│   │   ├── team-grid/
│   │   └── masonry-gallery/
│   └── ui/                 # Shadcn/UI bileşenleri
├── lib/
│   ├── builder-store.tsx   # Global state yönetimi
│   ├── code-generator.ts   # Kod dışa aktarma
│   ├── registry.tsx        # Bileşen kayıt sistemi
│   └── sample-data.ts      # Örnek veriler
└── types/
    └── builder.ts          # TypeScript tip tanımları
```

---

**Geliştirici**: Emrecan Üzüm
