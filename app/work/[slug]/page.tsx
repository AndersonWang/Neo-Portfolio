import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getCaseStudy, getAllSlugs, getAdjacentCaseStudies } from "@/lib/mdx";
import CaseStudyHero from "@/components/sections/CaseStudyHero";
import ReadingProgress from "@/components/layout/ReadingProgress";
import Callout from "@/components/ui/mdx/Callout";
import FullImage from "@/components/ui/mdx/FullImage";
import ImagePair from "@/components/ui/mdx/ImagePair";
import { Stat, StatRow } from "@/components/ui/mdx/Stat";
import Link from "next/link";

// MDX components available inside every case study file
const components = {
  Callout,
  FullImage,
  ImagePair,
  Stat,
  StatRow,
  // Override default MDX HTML elements with Neo-styled versions
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      {...props}
      style={{
        fontFamily:    "var(--font-display)",
        fontSize:      "clamp(1.75rem, 3.5vw, 2.75rem)",
        fontWeight:    300,
        letterSpacing: "-0.025em",
        lineHeight:    1.1,
        color:         "var(--text-primary)",
        margin:        "3.5rem 0 1rem",
        paddingTop:    "1rem",
        borderTop:     "1px solid var(--border-default)",
      }}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      {...props}
      style={{
        fontFamily:    "var(--font-body)",
        fontSize:      "1.25rem",
        fontWeight:    600,
        letterSpacing: "-0.01em",
        lineHeight:    1.3,
        color:         "var(--text-primary)",
        margin:        "2.5rem 0 0.75rem",
      }}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      {...props}
      style={{
        fontFamily: "var(--font-body)",
        fontSize:   "1.0625rem",
        lineHeight: 1.75,
        color:      "var(--text-secondary)",
        margin:     "0 0 1.25rem",
      }}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      {...props}
      style={{
        fontFamily:  "var(--font-body)",
        fontSize:    "1.0625rem",
        lineHeight:  1.75,
        color:       "var(--text-secondary)",
        paddingLeft: "1.5rem",
        margin:      "0 0 1.25rem",
      }}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      {...props}
      style={{
        fontFamily:  "var(--font-body)",
        fontSize:    "1.0625rem",
        lineHeight:  1.75,
        color:       "var(--text-secondary)",
        paddingLeft: "1.5rem",
        margin:      "0 0 1.25rem",
      }}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      {...props}
      style={{
        fontFamily:    "var(--font-display)",
        fontSize:      "clamp(1.25rem, 2.5vw, 1.75rem)",
        fontWeight:    300,
        lineHeight:    1.4,
        letterSpacing: "-0.01em",
        color:         "var(--text-primary)",
        borderLeft:    "3px solid var(--accent)",
        paddingLeft:   "1.5rem",
        margin:        "2.5rem 0",
      }}
    />
  ),
  hr: () => (
    <hr style={{ border: "none", borderTop: "1px solid var(--border-default)", margin: "3rem 0" }} />
  ),
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title:       cs.frontmatter.title,
    description: cs.frontmatter.description,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const { prev, next } = getAdjacentCaseStudies(slug);

  return (
    <>
      <ReadingProgress />

      <article>
        {/* Hero */}
        <CaseStudyHero frontmatter={cs.frontmatter} slug={slug} />

        {/* MDX Content */}
        <div
          className="page-gutter"
          style={{
            maxWidth:     "720px",
            margin:       "0 auto",
            paddingTop:   "clamp(3rem, 6vw, 5rem)",
            paddingBottom: "clamp(3rem, 6vw, 5rem)",
            width:        "100%",
          }}
        >
          <MDXRemote source={cs.content} components={components} />
        </div>

        {/* Prev / Next navigation */}
        {(prev || next) && (
          <nav
            className="page-gutter"
            style={{
              borderTop:   "1px solid var(--border-default)",
              paddingTop:  "3rem",
              paddingBottom: "3rem",
              display:     "grid",
              gridTemplateColumns: prev && next ? "1fr 1fr" : "1fr",
              gap:         "1.5rem",
              maxWidth:    "1280px",
              margin:      "0 auto",
              width:       "100%",
            }}
          >
            {prev && (
              <Link
                href={`/work/${prev.slug}`}
                style={{ textDecoration: "none", gridColumn: "1" }}
              >
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 0.5rem" }}>
                  ← Previous
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "1.125rem", fontWeight: 500, color: "var(--text-primary)", margin: 0, letterSpacing: "-0.01em" }}>
                  {prev.frontmatter.title}
                </p>
              </Link>
            )}
            {next && (
              <Link
                href={`/work/${next.slug}`}
                style={{ textDecoration: "none", gridColumn: prev ? "2" : "1", textAlign: prev ? "right" : "left" }}
              >
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 0.5rem" }}>
                  Next →
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "1.125rem", fontWeight: 500, color: "var(--text-primary)", margin: 0, letterSpacing: "-0.01em" }}>
                  {next.frontmatter.title}
                </p>
              </Link>
            )}
          </nav>
        )}
      </article>
    </>
  );
}
