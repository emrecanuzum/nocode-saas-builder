"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NavbarProps } from "@/types/builder";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar({
  id,
  className,
  logo = {
    src: "https://placehold.co/120x40/1f2937/ffffff?text=Logo",
    alt: "Logo",
    href: "/",
  },
  menuItems = [
    { label: "Ana Sayfa", href: "#" },
    { label: "Hakkımızda", href: "#about" },
    { label: "Hizmetler", href: "#services" },
    { label: "İletişim", href: "#contact" },
  ],
  ctaButton,
  sticky = true,
  transparent = false,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!sticky) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sticky]);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
      },
    },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.nav
      id={id}
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={cn(
        "w-full z-50 transition-all duration-300",
        sticky && "fixed top-0 left-0 right-0",
        isScrolled || !transparent
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border/50"
          : "bg-transparent",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.a
            href={logo.href || "/"}
            className="shrink-0"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-10 lg:h-14 w-auto"
            />
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                custom={index}
                variants={menuItemVariants}
                className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors group"
                whileHover={{ scale: 1.02 }}
              >
                {item.label}
                <motion.span
                  className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary rounded-full group-hover:w-1/2 transition-all duration-300"
                  style={{ transform: "translateX(-50%)" }}
                />
                <motion.span
                  className="absolute bottom-0 right-1/2 w-0 h-0.5 bg-primary rounded-full group-hover:w-1/2 transition-all duration-300"
                  style={{ transform: "translateX(50%)" }}
                />
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            {ctaButton && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <Button
                  variant={
                    ctaButton.variant === "primary"
                      ? "default"
                      : ctaButton.variant
                  }
                  asChild
                  className="relative overflow-hidden group"
                >
                  <a href={ctaButton.href}>
                    <span className="relative z-10">{ctaButton.label}</span>
                    <motion.span
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </a>
                </Button>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
            className="lg:hidden overflow-hidden bg-background/95 backdrop-blur-md border-t border-border/50"
          >
            <div className="px-4 py-4 space-y-2">
              {menuItems.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  variants={mobileItemVariants}
                  className="block px-4 py-3 rounded-lg text-foreground/80 hover:text-foreground hover:bg-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
              {ctaButton && (
                <motion.div variants={mobileItemVariants} className="pt-2">
                  <Button
                    variant={
                      ctaButton.variant === "primary"
                        ? "default"
                        : ctaButton.variant
                    }
                    asChild
                    className="w-full"
                  >
                    <a href={ctaButton.href}>{ctaButton.label}</a>
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
