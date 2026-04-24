"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

// Staggered children helper
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

// Fallback: if JS hasn't hydrated, show content immediately via CSS
const noJSStyle = { opacity: 1 };

export default function Hero() {
  return (
    <section
      className="page-gutter"
      style={{
        paddingTop:    "clamp(5rem, 12vw, 9rem)",
        paddingBottom: "clamp(5rem, 10vw, 8rem)",
        borderBottom:  "1px solid var(--border-default)",
        maxWidth:      "1280px",
        margin:        "0 auto",
        width:         "100%",
      }}
    >
      <motion.div variants={container} initial="hidden" animate="show">

        {/* Availability badge */}
        <motion.div variants={item} style={{ marginBottom: "2.5rem" }}>
          <span style={{
            display:         "inline-flex",
            alignItems:      "center",
            gap:             "0.5rem",
            fontFamily:      "var(--font-mono)",
            fontSize:        "0.75rem",
            letterSpacing:   "0.06em",
            textTransform:   "uppercase",
            color:           "var(--text-muted)",
          }}>
            <span style={{
              width:           "6px",
              height:          "6px",
              borderRadius:    "9999px",
              backgroundColor: "var(--status-success)",
              display:         "inline-block",
            }} />
            Available for new projects
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          style={{
            fontFamily:    "var(--font-display)",
            fontSize:      "clamp(3.5rem, 8vw, 8rem)",
            fontWeight:    300,
            lineHeight:    0.95,
            letterSpacing: "-0.03em",
            color:         "var(--text-primary)",
            margin:        "0 0 2rem",
            maxWidth:      "16ch",
          }}
        >
          Designing products that think clearly.
        </motion.h1>

        {/* Subtext + CTA row */}
        <motion.div
          variants={item}
          style={{
            display:    "flex",
            flexWrap:   "wrap",
            alignItems: "flex-end",
            gap:        "3rem",
            rowGap:     "2rem",
          }}
        >
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize:   "1.125rem",
            lineHeight: 1.65,
            color:      "var(--text-secondary)",
            maxWidth:   "44ch",
            margin:     0,
          }}>
            Senior Product Designer with a focus on design systems, interaction craft,
            and the details that make software feel inevitable.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexShrink: 0 }}>
            <Button href="/work" variant="primary" size="lg">View Work</Button>
            <Button href="/contact" variant="ghost" size="lg">Get in touch</Button>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          variants={item}
          style={{
            marginTop:  "5rem",
            display:    "flex",
            alignItems: "center",
            gap:        "0.75rem",
          }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width:           "1px",
              height:          "40px",
              backgroundColor: "var(--border-strong)",
              transformOrigin: "top",
            }}
          />
          <span style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.6875rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color:         "var(--text-muted)",
          }}>
            Scroll
          </span>
        </motion.div>

      </motion.div>
    </section>
  );
}
