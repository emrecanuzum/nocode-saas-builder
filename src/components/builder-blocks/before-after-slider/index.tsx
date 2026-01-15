"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { GripVertical } from "lucide-react";
import { BeforeAfterSliderProps } from "@/types/builder";
import { cn } from "@/lib/utils";

export default function BeforeAfterSlider({
  id,
  className,
  title,
  subtitle,
  beforeImage = {
    type: "image" as const,
    src: "https://placehold.co/800x500/e2e8f0/64748b?text=Before",
    alt: "Before",
  },
  afterImage = {
    type: "image" as const,
    src: "https://placehold.co/800x500/22c55e/ffffff?text=After",
    alt: "After",
  },
  beforeLabel = "Önce",
  afterLabel = "Sonra",
  defaultPosition = 50,
  orientation = "horizontal",
  primaryColor,
  secondaryColor,
  backgroundImage,
  backgroundColor,
}: BeforeAfterSliderProps & {
  primaryColor?: string;
  secondaryColor?: string;
  backgroundImage?: string;
  backgroundColor?: string;
}) {
  const ref = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(defaultPosition);

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

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      let newPosition: number;

      if (orientation === "horizontal") {
        newPosition = ((clientX - rect.left) / rect.width) * 100;
      } else {
        newPosition = ((clientY - rect.top) / rect.height) * 100;
      }

      setPosition(Math.max(0, Math.min(100, newPosition)));
    },
    [orientation]
  );

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX, e.clientY);
    },
    [isDragging, handleMove]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    },
    [isDragging, handleMove]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Slider Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
          }
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-2xl transform scale-95 -z-10" />

          {/* Slider */}
          <div
            ref={containerRef}
            className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl cursor-col-resize select-none"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            {/* After Image (Background) */}
            <div className="absolute inset-0">
              <img
                src={afterImage.src}
                alt={afterImage.alt}
                className="w-full h-full object-cover"
              />
              {/* After Label */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
                }
                transition={{ delay: 0.5 }}
                className="absolute bottom-6 right-6 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-medium"
              >
                {afterLabel}
              </motion.div>
            </div>

            {/* Before Image (Overlay) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath:
                  orientation === "horizontal"
                    ? `inset(0 ${100 - position}% 0 0)`
                    : `inset(0 0 ${100 - position}% 0)`,
              }}
            >
              <img
                src={beforeImage.src}
                alt={beforeImage.alt}
                className="w-full h-full object-cover"
              />
              {/* Before Label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{ delay: 0.5 }}
                className="absolute bottom-6 left-6 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-medium"
              >
                {beforeLabel}
              </motion.div>
            </div>

            {/* Slider Handle */}
            <motion.div
              animate={{
                scale: isDragging ? 1.1 : 1,
              }}
              className={cn(
                "absolute z-10 flex items-center justify-center",
                orientation === "horizontal"
                  ? "top-0 bottom-0 cursor-col-resize"
                  : "left-0 right-0 cursor-row-resize"
              )}
              style={{
                [orientation === "horizontal" ? "left" : "top"]: `${position}%`,
                transform:
                  orientation === "horizontal"
                    ? "translateX(-50%)"
                    : "translateY(-50%)",
              }}
            >
              {/* Line */}
              <div
                className={cn(
                  "bg-white shadow-lg",
                  orientation === "horizontal" ? "w-0.5 h-full" : "h-0.5 w-full"
                )}
              />

              {/* Handle Button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "absolute w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center",
                  isDragging && "ring-4 ring-primary/30"
                )}
              >
                <motion.div
                  animate={{
                    rotate: orientation === "horizontal" ? 0 : 90,
                  }}
                >
                  <GripVertical className="w-5 h-5 text-primary" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Instructions */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center text-sm text-muted-foreground mt-4"
          >
            Karşılaştırmak için sürükleyin
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
