"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight, CircleDot, Layers, PenLine,
  Mail, GitFork, Component, Play,
} from "lucide-react";
import { brand } from "@/lib/tokens";
import SectionLabel from "./SectionLabel";

const icons = [
  { Icon: ArrowUpRight, name: "arrow-up-right" },
  { Icon: CircleDot,    name: "circle-dot"     },
  { Icon: Layers,       name: "layers"          },
  { Icon: PenLine,      name: "pen-line"        },
  { Icon: Mail,         name: "mail"            },
  { Icon: GitFork,      name: "git-fork"        },
  { Icon: Component,    name: "component"       },
  { Icon: Play,         name: "play"            },
];

const subhead = (label: string, mt = "0") => ({
  fontFamily:    "var(--font-body)" as const,
  fontSize:      "0.875rem",
  fontWeight:    500,
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
  color:         "var(--text-muted)",
  margin:        `${mt} 0 1.5rem`,
});

export default function DSBrand() {
  return (
    <section
      style={{ borderBottom: "1px solid var(--border-default)", padding: "clamp(4rem,8vw,6rem) 0" }}
      className="page-gutter"
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <SectionLabel index="01" title="Brand" />

        {/* ── Wordmark ── */}
        <h3 style={subhead("Wordmark")}>Wordmark</h3>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            padding:         "3rem 2rem",
            border:          "1px solid var(--border-default)",
            borderRadius:    "var(--radius-lg)",
            backgroundColor: "var(--bg-surface)",
            display:         "flex",
            flexDirection:   "column",
            alignItems:      "center",
            gap:             "1rem",
            marginBottom:    "4rem",
          }}
        >
          <p style={{
            fontFamily:    "var(--font-display)",
            fontSize:      "clamp(2.5rem, 7vw, 5.5rem)",
            fontWeight:    900,
            letterSpacing: "-0.045em",
            lineHeight:    1,
            color:         "var(--text-primary)",
            margin:        0,
          }}>
            {brand.wordmark.name}
            <em style={{ fontStyle: "italic", fontWeight: 700 }}>
              {brand.wordmark.italic}
            </em>
            <span style={{ color: "var(--accent)" }}>{brand.wordmark.dot}</span>
          </p>
          <p style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.6875rem",
            letterSpacing: "0.2em",
            color:         "var(--text-muted)",
            textTransform: "uppercase",
            margin:        0,
          }}>
            {brand.wordmark.tagline}
          </p>
        </motion.div>

        {/* ── Monogram ── */}
        <h3 style={subhead("Monogram")}>Monogram</h3>

        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginBottom: "4rem" }}>
          {brand.monogram.colorways.map(({ label, bg, fg, border }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}
            >
              <div style={{
                width:           "120px",
                height:          "120px",
                borderRadius:    "var(--radius-lg)",
                backgroundColor: bg,
                border:          border ? `1.5px solid ${fg}` : "1px solid var(--border-default)",
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "center",
                fontFamily:      "var(--font-display)",
                fontSize:        "2.5rem",
                fontWeight:      900,
                letterSpacing:   "-0.04em",
                color:           fg,
              }}>
                {brand.monogram.mark}
              </div>
              <span style={{
                fontFamily:    "var(--font-mono)",
                fontSize:      "0.6875rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color:         "var(--text-muted)",
              }}>
                {label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* ── Voice ── */}
        <h3 style={subhead("Voice", "0")}>
          Voice — {brand.voice.principles.join(", ")}
        </h3>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            border:       "1px solid var(--border-default)",
            borderRadius: "var(--radius-lg)",
            overflow:     "hidden",
            marginBottom: "4rem",
          }}
        >
          {brand.voice.yes.map((text, i) => (
            <div key={`yes-${i}`} style={{
              display:             "grid",
              gridTemplateColumns: "56px 1fr",
              gap:                 "1rem",
              alignItems:          "baseline",
              padding:             "0.875rem 1.25rem",
              borderBottom:        "1px solid var(--border-default)",
              backgroundColor:     "var(--bg-surface)",
            }}>
              <span style={{
                fontFamily:    "var(--font-mono)",
                fontSize:      "0.625rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color:         "var(--accent)",
              }}>
                Yes
              </span>
              <span style={{ fontSize: "1rem", color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
                {text}
              </span>
            </div>
          ))}
          {brand.voice.no.map((text, i) => (
            <div key={`no-${i}`} style={{
              display:             "grid",
              gridTemplateColumns: "56px 1fr",
              gap:                 "1rem",
              alignItems:          "baseline",
              padding:             "0.875rem 1.25rem",
              borderBottom:        i < brand.voice.no.length - 1 ? "1px solid var(--border-default)" : "none",
              backgroundColor:     "var(--bg-surface)",
            }}>
              <span style={{
                fontFamily:    "var(--font-mono)",
                fontSize:      "0.625rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color:         "var(--text-muted)",
              }}>
                No
              </span>
              <span style={{
                fontSize:            "1rem",
                color:               "var(--text-muted)",
                letterSpacing:       "-0.01em",
                textDecoration:      "line-through",
                textDecorationColor: "var(--accent)",
              }}>
                {text}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ── Icons ── */}
        <h3 style={subhead("Icons", "0")}>
          Iconography — Lucide, stroke-width {brand.icons.strokeWidth}
        </h3>

        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(88px, 1fr))",
          gap:                 "1rem",
        }}>
          {icons.map(({ Icon, name }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display:         "flex",
                flexDirection:   "column",
                alignItems:      "center",
                gap:             "0.625rem",
                padding:         "1.25rem 0.5rem",
                borderRadius:    "var(--radius-md)",
                border:          "1px solid var(--border-default)",
                backgroundColor: "var(--bg-surface)",
              }}
            >
              <Icon size={20} strokeWidth={brand.icons.strokeWidth} color="var(--text-primary)" />
              <span style={{
                fontFamily:    "var(--font-mono)",
                fontSize:      "0.5625rem",
                letterSpacing: "0.04em",
                color:         "var(--text-muted)",
                textAlign:     "center",
                lineHeight:    1.4,
              }}>
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
