/**
 * Builder Types - Global Type Definitions
 * Sürükle-bırak Website Builder için tüm TypeScript interface tanımları
 */

// =============================================================================
// BASE TYPES
// =============================================================================

/** Tüm builder block'larının ortak özellikleri */
export interface BaseBlockProps {
  id: string;
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

/** Görsel veya video medya öğesi */
export interface MediaItem {
  type: "image" | "video";
  src: string;
  alt: string;
  poster?: string; // Video için poster resmi
}

/** Navigasyon linki */
export interface LinkItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

/** Sosyal medya linki */
export interface SocialLink {
  platform:
    | "facebook"
    | "twitter"
    | "instagram"
    | "linkedin"
    | "youtube"
    | "tiktok"
    | "whatsapp";
  href: string;
}

/** Buton özellikleri */
export interface ButtonConfig {
  label: string;
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  icon?: string;
  onClick?: () => void;
}

/** Icon tipi - Lucide icon isimleri */
export type IconName = string;

// =============================================================================
// LANDING PAGE COMPONENT PROPS
// =============================================================================

/** Navbar - Sticky navigasyon */
export interface NavbarProps extends BaseBlockProps {
  type: "navbar";
  logo: {
    src: string;
    alt: string;
    href?: string;
  };
  menuItems: LinkItem[];
  ctaButton?: ButtonConfig;
  sticky?: boolean;
  transparent?: boolean;
}

/** HeroSection - Ana sayfa girişi */
export interface HeroSectionProps extends BaseBlockProps {
  type: "heroSection";
  heading: string;
  subtext: string;
  primaryButton?: ButtonConfig;
  secondaryButton?: ButtonConfig;
  media?: MediaItem;
  socialProof?: {
    text: string;
    avatars?: string[]; // Avatar URL'leri
  };
  alignment?: "left" | "center" | "right";
  overlay?: boolean;
}

/** TrustLogos - Güvenilir marka logoları */
export interface TrustLogosProps extends BaseBlockProps {
  type: "trustLogos";
  title?: string;
  logos: {
    src: string;
    alt: string;
    href?: string;
  }[];
  animated?: boolean;
  grayscale?: boolean;
}

/** BenefitsGrid - 3 kolonlu avantaj grid */
export interface BenefitsGridProps extends BaseBlockProps {
  type: "benefitsGrid";
  title?: string;
  subtitle?: string;
  benefits: {
    icon: IconName;
    title: string;
    description: string;
  }[];
  columns?: 2 | 3 | 4;
}

/** ProcessSteps - Süreç adımları */
export interface ProcessStepsProps extends BaseBlockProps {
  type: "processSteps";
  title?: string;
  subtitle?: string;
  steps: {
    number?: number;
    icon?: IconName;
    title: string;
    description: string;
  }[];
  showArrows?: boolean;
  variant?: "horizontal" | "vertical";
}

/** FeatureZigZag - Zigzag özellik kartları */
export interface FeatureZigZagProps extends BaseBlockProps {
  type: "featureZigZag";
  features: {
    title: string;
    description: string;
    media: MediaItem;
    bullets?: string[];
    ctaButton?: ButtonConfig;
  }[];
}

/** PricingPlan - Fiyat planı */
export interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: {
    text: string;
    included: boolean;
  }[];
  ctaButton: ButtonConfig;
  isPopular?: boolean;
  badge?: string;
}

/** PricingTable - Fiyatlandırma tablosu */
export interface PricingTableProps extends BaseBlockProps {
  type: "pricingTable";
  title?: string;
  subtitle?: string;
  plans: PricingPlan[];
  billingToggle?: {
    monthly: string;
    yearly: string;
    yearlyDiscount?: string;
  };
}

/** Testimonial - Müşteri yorumu */
export interface Testimonial {
  avatar?: string;
  name: string;
  title?: string;
  company?: string;
  rating?: number; // 1-5
  comment: string;
}

/** TestimonialGrid - Müşteri yorumları grid */
export interface TestimonialGridProps extends BaseBlockProps {
  type: "testimonialGrid";
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
  columns?: 2 | 3;
  showRating?: boolean;
}

/** FAQItem - Soru-cevap öğesi */
export interface FAQItem {
  question: string;
  answer: string;
}

/** FAQAccordion - SSS bölümü */
export interface FAQAccordionProps extends BaseBlockProps {
  type: "faqAccordion";
  title?: string;
  subtitle?: string;
  items: FAQItem[];
  allowMultiple?: boolean;
}

/** FinalCTA - Sayfa sonu CTA */
export interface FinalCTAProps extends BaseBlockProps {
  type: "finalCta";
  heading: string;
  subtext?: string;
  ctaButton: ButtonConfig;
  secondaryButton?: ButtonConfig;
  backgroundStyle?: "gradient" | "solid" | "image";
  backgroundImage?: string;
}

/** FooterColumn - Footer kolon */
export interface FooterColumn {
  title: string;
  links: LinkItem[];
}

