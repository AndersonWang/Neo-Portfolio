"use client";

import { motion } from "framer-motion";
import { primitive, paletteOrder, type BrandColor } from "@/lib/tokens";
import SectionLabel from "./SectionLabel";

// Brand palette shades to display per color
const shades = [200, 400, 500, 700] as const;

// Dark mode companion for amethyst
const amethystDark = primitive.color.amethyst.dark;

// Neutral shades to show
const neutralShades = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

function Swatch({
  color,
  label,
  small,
  index,
}: {
  color: string;
  label: string;
  small?: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
    >
      <div
        style={{
          width:        "100%",
          height:       small ? "40px" : "64px",
          borderRadius: "var(--radius-md)",
          backgroundColor: color,
          border:       "1px solid var(--border-default)",
        }}
      />
      <div>
        <p style={{
          fontFamily:    "var(--font-mono)",
          fontSize:      "0.6875rem",
          color:         "var(--text-secondary)",
          letterSpacing: "0.02em",
          margin:        0,
        }}>
          {label}
        </p>
        <p style={{
          fontFamily:    "var(--font-mono)",
          fontSize:      "0.625rem",
          color:         "var(--text-muted)",
          letterSpacing: "0.01em",
          margin:        "0.125rem 0 0",
        }}>
          {color}
        </p>
      </div>
    </motion.div>
  );
}

export default function DSColors() {
  return (
    <section style={{ borderBottom: "1px solid var(--border-default)", padding: "clamp(4rem,8vw,6rem) 0" }} className="page-gutter">
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <SectionLabel index="02" title="Color" />

        {/* Brand palette */}
        <h3 style={{
          fontFamily:    "var(--font-body)",
          fontSize:      "0.875rem",
          fontWeight:    500,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color:         "var(--text-muted)",
          margin:        "0 0 1.5rem",
        }}>
          Brand Palette
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", marginBottom: "4rem" }}>
          {paletteOrder.map((colorName, ci) => {
            const palette = primitive.color[colorName as BrandColor];
            return (
              <div key={colorName}>
                <p style={{
                  fontFamily:    "var(--font-body)",
                  fontSize:      "0.8125rem",
                  fontWeight:    500,
                  color:         "var(--text-secondary)",
                  textTransform: "capitalize",
                  margin:        "0 0 0.75rem",
                  letterSpacing: "0.02em",
                }}>
                  {colorName}
                </p>
                <div style={{
                  display:             "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
                  gap:                 "0.75rem",
                }}>
                  {shades.map((shade, si) => (
                    <Swatch
                      key={shade}
                      color={(palette as Record<number, string>)[shade]}
                      label={`${colorName}-${shade}`}
                      index={ci * 4 + si}
                    />
                  ))}
                  {colorName === "amethyst" && (
                    <Swatch
                      color={amethystDark}
                      label="amethyst-dark"
                      index={ci * 4 + 4}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Neutral palette */}
        <h3 style={{
          fontFamily:    "var(--font-body)",
          fontSize:      "0.875rem",
          fontWeight:    500,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color:         "var(--text-muted)",
          margin:        "0 0 1.5rem",
        }}>
          Neutral Palette
        </h3>

        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))",
          gap:                 "0.75rem",
        }}>
          {neutralShades.map((shade, i) => (
            <Swatch
              key={shade}
              color={(primitive.color.neutral as Record<number, string>)[shade]}
              label={`neutral-${shade}`}
              small
              index={i}
            />
          ))}
        </div>

        {/* Semantic intent row */}
        <h3 style={{
          fontFamily:    "var(--font-body)",
          fontSize:      "0.875rem",
          fontWeight:    500,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color:         "var(--text-muted)",
          margin:        "3rem 0 1.5rem",
        }}>
          Semantic — Light Mode
        </h3>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "1rem",
        }}>
          {[
            { label: "bg-page",    value: "var(--bg-page)"    },
            { label: "bg-surface", value: "var(--bg-surface)" },
            { label: "bg-raised",  value: "var(--bg-raised)"  },
            { label: "accent",     value: "var(--accent)"     },
            { label: "text-primary",   value: "var(--text-primary)"   },
            { label: "text-secondary", value: "var(--text-secondary)" },
            { label: "text-muted",     value: "var(--text-muted)"     },
            { label: "status-error",   value: "var(--status-error)"   },
            { label: "status-success", value: "var(--status-success)" },
            { label: "status-warning", value: "var(--status-warning)" },
            { label: "status-info",    value: "var(--status-info)"    },
          ].map(({ label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display:         "flex",
                alignItems:      "center",
                gap:             "0.75rem",
                padding:         "0.625rem 0.75rem",
                borderRadius:    "var(--radius-md)",
                border:          "1px solid var(--border-default)",
                backgroundColor: "var(--bg-surface)",
              }}
            >
              <div style={{
                width:           "28px",
                height:          "28px",
                borderRadius:    "var(--radius-sm)",
                backgroundColor: value,
                border:          "1px solid var(--border-default)",
                flexShrink:      0,
              }} />
              <span style={{
                fontFamily:    "var(--font-mono)",
                fontSize:      "0.6875rem",
                color:         "var(--text-secondary)",
                letterSpacing: "0.02em",
              }}>
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
