"use client";

import { BuilderProvider } from "@/lib/builder-store";
import { BuilderHeader } from "../../components/builder/builder-header";
import { BuilderSidebar } from "../../components/builder/builder-sidebar";
import { BuilderCanvas } from "../../components/builder/builder-canvas";
import { BuilderProperties } from "../../components/builder/builder-properties";

export default function BuilderPage() {
  return (
    <BuilderProvider>
      <div className="h-screen flex flex-col bg-background">
        {/* Header */}
        <BuilderHeader />

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Components */}
          <BuilderSidebar />

          {/* Center - Canvas */}
          <BuilderCanvas />

          {/* Right Sidebar - Properties */}
          <BuilderProperties />
        </div>
      </div>
    </BuilderProvider>
  );
}
