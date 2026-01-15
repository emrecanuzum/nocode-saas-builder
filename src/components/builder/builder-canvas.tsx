"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  useDroppable,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, Copy, GripVertical, Settings } from "lucide-react";
import { useBuilder } from "@/lib/builder-store";
import { renderBlock, componentRegistry } from "@/lib/registry";
import { BlockType, PageBlock } from "@/types/builder";
import { cn } from "@/lib/utils";

// Sortable block wrapper
function SortableBlock({ block }: { block: PageBlock }) {
  const {
    selectedBlockId,
    selectBlock,
    removeBlock,
    duplicateBlock,
    isPreviewMode,
  } = useBuilder();
  const isSelected = selectedBlockId === block.id;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isPreviewMode) {
    return <div>{renderBlock(block)}</div>;
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        "relative group py-2 mt-6",
        isDragging && "z-50 opacity-50",
        // Override fixed/sticky positioning for navbar/footer in canvas
        "[&_nav]:!relative [&_nav]:!position-static [&_footer]:!relative"
      )}
    >
      {/* Block wrapper with selection */}
      <div
        onClick={() => selectBlock(block.id)}
        className={cn(
          "relative rounded-lg transition-all duration-200",
          isSelected
            ? "ring-2 ring-primary ring-offset-2"
            : "hover:ring-2 hover:ring-primary/30 hover:ring-offset-1"
        )}
      >
        {/* Block Actions Toolbar */}
        <div
          className={cn(
            "absolute -top-10 left-0 right-0 z-20 flex items-center justify-between px-2 py-1 rounded-t-lg bg-primary text-primary-foreground text-xs transition-opacity",
            isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
        >
          {/* Left - Drag handle & Type */}
          <div className="flex items-center gap-2">
            <button
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing p-1 hover:bg-white/20 rounded"
            >
              <GripVertical className="w-4 h-4" />
            </button>
            <span className="font-medium">
              {componentRegistry[block.type]?.name || block.type}
            </span>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                selectBlock(block.id);
              }}
              className="p-1 hover:bg-white/20 rounded"
              title="Ayarlar"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                duplicateBlock(block.id);
              }}
              className="p-1 hover:bg-white/20 rounded"
              title="Kopyala"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeBlock(block.id);
              }}
              className="p-1 hover:bg-red-500 rounded"
              title="Sil"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Actual Block Content */}
        <div className="pointer-events-none">{renderBlock(block)}</div>
      </div>
    </motion.div>
  );
}

// Empty state
function EmptyCanvas() {
  const { isOver, setNodeRef } = useDroppable({ id: "canvas-empty" });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-colors",
        isOver ? "border-primary bg-primary/5" : "border-border/50"
      )}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-accent/50 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <h3 className="font-semibold text-lg mb-2">Sayfanız Boş</h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          Sol taraftaki bileşen panelinden bir bileşen sürükleyip buraya bırakın
          veya çift tıklayın.
        </p>
      </motion.div>
    </div>
  );
}

export function BuilderCanvas() {
  const { page, isPreviewMode, addBlock, moveBlock, setIsDragging, viewport } =
    useBuilder();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setIsDragging(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
    const { active, over } = event;

    if (!over) return;

    // New component from sidebar
    if (active.data.current?.type === "new-component") {
      const componentType = active.data.current.componentType as BlockType;

      if (over.id === "canvas-empty") {
        addBlock(componentType);
      } else {
        // Find the index of the block we're dropping on
        const overIndex = page.blocks.findIndex((b) => b.id === over.id);
        if (overIndex !== -1) {
          addBlock(componentType, overIndex);
        } else {
          addBlock(componentType);
        }
      }
      return;
    }

    // Reordering existing blocks
    if (active.id !== over.id) {
      const oldIndex = page.blocks.findIndex((b) => b.id === active.id);
      const newIndex = page.blocks.findIndex((b) => b.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        moveBlock(oldIndex, newIndex);
      }
    }
  };

  const { isOver, setNodeRef } = useDroppable({ id: "canvas-droppable" });

  // Viewport width mapping
  const viewportWidths = {
    mobile: "max-w-sm", // 384px
    tablet: "max-w-2xl", // 672px
    desktop: "w-full", // Full width
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <main
        ref={setNodeRef}
        className={cn(
          "flex-1 overflow-y-auto bg-accent/30",
          isPreviewMode ? "p-0" : "p-6"
        )}
      >
        {/* Canvas Container */}
        <div
          className={cn(
            "mx-auto transition-all duration-300",
            viewportWidths[viewport],
            !isPreviewMode &&
              "bg-background rounded-xl shadow-sm border border-border/50 min-h-full"
          )}
        >
          {page.blocks.length === 0 && !isPreviewMode ? (
            <div className="p-8">
              <EmptyCanvas />
            </div>
          ) : (
            <SortableContext
              items={page.blocks.map((b) => b.id)}
              strategy={verticalListSortingStrategy}
            >
              <AnimatePresence mode="popLayout">
                {page.blocks.map((block) => (
                  <SortableBlock key={block.id} block={block} />
                ))}
              </AnimatePresence>
            </SortableContext>
          )}
        </div>
      </main>
    </DndContext>
  );
}
