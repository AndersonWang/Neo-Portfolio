import type { Metadata } from "next";
import { getAllCaseStudies } from "@/lib/mdx";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title:       "Work",
  description: "Selected product design case studies — design systems, interaction design, and end-to-end product work.",
};

export default function WorkPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <main className="page-gutter" style={{ maxWidth: "1280px", margin: "0 auto", width: "100%" }}>
      {/* Header */}
      <div style={{
        paddingTop:    "clamp(4rem, 8vw, 6rem)",
        paddingBottom: "clamp(3rem, 5vw, 4rem)",
        borderBottom:  "1px solid var(--border-default)",
        marginBottom:  "clamp(3rem, 5vw, 4rem)",
      }}>
        <p style={{
          fontFamily:    "var(--font-mono)",
          fontSize:      "0.75rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color:         "var(--text-muted)",
          margin:        "0 0 1rem",
        }}>
          {caseStudies.length} projects
        </p>
        <h1 style={{
          fontFamily:    "var(--font-display)",
          fontSize:      "clamp(3rem, 6vw, 6rem)",
          fontWeight:    300,
          lineHeight:    1.0,
          letterSpacing: "-0.03em",
          color:         "var(--text-primary)",
          margin:        0,
        }}>
          Work
        </h1>
      </div>

      {/* Grid */}
      {caseStudies.length > 0 ? (
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))",
            gap:                 "1.5rem",
            paddingBottom:       "clamp(4rem, 8vw, 6rem)",
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
      ) : (
        <div style={{
          paddingBottom: "clamp(4rem, 8vw, 6rem)",
          textAlign:     "center",
        }}>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize:   "1rem",
            color:      "var(--text-muted)",
          }}>
            Case studies coming soon.
          </p>
        </div>
      )}
    </main>
  );
}
