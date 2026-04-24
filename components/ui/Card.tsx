"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Tag from "./Tag";
import { useRef } from "react";

interface CardProps {
  title:       string;
  description: string;
  href:        string;
  imageSrc?:   string;
  imageAlt?:   string;
  tags?:       string[];
  year?:       string | number;
  index?:      number;  // for stagger offset
}

export default function Card({
  title,
  description,
  href,
  imageSrc,
  imageAlt,
  tags    = [],
  year,
  index   = 0,
}: CardProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  // Tilt effect via mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 30 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-3, 3]);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay:    index * 0.1,
        ease:     [0.22, 1, 0.36, 1],
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle:  "preserve-3d",
        perspective:     "800px",
        display:         "block",
        textDecoration:  "none",
        borderRadius:    "var(--radius-xl)",
        border:          "1px solid var(--border-default)",
        backgroundColor: "var(--bg-surface)",
        overflow:        "hidden",
        cursor:          "pointer",
        transition:      "border-color 200ms ease, box-shadow 200ms ease",
      }}
      whileHover={{
        boxShadow: "var(--shadow-lg)",
        borderColor: "var(--border-strong)",
      }}
    >
      {/* Image */}
      {imageSrc && (
        <div
          style={{
            position:   "relative",
            width:      "100%",
            aspectRatio: "16/9",
            overflow:   "hidden",
            backgroundColor: "var(--bg-raised)",
          }}
        >
          <motion.div
            style={{ width: "100%", height: "100%" }}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt ?? title}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      )}

      {/* Content */}
      <div style={{ padding: "1.5rem" }}>
        {/* Meta row */}
        <div
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            marginBottom:   "0.75rem",
          }}
        >
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {tags.map((tag) => (
              <Tag key={tag} label={tag} size="sm" color="neutral" />
            ))}
          </div>
          {year && (
            <span
              style={{
                fontFamily:    "var(--font-mono)",
                fontSize:      "0.7rem",
                color:         "var(--text-muted)",
                letterSpacing: "0.04em",
                flexShrink:    0,
              }}
            >
              {year}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily:    "var(--font-body)",
            fontSize:      "1.125rem",
            fontWeight:    600,
            letterSpacing: "-0.01em",
            lineHeight:    1.25,
            color:         "var(--text-primary)",
            margin:        "0 0 0.5rem",
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize:   "0.875rem",
            lineHeight: 1.6,
            color:      "var(--text-secondary)",
            margin:     0,
          }}
        >
          {description}
        </p>

        {/* Arrow */}
        <div
          style={{
            marginTop:  "1.25rem",
            display:    "flex",
            alignItems: "center",
            gap:        "0.375rem",
            fontFamily: "var(--font-body)",
            fontSize:   "0.8125rem",
            fontWeight: 500,
            color:      "var(--accent)",
          }}
        >
          View case study
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            style={{ display: "inline-block" }}
          >
            →
          </motion.span>
        </div>
      </div>
    </motion.a>
  );
}
