"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import { type TagColor } from "@/components/ui/Tag";

const skills: { label: string; color: TagColor }[] = [
  { label: "Product Design",   color: "amethyst" },
  { label: "Design Systems",   color: "amethyst" },
  { label: "Interaction Design", color: "lilac"  },
  { label: "Prototyping",      color: "lilac"    },
  { label: "User Research",    color: "gold"     },
  { label: "Figma",            color: "neutral"  },
  { label: "Framer",           color: "neutral"  },
  { label: "React / Next.js",  color: "peridot"  },
];

export default function About() {
  return (
    <section
      className="page-gutter"
      style={{
        paddingTop:    "clamp(5rem, 10vw, 8rem)",
        paddingBottom: "clamp(5rem, 10vw, 8rem)",
        borderBottom:  "1px solid var(--border-default)",
      }}
    >
      <div style={{
        maxWidth:            "1280px",
        margin:              "0 auto",
        display:             "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
        gap:                 "clamp(3rem, 6vw, 6rem)",
        alignItems:          "center",
      }}>

        {/* Left — text */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color:         "var(--text-muted)",
              marginBottom:  "1.5rem",
            }}
          >
            About
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(2rem, 4vw, 3.5rem)",
              fontWeight:    300,
              lineHeight:    1.1,
              letterSpacing: "-0.025em",
              color:         "var(--text-primary)",
              margin:        "0 0 1.75rem",
            }}
          >
            Design as a way of thinking, not just making.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.16, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          >
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize:   "1.0625rem",
              lineHeight: 1.7,
              color:      "var(--text-secondary)",
              margin:     "0 0 1rem",
            }}>
              I'm Anderson Wang — a Senior Product Designer who works at the intersection
              of systems thinking and pixel-level craft. I build design systems that scale,
              interfaces that feel inevitable, and interactions that reward attention.
            </p>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize:   "1.0625rem",
              lineHeight: 1.7,
              color:      "var(--text-secondary)",
              margin:     "0 0 2rem",
            }}>
              I'm most effective when given complex, ambiguous problems — the kind that
              need both a sharp design eye and a structured product mind to untangle.
            </p>

            <Button href="/contact" variant="primary">Work together →</Button>
          </motion.div>
        </div>

        {/* Right — skills */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
        >
          <p style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.6875rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color:         "var(--text-muted)",
            marginBottom:  "1.25rem",
          }}>
            Craft & Tools
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
            {skills.map(({ label, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              >
                <Tag label={label} color={color} size="md" />
              </motion.div>
            ))}
          </div>

          {/* Stats row */}
          <div style={{
            display:             "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap:                 "1.5rem",
            marginTop:           "3rem",
            paddingTop:          "2rem",
            borderTop:           "1px solid var(--border-default)",
          }}>
            {[
              { value: "6+",  label: "Years experience" },
              { value: "30+", label: "Products shipped"  },
              { value: "3",   label: "Design systems built" },
            ].map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              >
                <p style={{
                  fontFamily:    "var(--font-display)",
                  fontSize:      "2.25rem",
                  fontWeight:    300,
                  letterSpacing: "-0.03em",
                  color:         "var(--accent)",
                  margin:        "0 0 0.25rem",
                  lineHeight:    1,
                }}>
                  {value}
                </p>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize:   "0.8125rem",
                  color:      "var(--text-muted)",
                  margin:     0,
                  lineHeight: 1.4,
                }}>
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
