"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// ── LinkedIn inline SVG ────────────────────────────────────────────────────────
// Matches the style of /public/icons: thick rounded strokes, outline-first, currentColor
function LinkedInIcon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 192 192"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Rounded square border */}
      <rect
        x="18" y="18" width="156" height="156" rx="34"
        stroke="currentColor" strokeWidth="11" strokeLinejoin="round"
      />
      {/* i — dot */}
      <circle cx="61" cy="63" r="8" fill="currentColor" />
      {/* i — stem */}
      <line
        x1="61" y1="82" x2="61" y2="149"
        stroke="currentColor" strokeWidth="11" strokeLinecap="round"
      />
      {/* n — left stem */}
      <line
        x1="84" y1="82" x2="84" y2="149"
        stroke="currentColor" strokeWidth="11" strokeLinecap="round"
      />
      {/* n — arch + right stem */}
      <path
        d="M 84 101 C 84 78 133 78 133 101 L 133 149"
        stroke="currentColor" strokeWidth="11"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Social link data ───────────────────────────────────────────────────────────
// TODO: replace placeholder hrefs with your actual profile URLs

interface SocialLink {
  label:    string;
  handle:   string;
  href:     string;
  icon:     React.ReactNode;
}

const LINKS: SocialLink[] = [
  {
    label:  "LinkedIn",
    handle: "Anderson Wang",
    href:   "https://www.linkedin.com/in/andersonwangxz/",
    icon:   <LinkedInIcon size={28} />,
  },
  {
    label:  "GitHub",
    handle: "@AndersonWang",
    href:   "https://github.com/AndersonWang",           // TODO: confirm your handle
    icon:   (
      <Image
        src="/icons/github.png"
        alt=""
        width={28}
        height={28}
        style={{ display: "block" }}
      />
    ),
  },
  {
    label:  "Figma Community",
    handle: "@andersonwang",
    href:   "https://www.figma.com/@andersonwang",       // TODO: confirm your handle
    icon:   (
      <Image
        src="/icons/figma.png"
        alt=""
        width={28}
        height={28}
        style={{ display: "block" }}
      />
    ),
  },
];

// ── Component ──────────────────────────────────────────────────────────────────

export default function AboutSocial() {
  return (
    <section
      className="page-gutter"
      style={{
        paddingTop:    "clamp(4rem, 8vw, 6rem)",
        paddingBottom: "clamp(5rem, 10vw, 8rem)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Section header */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.75rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color:         "var(--text-muted)",
            marginBottom:  "2rem",
          }}
        >
          Find me online
        </motion.p>

        {/* Card grid */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap:                 "1rem",
        }}>
          {LINKS.map(({ label, handle, href, icon }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
              style={{
                display:         "flex",
                alignItems:      "center",
                gap:             "1rem",
                padding:         "1.25rem 1.5rem",
                borderRadius:    "var(--radius-lg)",
                border:          "1px solid var(--border-default)",
                backgroundColor: "var(--bg-surface)",
                textDecoration:  "none",
                cursor:          "pointer",
                transition:      "border-color 200ms ease, background-color 200ms ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor     = "var(--border-accent)";
                el.style.backgroundColor = "var(--accent-subtle)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor     = "var(--border-default)";
                el.style.backgroundColor = "var(--bg-surface)";
              }}
            >
              {/* Icon */}
              <span style={{
                flexShrink: 0,
                color:      "var(--text-primary)",
                display:    "flex",
                alignItems: "center",
              }}>
                {icon}
              </span>

              {/* Label + handle */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize:   "0.9375rem",
                  fontWeight: 600,
                  color:      "var(--text-primary)",
                  margin:     "0 0 0.125rem",
                }}>
                  {label}
                </p>
                <p style={{
                  fontFamily:    "var(--font-mono)",
                  fontSize:      "0.6875rem",
                  letterSpacing: "0.04em",
                  color:         "var(--text-muted)",
                  margin:        0,
                  overflow:      "hidden",
                  textOverflow:  "ellipsis",
                  whiteSpace:    "nowrap",
                }}>
                  {handle}
                </p>
              </div>

              {/* Arrow */}
              <Image
                src="/icons/arrow-up-right.png"
                alt=""
                width={16}
                height={16}
                style={{
                  flexShrink: 0,
                  opacity:    0.4,
                }}
              />
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
