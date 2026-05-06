"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

// ── Typewriter ──────────────────────────────────────────────────────────────

const PHRASES = [
  "scalable systems.",
  "AI-native products.",
  "lasting foundations.",
  "design clarity.",
];

type TypingPhase = "typing" | "holding" | "deleting";

function TypewriterText() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx,   setCharIdx]   = useState(0);
  const [phase,     setPhase]     = useState<TypingPhase>("typing");

  useEffect(() => {
    const phrase = PHRASES[phraseIdx];

    if (phase === "typing") {
      if (charIdx < phrase.length) {
        const t = setTimeout(
          () => setCharIdx((c) => c + 1),
          55 + Math.random() * 30,
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("deleting"), 2200);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (charIdx > 0) {
        const t = setTimeout(() => setCharIdx((c) => c - 1), 32);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => {
        setPhraseIdx((i) => (i + 1) % PHRASES.length);
        setPhase("typing");
      }, 180);
      return () => clearTimeout(t);
    }
  }, [charIdx, phase, phraseIdx]);

  const display = PHRASES[phraseIdx].slice(0, charIdx);

  return (
    <span style={{ color: "var(--accent)", whiteSpace: "nowrap" }}>
      {display}
      {/* blinking cursor */}
      <motion.span
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 1, repeat: Infinity, times: [0, 0.45, 0.5, 0.95] }}
        aria-hidden
        style={{
          display:         "inline-block",
          width:           "3px",
          height:          "0.85em",
          backgroundColor: "var(--accent)",
          borderRadius:    "1px",
          marginLeft:      "4px",
          verticalAlign:   "middle",
          transform:       "translateY(-5%)",
        }}
      />
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

        {/* Headline — two lines, second has typewriter */}
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
          into{" "}
          <TypewriterText />
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
  );
}
