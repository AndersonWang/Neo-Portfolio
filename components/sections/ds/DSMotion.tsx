"use client";

import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { semantic } from "@/lib/tokens";
import SectionLabel from "./SectionLabel";

type EasingKey = keyof typeof semantic.motion.easing;
type DurationKey = keyof typeof semantic.motion.duration;

const easings = Object.entries(semantic.motion.easing) as [EasingKey, string][];
const durations = Object.entries(semantic.motion.duration) as [DurationKey, string][];

function EasingDemo({ name, curve }: { name: string; curve: string }) {
  const controls = useAnimation();
  const [running, setRunning] = useState(false);

  async function play() {
    if (running) return;
    setRunning(true);
    await controls.start({ x: 180, transition: { duration: 0.7, ease: curve as never } });
    await controls.start({ x: 0,   transition: { duration: 0.05, ease: "linear" as const } });
    setRunning(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      onClick={play}
      style={{
        padding:         "1.25rem 1.5rem",
        borderRadius:    "var(--radius-lg)",
        border:          "1px solid var(--border-default)",
        backgroundColor: "var(--bg-surface)",
        cursor:          "pointer",
        userSelect:      "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1rem" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-secondary)", margin: 0, letterSpacing: "0.02em" }}>
          {name}
        </p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--text-muted)", margin: 0 }}>
          tap to preview
        </p>
      </div>

      {/* Track */}
      <div style={{ position: "relative", height: "32px", backgroundColor: "var(--bg-raised)", borderRadius: "var(--radius-full)", overflow: "hidden", padding: "4px" }}>
        <motion.div
          animate={controls}
          style={{
            width:           "24px",
            height:          "24px",
            borderRadius:    "var(--radius-full)",
            backgroundColor: "var(--accent)",
          }}
        />
      </div>

      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--text-muted)", margin: "0.625rem 0 0", letterSpacing: "0.01em" }}>
        {curve}
      </p>
    </motion.div>
  );
}

export default function DSMotion() {
  return (
    <section
      style={{ borderBottom: "1px solid var(--border-default)", padding: "clamp(4rem,8vw,6rem) 0" }}
      className="page-gutter"
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <SectionLabel index="04" title="Motion" />

        {/* Easing curves */}
        <h3 style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 1.5rem" }}>
          Easing Curves — tap to preview
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem", marginBottom: "4rem" }}>
          {easings.map(([name, curve]) => (
            <EasingDemo key={name} name={name} curve={curve} />
          ))}
        </div>

        {/* Durations */}
        <h3 style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 1.5rem" }}>
          Duration Scale
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {durations.map(([name, value], i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              style={{
                display:       "grid",
                gridTemplateColumns: "100px 80px 1fr",
                alignItems:    "center",
                gap:           "1.5rem",
                padding:       "0.875rem 0",
                borderBottom:  "1px solid var(--border-default)",
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-secondary)" }}>{name}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)" }}>{value}</span>
              {/* Visual duration bar */}
              <div style={{ height: "2px", backgroundColor: "var(--border-default)", borderRadius: "9999px", overflow: "hidden" }}>
                <div style={{
                  height:          "100%",
                  backgroundColor: "var(--accent)",
                  width:           `${Math.min((parseInt(value) / 1200) * 100, 100)}%`,
                  borderRadius:    "9999px",
                }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stagger note */}
        <div style={{
          marginTop:       "3rem",
          padding:         "1.5rem",
          borderRadius:    "var(--radius-lg)",
          backgroundColor: "var(--accent-subtle)",
          border:          "1px solid var(--border-accent)",
        }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)", margin: "0 0 0.375rem", letterSpacing: "0.04em" }}>
            STAGGER SYSTEM
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>
            tight: 50ms &nbsp;·&nbsp; normal: 100ms &nbsp;·&nbsp; loose: 200ms<br />
            <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>Used for lists, grids, and staggered hero reveals respectively.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
