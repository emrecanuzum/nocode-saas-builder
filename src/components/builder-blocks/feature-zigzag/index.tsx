"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { FeatureZigZagProps } from "@/types/builder";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function FeatureZigZag({
  id,
  className,
  features = [],
  primaryColor,
  secondaryColor,
  backgroundImage,
  backgroundColor,
}: FeatureZigZagProps & {
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

  return (
    <section
      id={id}
      ref={ref}
      style={customStyles}
      className={cn(
        "py-20 lg:py-32",
        !backgroundImage && !backgroundColor && "bg-background",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-24 lg:space-y-32">
          {features.map((feature, index) => {
            const isReversed = index % 2 === 1;

            const contentVariants = {
              hidden: {
                opacity: 0,
                x: isReversed ? 50 : -50,
              },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  type: "spring" as const,
                  stiffness: 80,
                  damping: 20,
                  delay: 0.1,
                },
              },
            };

            const mediaVariants = {
              hidden: {
                opacity: 0,
                x: isReversed ? -50 : 50,
                scale: 0.95,
              },
              visible: {
                opacity: 1,
                x: 0,
                scale: 1,
                transition: {
                  type: "spring" as const,
                  stiffness: 80,
                  damping: 20,
                  delay: 0.2,
                },
              },
            };

            return (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className={cn(
                  "grid gap-12 lg:gap-16 items-center",
                  "lg:grid-cols-2",
                  isReversed && "lg:[&>*:first-child]:order-2"
                )}
              >
                {/* Content */}
                <motion.div variants={contentVariants} className="space-y-6">
                  <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">
                    {feature.title}
                  </h3>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Bullets */}
                  {feature.bullets && feature.bullets.length > 0 && (
                    <ul className="space-y-3">
                      {feature.bullets.map((bullet, bulletIndex) => (
                        <motion.li
                          key={bulletIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + bulletIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-3"
                        >
                          <span className="shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mt-0.5">
                            <Check className="w-3 h-3" />
                          </span>
                          <span className="text-muted-foreground">
                            {bullet}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  )}

                  {/* CTA Button */}
                  {feature.ctaButton && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      viewport={{ once: true }}
                      className="pt-2"
                    >
                      <Button
                        variant={
                          feature.ctaButton.variant === "primary"
                            ? "default"
                            : "outline"
                        }
                        asChild
                        className="group"
                      >
                        <a href={feature.ctaButton.href}>
                          {feature.ctaButton.label}
                          <motion.span
                            className="inline-block ml-2"
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.span>
                        </a>
                      </Button>
                    </motion.div>
                  )}
                </motion.div>

                {/* Media */}
                <motion.div variants={mediaVariants} className="relative group">
                  {/* Glow effect */}
                  <motion.div
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [0.95, 1, 0.95],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 bg-linear-to-r from-primary/20 to-primary/10 rounded-2xl blur-2xl"
                  />

                  {/* Media container */}
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    {feature.media.type === "video" ? (
                      <video
                        src={feature.media.src}
                        poster={feature.media.poster}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full aspect-video object-cover"
                      />
                    ) : feature.media.src ? (
                      <motion.img
                        src={feature.media.src}
                        alt={feature.media.alt}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                        className="w-full aspect-video object-cover"
                      />
                    ) : (
                      <div className="w-full aspect-video bg-muted flex items-center justify-center text-muted-foreground text-sm">
                        Resim yok
                      </div>
                    )}

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Decorative elements */}
                  <motion.div
                    animate={{
                      y: [-5, 5, -5],
                      rotate: [0, 5, 0],
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className={cn(
                      "absolute w-20 h-20 rounded-xl bg-primary/10 backdrop-blur-sm border border-primary/20 -z-10",
                      isReversed ? "-top-6 -right-6" : "-top-6 -left-6"
                    )}
                  />
                  <motion.div
                    animate={{
                      y: [5, -5, 5],
                      rotate: [0, -5, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className={cn(
                      "absolute w-16 h-16 rounded-lg bg-primary/5 backdrop-blur-sm border border-primary/10 -z-10",
                      isReversed ? "-bottom-4 -left-4" : "-bottom-4 -right-4"
                    )}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
