"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import { featuredProjects } from "@/lib/projects";
import Button from "@/components/ui/Button";

export default function SelectedWork() {
  return (
    <section
      className="page-gutter"
      style={{
        paddingTop:    "clamp(5rem, 10vw, 8rem)",
        paddingBottom: "clamp(5rem, 10vw, 8rem)",
        borderBottom:  "1px solid var(--border-default)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Section header */}
        <div style={{
          display:        "flex",
          alignItems:     "baseline",
          justifyContent: "space-between",
          flexWrap:       "wrap",
          gap:            "1rem",
          marginBottom:   "clamp(2.5rem, 5vw, 4rem)",
        }}>
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}
          >
            <span style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      "0.75rem",
              color:         "var(--text-muted)",
              letterSpacing: "0.06em",
            }}>
              Selected Work
            </span>
            <h2 style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(2rem, 4vw, 3.5rem)",
              fontWeight:    300,
              letterSpacing: "-0.025em",
              lineHeight:    1.05,
              color:         "var(--text-primary)",
              margin:        0,
            }}>
              Recent projects
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          >
            <Button href="/work" variant="ghost" size="sm">View all work</Button>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))",
          gap:                 "1.5rem",
        }}>
          {featuredProjects.map((project, i) => (
            <Card
              key={project.slug}
              href={`/work/${project.slug}`}
              title={project.title}
              description={project.description}
              year={project.year}
              tags={project.tags.map((t) => t.label)}
              index={i}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
