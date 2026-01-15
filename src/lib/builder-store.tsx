"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { PageBlock, BlockType, PageSchema } from "@/types/builder";
import { componentRegistry } from "@/lib/registry";

// Viewport types
export type ViewportType = "mobile" | "tablet" | "desktop";

// Builder State
interface BuilderState {
  // Page data
  page: PageSchema;
  // Selected block
  selectedBlockId: string | null;
  // Preview mode
  isPreviewMode: boolean;
  // Drag state
  isDragging: boolean;
  // Viewport
  viewport: ViewportType;
}

// Builder Actions
interface BuilderActions {
  // Block management
  addBlock: (type: BlockType, index?: number) => void;
  removeBlock: (blockId: string) => void;
  moveBlock: (fromIndex: number, toIndex: number) => void;
  duplicateBlock: (blockId: string) => void;
  updateBlockProps: (blockId: string, props: Partial<PageBlock>) => void;

  // Selection
  selectBlock: (blockId: string | null) => void;

  // Preview
  togglePreview: () => void;

  // Drag
  setIsDragging: (isDragging: boolean) => void;

  // Viewport
  setViewport: (viewport: ViewportType) => void;

  // Page operations
  setPage: (page: PageSchema) => void;
  clearPage: () => void;
  exportPage: () => string;
  importPage: (json: string) => void;
}

type BuilderContextType = BuilderState & BuilderActions;

const BuilderContext = createContext<BuilderContextType | null>(null);

// Default empty page
const createEmptyPage = (): PageSchema => ({
  id: uuidv4(),
  slug: "new-page",
  meta: {
    title: "Yeni Sayfa",
    description: "",
  },
  blocks: [],
});

export function BuilderProvider({ children }: { children: ReactNode }) {
  const [page, setPageState] = useState<PageSchema>(createEmptyPage);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [viewport, setViewport] = useState<ViewportType>("desktop");

  // Add a new block
  const addBlock = useCallback((type: BlockType, index?: number) => {
    const registry = componentRegistry[type];
    const newBlock = {
      id: uuidv4(),
      type,
      ...registry.defaultProps,
    } as PageBlock;

    setPageState((prev) => {
      const blocks = [...prev.blocks];
      if (index !== undefined) {
        blocks.splice(index, 0, newBlock);
      } else {
        blocks.push(newBlock);
      }
      return { ...prev, blocks };
    });

    setSelectedBlockId(newBlock.id);
  }, []);

  // Remove a block
  const removeBlock = useCallback(
    (blockId: string) => {
      setPageState((prev) => ({
        ...prev,
        blocks: prev.blocks.filter((b) => b.id !== blockId),
      }));
      if (selectedBlockId === blockId) {
        setSelectedBlockId(null);
      }
    },
    [selectedBlockId]
  );

  // Move a block
  const moveBlock = useCallback((fromIndex: number, toIndex: number) => {
    setPageState((prev) => {
      const blocks = [...prev.blocks];
      const [movedBlock] = blocks.splice(fromIndex, 1);
      blocks.splice(toIndex, 0, movedBlock);
      return { ...prev, blocks };
    });
  }, []);

  // Duplicate a block
  const duplicateBlock = useCallback((blockId: string) => {
    setPageState((prev) => {
      const blockIndex = prev.blocks.findIndex((b) => b.id === blockId);
      if (blockIndex === -1) return prev;

      const block = prev.blocks[blockIndex];
      const newBlock = {
        ...JSON.parse(JSON.stringify(block)),
        id: uuidv4(),
      };

      const blocks = [...prev.blocks];
      blocks.splice(blockIndex + 1, 0, newBlock);
      return { ...prev, blocks };
    });
  }, []);

  // Update block props
  const updateBlockProps = useCallback(
    (blockId: string, props: Partial<PageBlock>) => {
      setPageState((prev) => ({
        ...prev,
        blocks: prev.blocks.map((b) =>
          b.id === blockId ? ({ ...b, ...props } as PageBlock) : b
        ),
      }));
    },
    []
  );

  // Select block
  const selectBlock = useCallback((blockId: string | null) => {
    setSelectedBlockId(blockId);
  }, []);

  // Toggle preview
  const togglePreview = useCallback(() => {
    setIsPreviewMode((prev) => !prev);
    setSelectedBlockId(null);
  }, []);

  // Set page
  const setPage = useCallback((newPage: PageSchema) => {
    setPageState(newPage);
    setSelectedBlockId(null);
  }, []);

  // Clear page
  const clearPage = useCallback(() => {
    setPageState(createEmptyPage());
    setSelectedBlockId(null);
  }, []);

  // Export page
  const exportPage = useCallback(() => {
    return JSON.stringify(page, null, 2);
  }, [page]);

  // Import page
  const importPage = useCallback((json: string) => {
    try {
      const parsed = JSON.parse(json) as PageSchema;
      setPageState(parsed);
      setSelectedBlockId(null);
    } catch (e) {
      console.error("Failed to import page:", e);
    }
  }, []);

  const value: BuilderContextType = {
    page,
    selectedBlockId,
    isPreviewMode,
    isDragging,
    viewport,
    addBlock,
    removeBlock,
    moveBlock,
    duplicateBlock,
    updateBlockProps,
    selectBlock,
    togglePreview,
    setIsDragging,
    setViewport,
    setPage,
    clearPage,
    exportPage,
    importPage,
  };

  return (
    <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("useBuilder must be used within a BuilderProvider");
  }
  return context;
}