/** Footer - Sayfa alt bilgisi */
export interface FooterProps extends BaseBlockProps {
  type: "footer";
  logo?: {
    src: string;
    alt: string;
  };
  description?: string;
  contactInfo?: {
    address?: string;
    phone?: string;
    email?: string;
  };
  columns: FooterColumn[];
  socialLinks?: SocialLink[];
  copyright: string;
  bottomLinks?: LinkItem[];
}

// =============================================================================
// POLYMORPHIC / SECTOR COMPONENT PROPS
// =============================================================================

/** ListingItem - Galeri/Emlak öğesi */
export interface ListingItem {
  id: string;
  image: string;
  title: string;
  price?: string;
  priceLabel?: string;
  features: string[]; // Örn: ["2023", "Dizel", "Otomatik"] veya ["3+1", "120m2"]
  badge?: string;
  href?: string;
}

/** ListingGrid - Galeri/Emlak grid */
export interface ListingGridProps extends BaseBlockProps {
  type: "listingGrid";
  title?: string;
  subtitle?: string;
  items: ListingItem[];
  columns?: 2 | 3 | 4;
  showFilters?: boolean;
  filterOptions?: {
    label: string;
    options: string[];
  }[];
}

/** MenuItem - Menü öğesi */
export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: string;
  image?: string;
  badge?: string;
  isNew?: boolean;
  isPopular?: boolean;
}

/** MenuCategory - Menü kategorisi */
export interface MenuCategory {
  name: string;
  icon?: IconName;
  items: MenuItem[];
}

/** MenuSection - Restoran/Hizmet menüsü */
export interface MenuSectionProps extends BaseBlockProps {
  type: "menuSection";
  title?: string;
  subtitle?: string;
  categories: MenuCategory[];
  items?: MenuItem[]; // Flat list for builder property pane support
  layout?: "tabs" | "accordion" | "grid";
  showImages?: boolean;
}

/** BeforeAfterSlider - Önce/Sonra karşılaştırma */
export interface BeforeAfterSliderProps extends BaseBlockProps {
  type: "beforeAfterSlider";
  title?: string;
  subtitle?: string;
  beforeImage: MediaItem;
  afterImage: MediaItem;
  beforeLabel?: string;
  afterLabel?: string;
  defaultPosition?: number; // 0-100 arası
  orientation?: "horizontal" | "vertical";
}

/** TeamMember - Takım üyesi */
export interface TeamMember {
  id: string;
  image: string;
  name: string;
  title: string;
  bio?: string;
  socialLinks?: SocialLink[];
}

/** TeamGrid - Takım grid */
export interface TeamGridProps extends BaseBlockProps {
  type: "teamGrid";
  title?: string;
  subtitle?: string;
  members: TeamMember[];
  columns?: 2 | 3 | 4;
  showBio?: boolean;
  showSocialLinks?: boolean;
}

/** GalleryImage - Galeri görseli */
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  aspectRatio?: "square" | "portrait" | "landscape" | "auto";
  category?: string;
}

/** MasonryGallery - Masonry galeri */
export interface MasonryGalleryProps extends BaseBlockProps {
  type: "masonryGallery";
  title?: string;
  subtitle?: string;
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  enableLightbox?: boolean;
  showCategories?: boolean;
}

// =============================================================================
// PAGE SCHEMA
// =============================================================================

/** Tüm block tiplerinin birleşimi */
export type PageBlock =
  | NavbarProps
  | HeroSectionProps
  | TrustLogosProps
  | BenefitsGridProps
  | ProcessStepsProps
  | FeatureZigZagProps
  | PricingTableProps
  | TestimonialGridProps
  | FAQAccordionProps
  | FinalCTAProps
  | FooterProps
  | ListingGridProps
  | MenuSectionProps
  | BeforeAfterSliderProps
  | TeamGridProps
  | MasonryGalleryProps;

/** Block tipi isimleri */
export type BlockType = PageBlock["type"];

/** Sayfa meta bilgileri */
export interface PageMeta {
  title: string;
  description?: string;
  favicon?: string;
  ogImage?: string;
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
  };
}

/** Tam sayfa şeması */
export interface PageSchema {
  id: string;
  slug: string;
  meta: PageMeta;
  blocks: PageBlock[];
  createdAt?: string;
  updatedAt?: string;
}

// =============================================================================
// COMPONENT REGISTRY TYPES
// =============================================================================

/** Component kayıt bilgisi */
export interface ComponentRegistryEntry<T extends PageBlock = PageBlock> {
  type: T["type"];
  name: string;
  description: string;
  category: "layout" | "content" | "conversion" | "social-proof" | "sector";
  icon: IconName;
  defaultProps: Partial<T>;
}

/** Component registry tipi */
export type ComponentRegistry = {
  [K in BlockType]: ComponentRegistryEntry<Extract<PageBlock, { type: K }>>;
};
