"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Filter, ChevronDown } from "lucide-react";
import { ListingGridProps } from "@/types/builder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ListingGrid({
  id,
  className,
  title,
  subtitle,
  items,
  columns = 3,
  showFilters = false,
  filterOptions,
  primaryColor,
  secondaryColor,
  backgroundImage,
  backgroundColor,
}: ListingGridProps & {
  primaryColor?: string;
  secondaryColor?: string;
  backgroundImage?: string;
  backgroundColor?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {}
  );
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const customStyles = {
    ...(primaryColor ? { "--primary": primaryColor } : {}),
    ...(secondaryColor ? { "--secondary": secondaryColor } : {}),
    ...(backgroundImage
      ? {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      : {}),
    ...(backgroundColor ? { backgroundColor } : {}),
  } as React.CSSProperties;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const columnClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <section
      id={id}
      ref={ref}
      style={customStyles}
      className={cn(
        "py-20 lg:py-32",
        !backgroundImage &&
          !backgroundColor &&
          "bg-linear-to-b from-background to-accent/5",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Filters */}
        {showFilters && filterOptions && filterOptions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 mb-8"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filtrele:</span>
            </div>
            {filterOptions.map((filter, index) => (
              <div key={index} className="relative">
                <select
                  value={activeFilters[filter.label] || ""}
                  onChange={(e) =>
                    setActiveFilters({
                      ...activeFilters,
                      [filter.label]: e.target.value,
                    })
                  }
                  className="appearance-none px-4 py-2 pr-8 rounded-lg border border-border/50 bg-background text-sm hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                >
                  <option value="">{filter.label}</option>
                  {filter.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            ))}
          </motion.div>
        )}

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={cn("grid gap-6 lg:gap-8", columnClasses[columns])}
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              onHoverStart={() => setHoveredItem(item.id)}
              onHoverEnd={() => setHoveredItem(null)}
              className="group relative"
            >
              <a href={item.href || "#"} className="block h-full">
                {/* Card */}
                <div className="relative h-full overflow-hidden rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      animate={{
                        scale: hoveredItem === item.id ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full object-cover"
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Badge */}
                    {item.badge && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute top-4 left-4"
                      >
                        <Badge className="bg-primary text-primary-foreground shadow-lg">
                          {item.badge}
                        </Badge>
                      </motion.div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Title & Price */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      {item.price && (
                        <div className="flex-shrink-0 text-right">
                          {item.priceLabel && (
                            <p className="text-xs text-muted-foreground mb-0.5">
                              {item.priceLabel}
                            </p>
                          )}
                          <p className="font-bold text-primary text-lg">
                            {item.price}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    {item.features && item.features.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.features.map((feature, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * index }}
                            className="px-2.5 py-1 rounded-md bg-accent/50 text-xs text-muted-foreground"
                          >
                            {feature}
                          </motion.span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
