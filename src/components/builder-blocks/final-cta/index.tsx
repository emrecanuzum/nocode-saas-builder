"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { FinalCTAProps } from "@/types/builder";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function FinalCTA({
  id,
  className,
  heading,
  subtext,
  ctaButton,
  secondaryButton,
  backgroundStyle = "gradient",
  backgroundImage,
}: FinalCTAProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
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
      className={cn("relative py-24 lg:py-32 overflow-hidden", className)}
    >
      {/* Background */}
      {backgroundStyle === "gradient" && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
      )}
      {backgroundStyle === "solid" && (
        <div className="absolute inset-0 bg-primary" />
      )}
      {backgroundStyle === "image" && backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" />
        </>
      )}

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] bg-white rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] bg-white rounded-full blur-3xl"
        />

        {/* Floating sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute text-white/30"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
            }}
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-6"
        >
          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-primary-foreground"
          >
            {heading}
          </motion.h2>

          {/* Subtext */}
          {subtext && (
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto"
            >
              {subtext}
            </motion.p>
          )}

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="relative overflow-hidden group bg-white text-primary hover:bg-white/90 px-8 py-6 text-base shadow-xl shadow-black/10"
            >
              <a href={ctaButton.href}>
                <span className="relative z-10 flex items-center gap-2">
                  {ctaButton.label}
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </a>
            </Button>

            {secondaryButton && (
              <Button
                size="lg"
                variant="ghost"
                asChild
                className="px-8 py-6 text-base text-primary-foreground border border-primary-foreground/30 hover:bg-primary-foreground/10 hover:border-primary-foreground/50"
              >
                <a href={secondaryButton.href}>{secondaryButton.label}</a>
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
