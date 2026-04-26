"use client";

import { motion } from "framer-motion";
import { semantic } from "@/lib/tokens";
import SectionLabel from "./SectionLabel";

type RadiusKey = keyof typeof semantic.radius;
type ShadowKey = keyof typeof semantic.shadow;

const radiusEntries = Object.entries(semantic.radius) as [RadiusKey, string][];
const shadowEntries = (["sm","md","lg","xl","glow"] as ShadowKey[]).map(
  (k) => [k, semantic.shadow[k]] as [ShadowKey, string]
);

export default function DSEffects() {
  return (
    <section
      style={{ padding: "clamp(4rem,8vw,6rem) 0" }}
      className="page-gutter"
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <SectionLabel index="06" title="Effects" />

        {/* ── Border Radius ── */}
        <h3 style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 1.5rem" }}>
          Border Radius
        </h3>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginBottom: "4rem", alignItems: "flex-end" }}>
          {radiusEntries.map(([name, value], i) => {
            const size = Math.min(24 + i * 10, 80);
            return (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}
              >
                <div style={{
                  width:           `${size}px`,
                  height:          `${size}px`,
                  borderRadius:    value,
                  backgroundColor: "var(--accent-subtle)",
                  border:          "1.5px solid var(--accent)",
                }} />
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--text-secondary)", margin: 0 }}>{name}</p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-muted)", margin: "0.125rem 0 0" }}>{value}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Shadows ── */}
        <h3 style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 1.5rem" }}>
          Shadow Scale
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "2rem", marginBottom: "4rem" }}>
          {shadowEntries.map(([name, value], i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem" }}
            >
              <div style={{
                width:           "100%",
                height:          "80px",
                borderRadius:    "var(--radius-lg)",
                backgroundColor: "var(--bg-surface)",
                boxShadow:       value,
                border:          "1px solid var(--border-default)",
              }} />
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-secondary)", margin: 0 }}>
                shadow-{name}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Blur ── */}
        <h3 style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 1.5rem" }}>
          Blur Values
        </h3>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {Object.entries(semantic.blur).map(([name, value], i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              style={{
                padding:         "0.75rem 1.25rem",
                borderRadius:    "var(--radius-md)",
                border:          "1px solid var(--border-default)",
                backgroundColor: "var(--bg-surface)",
                display:         "flex",
                alignItems:      "center",
                gap:             "0.75rem",
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-secondary)" }}>blur-{name}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)" }}>{value}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
