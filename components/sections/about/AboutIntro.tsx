"use client";

import { motion } from "framer-motion";

export default function AboutIntro() {
  return (
    <section
      className="page-gutter"
      style={{
        paddingTop:    "clamp(6rem, 12vw, 9rem)",
        paddingBottom: "clamp(4rem, 8vw, 6rem)",
        borderBottom:  "1px solid var(--border-default)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
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
          About
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily:    "var(--font-display)",
            fontSize:      "clamp(2.75rem, 7vw, 6rem)",
            fontWeight:    300,
            lineHeight:    1.0,
            letterSpacing: "-0.03em",
            color:         "var(--text-primary)",
            margin:        "0 0 clamp(2.5rem, 5vw, 4rem)",
            maxWidth:      "18ch",
          }}
        >
          What&apos;s behind<br />
          <em style={{ fontStyle: "italic" }}>the next peak?</em>
        </motion.h1>

        {/* Two-column layout: body text left, pull quote right */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
          gap:                 "clamp(3rem, 6vw, 6rem)",
          alignItems:          "start",
        }}>

          {/* Body paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize:   "1.0625rem",
              lineHeight: 1.75,
              color:      "var(--text-secondary)",
              margin:     "0 0 1.25rem",
              maxWidth:   "58ch",
            }}>
              I&apos;ve been taking things apart since I was a kid — some of them made it back
              together, most didn&apos;t. That curiosity about how things work, and <em>why</em> they
              work, became the through-line of everything I do.
            </p>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize:   "1.0625rem",
              lineHeight: 1.75,
              color:      "var(--text-secondary)",
              margin:     0,
              maxWidth:   "58ch",
            }}>
              Outside of screens, you&apos;ll find me in the mountains. The descent, the adrenaline,
              the negotiation between speed and control — it&apos;s the same problem-solving instinct
              in a different medium. Running came later; I picked it up as a way to quiet a busy
              mind. Two inputs only: breath and stride.
            </p>
          </motion.div>

          {/* Pull quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              margin:      0,
              padding:     "0 0 0 1.5rem",
              borderLeft:  "3px solid var(--border-accent)",
            }}
          >
            <p style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(1.25rem, 2.5vw, 1.75rem)",
              fontWeight:    300,
              fontStyle:     "italic",
              lineHeight:    1.45,
              letterSpacing: "-0.01em",
              color:         "var(--text-primary)",
              margin:        "0 0 1rem",
            }}>
              &ldquo;Technologies evolve at lightning speed, but the human heart remains
              constant.&rdquo;
            </p>
            <p style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      "0.6875rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color:         "var(--text-muted)",
              margin:        0,
            }}>
              Anderson Wang
            </p>
          </motion.blockquote>

        </div>
      </div>
    </section>
  );
}
