"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { FooterProps, SocialLink } from "@/types/builder";
import { cn } from "@/lib/utils";

// Social icon mapping
const socialIcons: Record<
  SocialLink["platform"],
  React.ComponentType<{ className?: string }>
> = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  ),
  whatsapp: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  ),
};

export default function Footer({
  id,
  className,
  logo,
  description,
  contactInfo,
  columns,
  socialLinks,
  copyright,
  bottomLinks,
  primaryColor,
  secondaryColor,
  backgroundImage,
  backgroundColor,
}: FooterProps & {
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

  return (
    <footer
      id={id}
      ref={ref}
      style={customStyles}
      className={cn(
        "relative border-t border-border/50",
        !backgroundImage && !backgroundColor && "bg-background",
        className
      )}
    >
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-12 lg:grid-cols-12"
        >
          {/* Brand column */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 space-y-6"
          >
            {logo && (
              <motion.a
                href="/"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img src={logo.src} alt={logo.alt} className="h-14 w-auto" />
              </motion.a>
            )}

            {description && (
              <p className="text-muted-foreground leading-relaxed max-w-sm">
                {description}
              </p>
            )}

            {/* Contact Info */}
            {contactInfo &&
              (contactInfo.address ||
                contactInfo.phone ||
                contactInfo.email) && (
                <div className="space-y-2 text-sm text-muted-foreground">
                  {contactInfo.address && <p>{contactInfo.address}</p>}
                  {contactInfo.phone && <p>📞 {contactInfo.phone}</p>}
                  {contactInfo.email && <p>✉️ {contactInfo.email}</p>}
                </div>
              )}

            {/* Social links */}
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex gap-4">
                {socialLinks.map((link, index) => {
                  const Icon = socialIcons[link.platform];
                  return (
                    <motion.a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Link columns */}
          <div className="lg:col-span-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((column, columnIndex) => (
              <motion.div key={columnIndex} variants={itemVariants}>
                <h4 className="font-semibold text-foreground mb-4">
                  {column.title}
                </h4>
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <motion.a
                        href={link.href}
                        target={link.isExternal ? "_blank" : undefined}
                        rel={
                          link.isExternal ? "noopener noreferrer" : undefined
                        }
                        whileHover={{ x: 4 }}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200 inline-block"
                      >
                        {link.label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <p className="text-sm text-muted-foreground">{copyright}</p>

            {bottomLinks && bottomLinks.length > 0 && (
              <div className="flex flex-wrap gap-6">
                {bottomLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target={link.isExternal ? "_blank" : undefined}
                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                    whileHover={{ color: "hsl(var(--primary))" }}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
