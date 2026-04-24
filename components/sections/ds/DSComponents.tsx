"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Tag, { type TagColor } from "@/components/ui/Tag";
import SectionLabel from "./SectionLabel";

const tagColors: TagColor[] = ["amethyst", "lilac", "rose", "gold", "peridot", "neutral"];

export default function DSComponents() {
  return (
    <section
      style={{ borderBottom: "1px solid var(--border-default)", padding: "clamp(4rem,8vw,6rem) 0" }}
      className="page-gutter"
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <SectionLabel index="04" title="Components" />

        {/* ── Buttons ── */}
        <h3 style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 1.5rem" }}>
          Button
        </h3>

        <div style={{
          padding:         "2.5rem",
          borderRadius:    "var(--radius-xl)",
          border:          "1px solid var(--border-default)",
          backgroundColor: "var(--bg-surface)",
          marginBottom:    "3rem",
        }}>
          {/* Variants */}
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 1.25rem" }}>Variants</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
            <Button variant="primary">Primary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="text">Text →</Button>
          </div>

          {/* Sizes */}
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 1.25rem" }}>Sizes</p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>

          {/* States */}
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 1.25rem" }}>States</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <Button variant="primary">Default</Button>
            <Button variant="primary" disabled>Disabled</Button>
            <Button variant="ghost" disabled>Disabled</Button>
          </div>
        </div>

        {/* ── Tags ── */}
        <h3 style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 1.5rem" }}>
          Tag
        </h3>

        <div style={{
          padding:         "2.5rem",
          borderRadius:    "var(--radius-xl)",
          border:          "1px solid var(--border-default)",
          backgroundColor: "var(--bg-surface)",
          marginBottom:    "3rem",
        }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 1.25rem" }}>Brand Colors · md</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.5rem" }}>
            {tagColors.map((c) => (
              <Tag key={c} label={c} color={c} size="md" />
            ))}
          </div>

          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 1.25rem" }}>Brand Colors · sm</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {tagColors.map((c) => (
              <Tag key={c} label={c} color={c} size="sm" />
            ))}
          </div>
        </div>

        {/* ── Card preview ── */}
        <h3 style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 1.5rem" }}>
          Card
        </h3>

        <div style={{ maxWidth: "400px" }}>
          {/* Inline demo card — avoids circular import with Card component */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            whileHover={{ boxShadow: "var(--shadow-lg)", borderColor: "var(--border-strong)" }}
            style={{
              borderRadius:    "var(--radius-xl)",
              border:          "1px solid var(--border-default)",
              backgroundColor: "var(--bg-surface)",
              overflow:        "hidden",
            }}
          >
            {/* Placeholder image */}
            <div style={{
              width: "100%", aspectRatio: "16/9",
              background: "linear-gradient(135deg, var(--accent-subtle) 0%, var(--bg-raised) 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-muted)" }}>project thumbnail</span>
            </div>
            <div style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <Tag label="UX Design" size="sm" />
                <Tag label="Design System" size="sm" color="amethyst" />
              </div>
              <h3 style={{ fontFamily: "var(--font-body)", fontSize: "1.125rem", fontWeight: 600, letterSpacing: "-0.01em", color: "var(--text-primary)", margin: "0 0 0.5rem" }}>
                Neo Design System
              </h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", lineHeight: 1.6, color: "var(--text-secondary)", margin: 0 }}>
                A scalable 3-tier token architecture for a bold, minimalistic portfolio.
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", fontWeight: 500, color: "var(--accent)", margin: "1.25rem 0 0" }}>
                View case study →
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
