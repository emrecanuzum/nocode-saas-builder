"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FAQAccordionProps } from "@/types/builder";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export default function FAQAccordion({
  id,
  className,
  title,
  subtitle,
  items = [], // Default to empty array
  allowMultiple = false,
  primaryColor,
  secondaryColor,
  backgroundImage,
  backgroundColor,
}: FAQAccordionProps & {
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Accordion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Accordion
            type={allowMultiple ? "multiple" : "single"}
            collapsible
            className="space-y-4"
          >
            {items.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem
                  value={`item-${index}`}
                  className="group border border-border/50 rounded-xl overflow-hidden bg-background shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 data-[state=open]:border-primary/30 data-[state=open]:shadow-lg"
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline group-hover:text-primary transition-colors data-[state=open]:text-primary">
                    <span className="text-left font-semibold text-base">
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-muted-foreground leading-relaxed"
                    >
                      {item.answer}
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
