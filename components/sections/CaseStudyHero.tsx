"use client";

import { motion } from "framer-motion";
import Tag from "@/components/ui/Tag";
import { type CaseStudyFrontmatter } from "@/lib/mdx";

interface CaseStudyHeroProps {
  frontmatter: CaseStudyFrontmatter;
  slug: string;
}

export default function CaseStudyHero({ frontmatter, slug }: CaseStudyHeroProps) {
  const { title, description, year, role, timeline, tags, company } = frontmatter;

  return (
    <section
      className="page-gutter"
      style={{
        paddingTop:    "clamp(4rem, 8vw, 6rem)",
        paddingBottom: "clamp(3rem, 6vw, 4rem)",
        borderBottom:  "1px solid var(--border-default)",
        maxWidth:      "1280px",
        margin:        "0 auto",
        width:         "100%",
      }}
    >
      {/* Back link */}
      <motion.a
        href="/work"
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1,  x: 0  }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
        style={{
          display:        "inline-flex",
          alignItems:     "center",
          gap:            "0.375rem",
          fontFamily:     "var(--font-mono)",
          fontSize:       "0.75rem",
          letterSpacing:  "0.04em",
          textTransform:  "uppercase",
          color:          "var(--text-muted)",
          textDecoration: "none",
          marginBottom:   "2.5rem",
          transition:     "color 150ms ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
      >
        ← Work
      </motion.a>

      {/* Tags */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1,  y: 0  }}
        transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
        style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}
      >
        {tags.map((tag, i) => (
          <Tag
            key={tag}
            label={tag}
            size="md"
            color={i === 0 ? "amethyst" : "neutral"}
          />
        ))}
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1,  y: 0  }}
        transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
        style={{
          fontFamily:    "var(--font-display)",
          fontSize:      "clamp(2.5rem, 6vw, 6rem)",
          fontWeight:    300,
          lineHeight:    1.0,
          letterSpacing: "-0.03em",
          color:         "var(--text-primary)",
          margin:        "0 0 1.5rem",
          maxWidth:      "18ch",
        }}
      >
        {title}
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1,  y: 0  }}
        transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
        style={{
          fontFamily: "var(--font-body)",
          fontSize:   "1.125rem",
          lineHeight: 1.65,
          color:      "var(--text-secondary)",
          maxWidth:   "56ch",
          margin:     "0 0 3rem",
        }}
      >
        {description}
      </motion.p>

      {/* Meta row */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1,  y: 0 }}
        transition={{ duration: 0.5, delay: 0.26, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
        style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap:                 "1px",
          backgroundColor:     "var(--border-default)",
          border:              "1px solid var(--border-default)",
          borderRadius:        "var(--radius-md)",
          overflow:            "hidden",
          maxWidth:            "600px",
        }}
      >
        {[
          { label: "Year",     value: String(year) },
          { label: "Role",     value: role         },
          { label: "Timeline", value: timeline      },
          ...(company ? [{ label: "Company", value: company }] : []),
        ].map(({ label, value }) => (
          <div
            key={label}
            style={{
              padding:         "1rem 1.25rem",
              backgroundColor: "var(--bg-surface)",
            }}
          >
            <p style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      "0.6875rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color:         "var(--text-muted)",
              margin:        "0 0 0.25rem",
            }}>
              {label}
            </p>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize:   "0.9375rem",
              fontWeight: 500,
              color:      "var(--text-primary)",
              margin:     0,
            }}>
              {value}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
