"use client";

import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Download,
  Upload,
  Trash2,
  Undo,
  Redo,
  Save,
  Smartphone,
  Tablet,
  Monitor,
  Settings,
} from "lucide-react";
import { useBuilder, ViewportType } from "@/lib/builder-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BuilderHeader() {
  const {
    page,
    isPreviewMode,
    togglePreview,
    clearPage,
    exportPage,
    viewport,
    setViewport,
  } = useBuilder();

  const handleExport = () => {
    const json = exportPage();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${page.slug || "page"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const viewportButtons: {
    type: ViewportType;
    icon: typeof Smartphone;
    label: string;
  }[] = [
    { type: "mobile", icon: Smartphone, label: "Mobil" },
    { type: "tablet", icon: Tablet, label: "Tablet" },
    { type: "desktop", icon: Monitor, label: "Masaüstü" },
  ];

  return (
    <header className="h-14 border-b border-border/50 bg-background/95 backdrop-blur-sm flex items-center justify-between px-4 shrink-0">
      {/* Left - Logo & Title */}
      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="font-bold text-lg bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
        >
          NoCode Builder
        </motion.div>
        <span className="text-muted-foreground text-sm">
          / {page.meta.title || "Untitled"}
        </span>
      </div>

      {/* Center - Viewport Controls */}
      <div className="flex items-center gap-1 bg-accent/50 rounded-lg p-1">
        {viewportButtons.map(({ type, icon: Icon, label }) => (
          <Button
            key={type}
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 transition-all",
              viewport === type && "bg-background shadow-sm"
            )}
            onClick={() => setViewport(type)}
            title={label}
          >
            <Icon className="w-4 h-4" />
          </Button>
        ))}
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-2">
        {/* Undo/Redo */}
        <div className="flex items-center gap-1 mr-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
            <Undo className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
            <Redo className="w-4 h-4" />
          </Button>
        </div>

        {/* Clear */}
        <Button
          variant="ghost"
          size="sm"
          onClick={clearPage}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Temizle
        </Button>

        {/* Export */}
        <Button variant="ghost" size="sm" onClick={handleExport}>
          <Download className="w-4 h-4 mr-1" />
          Export
        </Button>

        {/* Preview Toggle */}
        <Button
          variant={isPreviewMode ? "default" : "outline"}
          size="sm"
          onClick={togglePreview}
        >
          {isPreviewMode ? (
            <>
              <EyeOff className="w-4 h-4 mr-1" />
              Düzenle
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-1" />
              Önizle
            </>
          )}
        </Button>

        {/* Save */}
        <Button size="sm" className="bg-primary hover:bg-primary/90">
          <Save className="w-4 h-4 mr-1" />
          Kaydet
        </Button>
      </div>
    </header>
  );
}
