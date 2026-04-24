"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CSSProperties } from "react";

type Variant = "primary" | "ghost" | "text";
type Size    = "sm" | "md" | "lg";

interface ButtonProps {
  variant?:  Variant;
  size?:     Size;
  href?:     string;
  external?: boolean;
  disabled?: boolean;
  onClick?:  () => void;
  children:  React.ReactNode;
  style?:    CSSProperties;
  className?: string;
}

const sizeMap: Record<Size, CSSProperties> = {
  sm: { height: "36px", padding: "0 1rem",   fontSize: "0.75rem",  letterSpacing: "0.06em" },
  md: { height: "44px", padding: "0 1.5rem", fontSize: "0.875rem", letterSpacing: "0.04em" },
  lg: { height: "52px", padding: "0 2rem",   fontSize: "1rem",     letterSpacing: "0.03em" },
};

const variantStyles: Record<Variant, CSSProperties> = {
  primary: {
    backgroundColor: "var(--accent)",
    color:           "var(--accent-on)",
    border:          "1px solid transparent",
  },
  ghost: {
    backgroundColor: "transparent",
    color:           "var(--text-primary)",
    border:          "1px solid var(--border-strong)",
  },
  text: {
    backgroundColor: "transparent",
    color:           "var(--accent)",
    border:          "none",
    padding:         "0",
    height:          "auto",
  },
};

const hoverStyles: Record<Variant, CSSProperties> = {
  primary: { backgroundColor: "var(--accent-hover)" },
  ghost:   { borderColor: "var(--text-primary)", backgroundColor: "var(--bg-raised)" },
  text:    { opacity: 0.7 },
};

export default function Button({
  variant  = "primary",
  size     = "md",
  href,
  external = false,
  disabled = false,
  onClick,
  children,
  style,
  className,
}: ButtonProps) {
  const baseStyle: CSSProperties = {
    display:        "inline-flex",
    alignItems:     "center",
    justifyContent: "center",
    gap:            "0.5rem",
    borderRadius:   "var(--radius-full)",
    fontFamily:     "var(--font-body)",
    fontWeight:     500,
    cursor:         disabled ? "not-allowed" : "pointer",
    opacity:        disabled ? 0.45 : 1,
    textDecoration: "none",
    whiteSpace:     "nowrap",
    transition:     "background-color 150ms ease, border-color 150ms ease, opacity 150ms ease",
    ...sizeMap[variant === "text" ? "md" : size],
    ...variantStyles[variant],
    ...style,
  };

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.02, ...hoverStyles[variant] },
    whileTap:   disabled ? {} : { scale: 0.97 },
    transition: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  };

  if (href) {
    const linkProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <motion.a
        href={href}
        style={baseStyle}
        className={className}
        {...motionProps}
        {...linkProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      style={baseStyle}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
