"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Image as ImageIcon,
  Settings,
} from "lucide-react";
import { useBuilder } from "@/lib/builder-store";
import { componentRegistry } from "@/lib/registry";
import { PageBlock } from "@/types/builder";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrayItemEditor } from "./array-item-editor";
import { ColorPickerField } from "./color-picker-field";

// Simple field editors
function TextField({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 resize-none"
        />
      ) : (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
        />
      )}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ToggleField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <label className="text-sm">{label}</label>
      <button
        onClick={() => onChange(!value)}
        className={cn(
          "relative w-10 h-6 rounded-full transition-colors",
          value ? "bg-primary" : "bg-accent"
        )}
      >
        <motion.div
          animate={{ x: value ? 16 : 2 }}
          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
        />
      </button>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min = 1,
  max = 10,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <input
        type="number"
        value={value || min}
        onChange={(e) => onChange(parseInt(e.target.value) || min)}
        min={min}
        max={max}
        className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
      />
    </div>
  );
}

// Image upload field with URL input and file upload
function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: { src?: string; alt?: string };
  onChange: (value: { src: string; alt: string }) => void;
}) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({
          src: reader.result as string,
          alt: value?.alt || file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-muted-foreground">
        {label}
      </label>

      {/* Preview */}
      {value?.src && (
        <div className="relative rounded-lg overflow-hidden bg-accent/30 aspect-video">
          <img
            src={value.src}
            alt={value.alt || ""}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* URL Input */}
      <input
        type="text"
        value={value?.src || ""}
        onChange={(e) =>
          onChange({ ...value, src: e.target.value, alt: value?.alt || "" })
        }
        placeholder="Görsel URL'si..."
        className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
      />

      {/* File Upload */}
      <label className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-dashed border-border hover:border-primary/50 cursor-pointer transition-colors">
        <ImageIcon className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Dosya Yükle</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {/* Alt Text */}
      <input
        type="text"
        value={value?.alt || ""}
        onChange={(e) =>
          onChange({ ...value, src: value?.src || "", alt: e.target.value })
        }
        placeholder="Alt metin (SEO için)..."
        className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
      />
    </div>
  );
}

// Section component
function PropertiesSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-3 text-sm font-medium hover:text-primary transition-colors"
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-4 space-y-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Dynamic property editor based on block type
function BlockPropertyEditor({ block }: { block: PageBlock }) {
  const { updateBlockProps } = useBuilder();

  const handleChange = (key: string, value: unknown) => {
    updateBlockProps(block.id, { [key]: value });
  };

  // Common fields based on block type
  switch (block.type) {
    case "navbar":
      return (
        <>
          <PropertiesSection title="Logo">
            <ImageUploadField
              label="Logo Görseli"
              value={(block as any).logo || { src: "", alt: "" }}
              onChange={(v) => handleChange("logo", { ...v, href: "/" })}
            />
          </PropertiesSection>
          <PropertiesSection title="Ayarlar">
            <ToggleField
              label="Sticky (Sabit)"
              value={(block as any).sticky !== false}
              onChange={(v) => handleChange("sticky", v)}
            />
            <ToggleField
              label="Transparent Arka Plan"
              value={(block as any).transparent || false}
              onChange={(v) => handleChange("transparent", v)}
            />
          </PropertiesSection>
          <PropertiesSection title="CTA Butonu" defaultOpen={false}>
            <TextField
              label="Buton Metni"
              value={block.ctaButton?.label || ""}
              onChange={(v) =>
                handleChange("ctaButton", { ...block.ctaButton, label: v })
              }
            />
            <TextField
              label="Link"
              value={block.ctaButton?.href || ""}
              onChange={(v) =>
                handleChange("ctaButton", { ...block.ctaButton, href: v })
              }
            />
          </PropertiesSection>
        </>
      );

    case "footer":
      return (
        <>
          <PropertiesSection title="İçerik">
            <TextField
              label="Açıklama"
              value={(block as any).description || ""}
              onChange={(v) => handleChange("description", v)}
              multiline
              placeholder="Şirket açıklaması..."
            />
            <TextField
              label="Telif Hakkı"
              value={(block as any).copyright || ""}
              onChange={(v) => handleChange("copyright", v)}
              placeholder="© 2024 Şirket Adı"
            />
          </PropertiesSection>
          <PropertiesSection title="Logo">
            <ImageUploadField
              label="Logo Görseli"
              value={(block as any).logo || { src: "", alt: "" }}
              onChange={(v) => handleChange("logo", v)}
            />
          </PropertiesSection>
          <PropertiesSection title="İletişim Bilgileri" defaultOpen={false}>
            <TextField
              label="Adres"
              value={(block as any).contactInfo?.address || ""}
              onChange={(v) =>
                handleChange("contactInfo", {
                  ...(block as any).contactInfo,
                  address: v,
                })
              }
              multiline
              placeholder="Adres..."
            />
            <TextField
              label="Telefon"
              value={(block as any).contactInfo?.phone || ""}
              onChange={(v) =>
                handleChange("contactInfo", {
                  ...(block as any).contactInfo,
                  phone: v,
                })
              }
              placeholder="+90 555 555 55 55"
            />
            <TextField
              label="E-posta"
              value={(block as any).contactInfo?.email || ""}
              onChange={(v) =>
                handleChange("contactInfo", {
                  ...(block as any).contactInfo,
                  email: v,
                })
              }
              placeholder="info@sirket.com"
            />
          </PropertiesSection>
          <PropertiesSection title="Sosyal Medya" defaultOpen={false}>
            <ArrayItemEditor
              label="Sosyal Bağlantılar"
              items={(block as any).socialLinks || []}
              onChange={(items) => handleChange("socialLinks", items)}
              createNewItem={() => ({
                platform: "twitter",
                url: "https://",
                icon: "Twitter",
              })}
              getItemTitle={(item: any, i) => item.platform || `Link ${i + 1}`}
              renderItem={(item: any, _, updateItem) => (
                <>
                  <SelectField
                    label="Platform"
                    value={item.platform || "twitter"}
                    onChange={(v) =>
                      updateItem({
                        platform: v,
                        icon: v.charAt(0).toUpperCase() + v.slice(1),
                      })
                    }
                    options={[
                      { value: "twitter", label: "Twitter/X" },
                      { value: "facebook", label: "Facebook" },
                      { value: "instagram", label: "Instagram" },
                      { value: "linkedin", label: "LinkedIn" },
                      { value: "youtube", label: "YouTube" },
                      { value: "github", label: "GitHub" },
                    ]}
                  />
                  <TextField
                    label="URL"
                    value={item.url || ""}
                    onChange={(v) => updateItem({ url: v })}
                    placeholder="https://..."
                  />
                </>
              )}
            />
          </PropertiesSection>
        </>
      );

    case "trustLogos":
      return (
        <>
          <PropertiesSection title="İçerik">
            <TextField
              label="Başlık"
              value={(block as any).title || ""}
              onChange={(v) => handleChange("title", v)}
              placeholder="Güvenilen markalar..."
            />
          </PropertiesSection>
          <PropertiesSection title="Logolar">
            <ArrayItemEditor
              label="Logo Listesi"
              items={(block as any).logos || []}
              onChange={(items) => handleChange("logos", items)}
              createNewItem={() => ({
                src: "",
                alt: "Marka Adı",
                href: "#",
              })}
              getItemTitle={(item: any, i) => item.alt || `Logo ${i + 1}`}
              renderItem={(item: any, _, updateItem) => (
                <>
                  <ImageUploadField
                    label="Logo Görseli"
                    value={{ src: item.src || "", alt: item.alt || "" }}
                    onChange={(v) => updateItem({ src: v.src, alt: v.alt })}
                  />
                  <TextField
                    label="Link"
                    value={item.href || ""}
                    onChange={(v) => updateItem({ href: v })}
                    placeholder="https://..."
                  />
                </>
              )}
            />
          </PropertiesSection>
          <PropertiesSection title="Ayarlar">
            <ToggleField
              label="Animasyonlu Kaydırma"
              value={(block as any).animated !== false}
              onChange={(v) => handleChange("animated", v)}
            />
            <ToggleField
              label="Gri Tonlama"
              value={(block as any).grayscale !== false}
              onChange={(v) => handleChange("grayscale", v)}
            />
          </PropertiesSection>
        </>
      );

    case "featureZigZag":
      return (
        <>
          <PropertiesSection title="Özellikler">
            <ArrayItemEditor
              label="Özellik Listesi"
              items={(block as any).features || []}
              onChange={(items) => handleChange("features", items)}
              createNewItem={() => ({
                title: "Yeni Özellik",
                description: "Özellik açıklaması...",
                media: { type: "image", src: "", alt: "" },
                bullets: ["Özellik 1", "Özellik 2"],
              })}
              getItemTitle={(item: any, i) => item.title || `Özellik ${i + 1}`}
              renderItem={(item: any, _, updateItem) => (
                <>
                  <TextField
                    label="Başlık"
                    value={item.title || ""}
                    onChange={(v) => updateItem({ title: v })}
                  />
                  <TextField
                    label="Açıklama"
                    value={item.description || ""}
                    onChange={(v) => updateItem({ description: v })}
                    multiline
                  />
                  <ImageUploadField
                    label="Görsel"
                    value={item.media || { src: "", alt: "" }}
                    onChange={(v) =>
                      updateItem({ media: { type: "image", ...v } })
                    }
                  />
                  <TextField
                    label="Maddeler (Her satır bir madde)"
                    value={item.bullets?.join("\n") || ""}
                    onChange={(v) => updateItem({ bullets: v.split("\n") })}
                    multiline
                    placeholder="Özellik 1&#10;Özellik 2"
                  />
                </>
              )}
            />
          </PropertiesSection>
          <PropertiesSection title="Renkler" defaultOpen={false}>
            <ColorPickerField
              label="Ana Renk"
              value={(block as any).primaryColor || ""}
              onChange={(v) => handleChange("primaryColor", v)}
            />
            <ColorPickerField
              label="İkincil Renk"
              value={(block as any).secondaryColor || ""}
              onChange={(v) => handleChange("secondaryColor", v)}
            />
          </PropertiesSection>
        </>
      );

    case "heroSection":
      return (
        <>
          <PropertiesSection title="İçerik">
            <TextField
              label="Başlık"
              value={block.heading || ""}
              onChange={(v) => handleChange("heading", v)}
              placeholder="Ana başlık..."
            />
            <TextField
              label="Alt Metin"
              value={block.subtext || ""}
              onChange={(v) => handleChange("subtext", v)}
              placeholder="Açıklama..."
              multiline
            />
          </PropertiesSection>
          <PropertiesSection title="Görsel" defaultOpen={false}>
            <ImageUploadField
              label="Arka Plan / Hero Görseli"
              value={(block as any).media || { src: "", alt: "" }}
              onChange={(v) =>
                handleChange("media", { type: "image" as const, ...v })
              }
            />
            <SelectField
              label="Görsel Stili"
              value={(block as any).mediaStyle || "decorated"}
              onChange={(v) => handleChange("mediaStyle", v)}
              options={[
                { value: "simple", label: "Sade" },
                { value: "decorated", label: "Dekoratif" },
              ]}
            />
            <ToggleField
              label="Overlay (Karartma)"
              value={(block as any).overlay || false}
              onChange={(v) => handleChange("overlay", v)}
            />
          </PropertiesSection>
          <PropertiesSection title="Butonlar" defaultOpen={false}>
            <TextField
              label="Birincil Buton"
              value={block.primaryButton?.label || ""}
              onChange={(v) =>
                handleChange("primaryButton", {
                  ...block.primaryButton,
                  label: v,
                })
              }
            />
            <TextField
              label="Birincil Buton Link"
              value={block.primaryButton?.href || ""}
              onChange={(v) =>
                handleChange("primaryButton", {
                  ...block.primaryButton,
                  href: v,
                })
              }
              placeholder="#contact"
            />
            <TextField
              label="İkincil Buton"
              value={block.secondaryButton?.label || ""}
              onChange={(v) =>
                handleChange("secondaryButton", {
                  ...block.secondaryButton,
                  label: v,
                })
              }
            />
          </PropertiesSection>
          <PropertiesSection title="Ayarlar" defaultOpen={false}>
            <SelectField
              label="Hizalama"
              value={block.alignment || "left"}
              onChange={(v) => handleChange("alignment", v)}
              options={[
                { value: "left", label: "Sol" },
                { value: "center", label: "Orta" },
                { value: "right", label: "Sağ" },
              ]}
            />
          </PropertiesSection>
          <PropertiesSection title="Renkler" defaultOpen={false}>
            <ColorPickerField
              label="Ana Renk"
              value={(block as any).primaryColor || ""}
              onChange={(v) => handleChange("primaryColor", v)}
            />
            <ColorPickerField
              label="İkincil Renk"
              value={(block as any).secondaryColor || ""}
              onChange={(v) => handleChange("secondaryColor", v)}
            />
          </PropertiesSection>
        </>
      );

    case "benefitsGrid":
      return (
        <>
          <PropertiesSection title="Başlık">
            <TextField
              label="Başlık"
              value={(block as any).title || ""}
              onChange={(v) => handleChange("title", v)}
            />
            <TextField
              label="Alt Başlık"
              value={(block as any).subtitle || ""}
              onChange={(v) => handleChange("subtitle", v)}
              multiline
            />
          </PropertiesSection>
          <PropertiesSection title="Avantajlar">
            <ArrayItemEditor
              label="Avantaj Listesi"
              items={(block as any).benefits || []}
              onChange={(items) => handleChange("benefits", items)}
              createNewItem={() => ({
                icon: "Star",
                title: "Yeni Avantaj",
                description: "Açıklama ekleyin",
              })}
              getItemTitle={(item: any, i) => item.title || `Avantaj ${i + 1}`}
              renderItem={(item: any, _, updateItem) => (
                <>
                  <TextField
                    label="İkon (Lucide)"
                    value={item.icon || ""}
                    onChange={(v) => updateItem({ icon: v })}
                    placeholder="Star, Check, Zap..."
                  />
                  <TextField
                    label="Başlık"
                    value={item.title || ""}
                    onChange={(v) => updateItem({ title: v })}
                  />
                  <TextField
                    label="Açıklama"
                    value={item.description || ""}
                    onChange={(v) => updateItem({ description: v })}
                    multiline
                  />
                </>
              )}
            />
          </PropertiesSection>
          <PropertiesSection title="Renkler" defaultOpen={false}>
            <ColorPickerField
              label="Ana Renk"
              value={(block as any).primaryColor || ""}
              onChange={(v) => handleChange("primaryColor", v)}
            />
            <ColorPickerField
              label="İkincil Renk"
              value={(block as any).secondaryColor || ""}
              onChange={(v) => handleChange("secondaryColor", v)}
            />
          </PropertiesSection>
        </>
      );

    case "testimonialGrid":
      return (
        <>
          <PropertiesSection title="Başlık">
            <TextField
              label="Başlık"
              value={(block as any).title || ""}
              onChange={(v) => handleChange("title", v)}
            />
            <TextField
              label="Alt Başlık"
              value={(block as any).subtitle || ""}
              onChange={(v) => handleChange("subtitle", v)}
              multiline
            />
          </PropertiesSection>
          <PropertiesSection title="Yorumlar">
            <ArrayItemEditor
              label="Yorum Listesi"
              items={(block as any).testimonials || []}
              onChange={(items) => handleChange("testimonials", items)}
              createNewItem={() => ({
                name: "Müşteri Adı",
                title: "Pozisyon",
                comment: "Yorum içeriği...",
                rating: 5,
                avatar: "",
              })}
              getItemTitle={(item: any, i) => item.name || `Yorum ${i + 1}`}
              renderItem={(item: any, _, updateItem) => (
                <>
                  <TextField
                    label="İsim"
                    value={item.name || ""}
                    onChange={(v) => updateItem({ name: v })}
                  />
                  <TextField
                    label="Unvan"
                    value={item.title || ""}
                    onChange={(v) => updateItem({ title: v })}
                  />
                  <TextField
                    label="Yorum"
                    value={item.comment || ""}
                    onChange={(v) => updateItem({ comment: v })}
                    multiline
                  />
                  <NumberField
                    label="Puan"
                    value={item.rating || 5}
                    onChange={(v) => updateItem({ rating: v })}
                    min={1}
                    max={5}
                  />
                  <ImageUploadField
                    label="Avatar"
                    value={{ src: item.avatar || "", alt: item.name || "" }}
                    onChange={(v) => updateItem({ avatar: v.src })}
                  />
                </>
              )}
            />
          </PropertiesSection>
        </>
      );

    case "listingGrid":
      return (
        <>
          <PropertiesSection title="Başlık">
            <TextField
              label="Başlık"
              value={(block as any).title || ""}
              onChange={(v) => handleChange("title", v)}
            />
            <TextField
              label="Alt Başlık"
              value={(block as any).subtitle || ""}
              onChange={(v) => handleChange("subtitle", v)}
              multiline
            />
          </PropertiesSection>
          <PropertiesSection title="Listeler">
            <ArrayItemEditor
              label="Liste Öğeleri"
              items={(block as any).items || []}
              onChange={(items) => handleChange("items", items)}
              createNewItem={() => ({
                id: Math.random().toString(36).substr(2, 9),
                title: "Yeni Öğe",
                description: "Açıklama",
                price: "₺0",
                image:
                  "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600",
                features: [],
              })}
              getItemTitle={(item: any, i) => item.title || `Öğe ${i + 1}`}
              renderItem={(item: any, _, updateItem) => (
                <>
                  <TextField
                    label="Başlık"
                    value={item.title || ""}
                    onChange={(v) => updateItem({ title: v })}
                  />
                  <TextField
                    label="Açıklama"
                    value={item.description || ""}
                    onChange={(v) => updateItem({ description: v })}
                    multiline
                  />
                  <TextField
                    label="Fiyat"
                    value={item.price || ""}
                    onChange={(v) => updateItem({ price: v })}
                    placeholder="₺999"
                  />
                  <ImageUploadField
                    label="Görsel"
                    value={{ src: item.image || "", alt: item.title || "" }}
                    onChange={(v) => updateItem({ image: v.src })}
                  />
                </>
              )}
            />
          </PropertiesSection>
          <PropertiesSection title="Ayarlar">
            <NumberField
              label="Kolon Sayısı"
              value={(block as any).columns || 3}
              onChange={(v) => handleChange("columns", v)}
              min={2}
              max={4}
            />
          </PropertiesSection>
        </>
      );

    case "teamGrid":
      return (
        <>
          <PropertiesSection title="Başlık">
            <TextField
              label="Başlık"
              value={(block as any).title || ""}
              onChange={(v) => handleChange("title", v)}
            />
            <TextField
              label="Alt Başlık"
              value={(block as any).subtitle || ""}
              onChange={(v) => handleChange("subtitle", v)}
              multiline
            />
          </PropertiesSection>
          <PropertiesSection title="Ekip Üyeleri">
            <ArrayItemEditor
              label="Üye Listesi"
              items={(block as any).members || []}
              onChange={(items) => handleChange("members", items)}
              createNewItem={() => ({
                id: Math.random().toString(36).substr(2, 9),
                name: "Ad Soyad",
                title: "Pozisyon",
                bio: "Kısa biyografi",
                image:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop",
              })}
              getItemTitle={(item: any, i) => item.name || `Üye ${i + 1}`}
              renderItem={(item: any, _, updateItem) => (
                <>
                  <TextField
                    label="Ad Soyad"
                    value={item.name || ""}
                    onChange={(v) => updateItem({ name: v })}
                  />
                  <TextField
                    label="Pozisyon"
                    value={item.title || ""}
                    onChange={(v) => updateItem({ title: v })}
                  />
                  <TextField
                    label="Biyografi"
                    value={item.bio || ""}
                    onChange={(v) => updateItem({ bio: v })}
                    multiline
                  />
                  <ImageUploadField
                    label="Fotoğraf"
                    value={{ src: item.image || "", alt: item.name || "" }}
                    onChange={(v) => updateItem({ image: v.src })}
                  />
                </>
              )}
            />
          </PropertiesSection>
        </>
      );

    case "processSteps":
      return (
        <>
          <PropertiesSection title="Başlık">
            <TextField
              label="Başlık"
              value={(block as any).title || ""}
              onChange={(v) => handleChange("title", v)}
            />
            <TextField
              label="Alt Başlık"
              value={(block as any).subtitle || ""}
              onChange={(v) => handleChange("subtitle", v)}
              multiline
            />
          </PropertiesSection>
          <PropertiesSection title="Adımlar">
            <ArrayItemEditor
              label="Adım Listesi"
              items={(block as any).steps || []}
              onChange={(items) => handleChange("steps", items)}
              createNewItem={() => ({
                id: Math.random().toString(36).substr(2, 9),
                number: ((block as any).steps?.length || 0) + 1,
                icon: "Check",
                title: "Yeni Adım",
                description: "Adım açıklaması",
              })}
              getItemTitle={(item: any, i) => item.title || `Adım ${i + 1}`}
              renderItem={(item: any, index, updateItem) => (
                <>
                  <NumberField
                    label="Numara"
                    value={item.number || index + 1}
                    onChange={(v) => updateItem({ number: v })}
                    min={1}
                    max={10}
                  />
                  <TextField
                    label="İkon (Lucide)"
                    value={item.icon || ""}
                    onChange={(v) => updateItem({ icon: v })}
                    placeholder="Check, ArrowRight..."
                  />
                  <TextField
                    label="Başlık"
                    value={item.title || ""}
                    onChange={(v) => updateItem({ title: v })}
                  />
                  <TextField
                    label="Açıklama"
                    value={item.description || ""}
                    onChange={(v) => updateItem({ description: v })}
                    multiline
                  />
                </>
              )}
            />
          </PropertiesSection>
          <PropertiesSection title="Ayarlar">
            <SelectField
              label="Yön"
              value={(block as any).variant || "horizontal"}
              onChange={(v) => handleChange("variant", v)}
              options={[
                { value: "horizontal", label: "Yatay" },
                { value: "vertical", label: "Dikey" },
              ]}
            />
            <ToggleField
              label="Okları Göster"
              value={(block as any).showArrows !== false}
              onChange={(v) => handleChange("showArrows", v)}
            />
          </PropertiesSection>
          <PropertiesSection title="Renkler" defaultOpen={false}>
            <ColorPickerField
              label="Ana Renk"
              value={(block as any).primaryColor || ""}
              onChange={(v) => handleChange("primaryColor", v)}
            />
            <ColorPickerField
              label="İkincil Renk"
              value={(block as any).secondaryColor || ""}
              onChange={(v) => handleChange("secondaryColor", v)}
            />
          </PropertiesSection>
        </>
      );

    case "pricingTable":
      return (
        <>
          <PropertiesSection title="Başlık">
            <TextField
              label="Başlık"
              value={(block as any).title || ""}
              onChange={(v) => handleChange("title", v)}
            />
            <TextField
              label="Alt Başlık"
              value={(block as any).subtitle || ""}
              onChange={(v) => handleChange("subtitle", v)}
              multiline
            />
          </PropertiesSection>
          <PropertiesSection title="Fiyat Planları">
            <ArrayItemEditor
              label="Plan Listesi"
              items={(block as any).plans || []}
              onChange={(items) => handleChange("plans", items)}
              createNewItem={() => ({
                id: Math.random().toString(36).substr(2, 9),
                name: "Yeni Plan",
                price: { amount: "99", period: "ay" },
                description: "Plan açıklaması",
                features: ["Özellik 1", "Özellik 2"],
                highlighted: false,
                ctaButton: { label: "Başla", href: "#" },
              })}
              getItemTitle={(item: any, i) => item.name || `Plan ${i + 1}`}
              renderItem={(item: any, _, updateItem) => (
                <>
                  <TextField
                    label="Plan Adı"
                    value={item.name || ""}
                    onChange={(v) => updateItem({ name: v })}
                  />
                  <TextField
                    label="Fiyat"
                    value={item.price?.amount || ""}
                    onChange={(v) =>
                      updateItem({ price: { ...item.price, amount: v } })
                    }
                    placeholder="99"
                  />
                  <TextField
                    label="Periyot"
                    value={item.price?.period || ""}
                    onChange={(v) =>
                      updateItem({ price: { ...item.price, period: v } })
                    }
                    placeholder="ay, yıl"
                  />
                  <TextField
                    label="Açıklama"
                    value={item.description || ""}
                    onChange={(v) => updateItem({ description: v })}
                    multiline
                  />
                  <ToggleField
                    label="Öne Çıkan"
                    value={item.highlighted || false}
                    onChange={(v) => updateItem({ highlighted: v })}
                  />
                  <TextField
                    label="Buton Metni"
                    value={item.ctaButton?.label || ""}
                    onChange={(v) =>
                      updateItem({
                        ctaButton: {
                          ...(item.ctaButton || { label: "Başla", href: "#" }),
                          label: v,
                        },
                      })
                    }
                  />
                  <TextField
                    label="Buton Linki"
                    value={item.ctaButton?.href || ""}
                    onChange={(v) =>
                      updateItem({
                        ctaButton: {
                          ...(item.ctaButton || { label: "Başla", href: "#" }),
                          href: v,
                        },
                      })
                    }
                  />
                </>
              )}
            />
          </PropertiesSection>
          <PropertiesSection title="Renkler" defaultOpen={false}>
            <ColorPickerField
              label="Ana Renk"
              value={(block as any).primaryColor || ""}
              onChange={(v) => handleChange("primaryColor", v)}
            />
            <ColorPickerField
              label="İkincil Renk"
              value={(block as any).secondaryColor || ""}
              onChange={(v) => handleChange("secondaryColor", v)}
            />
          </PropertiesSection>
        </>
      );

    case "faqAccordion":
      return (
        <>
          <PropertiesSection title="Başlık">
            <TextField
              label="Başlık"
              value={(block as any).title || ""}
              onChange={(v) => handleChange("title", v)}
            />
            <TextField
              label="Alt Başlık"
              value={(block as any).subtitle || ""}
              onChange={(v) => handleChange("subtitle", v)}
              multiline
            />
          </PropertiesSection>
          <PropertiesSection title="SSS Öğeleri">
            <ArrayItemEditor
              label="Sorular & Cevaplar"
              items={(block as any).items || []}
              onChange={(items) => handleChange("items", items)}
              createNewItem={() => ({
                id: Math.random().toString(36).substr(2, 9),
                question: "Yeni Soru?",
                answer: "Cevap yazın...",
              })}
              getItemTitle={(item: any, i) =>
                item.question?.slice(0, 30) || `Soru ${i + 1}`
              }
              renderItem={(item: any, _, updateItem) => (
                <>
                  <TextField
                    label="Soru"
                    value={item.question || ""}
                    onChange={(v) => updateItem({ question: v })}
                  />
                  <TextField
                    label="Cevap"
                    value={item.answer || ""}
                    onChange={(v) => updateItem({ answer: v })}
                    multiline
                  />
                </>
              )}
            />
          </PropertiesSection>
          <PropertiesSection title="Ayarlar">
            <ToggleField
              label="Çoklu Açık"
              value={(block as any).allowMultiple || false}
              onChange={(v) => handleChange("allowMultiple", v)}
            />
          </PropertiesSection>
          <PropertiesSection title="Renkler" defaultOpen={false}>
            <ColorPickerField
              label="Ana Renk"
              value={(block as any).primaryColor || ""}
              onChange={(v) => handleChange("primaryColor", v)}
            />
            <ColorPickerField
              label="İkincil Renk"
              value={(block as any).secondaryColor || ""}
              onChange={(v) => handleChange("secondaryColor", v)}
            />
          </PropertiesSection>
        </>
      );

    case "finalCta":
      return (
        <>
          <PropertiesSection title="İçerik">
            <TextField
              label="Başlık"
              value={block.heading || ""}
              onChange={(v) => handleChange("heading", v)}
            />
            <TextField
              label="Alt Metin"
              value={block.subtext || ""}
              onChange={(v) => handleChange("subtext", v)}
              multiline
            />
          </PropertiesSection>
          <PropertiesSection title="Ayarlar">
            <SelectField
              label="Arka Plan"
              value={block.backgroundStyle || "gradient"}
              onChange={(v) => handleChange("backgroundStyle", v)}
              options={[
                { value: "gradient", label: "Gradient" },
                { value: "image", label: "Resim" },
                { value: "solid", label: "Düz Renk" },
              ]}
            />
          </PropertiesSection>
        </>
      );

    case "beforeAfterSlider":
      return (
        <>
          <PropertiesSection title="Başlık">
            <TextField
              label="Başlık"
              value={block.title || ""}
              onChange={(v) => handleChange("title", v)}
            />
            <TextField
              label="Alt Başlık"
              value={block.subtitle || ""}
              onChange={(v) => handleChange("subtitle", v)}
              multiline
            />
          </PropertiesSection>
          <PropertiesSection title="Etiketler">
            <TextField
              label="Önce"
              value={block.beforeLabel || "Önce"}
              onChange={(v) => handleChange("beforeLabel", v)}
            />
            <TextField
              label="Sonra"
              value={block.afterLabel || "Sonra"}
              onChange={(v) => handleChange("afterLabel", v)}
            />
          </PropertiesSection>
          <PropertiesSection title="Görseller">
            <ImageUploadField
              label="Önce Görseli"
              value={block.beforeImage || { src: "", alt: "" }}
              onChange={(v) =>
                handleChange("beforeImage", { type: "image" as const, ...v })
              }
            />
            <ImageUploadField
              label="Sonra Görseli"
              value={block.afterImage || { src: "", alt: "" }}
              onChange={(v) =>
                handleChange("afterImage", { type: "image" as const, ...v })
              }
            />
          </PropertiesSection>
        </>
      );

    case "masonryGallery":
      return (
        <>
          <PropertiesSection title="Başlık">
            <TextField
              label="Başlık"
              value={(block as any).title || ""}
              onChange={(v) => handleChange("title", v)}
            />
            <TextField
              label="Alt Başlık"
              value={(block as any).subtitle || ""}
              onChange={(v) => handleChange("subtitle", v)}
              multiline
            />
          </PropertiesSection>
          <PropertiesSection title="Görseller">
            <ArrayItemEditor
              label="Görsel Listesi"
              items={(block as any).images || []}
              onChange={(items) => handleChange("images", items)}
              createNewItem={() => ({
                id: Math.random().toString(36).substr(2, 9),
                src: "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=600&auto=format&fit=crop",
                alt: "Görsel",
                category: "Genel",
              })}
              getItemTitle={(item: any, i) => item.alt || `Görsel ${i + 1}`}
              renderItem={(item: any, _, updateItem) => (
                <>
                  <ImageUploadField
                    label="Görsel"
                    value={{ src: item.src || "", alt: item.alt || "" }}
                    onChange={(v) => updateItem({ src: v.src, alt: v.alt })}
                  />
                  <TextField
                    label="Kategori"
                    value={item.category || ""}
                    onChange={(v) => updateItem({ category: v })}
                    placeholder="Genel, Doğa, Mimari..."
                  />
                </>
              )}
            />
          </PropertiesSection>
          <PropertiesSection title="Ayarlar">
            <NumberField
              label="Kolon Sayısı"
              value={(block as any).columns || 3}
              onChange={(v) => handleChange("columns", v)}
              min={2}
              max={4}
            />
            <ToggleField
              label="Lightbox"
              value={(block as any).enableLightbox !== false}
              onChange={(v) => handleChange("enableLightbox", v)}
            />
            <ToggleField
              label="Kategoriler"
              value={(block as any).showCategories || false}
              onChange={(v) => handleChange("showCategories", v)}
            />
          </PropertiesSection>
        </>
      );

    case "menuSection":
      return (
        <>
          <PropertiesSection title="Başlık">
            <TextField
              label="Başlık"
              value={(block as any).title || ""}
              onChange={(v) => handleChange("title", v)}
            />
            <TextField
              label="Alt Başlık"
              value={(block as any).subtitle || ""}
              onChange={(v) => handleChange("subtitle", v)}
              multiline
            />
          </PropertiesSection>
          <PropertiesSection title="Menü Öğeleri">
            <ArrayItemEditor
              label="Öğe Listesi"
              items={(block as any).items || []}
              onChange={(items) => handleChange("items", items)}
              createNewItem={() => ({
                name: "Yeni Ürün",
                description: "Ürün açıklaması",
                price: "₺99",
                category: "Kategori",
                image: "",
              })}
              getItemTitle={(item: any, i) => item.name || `Öğe ${i + 1}`}
              renderItem={(item: any, _, updateItem) => (
                <>
                  <TextField
                    label="Ürün Adı"
                    value={item.name || ""}
                    onChange={(v) => updateItem({ name: v })}
                  />
                  <TextField
                    label="Kategori"
                    value={item.category || ""}
                    onChange={(v) => updateItem({ category: v })}
                    placeholder="Ana Yemek, Tatlı vb."
                  />
                  <TextField
                    label="Açıklama"
                    value={item.description || ""}
                    onChange={(v) => updateItem({ description: v })}
                    multiline
                  />
                  <TextField
                    label="Fiyat"
                    value={item.price || ""}
                    onChange={(v) => updateItem({ price: v })}
                    placeholder="₺99"
                  />
                  <ImageUploadField
                    label="Görsel"
                    value={{ src: item.image || "", alt: item.name || "" }}
                    onChange={(v) => updateItem({ image: v.src })}
                  />
                </>
              )}
            />
          </PropertiesSection>
        </>
      );

    default:
      return (
        <>
          <PropertiesSection title="Başlık">
            <TextField
              label="Başlık"
              value={(block as any).title || ""}
              onChange={(v) => handleChange("title", v)}
            />
            <TextField
              label="Alt Başlık"
              value={(block as any).subtitle || ""}
              onChange={(v) => handleChange("subtitle", v)}
              multiline
            />
          </PropertiesSection>
          <PropertiesSection title="Renkler" defaultOpen={false}>
            <ColorPickerField
              label="Ana Renk"
              value={(block as any).primaryColor || ""}
              onChange={(v) => handleChange("primaryColor", v)}
            />
            <ColorPickerField
              label="İkincil Renk"
              value={(block as any).secondaryColor || ""}
              onChange={(v) => handleChange("secondaryColor", v)}
            />
          </PropertiesSection>
        </>
      );
  }
}

export function BuilderProperties() {
  const { page, selectedBlockId, selectBlock, isPreviewMode } = useBuilder();

  if (isPreviewMode) return null;

  const selectedBlock = page.blocks.find((b) => b.id === selectedBlockId);

  return (
    <aside className="w-80 border-l border-border/50 bg-background flex flex-col shrink-0">
      {/* Header */}
      <div className="h-12 border-b border-border/50 flex items-center justify-between px-4">
        <h2 className="font-semibold text-sm">
          {selectedBlock
            ? componentRegistry[selectedBlock.type]?.name
            : "Özellikler"}
        </h2>
        {selectedBlock && (
          <button
            onClick={() => selectBlock(null)}
            className="p-1 hover:bg-accent rounded"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {selectedBlock ? (
          <div className="p-4">
            <BlockPropertyEditor block={selectedBlock} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <div className="w-12 h-12 rounded-xl bg-accent/50 flex items-center justify-center mb-4">
              <Settings className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Düzenlemek için bir bileşen seçin
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
