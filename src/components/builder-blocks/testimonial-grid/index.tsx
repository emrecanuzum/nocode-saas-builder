"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TestimonialGridProps } from "@/types/builder";
import { cn } from "@/lib/utils";

export default function TestimonialGrid({
  id,
  className,
  title,
  subtitle,
  testimonials = [],
  columns = 3,
  showRating = true,
  primaryColor,
  secondaryColor,
  backgroundImage,
  backgroundColor,
}: TestimonialGridProps & {
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
          "bg-linear-to-b from-accent/10 via-background to-background",
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
          animate="visible"
          className={cn("grid gap-8", columnClasses[columns])}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full p-8 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500">
                {/* Quote icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    isInView
                      ? { opacity: 0.1, scale: 1 }
                      : { opacity: 0, scale: 0 }
                  }
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="absolute top-6 right-6 text-primary"
                >
                  <Quote className="w-12 h-12" />
                </motion.div>

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Rating */}
                  {showRating && testimonial.rating && (
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={
                            isInView
                              ? { opacity: 1, scale: 1 }
                              : { opacity: 0, scale: 0 }
                          }
                          transition={{ delay: 0.4 + i * 0.05 }}
                        >
                          <Star
                            className={cn(
                              "w-5 h-5",
                              i < testimonial.rating!
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-muted-foreground/30"
                            )}
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Comment */}
                  <p className="text-foreground/90 leading-relaxed mb-6">
                    "{testimonial.comment}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    {testimonial.avatar && (
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="relative"
                      >
                        <div className="absolute inset-0 rounded-full bg-linear-to-r from-primary to-primary/50 blur-sm opacity-50" />
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="relative w-12 h-12 rounded-full object-cover ring-2 ring-background"
                        />
                      </motion.div>
                    )}
                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      {(testimonial.title || testimonial.company) && (
                        <p className="text-sm text-muted-foreground">
                          {testimonial.title}
                          {testimonial.title && testimonial.company && ", "}
                          {testimonial.company}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
