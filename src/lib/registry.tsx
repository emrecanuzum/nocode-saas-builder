/**
 * Component Registry
 * Tüm builder block'larının kayıt ve render sistemi
 */

import React, { ComponentType } from "react";
import {
  PageBlock,
  BlockType,
  ComponentRegistryEntry,
  NavbarProps,
  HeroSectionProps,
  TrustLogosProps,
  BenefitsGridProps,
  ProcessStepsProps,
  FeatureZigZagProps,
  PricingTableProps,
  TestimonialGridProps,
  FAQAccordionProps,
  FinalCTAProps,
  FooterProps,
  ListingGridProps,
  MenuSectionProps,
  BeforeAfterSliderProps,
  TeamGridProps,
  MasonryGalleryProps,
} from "@/types/builder";

// Lazy import components
import dynamic from "next/dynamic";

// Dynamic imports for code splitting
const Navbar = dynamic(() => import("@/components/builder-blocks/navbar"));
const HeroSection = dynamic(
  () => import("@/components/builder-blocks/hero-section")
);
const TrustLogos = dynamic(
  () => import("@/components/builder-blocks/trust-logos")
);
const BenefitsGrid = dynamic(
  () => import("@/components/builder-blocks/benefits-grid")
);
const ProcessSteps = dynamic(
  () => import("@/components/builder-blocks/process-steps")
);
const FeatureZigZag = dynamic(
  () => import("@/components/builder-blocks/feature-zigzag")
);
const PricingTable = dynamic(
  () => import("@/components/builder-blocks/pricing-table")
);
const TestimonialGrid = dynamic(
  () => import("@/components/builder-blocks/testimonial-grid")
);
const FAQAccordion = dynamic(
  () => import("@/components/builder-blocks/faq-accordion")
);
const FinalCTA = dynamic(() => import("@/components/builder-blocks/final-cta"));
const Footer = dynamic(() => import("@/components/builder-blocks/footer"));
const ListingGrid = dynamic(
  () => import("@/components/builder-blocks/listing-grid")
);
const MenuSection = dynamic(
  () => import("@/components/builder-blocks/menu-section")
);
const BeforeAfterSlider = dynamic(
  () => import("@/components/builder-blocks/before-after-slider")
);
const TeamGrid = dynamic(() => import("@/components/builder-blocks/team-grid"));
const MasonryGallery = dynamic(
  () => import("@/components/builder-blocks/masonry-gallery")
);

// Component map for rendering
export const componentMap: Record<BlockType, ComponentType<any>> = {
  navbar: Navbar,
  heroSection: HeroSection,
  trustLogos: TrustLogos,
  benefitsGrid: BenefitsGrid,
  processSteps: ProcessSteps,
  featureZigZag: FeatureZigZag,
  pricingTable: PricingTable,
  testimonialGrid: TestimonialGrid,
  faqAccordion: FAQAccordion,
  finalCta: FinalCTA,
  footer: Footer,
  listingGrid: ListingGrid,
  menuSection: MenuSection,
  beforeAfterSlider: BeforeAfterSlider,
  teamGrid: TeamGrid,
  masonryGallery: MasonryGallery,
};

