"use client";

import { motion } from "framer-motion";

interface WorkHeroProps {
  totalCount: number;
}

export default function WorkHero({ totalCount }: WorkHeroProps) {
  return (
    <div
      style={{
        paddingTop:    "clamp(4rem, 8vw, 6rem)",
        paddingBottom: "clamp(3rem, 6vw, 4rem)",
        borderBottom:  "1px solid var(--border-default)",
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
        style={{
          fontFamily:    "var(--font-mono)",
          fontSize:      "0.75rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color:         "var(--text-muted)",
          marginBottom:  "1.5rem",
        }}
      >
        Work &mdash; {totalCount} {totalCount === 1 ? "case study" : "case studies"}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.06, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
        style={{
          fontFamily:    "var(--font-display)",
          fontSize:      "clamp(3rem, 7vw, 7rem)",
          fontWeight:    300,
          lineHeight:    1.0,
          letterSpacing: "-0.03em",
          color:         "var(--text-primary)",
          margin:        "0 0 1.5rem",
        }}
      >
        Three ways I <em>work.</em>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.14, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
        style={{
          fontFamily: "var(--font-body)",
          fontSize:   "1.0625rem",
          lineHeight: 1.7,
          color:      "var(--text-secondary)",
          margin:     0,
          maxWidth:   "52ch",
        }}
      >
        Selected case studies in design systems, product design, and prototyping — craft at every level of fidelity.
      </motion.p>
    </div>
  );
}
