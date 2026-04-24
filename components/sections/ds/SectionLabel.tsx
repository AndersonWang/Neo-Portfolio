"use client";

import { motion } from "framer-motion";

interface SectionLabelProps {
  index: string;
  title: string;
}

export default function SectionLabel({ index, title }: SectionLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display:       "flex",
        alignItems:    "baseline",
        gap:           "1rem",
        marginBottom:  "2.5rem",
        paddingBottom: "1rem",
        borderBottom:  "1px solid var(--border-default)",
      }}
    >
      <span style={{
        fontFamily:    "var(--font-mono)",
        fontSize:      "0.75rem",
        color:         "var(--text-muted)",
        letterSpacing: "0.06em",
      }}>
        {index}
      </span>
      <h2 style={{
        fontFamily:    "var(--font-display)",
        fontSize:      "clamp(2rem, 4vw, 3.5rem)",
        fontWeight:    300,
        letterSpacing: "-0.025em",
        lineHeight:    1.05,
        color:         "var(--text-primary)",
        margin:        0,
      }}>
        {title}
      </h2>
    </motion.div>
  );
}
