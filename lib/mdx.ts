import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CASE_STUDIES_DIR = path.join(process.cwd(), "content/case-studies");

export interface CaseStudyFrontmatter {
  title:       string;
  description: string;
  year:        number;
  role:        string;
  timeline:    string;
  tags:        string[];
  company?:    string;
  cover?:      string;   // path to cover image
  featured:    boolean;
  password?:   string;   // optional NDA gating (future use)
}

export interface CaseStudy {
  slug:        string;
  frontmatter: CaseStudyFrontmatter;
  content:     string;
}

/** Get all case study slugs (for generateStaticParams) */
export function getAllSlugs(): string[] {
  if (!fs.existsSync(CASE_STUDIES_DIR)) return [];
  return fs
    .readdirSync(CASE_STUDIES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/** Get a single case study by slug */
export function getCaseStudy(slug: string): CaseStudy | null {
  const filePath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    frontmatter: data as CaseStudyFrontmatter,
    content,
  };
}

/** Get all case studies sorted by year desc */
export function getAllCaseStudies(): CaseStudy[] {
  return getAllSlugs()
    .map((slug) => getCaseStudy(slug))
    .filter((cs): cs is CaseStudy => cs !== null)
    .sort((a, b) => b.frontmatter.year - a.frontmatter.year);
}

/** Get prev / next slugs for in-page navigation */
export function getAdjacentCaseStudies(slug: string): {
  prev: CaseStudy | null;
  next: CaseStudy | null;
} {
  const all = getAllCaseStudies();
  const idx  = all.findIndex((cs) => cs.slug === slug);
  return {
    prev: idx < all.length - 1 ? all[idx + 1] : null,
    next: idx > 0              ? all[idx - 1] : null,
  };
}
