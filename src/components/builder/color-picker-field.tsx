"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check, X, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

// Tailwind base colors with shades
const TAILWIND_COLORS: Record<string, Record<string, string>> = {
  slate: {
    "50": "#f8fafc",
    "100": "#f1f5f9",
    "200": "#e2e8f0",
    "300": "#cbd5e1",
    "400": "#94a3b8",
    "500": "#64748b",
    "600": "#475569",
    "700": "#334155",
    "800": "#1e293b",
    "900": "#0f172a",
  },
  zinc: {
    "50": "#fafafa",
    "100": "#f4f4f5",
    "200": "#e4e4e7",
    "300": "#d4d4d8",
    "400": "#a1a1aa",
    "500": "#71717a",
    "600": "#52525b",
    "700": "#3f3f46",
    "800": "#27272a",
    "900": "#18181b",
  },
  red: {
    "50": "#fef2f2",
    "100": "#fee2e2",
    "200": "#fecaca",
    "300": "#fca5a5",
    "400": "#f87171",
    "500": "#ef4444",
    "600": "#dc2626",
    "700": "#b91c1c",
    "800": "#991b1b",
    "900": "#7f1d1d",
  },
  orange: {
    "50": "#fff7ed",
    "100": "#ffedd5",
    "200": "#fed7aa",
    "300": "#fdba74",
    "400": "#fb923c",
    "500": "#f97316",
    "600": "#ea580c",
    "700": "#c2410c",
    "800": "#9a3412",
    "900": "#7c2d12",
  },
  amber: {
    "50": "#fffbeb",
    "100": "#fef3c7",
    "200": "#fde68a",
    "300": "#fcd34d",
    "400": "#fbbf24",
    "500": "#f59e0b",
    "600": "#d97706",
    "700": "#b45309",
    "800": "#92400e",
    "900": "#78350f",
  },
  yellow: {
    "50": "#fefce8",
    "100": "#fef9c3",
    "200": "#fef08a",
    "300": "#fde047",
    "400": "#facc15",
    "500": "#eab308",
    "600": "#ca8a04",
    "700": "#a16207",
    "800": "#854d0e",
    "900": "#713f12",
  },
  lime: {
    "50": "#f7fee7",
    "100": "#ecfccb",
    "200": "#d9f99d",
    "300": "#bef264",
    "400": "#a3e635",
    "500": "#84cc16",
    "600": "#65a30d",
    "700": "#4d7c0f",
    "800": "#3f6212",
    "900": "#365314",
  },
  green: {
    "50": "#f0fdf4",
    "100": "#dcfce7",
    "200": "#bbf7d0",
    "300": "#86efac",
    "400": "#4ade80",
    "500": "#22c55e",
    "600": "#16a34a",
    "700": "#15803d",
    "800": "#166534",
    "900": "#14532d",
  },
  teal: {
    "50": "#f0fdfa",
    "100": "#ccfbf1",
    "200": "#99f6e4",
    "300": "#5eead4",
    "400": "#2dd4bf",
    "500": "#14b8a6",
    "600": "#0d9488",
    "700": "#0f766e",
    "800": "#115e59",
    "900": "#134e4a",
  },
  cyan: {
    "50": "#ecfeff",
    "100": "#cffafe",
    "200": "#a5f3fc",
    "300": "#67e8f9",
    "400": "#22d3ee",
    "500": "#06b6d4",
    "600": "#0891b2",
    "700": "#0e7490",
    "800": "#155e75",
    "900": "#164e63",
  },
  blue: {
    "50": "#eff6ff",
    "100": "#dbeafe",
    "200": "#bfdbfe",
    "300": "#93c5fd",
    "400": "#60a5fa",
    "500": "#3b82f6",
    "600": "#2563eb",
    "700": "#1d4ed8",
    "800": "#1e40af",
    "900": "#1e3a8a",
  },
  indigo: {
    "50": "#eef2ff",
    "100": "#e0e7ff",
    "200": "#c7d2fe",
    "300": "#a5b4fc",
    "400": "#818cf8",
    "500": "#6366f1",
    "600": "#4f46e5",
    "700": "#4338ca",
    "800": "#3730a3",
    "900": "#312e81",
  },
  violet: {
    "50": "#f5f3ff",
    "100": "#ede9fe",
    "200": "#ddd6fe",
    "300": "#c4b5fd",
    "400": "#a78bfa",
    "500": "#8b5cf6",
    "600": "#7c3aed",
    "700": "#6d28d9",
    "800": "#5b21b6",
    "900": "#4c1d95",
  },
  purple: {
    "50": "#faf5ff",
    "100": "#f3e8ff",
    "200": "#e9d5ff",
    "300": "#d8b4fe",
    "400": "#c084fc",
    "500": "#a855f7",
    "600": "#9333ea",
    "700": "#7e22ce",
    "800": "#6b21a8",
    "900": "#581c87",
  },
  pink: {
    "50": "#fdf2f8",
    "100": "#fce7f3",
    "200": "#fbcfe8",
    "300": "#f9a8d4",
    "400": "#f472b6",
    "500": "#ec4899",
    "600": "#db2777",
    "700": "#be185d",
    "800": "#9d174d",
    "900": "#831843",
  },
};

