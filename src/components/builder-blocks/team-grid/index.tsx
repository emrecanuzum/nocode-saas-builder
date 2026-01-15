"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { TeamGridProps, SocialLink } from "@/types/builder";
import { cn } from "@/lib/utils";

// Social icon mapping
const socialIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
};

export default function TeamGrid({
  id,
  className,
  title,
  subtitle,
  members,
  columns = 4,
  showBio = true,
  showSocialLinks = true,
  primaryColor,
  secondaryColor,
  backgroundImage,
  backgroundColor,
}: TeamGridProps & {
  primaryColor?: string;
  secondaryColor?: string;
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
        type: "spring",
        stiffness: 100,
        damping: 15,
      } as const,
    },
  };

  const columnClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
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
          "bg-linear-to-b from-background to-accent/5",
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
          {members.map((member) => (
            <div key={member.id} className="group relative">
              {/* Card */}
              <div className="relative overflow-hidden rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500">
                {/* Image */}
                <div className="relative aspect-3/4 overflow-hidden bg-muted flex items-center justify-center">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="text-muted-foreground">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Social Links Overlay */}
                  {showSocialLinks &&
                    member.socialLinks &&
                    member.socialLinks.length > 0 && (
                      <div className="absolute inset-0 flex items-center justify-center gap-3 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {member.socialLinks.map((link, index) => {
                          const Icon = socialIcons[link.platform];
                          if (!Icon) return null;
                          return (
                            <a
                              key={index}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors hover:scale-110 transform duration-200"
                            >
                              <Icon className="w-5 h-5" />
                            </a>
                          );
                        })}
                      </div>
                    )}

                  {/* Info at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="font-semibold text-xl mb-1">
                      {member.name}
                    </h3>
                    <p className="text-white/80 text-sm">{member.title}</p>
                  </div>
                </div>

                {/* Bio */}
                {showBio && member.bio && (
                  <div className="p-5 border-t border-border/50">
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {member.bio}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
