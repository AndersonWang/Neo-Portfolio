"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Tag, { type TagColor } from "@/components/ui/Tag";
import SpecialtyEmptyState from "./SpecialtyEmptyState";
import type { CaseStudy } from "@/lib/mdx";

interface SpecialtySectionProps {
  index:       string;
  label:       string;
  heading:     string;
  description: string;
  tagColor:    TagColor;
  caseStudies: CaseStudy[];
  isLast?:     boolean;
}

export default function SpecialtySection({
  index,
  label,
  heading,
  description,
  tagColor,
  caseStudies,
  isLast,
}: SpecialtySectionProps) {
  return (
    <section
      style={{
        paddingTop:    "clamp(5rem, 10vw, 8rem)",
        paddingBottom: "clamp(5rem, 10vw, 8rem)",
        borderBottom:  isLast ? "none" : "1px solid var(--border-default)",
      }}
    >
      <div className="specialty-layout">

        {/* ── Left: sticky label column ── */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          className="specialty-label"
        >
          <p
            style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      "0.6875rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color:         "var(--text-muted)",
              marginBottom:  "1rem",
            }}
          >
            {index}
          </p>

          <div style={{ marginBottom: "1rem" }}>
            <Tag label={label} color={tagColor} size="md" />
          </div>

          <h2
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight:    300,
              lineHeight:    1.1,
              letterSpacing: "-0.02em",
              color:         "var(--text-primary)",
              margin:        "0 0 1rem",
            }}
          >
            {heading}
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize:   "0.9375rem",
              lineHeight: 1.7,
              color:      "var(--text-secondary)",
              margin:     0,
              maxWidth:   "34ch",
            }}
          >
            {description}
          </p>
        </motion.div>

        {/* ── Right: card grid ── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {caseStudies.length === 0 ? (
            <SpecialtyEmptyState tagColor={tagColor} label={label} />
          ) : (
            <div
              style={{
                display:             "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
                gap:                 "1.5rem",
              }}
            >
              {caseStudies.map((cs, i) => (
                <Card
                  key={cs.slug}
                  href={`/work/${cs.slug}`}
                  title={cs.frontmatter.title}
                  description={cs.frontmatter.description}
                  year={cs.frontmatter.year}
                  tags={cs.frontmatter.tags}
                  imageSrc={cs.frontmatter.cover}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
