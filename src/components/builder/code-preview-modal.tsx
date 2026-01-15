"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Copy, Download, FileCode } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CodePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  onDownload: () => void;
}

export function CodePreviewModal({
  isOpen,
  onClose,
  code,
  onDownload,
}: CodePreviewModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-primary" />
            Sayfa Kodu (page.tsx)
          </DialogTitle>
          <DialogDescription>
            Bu kodu kopyalayip projenizdeki `app/page.tsx` dosyasina
            yapistirabilirsiniz.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 min-h-0 border rounded-md bg-zinc-950 relative group">
          <div className="absolute right-4 top-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <Button
              size="sm"
              variant="secondary"
              className="h-8 gap-2 bg-white/10 hover:bg-white/20 text-white border-none"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="w-3 h-3" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
              {copied ? "Kopyalandı" : "Kopyala"}
            </Button>
          </div>

          <ScrollArea className="h-[50vh] w-full p-4">
            <pre className="text-zinc-300 font-mono text-sm leading-relaxed">
              <code>{code}</code>
            </pre>
          </ScrollArea>
        </div>

        <div className="flex justify-between items-center pt-4 mt-auto">
          <p className="text-xs text-muted-foreground">
            *Bu kod, projenizdeki gerekli bileşenlerin `/src/components/blocks`
            altında olduğunu varsayar.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Kapat
            </Button>
            <Button onClick={onDownload} className="gap-2">
              <Download className="w-4 h-4" />
              Tam Projeyi İndir (ZIP)
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
