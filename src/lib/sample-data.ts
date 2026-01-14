/**
 * Sample Page Data
 * Örnek sayfa verileri - Oto Galeri ve Diş Kliniği senaryoları
 */

import { PageSchema } from "@/types/builder";

// =============================================================================
// OTO GALERİ SAYFASI
// =============================================================================

export const AUTO_GALLERY_PAGE: PageSchema = {
  id: "auto-gallery-landing",
  slug: "oto-galeri",
  meta: {
    title: "Premium Auto Gallery - Hayalinizdeki Araç",
    description:
      "Türkiye'nin en güvenilir oto galerisi. 500+ araç, %100 garanti.",
    theme: {
      primaryColor: "#3b82f6",
      fontFamily: "Inter",
    },
  },
  blocks: [
    // Navbar
    {
      id: "navbar-1",
      type: "navbar",
      logo: {
        src: "/logo.svg",
        alt: "Premium Auto Gallery",
        href: "/",
      },
      menuItems: [
        { label: "Araçlar", href: "#araclar" },
        { label: "Nasıl Çalışır", href: "#nasil-calisir" },
        { label: "Hakkımızda", href: "#hakkimizda" },
        { label: "SSS", href: "#sss" },
        { label: "İletişim", href: "#iletisim" },
      ],
      ctaButton: {
        label: "Hemen Ara",
        href: "tel:+905551234567",
        variant: "primary",
      },
      sticky: true,
    },

    // Hero Section
    {
      id: "hero-1",
      type: "heroSection",
      heading: "Hayalinizdeki Araç Burada",
      subtext:
        "500+ araç arasından size en uygun olanı bulun. Ekspertiz raporu, garanti ve takas imkanı ile güvenle alışveriş yapın.",
      primaryButton: {
        label: "Araçları İncele",
        href: "#araclar",
        variant: "primary",
      },
      secondaryButton: {
        label: "Randevu Al",
        href: "#randevu",
        variant: "ghost",
      },
      media: {
        type: "image",
        src: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800",
        alt: "Lüks araçlar",
      },
      socialProof: {
        text: "10.000+ mutlu müşteri",
        avatars: [
          "https://i.pravatar.cc/100?img=1",
          "https://i.pravatar.cc/100?img=2",
          "https://i.pravatar.cc/100?img=3",
          "https://i.pravatar.cc/100?img=4",
          "https://i.pravatar.cc/100?img=5",
        ],
      },
      alignment: "left",
    },

    // Trust Logos
    {
      id: "trust-1",
      type: "trustLogos",
      title: "Güvenilir Markalar",
      logos: [
        {
          src: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg",
          alt: "Mercedes",
        },
        {
          src: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
          alt: "BMW",
        },
        {
          src: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Volkswagen_logo_2019.svg",
          alt: "VW",
        },
        {
          src: "https://upload.wikimedia.org/wikipedia/commons/1/15/Audi_logo_detail.svg",
          alt: "Audi",
        },
        {
          src: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Toyota_logo.svg",
          alt: "Toyota",
        },
      ],
      animated: true,
      grayscale: true,
    },

    // Listing Grid
    {
      id: "listing-1",
      type: "listingGrid",
      title: "Öne Çıkan Araçlar",
      subtitle: "En çok tercih edilen modellerimizi keşfedin",
      columns: 3,
      items: [
        {
          id: "car-1",
          image:
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600",
          title: "Mercedes-Benz C200 AMG",
          price: "2.450.000 ₺",
          priceLabel: "Başlangıç",
          features: ["2023", "Benzin", "Otomatik", "15.000 km"],
          badge: "Yeni",
          href: "#",
        },
        {
          id: "car-2",
          image:
            "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=600",
          title: "BMW 320i M Sport",
          price: "2.150.000 ₺",
          features: ["2022", "Benzin", "Otomatik", "28.000 km"],
          href: "#",
        },
        {
          id: "car-3",
          image:
            "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600",
          title: "Audi A4 Quattro",
          price: "1.950.000 ₺",
          features: ["2022", "Dizel", "Otomatik", "35.000 km"],
          badge: "Fırsat",
          href: "#",
        },
        {
          id: "car-4",
          image:
            "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600",
          title: "Volkswagen Passat",
          price: "1.450.000 ₺",
          features: ["2021", "Dizel", "Otomatik", "52.000 km"],
          href: "#",
        },
        {
          id: "car-5",
          image:
            "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600",
          title: "Toyota Corolla Hybrid",
          price: "1.250.000 ₺",
          features: ["2023", "Hibrit", "Otomatik", "8.000 km"],
          badge: "Ekonomik",
          href: "#",
        },
        {
          id: "car-6",
          image:
            "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600",
          title: "Porsche 911 Carrera",
          price: "8.500.000 ₺",
          features: ["2021", "Benzin", "Otomatik", "12.000 km"],
          badge: "Premium",
          href: "#",
        },
      ],
    },

    // Process Steps
    {
      id: "process-1",
      type: "processSteps",
      title: "Nasıl Çalışır?",
      subtitle: "3 kolay adımda hayalinizdeki araca sahip olun",
      showArrows: true,
      variant: "horizontal",
      steps: [
        {
          number: 1,
          icon: "Search",
          title: "Aracınızı Seçin",
          description: "500+ araç arasından size uygun olanı bulun",
        },
        {
          number: 2,
          icon: "FileCheck",
          title: "Ekspertiz Raporu",
          description: "Detaylı ekspertiz raporu ile güvenle inceleyin",
        },
        {
          number: 3,
          icon: "Key",
          title: "Teslim Alın",
          description: "Kredi veya takas imkanı ile aracınızı teslim alın",
        },
      ],
    },

    // Benefits Grid
    {
      id: "benefits-1",
      type: "benefitsGrid",
      title: "Neden Bizi Tercih Etmelisiniz?",
      columns: 3,
      benefits: [
        {
          icon: "ShieldCheck",
          title: "1 Yıl Garanti",
          description: "Tüm araçlarımız 1 yıl motor ve şanzıman garantili.",
        },
        {
          icon: "FileText",
          title: "Ekspertiz Raporu",
          description: "Bağımsız ekspertiz kuruluşundan detaylı rapor.",
        },
        {
          icon: "RefreshCw",
          title: "Takas İmkanı",
          description: "Mevcut aracınızı değerlendirme imkanı.",
        },
        {
          icon: "CreditCard",
          title: "Kredi Kolaylığı",
          description: "Anlaşmalı bankalardan uygun kredi seçenekleri.",
        },
        {
          icon: "Truck",
          title: "Ücretsiz Teslimat",
          description: "Türkiye'nin her yerine ücretsiz teslimat.",
        },
        {
          icon: "Headphones",
          title: "7/24 Destek",
          description: "Satış sonrası sürekli destek hizmeti.",
        },
      ],
    },

    // Testimonials
    {
      id: "testimonials-1",
      type: "testimonialGrid",
      title: "Müşterilerimiz Ne Diyor?",
      columns: 3,
      showRating: true,
      testimonials: [
        {
          avatar: "https://i.pravatar.cc/100?img=11",
          name: "Ahmet Yılmaz",
          title: "İşletme Sahibi",
          rating: 5,
          comment:
            "Çok profesyonel bir ekip. Araç alım sürecim çok hızlı ve sorunsuz geçti. Kesinlikle tavsiye ediyorum.",
        },
        {
          avatar: "https://i.pravatar.cc/100?img=12",
          name: "Ayşe Kaya",
          title: "Doktor",
          rating: 5,
          comment:
            "Ekspertiz raporu sayesinde güvenle aldım. Garanti konusunda da çok memnunum.",
        },
        {
          avatar: "https://i.pravatar.cc/100?img=13",
          name: "Mehmet Demir",
          title: "Mühendis",
          rating: 5,
          comment:
            "Takas işlemi çok kolay oldu. Eski aracımı çok iyi bir fiyata değerlendirdiler.",
        },
      ],
    },

    // FAQ
    {
      id: "faq-1",
      type: "faqAccordion",
      title: "Sıkça Sorulan Sorular",
      items: [
        {
          question: "Araçların garantisi var mı?",
          answer:
            "Evet, tüm araçlarımız 1 yıl motor ve şanzıman garantilidir. İsterseniz ek garanti paketleri de satın alabilirsiniz.",
        },
        {
          question: "Kredi ile araç alabilir miyim?",
          answer:
            "Evet, anlaşmalı bankalarımız aracılığıyla uygun faiz oranlarında kredi kullanabilirsiniz. Kredi başvurunuz yerinde yapılabilir.",
        },
        {
          question: "Takas kabul ediyor musunuz?",
          answer:
            "Evet, mevcut aracınızı ekspertiz sonrası piyasa değerinde değerlendiriyoruz. Takas farkı için de kredi kullanabilirsiniz.",
        },
        {
          question: "Teslimat nasıl yapılıyor?",
          answer:
            "Türkiye'nin her yerine ücretsiz teslimat yapıyoruz. İsterseniz galerimizden de teslim alabilirsiniz.",
        },
      ],
    },

    // Final CTA
    {
      id: "cta-1",
      type: "finalCta",
      heading: "Hayalinizdeki Araca Ulaşın",
      subtext: "Hemen randevu alın, size özel tekliflerimizden yararlanın.",
      ctaButton: {
        label: "Randevu Al",
        href: "#randevu",
        variant: "primary",
      },
      secondaryButton: {
        label: "Bizi Arayın",
        href: "tel:+905551234567",
        variant: "ghost",
      },
      backgroundStyle: "gradient",
    },

    // Footer
    {
      id: "footer-1",
      type: "footer",
      logo: {
        src: "/logo.svg",
        alt: "Premium Auto Gallery",
      },
      description:
        "Türkiye'nin en güvenilir oto galerisi. 20 yıllık tecrübe ile hizmetinizdeyiz.",
      columns: [
        {
          title: "Hızlı Linkler",
          links: [
            { label: "Ana Sayfa", href: "/" },
            { label: "Araçlar", href: "#araclar" },
            { label: "Hakkımızda", href: "#hakkimizda" },
            { label: "İletişim", href: "#iletisim" },
          ],
        },
        {
          title: "Hizmetler",
          links: [
            { label: "Araç Satışı", href: "#" },
            { label: "Takas", href: "#" },
            { label: "Kredi", href: "#" },
            { label: "Sigorta", href: "#" },
          ],
        },
        {
          title: "İletişim",
          links: [
            {
              label: "info@premiumauto.com",
              href: "mailto:info@premiumauto.com",
            },
            { label: "+90 555 123 45 67", href: "tel:+905551234567" },
            { label: "İstanbul, Türkiye", href: "#" },
          ],
        },
      ],
      socialLinks: [
        { platform: "facebook", href: "https://facebook.com" },
        { platform: "instagram", href: "https://instagram.com" },
        { platform: "twitter", href: "https://twitter.com" },
        { platform: "youtube", href: "https://youtube.com" },
        { platform: "whatsapp", href: "https://wa.me/905551234567" },
      ],
      copyright: "© 2024 Premium Auto Gallery. Tüm hakları saklıdır.",
      bottomLinks: [
        { label: "Gizlilik Politikası", href: "#" },
        { label: "Kullanım Şartları", href: "#" },
        { label: "KVKK", href: "#" },
      ],
    },
  ],
};