// Component metadata registry
export const componentRegistry: Record<BlockType, ComponentRegistryEntry> = {
  navbar: {
    type: "navbar",
    name: "Navigation Bar",
    description: "Sticky navigation with logo, menu items, and CTA button",
    category: "layout",
    icon: "Menu",
    defaultProps: {
      sticky: true,
      menuItems: [],
    },
  },
  heroSection: {
    type: "heroSection",
    name: "Hero Section",
    description: "Main hero with heading, subtext, buttons, and media",
    category: "content",
    icon: "Layout",
    defaultProps: {
      heading: "Your Amazing Headline",
      subtext: "A compelling subtext that explains your value proposition",
      alignment: "left",
    },
  },
  trustLogos: {
    type: "trustLogos",
    name: "Trust Logos",
    description: "Display trusted partner or client logos",
    category: "social-proof",
    icon: "Award",
    defaultProps: {
      title: "Trusted by leading companies",
      logos: [],
      grayscale: true,
      animated: true,
    },
  },
  benefitsGrid: {
    type: "benefitsGrid",
    name: "Benefits Grid",
    description: "3-column grid with icons, titles, and descriptions",
    category: "content",
    icon: "Grid3x3",
    defaultProps: {
      columns: 3,
      items: [],
    },
  },
  processSteps: {
    type: "processSteps",
    name: "Process Steps",
    description: "Numbered steps showing a process or workflow",
    category: "content",
    icon: "ListOrdered",
    defaultProps: {
      showArrows: true,
      variant: "horizontal",
      steps: [],
    },
  },
  featureZigZag: {
    type: "featureZigZag",
    name: "Feature Zig-Zag",
    description: "Alternating image and text feature sections",
    category: "content",
    icon: "Columns",
    defaultProps: {
      features: [],
    },
  },
  pricingTable: {
    type: "pricingTable",
    name: "Pricing Table",
    description: "Pricing plans with features comparison",
    category: "conversion",
    icon: "DollarSign",
    defaultProps: {
      plans: [],
    },
  },
  testimonialGrid: {
    type: "testimonialGrid",
    name: "Testimonial Grid",
    description: "Customer testimonials with avatars and ratings",
    category: "social-proof",
    icon: "Quote",
    defaultProps: {
      columns: 3,
      showRating: true,
      testimonials: [],
    },
  },
  faqAccordion: {
    type: "faqAccordion",
    name: "FAQ Accordion",
    description: "Expandable frequently asked questions",
    category: "content",
    icon: "HelpCircle",
    defaultProps: {
      allowMultiple: false,
      items: [],
    },
  },
  finalCta: {
    type: "finalCta",
    name: "Final CTA",
    description: "Large call-to-action section for page end",
    category: "conversion",
    icon: "MousePointerClick",
    defaultProps: {
      heading: "Ready to get started?",
      backgroundStyle: "gradient",
    },
  },
  footer: {
    type: "footer",
    name: "Footer",
    description: "Site footer with links, social icons, and copyright",
    category: "layout",
    icon: "PanelBottom",
    defaultProps: {
      columns: [],
      copyright: "© 2024 All rights reserved.",
    },
  },
  listingGrid: {
    type: "listingGrid",
    name: "Listing Grid",
    description: "Grid of items for galleries, real estate, products",
    category: "sector",
    icon: "LayoutGrid",
    defaultProps: {
      columns: 3,
      items: [],
    },
  },
  menuSection: {
    type: "menuSection",
    name: "Menu Section",
    description: "Tabbed menu for restaurants or service lists",
    category: "sector",
    icon: "UtensilsCrossed",
    defaultProps: {
      layout: "tabs",
      showImages: true,
      categories: [],
    },
  },
  beforeAfterSlider: {
    type: "beforeAfterSlider",
    name: "Before/After Slider",
    description: "Interactive image comparison slider",
    category: "sector",
    icon: "SplitSquareHorizontal",
    defaultProps: {
      defaultPosition: 50,
      orientation: "horizontal",
      beforeLabel: "Before",
      afterLabel: "After",
    },
  },
  teamGrid: {
    type: "teamGrid",
    name: "Team Grid",
    description: "Team member cards with photos and social links",
    category: "sector",
    icon: "Users",
    defaultProps: {
      columns: 4,
      showBio: true,
      showSocialLinks: true,
      members: [],
    },
  },
  masonryGallery: {
    type: "masonryGallery",
    name: "Masonry Gallery",
    description: "Masonry layout gallery with lightbox",
    category: "sector",
    icon: "Image",
    defaultProps: {
      columns: 3,
      gap: "md",
      enableLightbox: true,
      images: [],
    },
  },
};

/**
 * Render a single block based on its type
 */
export function renderBlock(block: PageBlock) {
  const Component = componentMap[block.type];

  if (!Component) {
    console.warn(`Unknown block type: ${block.type}`);
    return null;
  }

  return <Component key={block.id} {...block} />;
}

/**
 * Get component metadata
 */
export function getComponentMeta(
  type: BlockType
): ComponentRegistryEntry | undefined {
  return componentRegistry[type];
}

/**
 * Get all components by category
 */
export function getComponentsByCategory(
  category: ComponentRegistryEntry["category"]
) {
  return Object.values(componentRegistry).filter(
    (entry) => entry.category === category
  );
}

/**
 * Get all available block types
 */
export function getAvailableBlockTypes(): BlockType[] {
  return Object.keys(componentRegistry) as BlockType[];
}
