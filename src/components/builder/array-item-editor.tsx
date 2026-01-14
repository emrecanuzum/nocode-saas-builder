"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  GripVertical,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ArrayItemEditorProps<T> {
  label: string;
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (
    item: T,
    index: number,
    updateItem: (updates: Partial<T>) => void
  ) => React.ReactNode;
  createNewItem: () => T;
  getItemTitle?: (item: T, index: number) => string;
  maxItems?: number;
}

export function ArrayItemEditor<T extends Record<string, unknown>>({
  label,
  items = [],
  onChange,
  renderItem,
  createNewItem,
  getItemTitle = (_, index) => `Öğe ${index + 1}`,
  maxItems = 10,
}: ArrayItemEditorProps<T>) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const addItem = () => {
    if (items.length >= maxItems) return;
    const newItem = createNewItem();
    onChange([...items, newItem]);
    setExpandedIndex(items.length);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else if (expandedIndex !== null && expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1);
    }
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === items.length - 1)
    ) {
      return;
    }

    const newItems = [...items];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    [newItems[index], newItems[newIndex]] = [
      newItems[newIndex],
      newItems[index],
    ];
    onChange(newItems);

    if (expandedIndex === index) {
      setExpandedIndex(newIndex);
    } else if (expandedIndex === newIndex) {
      setExpandedIndex(index);
    }
  };

  const updateItem = (index: number, updates: Partial<T>) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], ...updates };
    onChange(newItems);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-muted-foreground">
          {label} ({items.length}/{maxItems})
        </label>
        <Button
          variant="ghost"
          size="sm"
          onClick={addItem}
          disabled={items.length >= maxItems}
          className="h-7 px-2 text-xs"
        >
          <Plus className="w-3 h-3 mr-1" />
          Ekle
        </Button>
      </div>

      <div className="space-y-1">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border border-border/50 rounded-lg overflow-hidden bg-background"
            >
              {/* Header */}
              <div
                className="flex items-center gap-1 px-2 py-1.5 bg-accent/30 cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
              >
                <GripVertical className="w-3 h-3 text-muted-foreground" />
                <motion.div
                  animate={{ rotate: expandedIndex === index ? 90 : 0 }}
                  className="text-muted-foreground"
                >
                  <ChevronRight className="w-3 h-3" />
                </motion.div>
                <span className="flex-1 text-xs font-medium truncate">
                  {getItemTitle(item, index)}
                </span>
                <div className="flex items-center gap-0.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveItem(index, "up");
                    }}
                    disabled={index === 0}
                    className={cn(
                      "p-1 rounded hover:bg-accent transition-colors",
                      index === 0 && "opacity-30 cursor-not-allowed"
                    )}
                  >
                    <ChevronUp className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveItem(index, "down");
                    }}
                    disabled={index === items.length - 1}
                    className={cn(
                      "p-1 rounded hover:bg-accent transition-colors",
                      index === items.length - 1 &&
                        "opacity-30 cursor-not-allowed"
                    )}
                  >
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(index);
                    }}
                    className="p-1 rounded hover:bg-destructive/10 hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-3 space-y-3 border-t border-border/30">
                      {renderItem(item, index, (updates) =>
                        updateItem(index, updates)
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {items.length === 0 && (
          <div className="text-center py-4 text-xs text-muted-foreground border border-dashed border-border rounded-lg">
            Henüz öğe eklenmedi
          </div>
        )}
      </div>
    </div>
  );
}
