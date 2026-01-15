"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { BenefitsGridProps, IconName } from "@/types/builder";
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
  const Icon = icons[name] || LucideIcons.HelpCircle;
  return <Icon className={className} />;
}

export default function BenefitsGrid({
  id,
  className,
  title,
  subtitle,
  benefits = [], // Default to empty array if undefined
  columns = 3,
  primaryColor,
  secondaryColor,
  backgroundImage,
  backgroundColor,
}: BenefitsGridProps & {
  backgroundImage?: string;
  backgroundColor?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
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

  const iconVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, 0],
      transition: { duration: 0.3 },
    },
  };

  const columnClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
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
          "bg-linear-to-b from-background to-accent/10",
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
            className="text-center max-w-3xl mx-auto mb-16"
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

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={cn("grid gap-8", columnClasses[columns])}
        >
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              initial="initial"
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full p-8 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    variants={iconVariants}
                    className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                  >
                    <DynamicIcon name={item.icon} className="w-7 h-7" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Decorative corner */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="text-primary text-sm"
                  >
                    ✦
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
