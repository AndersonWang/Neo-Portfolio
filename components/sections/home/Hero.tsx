"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import MatrixDrop from "@/components/ui/MatrixDrop";

// ── Rotating text ───────────────────────────────────────────────────────────

const PHRASES = [
  "scalable solutions.",
  "AI-native products.",
  "lasting foundations.",
  "design clarity.",
];

function RotatingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % PHRASES.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    // Clip the slide-in/out motion — height = 1 line, overflow hidden
    <span
      style={{
        display:       "inline-block",
        overflow:      "hidden",
        verticalAlign: "bottom",
        // Extra bottom room so descenders aren't clipped
        paddingBottom: "0.08em",
        marginBottom:  "-0.08em",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          initial={{ y: "105%" }}
          animate={{ y: 0 }}
          exit={{    y: "-105%" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-block", color: "var(--accent)" }}
        >
          {PHRASES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ── Stagger variants ────────────────────────────────────────────────────────

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

// ── Hero ────────────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <div
      className="dark"
      style={{
        position:        "relative",
        overflow:        "hidden",
        backgroundColor: "#0D0208",
        borderBottom:    "1px solid var(--border-default)",
      }}
    >
      {/* Matrix rain background */}
      <MatrixDrop
        backgroundColor="#0D0208"
        canvasOpacity={0.75}
        minSpeed={1.2}
        maxSpeed={2.8}
        minStreamLength={10}
        maxStreamLength={28}
      />

      {/* Left-side legibility gradient */}
      <div
        aria-hidden
        style={{
          position:        "absolute",
          inset:           0,
          background:      "linear-gradient(to right, rgba(13,2,8,0.82) 0%, rgba(13,2,8,0.55) 55%, rgba(13,2,8,0.18) 100%)",
          zIndex:          1,
          pointerEvents:   "none",
        }}
      />

      <section
        className="page-gutter"
        style={{
          position:      "relative",
          zIndex:        2,
          paddingTop:    "clamp(5rem, 12vw, 9rem)",
          paddingBottom: "clamp(5rem, 10vw, 8rem)",
          maxWidth:      "1280px",
          margin:        "0 auto",
          width:         "100%",
        }}
      >
      <motion.div variants={container} initial="hidden" animate="show">

        {/* Availability badge */}
        <motion.div variants={item} style={{ marginBottom: "2.5rem" }}>
          <span style={{
            display:       "inline-flex",
            alignItems:    "center",
            gap:           "0.5rem",
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.75rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color:         "var(--text-muted)",
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
            fontSize:      "clamp(3rem, 7.5vw, 7.5rem)",
            fontWeight:    300,
            lineHeight:    1.0,
            letterSpacing: "-0.03em",
            color:         "var(--text-primary)",
            margin:        "0 0 2.25rem",
          }}
        >
          I distill complexity
          <br />
          into{" "}<RotatingText />
        </motion.h1>

        {/* Subtext + CTA */}
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
            maxWidth:   "48ch",
            margin:     0,
          }}>
            Strategic product designer with 10 years building at scale — architecting
            design systems, leading complex product transformations, and laying the
            foundational frameworks that let teams ship with confidence in the AI era.
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
    </div>
  );
}
