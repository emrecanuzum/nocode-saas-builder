import { PageSchema, PageBlock, BlockType } from "@/types/builder";

export interface GeneratedProject {
  files: { path: string; content: string | Blob }[];
  images: { filename: string; data: string }[]; // base64 data without prefix for saving
}

// Component import mapping
const COMPONENT_IMPORTS: Record<BlockType, string> = {
  navbar: "@/components/blocks/navbar",
  heroSection: "@/components/blocks/hero-section",
  trustLogos: "@/components/blocks/trust-logos",
  benefitsGrid: "@/components/blocks/benefits-grid",
  processSteps: "@/components/blocks/process-steps",
  featureZigZag: "@/components/blocks/feature-zigzag",
  pricingTable: "@/components/blocks/pricing-table",
  testimonialGrid: "@/components/blocks/testimonial-grid",
  faqAccordion: "@/components/blocks/faq-accordion",
  finalCta: "@/components/blocks/final-cta",
  footer: "@/components/blocks/footer",
  listingGrid: "@/components/blocks/listing-grid",
  menuSection: "@/components/blocks/menu-section",
  beforeAfterSlider: "@/components/blocks/before-after-slider",
  teamGrid: "@/components/blocks/team-grid",
  masonryGallery: "@/components/blocks/masonry-gallery",
};

// Component name mapping (React Component Name)
const COMPONENT_NAMES: Record<BlockType, string> = {
  navbar: "Navbar",
  heroSection: "HeroSection",
  trustLogos: "TrustLogos",
  benefitsGrid: "BenefitsGrid",
  processSteps: "ProcessSteps",
  featureZigZag: "FeatureZigZag",
  pricingTable: "PricingTable",
  testimonialGrid: "TestimonialGrid",
  faqAccordion: "FaqAccordion",
  finalCta: "FinalCTA",
  footer: "Footer",
  listingGrid: "ListingGrid",
  menuSection: "MenuSection",
  beforeAfterSlider: "BeforeAfterSlider",
  teamGrid: "TeamGrid",
  masonryGallery: "MasonryGallery",
};

/**
 * Clean props for export
 * Removes internal builder props like id (optional), keeps necessary ones
 */
function cleanProps(props: any, imagesMap: Map<string, string>): any {
  if (!props) return {};

  const cleaned: any = {};

  Object.entries(props).forEach(([key, value]) => {
    // Skip internal builder props if needed, though 'id' might be useful for scrolling
    // if (key === 'id') return;

    // Handle Images
    if (typeof value === "string" && value.startsWith("data:image")) {
      // It's a base64 image
      if (imagesMap.has(value)) {
        cleaned[key] = imagesMap.get(value);
      } else {
        const ext = value.substring(value.indexOf("/") + 1, value.indexOf(";"));
        const filename = `/images/img-${Math.random()
          .toString(36)
          .substr(2, 9)}.${ext}`;
        imagesMap.set(value, filename);
        cleaned[key] = filename;
      }
      return;
    }

    // Recursive check for objects (like array items)
    if (typeof value === "object" && value !== null) {
      if (Array.isArray(value)) {
        cleaned[key] = value.map((item) => cleanProps(item, imagesMap));
      } else {
        cleaned[key] = cleanProps(value, imagesMap);
      }
      return;
    }

    cleaned[key] = value;
  });

  return cleaned;
}

/**
 * Generate props string for React component
 */
function generatePropsString(props: any): string {
  if (Object.keys(props).length === 0) return "";

  return Object.entries(props)
    .map(([key, value]) => {
      if (value === undefined || value === null) return "";

      if (typeof value === "string") {
        return `${key}="${value}"`;
      }

      if (typeof value === "boolean") {
        return value ? key : `${key}={false}`;
      }

      if (typeof value === "number") {
        return `${key}={${value}}`;
      }

      return `${key}={${JSON.stringify(value, null, 2)}}`;
    })
    .filter(Boolean)
    .join("\n        ");
}

export function generatePageCode(page: PageSchema): {
  code: string;
  images: { filename: string; data: string }[];
} {
  const imports = new Set<string>();
  const imagesMap = new Map<string, string>(); // base64 -> filename
  const imagesData: { filename: string; data: string }[] = [];

  // Clean props and extract images first
  const cleanedBlocks = page.blocks.map((block) => {
    const componentName = COMPONENT_NAMES[block.type];
    const importPath = COMPONENT_IMPORTS[block.type];

    if (componentName && importPath) {
      imports.add(`import { ${componentName} } from "${importPath}";`);
    }

    return {
      ...block,
      componentName: componentName || "UnknownComponent",
      props: cleanProps(block, imagesMap),
    };
  });

  // Extract images data
  imagesMap.forEach((filename, base64) => {
    // Remove prefix (e.g. "data:image/png;base64,")
    const data = base64.split(",")[1];
    imagesData.push({
      filename: filename.replace(/^\//, ""), // Remove leading slash for zip usage
      data,
    });
  });

  // Generate JSX
  const blocksJSX = cleanedBlocks
    .map((block) => {
      const propsStr = generatePropsString(block.props);
      return `
      <${block.componentName}
        ${propsStr}
      />`;
    })
    .join("\n");

  const code = `/**
 * Generated by NoCode SaaS Builder
 * ${new Date().toLocaleDateString()}
 */

${Array.from(imports).join("\n")}

export default function Page() {
  return (
    <main>
${blocksJSX}
    </main>
  );
}
`;

  return { code, images: imagesData };
}