// =============================================================================
// DİŞ KLİNİĞİ SAYFASI
// =============================================================================

export const DENTAL_CLINIC_PAGE: PageSchema = {
  id: "dental-clinic-landing",
  slug: "dis-klinigi",
  meta: {
    title: "Smile Dental Clinic - Gülüşünüz İçin Buradayız",
    description: "Modern teknoloji ve uzman kadromuzla diş sağlığınız güvende.",
    theme: {
      primaryColor: "#0ea5e9",
      fontFamily: "Inter",
    },
  },
  blocks: [
    // Navbar
    {
      id: "navbar-1",
      type: "navbar",
      logo: {
        src: "/logo.svg",
        alt: "Smile Dental Clinic",
        href: "/",
      },
      menuItems: [
        { label: "Hizmetler", href: "#hizmetler" },
        { label: "Tedaviler", href: "#tedaviler" },
        { label: "Ekibimiz", href: "#ekip" },
        { label: "Galeri", href: "#galeri" },
        { label: "SSS", href: "#sss" },
      ],
      ctaButton: {
        label: "Randevu Al",
        href: "#randevu",
        variant: "primary",
      },
      sticky: true,
    },

    // Hero Section
    {
      id: "hero-1",
      type: "heroSection",
      heading: "Gülüşünüz İçin Buradayız",
      subtext:
        "Modern teknoloji, uzman kadro ve konforlu ortamımızla diş sağlığınıza özen gösteriyoruz. İlk muayene ücretsiz!",
      primaryButton: {
        label: "Ücretsiz Muayene",
        href: "#randevu",
        variant: "primary",
      },
      secondaryButton: {
        label: "Hizmetleri İncele",
        href: "#hizmetler",
        variant: "ghost",
      },
      media: {
        type: "image",
        src: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800",
        alt: "Dental clinic",
      },
      socialProof: {
        text: "15.000+ mutlu hasta",
        avatars: [
          "https://i.pravatar.cc/100?img=21",
          "https://i.pravatar.cc/100?img=22",
          "https://i.pravatar.cc/100?img=23",
          "https://i.pravatar.cc/100?img=24",
        ],
      },
      alignment: "left",
    },

    // Benefits Grid
    {
      id: "benefits-1",
      type: "benefitsGrid",
      title: "Neden Smile Dental?",
      subtitle: "Size en iyi hizmeti sunmak için buradayız",
      columns: 3,
      benefits: [
        {
          icon: "Sparkles",
          title: "Modern Teknoloji",
          description:
            "En son teknoloji cihazlar ve dijital diş hekimliği uygulamaları.",
        },
        {
          icon: "Users",
          title: "Uzman Kadro",
          description:
            "20+ yıllık tecrübeli diş hekimleri ve yardımcı personel.",
        },
        {
          icon: "Heart",
          title: "Konforlu Ortam",
          description:
            "Rahat ve huzurlu bir tedavi deneyimi için tasarlanmış klinik.",
        },
        {
          icon: "Clock",
          title: "Esnek Saatler",
          description: "Hafta içi ve hafta sonu randevu imkanı.",
        },
        {
          icon: "CreditCard",
          title: "Ödeme Kolaylığı",
          description: "Taksitli ödeme ve anlaşmalı sigorta seçenekleri.",
        },
        {
          icon: "ShieldCheck",
          title: "Garanti",
          description: "Tüm tedavilerimizde garanti ve takip hizmeti.",
        },
      ],
    },

    // Before After Slider
    {
      id: "before-after-1",
      type: "beforeAfterSlider",
      title: "Tedavi Sonuçlarımız",
      subtitle: "Gerçek hastalarımızın tedavi öncesi ve sonrası görüntüleri",
      beforeImage: {
        type: "image",
        src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800",
        alt: "Tedavi öncesi",
      },
      afterImage: {
        type: "image",
        src: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800",
        alt: "Tedavi sonrası",
      },
      beforeLabel: "Önce",
      afterLabel: "Sonra",
      defaultPosition: 50,
    },

    // Menu Section (Services)
    {
      id: "services-1",
      type: "menuSection",
      title: "Hizmetlerimiz",
      subtitle: "Kapsamlı diş sağlığı hizmetleri sunuyoruz",
      layout: "tabs",
      showImages: true,
      categories: [
        {
          name: "Estetik Diş Hekimliği",
          icon: "Sparkles",
          items: [
            {
              id: "s1",
              name: "Diş Beyazlatma",
              description: "Profesyonel beyazlatma ile daha parlak gülüşler",
              price: "3.500 ₺",
              isPopular: true,
            },
            {
              id: "s2",
              name: "Porselen Laminat",
              description: "İnce porselen kaplamalarla mükemmel estetik",
              price: "8.000 ₺",
            },
            {
              id: "s3",
              name: "Kompozit Bonding",
              description: "Küçük düzeltmeler için ekonomik çözüm",
              price: "2.500 ₺",
            },
          ],
        },
        {
          name: "İmplant",
          icon: "CircleDot",
          items: [
            {
              id: "s4",
              name: "Tek Diş İmplant",
              description: "Eksik dişler için kalıcı çözüm",
              price: "25.000 ₺",
              isPopular: true,
            },
            {
              id: "s5",
              name: "All-on-4 İmplant",
              description: "Tam çene restorasyonu",
              price: "150.000 ₺",
            },
            {
              id: "s6",
              name: "Kemik Grefti",
              description: "İmplant için kemik desteği",
              price: "15.000 ₺",
            },
          ],
        },
        {
          name: "Ortodonti",
          icon: "Smile",
          items: [
            {
              id: "s7",
              name: "Metal Braket",
              description: "Geleneksel diş teli tedavisi",
              price: "35.000 ₺",
            },
            {
              id: "s8",
              name: "Şeffaf Plak",
              description: "Görünmez hizalama sistemi",
              price: "55.000 ₺",
              isPopular: true,
              isNew: true,
            },
            {
              id: "s9",
              name: "Lingual Braket",
              description: "İç yüzeyde görünmez tedavi",
              price: "65.000 ₺",
            },
          ],
        },
        {
          name: "Genel Tedavi",
          icon: "Stethoscope",
          items: [
            {
              id: "s10",
              name: "Diş Dolgusu",
              description: "Estetik dolgu uygulaması",
              price: "1.500 ₺",
            },
            {
              id: "s11",
              name: "Kanal Tedavisi",
              description: "Ağrısız kök kanal tedavisi",
              price: "4.000 ₺",
            },
            {
              id: "s12",
              name: "Diş Çekimi",
              description: "Güvenli diş çekimi işlemi",
              price: "1.000 ₺",
            },
          ],
        },
      ],
    },

    // Team Grid
    {
      id: "team-1",
      type: "teamGrid",
      title: "Uzman Kadromuz",
      subtitle: "Deneyimli ve güler yüzlü ekibimizle tanışın",
      columns: 4,
      showBio: true,
      showSocialLinks: true,
      members: [
        {
          id: "d1",
          image:
            "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
          name: "Dr. Elif Yıldız",
          title: "Baş Diş Hekimi",
          bio: "15 yıllık tecrübe, İmplantoloji uzmanı",
          socialLinks: [
            { platform: "linkedin", href: "#" },
            { platform: "instagram", href: "#" },
          ],
        },
        {
          id: "d2",
          image:
            "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400",
          name: "Dr. Can Özkan",
          title: "Ortodonti Uzmanı",
          bio: "12 yıllık tecrübe, Şeffaf plak sertifikalı",
          socialLinks: [{ platform: "linkedin", href: "#" }],
        },
        {
          id: "d3",
          image:
            "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
          name: "Dr. Selin Kara",
          title: "Estetik Diş Hekimi",
          bio: "10 yıllık tecrübe, Gülüş tasarımı uzmanı",
          socialLinks: [{ platform: "instagram", href: "#" }],
        },
        {
          id: "d4",
          image:
            "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400",
          name: "Dr. Burak Şahin",
          title: "Ağız Cerrahı",
          bio: "8 yıllık tecrübe, Çene cerrahisi uzmanı",
          socialLinks: [{ platform: "linkedin", href: "#" }],
        },
      ],
    },

    // Masonry Gallery
    {
      id: "gallery-1",
      type: "masonryGallery",
      title: "Kliniğimiz",
      subtitle: "Modern ve konforlu ortamımızı keşfedin",
      columns: 3,
      gap: "md",
      enableLightbox: true,
      showCategories: true,
      images: [
        {
          id: "g1",
          src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600",
          alt: "Klinik",
          category: "Klinik",
          aspectRatio: "landscape",
        },
        {
          id: "g2",
          src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600",
          alt: "Tedavi",
          category: "Tedavi",
          aspectRatio: "portrait",
        },
        {
          id: "g3",
          src: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600",
          alt: "Ekipman",
          category: "Ekipman",
          aspectRatio: "square",
        },
        {
          id: "g4",
          src: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600",
          alt: "Bekleme",
          category: "Klinik",
          aspectRatio: "landscape",
        },
        {
          id: "g5",
          src: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600",
          alt: "Tedavi",
          category: "Tedavi",
          aspectRatio: "portrait",
        },
        {
          id: "g6",
          src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600",
          alt: "Ekipman",
          category: "Ekipman",
          aspectRatio: "square",
        },
      ],
    },

    // Testimonials
    {
      id: "testimonials-1",
      type: "testimonialGrid",
      title: "Hastalarımız Ne Diyor?",
      columns: 3,
      showRating: true,
      testimonials: [
        {
          avatar: "https://i.pravatar.cc/100?img=31",
          name: "Zeynep Arslan",
          rating: 5,
          comment:
            "Diş beyazlatma yaptırdım, sonuç harika! Çok profesyonel ve güler yüzlü bir ekip.",
        },
        {
          avatar: "https://i.pravatar.cc/100?img=32",
          name: "Oğuz Çelik",
          rating: 5,
          comment:
            "İmplant tedavim çok başarılı geçti. Hiç ağrı hissetmedim. Teşekkürler!",
        },
        {
          avatar: "https://i.pravatar.cc/100?img=33",
          name: "Deniz Koç",
          rating: 5,
          comment:
            "Şeffaf plak tedavisiyle dişlerim düzeldi. Görünmez olması büyük avantaj.",
        },
      ],
    },

    // FAQ
    {
      id: "faq-1",
      type: "faqAccordion",
      title: "Sıkça Sorulan Sorular",
      items: [
        {
          question: "İlk muayene ücretsiz mi?",
          answer:
            "Evet, ilk muayene ve diş röntgeni tamamen ücretsizdir. Size en uygun tedavi planını oluşturuyoruz.",
        },
        {
          question: "Taksitli ödeme yapabilir miyim?",
          answer:
            "Evet, kredi kartına 12 aya kadar taksit imkanı sunuyoruz. Ayrıca anlaşmalı bankalardan kredi de kullanabilirsiniz.",
        },
        {
          question: "İmplant tedavisi acı verir mi?",
          answer:
            "Hayır, lokal anestezi ile yapılan işlemde herhangi bir ağrı hissetmezsiniz. Sonrasında hafif bir hassasiyet olabilir.",
        },
        {
          question: "Hangi sigortalarla anlaşmalısınız?",
          answer:
            "Türkiye'deki tüm büyük özel sağlık sigortaları ile anlaşmalıyız. Detaylı liste için bizi arayabilirsiniz.",
        },
      ],
    },

    // Final CTA
    {
      id: "cta-1",
      type: "finalCta",
      heading: "Sağlıklı Gülüşler İçin Randevu Alın",
      subtext: "İlk muayene ücretsiz! Uzman kadromuz sizi bekliyor.",
      ctaButton: {
        label: "Hemen Randevu Al",
        href: "#randevu",
        variant: "primary",
      },
      secondaryButton: {
        label: "WhatsApp İletişim",
        href: "https://wa.me/905551234567",
        variant: "ghost",
      },
      backgroundStyle: "gradient",
    },

    // Footer
    {
      id: "footer-1",
      type: "footer",
      logo: {
        src: "/logo.svg",
        alt: "Smile Dental Clinic",
      },
      description:
        "Modern teknoloji ve uzman kadromuzla 15 yıldır diş sağlığınız için hizmetinizdeyiz.",
      columns: [
        {
          title: "Hizmetler",
          links: [
            { label: "Diş Beyazlatma", href: "#" },
            { label: "İmplant", href: "#" },
            { label: "Ortodonti", href: "#" },
            { label: "Estetik Diş", href: "#" },
          ],
        },
        {
          title: "Kurumsal",
          links: [
            { label: "Hakkımızda", href: "#" },
            { label: "Ekibimiz", href: "#" },
            { label: "Galeri", href: "#" },
            { label: "Blog", href: "#" },
          ],
        },
        {
          title: "İletişim",
          links: [
            {
              label: "info@smileclinic.com",
              href: "mailto:info@smileclinic.com",
            },
            { label: "+90 555 123 45 67", href: "tel:+905551234567" },
            { label: "Kadıköy, İstanbul", href: "#" },
          ],
        },
      ],
      socialLinks: [
        { platform: "facebook", href: "https://facebook.com" },
        { platform: "instagram", href: "https://instagram.com" },
        { platform: "twitter", href: "https://twitter.com" },
        { platform: "whatsapp", href: "https://wa.me/905551234567" },
      ],
      copyright: "© 2024 Smile Dental Clinic. Tüm hakları saklıdır.",
      bottomLinks: [
        { label: "Gizlilik Politikası", href: "#" },
        { label: "KVKK", href: "#" },
      ],
    },
  ],
};

// Export all sample pages
export const SAMPLE_PAGES: Record<string, PageSchema> = {
  "auto-gallery": AUTO_GALLERY_PAGE,
  "dental-clinic": DENTAL_CLINIC_PAGE,
};
