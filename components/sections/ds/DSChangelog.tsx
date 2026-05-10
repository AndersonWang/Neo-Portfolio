"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Types ────────────────────────────────────────────────────────────────────

type ChangeType = "fix" | "add" | "change" | "remove" | "audit";
type EntryType  = "release" | "feature" | "accessibility" | "token" | "component";

interface Change {
  type:   ChangeType;
  text:   string;
  detail?: string;  // optional second line
}

interface ChangelogEntry {
  version:  string;
  date:     string;
  title:    string;
  kind:     EntryType;
  why:      string;  // rationale — the "why this update" sentence
  summary:  string;  // one-line outcome
  changes:  Change[];
}

// ── Data ─────────────────────────────────────────────────────────────────────

const ENTRIES: ChangelogEntry[] = [
  {
    version: "1.2",
    date:    "May 2026",
    title:   "WCAG 2.1 AA Audit & Remediation",
    kind:    "accessibility",
    why:     "A systematic contrast audit revealed 6 AA failures — 3 critical — primarily in the muted text and border tokens. All critical and major issues have been resolved.",
    summary: "8 issues found across contrast, touch targets, and UI component borders. 5 fixed in this release.",
    changes: [
      {
        type:   "fix",
        text:   "--text-muted light: #9A9690 → #6B6865",
        detail: "2.77:1 → 5.2:1 on bg-page. Fixes captions, eyebrow labels, mono metadata across every page.",
      },
      {
        type:   "fix",
        text:   "--text-muted dark: #737068 → #9A9690",
        detail: "4.00:1 → 6.73:1 on dark bg-page. Was just below the 4.5:1 AA threshold.",
      },
      {
        type:   "fix",
        text:   "--border-strong light: rgba(0,0,0,0.12) → rgba(0,0,0,0.38)",
        detail: "UI component contrast 1.30:1 → ~3.1:1. Form inputs in /contact now meet WCAG 1.4.11.",
      },
      {
        type:   "fix",
        text:   "--border-strong dark: rgba(fff,0.12) → rgba(fff,0.38)",
        detail: "Consistent fix for dark-mode input and divider borders.",
      },
      {
        type:   "fix",
        text:   "DecisionRecord 'Chosen' badge: #16A34A → #166534",
        detail: "Text-on-light-green was 3.30:1 ❌. Darkened to ~7:1 ✅ while preserving green intent.",
      },
      {
        type:   "fix",
        text:   "LightboxImage close button: 36px → 44px",
        detail: "Touch target below WCAG 2.5.5 minimum. Now at 44×44px CSS pixels.",
      },
      {
        type:   "audit",
        text:   "Passing tokens confirmed: --text-primary (18.18:1), --text-secondary (8.74:1), --accent (7.76:1), --accent on subtle (7.09:1), --status-error (4.55:1)",
        detail: "No changes needed for these values.",
      },
    ],
  },
  {
    version: "1.1",
    date:    "May 2026",
    title:   "Case Study MDX Component Library",
    kind:    "component",
    why:     "Standard MDX prose (h2, p, blockquote) can't surface the strategic complexity of Senior/Staff-level design work. Dedicated components were needed to make decision rationale, team structure, and impact stats scannable and visually distinct.",
    summary: "4 new MDX components added; FullImage and ImagePair upgraded to support lightbox and natural aspect ratio.",
    changes: [
      {
        type: "add",
        text: "RoleMap — team/stakeholder grid component",
        detail: "Renders a responsive 2–3 col card grid from a roles array prop. Used in case study ownership sections.",
      },
      {
        type: "add",
        text: "DecisionRecord — structured design decision card",
        detail: "Chosen / Rejected / Why layout. Highest-signal component for senior-level case study storytelling.",
      },
      {
        type: "add",
        text: "YouTubeEmbed — responsive 16:9 video embed",
        detail: "Extracts video ID from full URLs. Renders inside a border-radius clipped container matching the Neo radius scale.",
      },
      {
        type: "add",
        text: "LightboxImage — hover + click-to-enlarge image wrapper",
        detail: "Zoom-in cursor, scale(1.03) hover, accent ring on container, fullscreen overlay with blur backdrop, Escape to close.",
      },
      {
        type: "change",
        text: "FullImage — removed fixed aspect ratio, added LightboxImage",
        detail: "Images now render at natural aspect ratio (width:100%, height:auto). No cropping.",
      },
      {
        type: "change",
        text: "ImagePair — responsive grid, natural aspect ratio, added LightboxImage",
        detail: "Grid switches from 1fr 1fr to auto-fit minmax(260px), stacks on mobile. align-items:start prevents height stretching.",
      },
    ],
  },
  {
    version: "1.0",
    date:    "May 2026",
    title:   "Neo Design System — Initial Release",
    kind:    "release",
    why:     "Portfolio needed a fully-typed, token-first design system where the codebase is the documentation — not a separate Figma file. Neo was architected to demonstrate the same systems thinking it documents.",
    summary: "3-tier token architecture, full color palette, 3-font type scale, named motion system, and core component library.",
    changes: [
      {
        type: "add",
        text: "3-tier token model: Primitives → Semantics → Components",
        detail: "Source of truth in lib/tokens.ts. Components only consume Tier 2 semantic tokens — no magic numbers.",
      },
      {
        type: "add",
        text: "Color system — Amethyst brand + 4 editorial accents + warm neutrals",
        detail: "Lilac, Rose, Gold, Peridot for category tagging. Warm off-white (#FAF8F4) and near-black (#0F0E0D) — not pure black/white.",
      },
      {
        type: "add",
        text: "Automatic light/dark theming via CSS custom properties",
        detail: ".dark class on root swaps all semantic tokens in one step. No component-level color conditionals.",
      },
      {
        type: "add",
        text: "Typography — Roboto Serif (display) / Satoshi (body) / Azeret Mono (meta)",
        detail: "Each face has a single defined role. Display sizes use clamp() — fully fluid, no breakpoints.",
      },
      {
        type: "add",
        text: "Motion system — 7 named durations, 4 named easings, stagger scale",
        detail: "Durations named by feel: instant → micro → fast → base → slow → deliberate → cinematic. Easings: smooth, snappy, spring, default.",
      },
      {
        type: "add",
        text: "Core components: Button (3 variants × 3 sizes), Card (3D tilt, scroll reveal), Tag (5 colors × 2 sizes)",
        detail: "All are Framer Motion components. Theme-aware via CSS custom properties with no conditional logic.",
      },
      {
        type: "add",
        text: "MDX base components: Callout (insight/metric/quote/warning), FullImage, ImagePair, Stat + StatRow",
        detail: "Styled with Neo tokens inline. Used across all case study pages.",
      },
    ],
  },
];

