"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { ProcessStepsProps, IconName } from "@/types/builder";
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

export default function ProcessSteps({
  id,
  className,
  title,
  subtitle,
  steps = [], // Default to empty array
  showArrows = true,
  variant = "horizontal",
  primaryColor,
  secondaryColor,
}: ProcessStepsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const customStyles = {
    ...(primaryColor ? { "--primary": primaryColor } : {}),
    ...(secondaryColor ? { "--secondary": secondaryColor } : {}),
  } as React.CSSProperties;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
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

  const arrowVariants = {
    hidden: { opacity: 0, scaleX: 0 },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: {
        delay: 0.5,
        duration: 0.5,
      },
    },
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section
      id={id}
      ref={ref}
      style={customStyles}
      className={cn(
        "py-20 lg:py-32 bg-linear-to-b from-accent/10 to-background",
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

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={cn(
            variant === "horizontal"
              ? "flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-4"
              : "flex flex-col gap-8 max-w-2xl mx-auto"
          )}
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center",
                variant === "horizontal"
                  ? "flex-col lg:flex-row"
                  : "flex-row gap-6"
              )}
            >
              {/* Step Card */}
              <motion.div
                variants={stepVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={cn(
                  "relative group",
                  variant === "horizontal" ? "w-full lg:w-72" : "flex-1"
                )}
              >
                {/* Card */}
                <div className="relative p-6 lg:p-8 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-500">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 text-center">
                    {/* Step Number */}
                    <motion.div
                      animate={pulseAnimation}
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4 shadow-lg shadow-primary/25"
                    >
                      {step.icon ? (
                        <DynamicIcon name={step.icon} className="w-7 h-7" />
                      ) : (
                        step.number || index + 1
                      )}
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Connector line for vertical */}
                  {variant === "vertical" && index < steps.length - 1 && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                      transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                      className="absolute -bottom-8 left-1/2 w-0.5 h-8 bg-linear-to-b from-primary to-primary/30 origin-top"
                    />
                  )}
                </div>
              </motion.div>

              {/* Arrow (horizontal) */}
              {variant === "horizontal" &&
                showArrows &&
                index < steps.length - 1 && (
                  <motion.div
                    variants={arrowVariants}
                    className="hidden lg:flex items-center justify-center w-16 shrink-0"
                  >
                    <motion.div
                      animate={{
                        x: [0, 8, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <ChevronRight className="w-8 h-8 text-primary/50" />
                    </motion.div>
                  </motion.div>
                )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
