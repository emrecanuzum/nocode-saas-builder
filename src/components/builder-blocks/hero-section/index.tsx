"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import { HeroSectionProps } from "@/types/builder";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HeroSection({
  id,
  className,
  heading,
  subtext,
  primaryButton,
  secondaryButton,
  media,
  socialProof,
  alignment = "left",
  overlay = false,
  mediaStyle = "decorated",
  primaryColor,
  secondaryColor,
  backgroundImage,
  backgroundColor,
  overlayOpacity,
  overlayColor,
}: HeroSectionProps & {
  mediaStyle?: "simple" | "decorated";
  primaryColor?: string;
  secondaryColor?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  overlayOpacity?: number;
  overlayColor?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const customStyles = {
    ...(primaryColor
      ? { "--primary": primaryColor, "--primary-foreground": "#ffffff" }
      : {}),
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
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

  const mediaVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        delay: 0.3,
      },
    },
  };

  const floatAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <section
      id={id}
      ref={ref}
      style={customStyles}
      className={cn(
        "relative min-h-[90vh] flex items-center overflow-hidden",
        !backgroundImage &&
          !backgroundColor &&
          "bg-linear-to-br from-background via-background to-primary/5",
        className
      )}
    >
      {/* Background overlay for images */}
      {backgroundImage && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundColor: overlayColor || "rgba(0,0,0,0.5)",
            opacity: (overlayOpacity || 50) / 100,
          }}
        />
      )}
      {/* Background decorations - only show if no custom background */}
      {!backgroundImage && !backgroundColor && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-linear-to-br from-primary/5 to-transparent rounded-full blur-3xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-linear-to-tr from-primary/5 to-transparent rounded-full blur-3xl"
          />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div
          className={cn(
            "grid gap-12 lg:gap-16 items-center",
            media ? "lg:grid-cols-2" : "lg:grid-cols-1 max-w-4xl mx-auto"
          )}
        >
          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={cn("flex flex-col gap-6", alignmentClasses[alignment])}
          >
            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-secondary" // Secondary Color Text
            >
              {heading}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-secondary/80 max-w-xl leading-relaxed" // Secondary Color Text (80% opacity)
            >
              {subtext}
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className={cn(
                "flex flex-wrap gap-4 pt-2",
                alignment === "center" && "justify-center",
                alignment === "right" && "justify-end"
              )}
            >
              {primaryButton && (
                <Button
                  size="lg"
                  asChild
                  className="group relative overflow-hidden px-8 py-6 text-base bg-primary hover:bg-primary/90 text-primary-foreground" // Explicit Primary bg
                >
                  <a href={primaryButton.href}>
                    <span className="relative z-10 flex items-center gap-2">
                      {primaryButton.label}
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.span>
                    </span>
                  </a>
                </Button>
              )}
              {secondaryButton && (
                <Button
                  size="lg"
                  variant="ghost"
                  asChild
                  className="px-8 py-6 text-base border-2 border-secondary text-secondary hover:bg-secondary/10 transition-colors" // Secondary Border & Text
                >
                  <a href={secondaryButton.href}>
                    {secondaryButton.icon === "play" && (
                      <Play className="w-4 h-4 mr-2" />
                    )}
                    {secondaryButton.label}
                  </a>
                </Button>
              )}
            </motion.div>

            {/* Social Proof */}
            {socialProof && (
              <motion.div
                variants={itemVariants}
                className={cn(
                  "flex items-center gap-4 pt-4",
                  alignment === "center" && "justify-center",
                  alignment === "right" && "justify-end"
                )}
              >
                {socialProof.avatars && socialProof.avatars.length > 0 && (
                  <div className="flex -space-x-3">
                    {socialProof.avatars.slice(0, 5).map((avatar, index) => (
                      <motion.img
                        key={index}
                        src={avatar}
                        alt={`User ${index + 1}`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="w-10 h-10 rounded-full border-2 border-background object-cover ring-2 ring-secondary/20" // Secondary Ring
                      />
                    ))}
                  </div>
                )}
                <p className="text-sm text-secondary/70">{socialProof.text}</p>
              </motion.div>
            )}
          </motion.div>

          {/* Media */}
          {media && (
            <motion.div
              variants={mediaVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="relative"
            >
              <div className="relative z-10">
                {/* Glow effect - only for decorated style */}
                {mediaStyle === "decorated" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-2xl transform scale-95" />
                )}

                {media.type === "video" ? (
                  <video
                    src={media.src}
                    poster={media.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="relative rounded-2xl shadow-2xl w-full border-2 border-secondary" // Secondary Border
                  />
                ) : media.src ? (
                  <img
                    src={media.src}
                    alt={media.alt}
                    className="relative rounded-2xl shadow-2xl w-full object-cover border-2 border-secondary" // Secondary Border
                  />
                ) : (
                  <div className="relative rounded-2xl shadow-2xl w-full aspect-video bg-accent/50 flex items-center justify-center text-muted-foreground border-2 border-secondary">
                    Görsel Ekleyin
                  </div>
                )}

                {/* Decorative elements - only for decorated style */}
                {mediaStyle === "decorated" && (
                  <>
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl"
                    />
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                      className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-xl"
                    />
                  </>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Overlay - dark gradient for better text readability */}
      {overlay && (
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      )}
    </section>
  );
}