// ── Badge helpers ─────────────────────────────────────────────────────────────

const KIND_LABELS: Record<EntryType, string> = {
  release:       "Release",
  feature:       "Feature",
  accessibility: "Accessibility",
  token:         "Tokens",
  component:     "Components",
};

const KIND_COLORS: Record<EntryType, { bg: string; text: string }> = {
  release:       { bg: "var(--accent-subtle)",         text: "var(--accent)"         },
  feature:       { bg: "rgba(135,170,97,0.12)",         text: "#567A35"               },
  accessibility: { bg: "rgba(41,163,74,0.10)",          text: "#166534"               },
  token:         { bg: "rgba(219,161,102,0.14)",        text: "#8C5420"               },
  component:     { bg: "rgba(191,146,240,0.14)",        text: "#6B3FB0"               },
};

const CHANGE_BADGES: Record<ChangeType, { label: string; bg: string; text: string }> = {
  add:    { label: "Added",   bg: "rgba(22,163,74,0.10)",  text: "#166534" },
  fix:    { label: "Fixed",   bg: "rgba(88,53,176,0.08)",  text: "var(--accent)" },
  change: { label: "Changed", bg: "rgba(217,119,6,0.10)",  text: "#92400E" },
  remove: { label: "Removed", bg: "rgba(220,38,38,0.08)",  text: "#991B1B" },
  audit:  { label: "Audit",   bg: "var(--bg-raised)",      text: "var(--text-secondary)" },
};

// ── Accordion item ────────────────────────────────────────────────────────────

