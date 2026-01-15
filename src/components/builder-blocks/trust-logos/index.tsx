"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrustLogosProps } from "@/types/builder";
import { cn } from "@/lib/utils";

export default function TrustLogos({
  id,
  className,
  title = "Trusted by leading companies",
  logos,
  animated = true,
  grayscale = true,
  primaryColor,
  secondaryColor,
  backgroundImage,
  backgroundColor,
}: TrustLogosProps & {
  primaryColor?: string;
  secondaryColor?: string;
  backgroundImage?: string;
  backgroundColor?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Duplicate logos for infinite scroll effect
  const duplicatedLogos = animated ? [...logos, ...logos] : logos;

  return (
    <section
      id={id}
      ref={ref}
      style={customStyles}
      className={cn(
        "py-12 lg:py-16 border-y border-border/50 overflow-hidden",
        !backgroundImage && !backgroundColor && "bg-accent/30",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        {title && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8"
          >
            {title}
          </motion.p>
        )}

        {/* Logos */}
        {animated ? (
          // Infinite scroll animation
          <div className="relative group">
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-12 lg:w-24 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 lg:w-24 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="flex overflow-hidden">
              <motion.div
                animate={{
                  x: "-50%",
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30, // Fixed duration for smooth speed
                    ease: "linear",
                  },
                }}
                className="flex items-center gap-12 lg:gap-16 pr-12 lg:pr-16"
              >
                {[...logos, ...logos].map((logo, index) => {
                  if (!logo.src) return null;
                  return (
                    <motion.a
                      key={`${logo.src}-${index}`}
                      href={logo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "shrink-0 transition-all duration-300",
                        grayscale &&
                          "grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
                      )}
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="h-8 lg:h-10 w-auto object-contain"
                      />
                    </motion.a>
                  );
                })}
              </motion.div>
            </div>
          </div>
        ) : (
          // Static grid
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center justify-center gap-8 lg:gap-12"
          >
            {logos.map((logo) => {
              if (!logo.src) return null;
              return (
                <motion.a
                  key={logo.src}
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className={cn(
                    "transition-all duration-300",
                    grayscale &&
                      "grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
                  )}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-8 lg:h-10 w-auto object-contain"
                  />
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