const COLOR_NAMES = Object.keys(TAILWIND_COLORS);

interface ColorPickerFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ColorPickerField({
  label,
  value,
  onChange,
  placeholder = "#000000",
}: ColorPickerFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleColorSelect = (colorName: string) => {
    if (selectedColor === colorName) {
      setSelectedColor(null);
    } else {
      setSelectedColor(colorName);
    }
  };

  const handleShadeSelect = (hex: string) => {
    onChange(hex);
    // Don't close immediately in inline mode, user might want to try multiple
    // But standard picker usually closes. Let's keep it consistent.
    // If inline, maybe keep open? Let's toggle close for cleaner UX.
    setIsOpen(false);
    setSelectedColor(null);
  };

  const isValidHex = (hex: string) => /^#[0-9A-Fa-f]{6}$/.test(hex);

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <div className="flex gap-2 w-full">
        {/* Color preview */}
        <div
          className="w-10 h-10 rounded-lg border border-border/50 shrink-0 shadow-sm"
          style={{
            backgroundColor: isValidHex(value) ? value : "#ffffff",
            backgroundImage: !isValidHex(value)
              ? "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)"
              : undefined,
            backgroundSize: "8px 8px",
            backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
          }}
        />

        {/* Hex input */}
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 uppercase font-mono"
        />

        {/* Toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-10 h-10 rounded-lg border border-border/50 flex items-center justify-center transition-all hover:bg-accent hover:border-accent-foreground/20 shrink-0 aspect-square",
            isOpen &&
              "bg-accent border-accent-foreground/50 text-accent-foreground"
          )}
        >
          {isOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <Palette className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Inline Expandable Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-1">
              <div className="p-3 bg-muted/30 border border-border/50 rounded-xl space-y-3">
                {selectedColor ? (
                  // Shade Selection
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setSelectedColor(null)}
                        className="text-xs font-medium text-primary hover:text-primary/80 flex items-center gap-1"
                      >
                        ← Renkler
                      </button>
                      <span className="text-xs font-semibold capitalize">
                        {selectedColor}
                      </span>
                    </div>
                    <div className="grid grid-cols-5 gap-1.5">
                      {Object.entries(TAILWIND_COLORS[selectedColor]).map(
                        ([shade, hex]) => (
                          <button
                            key={shade}
                            onClick={() => handleShadeSelect(hex)}
                            className="group relative rounded-md overflow-hidden ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            title={`${selectedColor}-${shade}`}
                          >
                            <div
                              className="w-full aspect-square hover:scale-110 transition-transform"
                              style={{ backgroundColor: hex }}
                            />
                            {value === hex && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                <Check className="w-3 h-3 text-white drop-shadow-md" />
                              </div>
                            )}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                ) : (
                  // Color Family Selection
                  <div className="grid grid-cols-5 gap-2">
                    {COLOR_NAMES.map((colorName) => (
                      <button
                        key={colorName}
                        onClick={() => handleColorSelect(colorName)}
                        className="group relative rounded-md overflow-hidden ring-offset-background transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        title={colorName}
                      >
                        <div
                          className="w-full aspect-square"
                          style={{
                            backgroundColor: TAILWIND_COLORS[colorName]["500"],
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