function AccordionItem({ entry, index }: { entry: ChangelogEntry; index: number }) {
  const [open, setOpen] = useState(index === 0); // first item open by default
  const kc = KIND_COLORS[entry.kind];

  return (
    <div style={{
      borderBottom: "1px solid var(--border-default)",
    }}>
      {/* Header */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width:           "100%",
          display:         "flex",
          alignItems:      "center",
          gap:             "1rem",
          padding:         "1.5rem 0",
          background:      "none",
          border:          "none",
          cursor:          "pointer",
          textAlign:       "left",
        }}
      >
        {/* Version */}
        <span style={{
          fontFamily:    "var(--font-mono)",
          fontSize:      "0.6875rem",
          letterSpacing: "0.06em",
          color:         "var(--text-muted)",
          flexShrink:    0,
          width:         "2.5rem",
        }}>
          v{entry.version}
        </span>

        {/* Kind badge */}
        <span style={{
          fontFamily:      "var(--font-mono)",
          fontSize:        "0.625rem",
          letterSpacing:   "0.08em",
          textTransform:   "uppercase",
          padding:         "0.2rem 0.5rem",
          borderRadius:    "var(--radius-full)",
          backgroundColor: kc.bg,
          color:           kc.text,
          flexShrink:      0,
        }}>
          {KIND_LABELS[entry.kind]}
        </span>

        {/* Title */}
        <span style={{
          fontFamily: "var(--font-body)",
          fontSize:   "1rem",
          fontWeight: 500,
          color:      "var(--text-primary)",
          flex:       1,
          minWidth:   0,
        }}>
          {entry.title}
        </span>

        {/* Date */}
        <span style={{
          fontFamily:  "var(--font-mono)",
          fontSize:    "0.6875rem",
          color:       "var(--text-muted)",
          flexShrink:  0,
          marginRight: "0.75rem",
        }}>
          {entry.date}
        </span>

        {/* Chevron */}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            color:      "var(--text-muted)",
            flexShrink: 0,
            fontSize:   "1rem",
            lineHeight: 1,
          }}
        >
          ↓
        </motion.span>
      </button>

      {/* Body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{   height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingBottom: "2rem", paddingLeft: "3.5rem" }}>

              {/* Why + summary */}
              <div style={{
                marginBottom:    "1.5rem",
                padding:         "1rem 1.25rem",
                backgroundColor: "var(--bg-raised)",
                borderRadius:    "var(--radius-md)",
                borderLeft:      "3px solid var(--border-accent)",
              }}>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize:   "0.9375rem",
                  lineHeight: 1.65,
                  color:      "var(--text-secondary)",
                  margin:     "0 0 0.375rem",
                }}>
                  {entry.why}
                </p>
                <p style={{
                  fontFamily:    "var(--font-mono)",
                  fontSize:      "0.75rem",
                  color:         "var(--text-muted)",
                  letterSpacing: "0.02em",
                  margin:        0,
                }}>
                  {entry.summary}
                </p>
              </div>

              {/* Change list */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {entry.changes.map((c, i) => {
                  const badge = CHANGE_BADGES[c.type];
                  return (
                    <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      <span style={{
                        fontFamily:      "var(--font-mono)",
                        fontSize:        "0.625rem",
                        letterSpacing:   "0.06em",
                        textTransform:   "uppercase",
                        padding:         "0.175rem 0.45rem",
                        borderRadius:    "var(--radius-sm)",
                        backgroundColor: badge.bg,
                        color:           badge.text,
                        flexShrink:      0,
                        marginTop:       "0.15rem",
                        whiteSpace:      "nowrap",
                      }}>
                        {badge.label}
                      </span>
                      <div>
                        <p style={{
                          fontFamily: "var(--font-body)",
                          fontSize:   "0.9375rem",
                          color:      "var(--text-primary)",
                          margin:     "0 0 0.1rem",
                          lineHeight: 1.5,
                        }}>
                          {c.text}
                        </p>
                        {c.detail && (
                          <p style={{
                            fontFamily: "var(--font-body)",
                            fontSize:   "0.8125rem",
                            color:      "var(--text-muted)",
                            margin:     0,
                            lineHeight: 1.55,
                          }}>
                            {c.detail}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function DSChangelog() {
  return (
    <section
      className="page-gutter"
      style={{
        maxWidth:      "1280px",
        margin:        "0 auto",
        width:         "100%",
        paddingTop:    "clamp(4rem, 8vw, 6rem)",
        paddingBottom: "clamp(4rem, 8vw, 6rem)",
        borderTop:     "1px solid var(--border-default)",
      }}
    >
      {/* Section header */}
      <div style={{ marginBottom: "3rem" }}>
        <p style={{
          fontFamily:    "var(--font-mono)",
          fontSize:      "0.75rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color:         "var(--text-muted)",
          marginBottom:  "0.75rem",
        }}>
          Changelog
        </p>
        <h2 style={{
          fontFamily:    "var(--font-display)",
          fontSize:      "clamp(2rem, 4vw, 3.5rem)",
          fontWeight:    300,
          letterSpacing: "-0.025em",
          lineHeight:    1.05,
          color:         "var(--text-primary)",
          margin:        "0 0 1rem",
        }}>
          What changed, and why.
        </h2>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize:   "1.0625rem",
          lineHeight: 1.65,
          color:      "var(--text-secondary)",
          maxWidth:   "52ch",
          margin:     0,
        }}>
          Every significant update to the Neo Design System — tokens, components,
          and audit findings — documented with rationale, not just a diff.
        </p>
      </div>

      {/* Accordion */}
      <div style={{
        borderTop: "1px solid var(--border-default)",
      }}>
        {ENTRIES.map((entry, i) => (
          <AccordionItem key={entry.version} entry={entry} index={i} />
        ))}
      </div>
    </section>
  );
}
