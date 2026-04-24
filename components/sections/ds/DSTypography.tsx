"use client";

import { motion } from "framer-motion";
import { semantic } from "@/lib/tokens";
import SectionLabel from "./SectionLabel";

type ScaleKey = keyof typeof semantic.typography.scale;

const scaleGroups: { label: string; keys: ScaleKey[] }[] = [
  { label: "Display",   keys: ["display2xl", "displayXl", "displayLg"] },
  { label: "Heading",   keys: ["headingXl", "headingLg", "headingMd", "headingSm"] },
  { label: "Body",      keys: ["bodyLg", "bodyMd", "bodySm"] },
  { label: "Label",     keys: ["labelLg", "labelMd", "labelSm"] },
  { label: "Mono",      keys: ["monoMd", "monoSm"] },
  { label: "Editorial", keys: ["quoteLg", "quoteMd"] },
];

const fontNames: Record<string, string> = {
  display: "Silk Serif",
  body:    "Satoshi",
  mono:    "Azeret Mono",
};

const sampleText: Partial<Record<ScaleKey, string>> = {
  display2xl: "Neo",
  displayXl:  "Bold. Considered.",
  displayLg:  "Senior Product Designer",
  headingXl:  "Design Systems at Scale",
  headingLg:  "Component Architecture",
  headingMd:  "Token Hierarchy",
  headingSm:  "Section label",
  bodyLg:     "Every decision documented — from raw primitives to living components.",
  bodyMd:     "Crafting interfaces that balance craft, clarity, and user intent.",
  bodySm:     "Hover states, micro-interactions, and details that reward attention.",
  labelLg:    "Product Design",
  labelMd:    "Case Study",
  labelSm:    "2024",
  monoMd:     "semantic.color.accent.default",
  monoSm:     "cubic-bezier(0.22, 1, 0.36, 1)",
  quoteLg:    "Design is the silent ambassador of your brand.",
  quoteMd:    "Great interfaces are invisible.",
};

export default function DSTypography() {
  return (
    <section
      style={{ borderBottom: "1px solid var(--border-default)", padding: "clamp(4rem,8vw,6rem) 0" }}
      className="page-gutter"
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <SectionLabel index="02" title="Typography" />

        {/* Typeface trio */}
        <h3 style={{
          fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 500,
          letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)",
          margin: "0 0 1.5rem",
        }}>
          Typefaces
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1px", backgroundColor: "var(--border-default)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", overflow: "hidden", marginBottom: "4rem" }}>
          {(["display", "body", "mono"] as const).map((role) => (
            <div
              key={role}
              style={{
                padding: "2rem",
                backgroundColor: "var(--bg-surface)",
              }}
            >
              <p style={{
                fontFamily: "var(--font-mono)", fontSize: "0.6875rem", letterSpacing: "0.08em",
                textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 1rem",
              }}>
                {role}
              </p>
              <p style={{
                fontFamily: semantic.typography.font[role],
                fontSize: "2.25rem",
                fontWeight: role === "display" ? 300 : role === "mono" ? 400 : 500,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "var(--text-primary)",
                margin: "0 0 0.75rem",
              }}>
                Aa
              </p>
              <p style={{
                fontFamily: "var(--font-mono)", fontSize: "0.75rem",
                color: "var(--text-muted)", margin: 0,
              }}>
                {fontNames[role]}
              </p>
            </div>
          ))}
        </div>

        {/* Type scale */}
        <h3 style={{
          fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 500,
          letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)",
          margin: "0 0 1.5rem",
        }}>
          Type Scale
        </h3>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {scaleGroups.map((group, gi) => (
            <div key={group.label} style={{ marginBottom: "2.5rem" }}>
              <p style={{
                fontFamily: "var(--font-mono)", fontSize: "0.6875rem", letterSpacing: "0.08em",
                textTransform: "uppercase", color: "var(--text-muted)",
                margin: "0 0 1rem", borderBottom: "1px solid var(--border-default)",
                paddingBottom: "0.5rem",
              }}>
                {group.label}
              </p>

              {group.keys.map((key, ki) => {
                const scale = semantic.typography.scale[key];
                const fontVar = scale.font === "display" ? "var(--font-display)"
                              : scale.font === "mono"    ? "var(--font-mono)"
                              :                            "var(--font-body)";
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.45, delay: ki * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      display:       "grid",
                      gridTemplateColumns: "140px 1fr",
                      alignItems:    "baseline",
                      gap:           "1.5rem",
                      padding:       "0.875rem 0",
                      borderBottom:  "1px solid var(--border-default)",
                    }}
                  >
                    {/* Meta */}
                    <div>
                      <p style={{
                        fontFamily: "var(--font-mono)", fontSize: "0.6875rem",
                        color: "var(--text-secondary)", margin: 0, letterSpacing: "0.02em",
                      }}>
                        {key}
                      </p>
                      <p style={{
                        fontFamily: "var(--font-mono)", fontSize: "0.6rem",
                        color: "var(--text-muted)", margin: "0.25rem 0 0",
                        letterSpacing: "0.02em",
                      }}>
                        w{scale.weight} · lh{scale.leading}
                      </p>
                    </div>

                    {/* Live text */}
                    <p style={{
                      fontFamily:    fontVar,
                      fontSize:      scale.size,
                      fontWeight:    scale.weight,
                      lineHeight:    scale.leading,
                      letterSpacing: scale.tracking,
                      color:         "var(--text-primary)",
                      margin:        0,
                      overflow:      "hidden",
                      textOverflow:  "ellipsis",
                      whiteSpace:    "nowrap",
                    }}>
                      {sampleText[key] ?? key}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
