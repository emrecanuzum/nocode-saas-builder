"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import * as LucideIcons from "lucide-react";
import { Search, ChevronDown, ChevronRight, GripVertical } from "lucide-react";
import { BlockType } from "@/types/builder";
import { componentRegistry } from "@/lib/registry";
import { useBuilder } from "@/lib/builder-store";
import { cn } from "@/lib/utils";

// Get icon dynamically
function DynamicIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const icons = LucideIcons as unknown as Record<
    string,
    React.ComponentType<{ className?: string }>
  >;
  const Icon = icons[name] || LucideIcons.Box;
  return <Icon className={className} />;
}

// Draggable component item
function DraggableComponent({ type }: { type: BlockType }) {
  const { addBlock, isPreviewMode } = useBuilder();
  const entry = componentRegistry[type];

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `sidebar-${type}`,
      data: {
        type: "new-component",
        componentType: type,
      },
    });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  if (isPreviewMode) return null;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onDoubleClick={() => addBlock(type)}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg cursor-grab active:cursor-grabbing select-none",
        "bg-background border border-border/50 hover:border-primary/30 hover:shadow-sm",
        "transition-all duration-200",
        isDragging && "opacity-50 shadow-lg border-primary"
      )}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
        <DynamicIcon name={entry.icon} className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{entry.name}</p>
        <p className="text-xs text-muted-foreground truncate">
          {entry.description}
        </p>
      </div>
      <GripVertical className="w-4 h-4 text-muted-foreground/50" />
    </motion.div>
  );
}

// Category section
const categories = [
  { key: "layout", label: "Layout", icon: "Layout" },
  { key: "content", label: "İçerik", icon: "FileText" },
  { key: "conversion", label: "Dönüşüm", icon: "Target" },
  { key: "social-proof", label: "Sosyal Kanıt", icon: "ThumbsUp" },
  { key: "sector", label: "Sektörel", icon: "Building" },
] as const;

export function BuilderSidebar() {
  const { isPreviewMode } = useBuilder();
  const [search, setSearch] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    categories.map((c) => c.key)
  );

  if (isPreviewMode) return null;

  const toggleCategory = (key: string) => {
    setExpandedCategories((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const allComponents = Object.entries(componentRegistry) as [
    BlockType,
    (typeof componentRegistry)[BlockType]
  ][];

  const filteredComponents = allComponents.filter(
    ([type, entry]) =>
      entry.name.toLowerCase().includes(search.toLowerCase()) ||
      entry.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="w-72 border-r border-border/50 bg-accent/20 flex flex-col shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <h2 className="font-semibold text-sm mb-3">Bileşenler</h2>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
          />
        </div>
      </div>

      {/* Components List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {search ? (
          // Search results
          <div className="space-y-2">
            {filteredComponents.map(([type]) => (
              <DraggableComponent key={type} type={type} />
            ))}
            {filteredComponents.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                Sonuç bulunamadı
              </p>
            )}
          </div>
        ) : (
          // Categorized list
          categories.map((category) => {
            const categoryComponents = allComponents.filter(
              ([, entry]) => entry.category === category.key
            );
            const isExpanded = expandedCategories.includes(category.key);

            return (
              <div key={category.key}>
                <button
                  onClick={() => toggleCategory(category.key)}
                  className="flex items-center gap-2 w-full py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  <DynamicIcon name={category.icon} className="w-4 h-4" />
                  <span>{category.label}</span>
                  <span className="ml-auto text-xs bg-accent rounded-full px-2 py-0.5">
                    {categoryComponents.length}
                  </span>
                </button>

                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2 mt-2"
                  >
                    {categoryComponents.map(([type]) => (
                      <DraggableComponent key={type} type={type} />
                    ))}
                  </motion.div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer hint */}
      <div className="p-4 border-t border-border/50 text-xs text-muted-foreground text-center">
        Sürükle-bırak veya çift tıkla
      </div>
    </aside>
  );
}
