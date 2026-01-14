"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Flame, Star } from "lucide-react";
import { MenuSectionProps, IconName } from "@/types/builder";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Dynamic icon component
function DynamicIcon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const icons = LucideIcons as unknown as Record<
    string,
    React.ComponentType<{ className?: string }>
  >;
  const Icon = icons[name] || LucideIcons.Circle;
  return <Icon className={className} />;
}

export default function MenuSection({
  id,
  className,
  title,
  subtitle,
  categories: initialCategories,
  items = [],
  layout = "tabs",
  showImages = true,
  primaryColor,
  secondaryColor,
}: MenuSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Group items by category if provided, otherwise use initialCategories
  const categories =
    items.length > 0
      ? Object.values(
          items.reduce((acc, item) => {
            // Type assertion for item since it comes from builder props which might be loose
            const category = (item as any).category || "Genel";
            if (!acc[category]) {
              acc[category] = { name: category, items: [] };
            }
            acc[category].items.push(item);
            return acc;
          }, {} as Record<string, { name: string; items: typeof items }>)
        )
      : initialCategories;

  const [activeTab, setActiveTab] = useState(categories[0]?.name || "");

  // Update activeTab when categories change
  if (categories.length > 0 && !categories.find((c) => c.name === activeTab)) {
    setActiveTab(categories[0].name);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "py-20 lg:py-32 bg-gradient-to-b from-accent/5 to-background",
        className
      )}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            {title && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-muted-foreground">{subtitle}</p>
            )}
          </motion.div>
        )}

        {/* Tabs Layout */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab List */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.2 }}
          >
            <TabsList className="flex flex-wrap justify-center gap-2 h-auto bg-transparent p-0 mb-10">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.name}
                  value={category.name}
                  className="relative px-6 py-3 rounded-full border border-border/50 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 hover:border-primary/50"
                >
                  <motion.span
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {category.icon && (
                      <DynamicIcon name={category.icon} className="w-4 h-4" />
                    )}
                    {category.name}
                  </motion.span>
                </TabsTrigger>
              ))}
            </TabsList>
          </motion.div>

          {/* Tab Content */}
          {categories.map((category) => (
            <TabsContent key={category.name} value={category.name}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={category.name}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -10 }}
                  className="divide-y divide-border/50"
                >
                  {category.items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      className="group py-6 first:pt-0 last:pb-0"
                    >
                      <div className="flex gap-4">
                        {/* Image */}
                        {showImages && item.image && (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex-shrink-0"
                          >
                            <div className="relative w-24 h-24 rounded-xl overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </motion.div>
                        )}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              {/* Name & Badges */}
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                  {item.name}
                                </h3>
                                {item.isNew && (
                                  <Badge
                                    variant="secondary"
                                    className="bg-green-500/10 text-green-600 text-xs"
                                  >
                                    Yeni
                                  </Badge>
                                )}
                                {item.isPopular && (
                                  <Badge
                                    variant="secondary"
                                    className="bg-orange-500/10 text-orange-600 text-xs"
                                  >
                                    <Flame className="w-3 h-3 mr-1" />
                                    Popüler
                                  </Badge>
                                )}
                                {item.badge && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {item.badge}
                                  </Badge>
                                )}
                              </div>

                              {/* Description */}
                              {item.description && (
                                <p className="text-muted-foreground text-sm line-clamp-2">
                                  {item.description}
                                </p>
                              )}
                            </div>

                            {/* Price */}
                            <div className="flex-shrink-0">
                              <motion.span
                                whileHover={{ scale: 1.05 }}
                                className="inline-block font-bold text-lg text-primary"
                              >
                                {item.price}
                              </motion.span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
