"use client";

import { motion } from "framer-motion";

export default function DSHero() {
  return (
    <section
      style={{
        borderBottom: "1px solid var(--border-default)",
        paddingTop:   "clamp(5rem, 10vw, 8rem)",
        paddingBottom: "clamp(3rem, 6vw, 5rem)",
      }}
      className="page-gutter"
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1,  y: 0  }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.75rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color:         "var(--text-muted)",
            marginBottom:  "1.5rem",
          }}
        >
          Neo Design System · v1.0
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1,  y: 0  }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily:    "var(--font-display)",
            fontSize:      "clamp(3rem, 6.5vw, 7rem)",
            fontWeight:    300,
            lineHeight:    1.0,
            letterSpacing: "-0.03em",
            color:         "var(--text-primary)",
            maxWidth:      "14ch",
            marginBottom:  "2rem",
          }}
        >
          Every decision,<br />documented.
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1,  y: 0  }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize:   "1.125rem",
            lineHeight: 1.65,
            color:      "var(--text-secondary)",
            maxWidth:   "52ch",
          }}
        >
          A 3-tier token architecture — primitives, semantics, and components —
          built for a bold, minimalistic portfolio. Every value is intentional.
          Nothing is ad hoc.
        </motion.p>
      </div>
    </section>
  );
}
