"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Check, X, Sparkles } from "lucide-react";
import { PricingTableProps } from "@/types/builder";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function PricingTable({
  id,
  className,
  title,
  subtitle,
  plans = [],
  billingToggle,
  primaryColor,
  secondaryColor,
}: PricingTableProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isYearly, setIsYearly] = useState(false);

  const customStyles = {
    ...(primaryColor ? { "--primary": primaryColor } : {}),
    ...(secondaryColor ? { "--secondary": secondaryColor } : {}),
  } as React.CSSProperties;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
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

  return (
    <section
      id={id}
      ref={ref}
      style={customStyles}
      className={cn(
        "py-20 lg:py-32 bg-linear-to-b from-background via-accent/5 to-background",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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

        {/* Billing Toggle */}
        {billingToggle && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                !isYearly ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {billingToggle.monthly}
            </span>

            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 rounded-full bg-primary/20 transition-colors hover:bg-primary/30"
            >
              <motion.div
                animate={{ x: isYearly ? 28 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 w-5 h-5 rounded-full bg-primary shadow-lg"
              />
            </button>

            <span
              className={cn(
                "text-sm font-medium transition-colors flex items-center gap-2",
                isYearly ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {billingToggle.yearly}
              {billingToggle.yearlyDiscount && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-primary/10 text-primary"
                >
                  {billingToggle.yearlyDiscount}
                </Badge>
              )}
            </span>
          </motion.div>
        )}

        {/* Plans */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={cn(
                "relative group",
                plan.isPopular && "lg:-mt-4 lg:mb-4"
              )}
            >
              {/* Popular badge */}
              {plan.isPopular && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
                >
                  <Badge className="bg-primary text-primary-foreground px-4 py-1 shadow-lg shadow-primary/25">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {plan.badge || "Most Popular"}
                  </Badge>
                </motion.div>
              )}

              {/* Card */}
              <div
                className={cn(
                  "relative h-full p-8 rounded-2xl transition-all duration-500",
                  plan.isPopular
                    ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/20 border-2 border-primary"
                    : "bg-background border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20"
                )}
              >
                {/* Gradient overlay for popular */}
                {plan.isPopular && (
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/10 to-transparent" />
                )}

                <div className="relative z-10">
                  {/* Plan name */}
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>

                  {/* Description */}
                  {plan.description && (
                    <p
                      className={cn(
                        "text-sm mb-6",
                        plan.isPopular
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground"
                      )}
                    >
                      {plan.description}
                    </p>
                  )}

                  {/* Price */}
                  <div className="mb-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={isYearly ? "yearly" : "monthly"}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-baseline gap-1"
                      >
                        {typeof plan.price === "object"
                          ? (plan.price as any).amount
                          : plan.price}
                        {plan.period && (
                          <span
                            className={cn(
                              "text-sm",
                              plan.isPopular
                                ? "text-primary-foreground/70"
                                : "text-muted-foreground"
                            )}
                          >
                            /{plan.period}
                          </span>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant={plan.isPopular ? "secondary" : "default"}
                    asChild
                    className={cn(
                      "w-full mb-8 relative overflow-hidden group/btn",
                      plan.isPopular &&
                        "bg-white text-primary hover:bg-white/90"
                    )}
                  >
                    <a href={plan.ctaButton?.href || "#"}>
                      <span className="relative z-10">
                        {plan.ctaButton?.label || "Seç"}
                      </span>
                      <motion.span
                        className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </a>
                  </Button>

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={
                          isInView
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -10 }
                        }
                        transition={{ delay: 0.5 + featureIndex * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <span
                          className={cn(
                            "shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5",
                            feature.included
                              ? plan.isPopular
                                ? "bg-white/20 text-white"
                                : "bg-primary/10 text-primary"
                              : plan.isPopular
                              ? "bg-white/10 text-white/50"
                              : "bg-muted text-muted-foreground/50"
                          )}
                        >
                          {feature.included ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <X className="w-3 h-3" />
                          )}
                        </span>
                        <span
                          className={cn(
                            "text-sm",
                            !feature.included &&
                              (plan.isPopular
                                ? "text-primary-foreground/50"
                                : "text-muted-foreground/50 line-through")
                          )}
                        >
                          {feature.text}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
