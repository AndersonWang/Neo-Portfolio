import { type TagColor } from "@/components/ui/Tag";

export interface Project {
  slug:        string;
  title:       string;
  description: string;
  year:        number;
  tags:        { label: string; color: TagColor }[];
  imageSrc?:   string;
  imageAlt?:   string;
  featured:    boolean;
}

export const projects: Project[] = [
  {
    slug:        "neo-design-system",
    title:       "Neo Design System",
    description: "A 3-tier token architecture — primitives, semantics, and components — built for scale and designer-developer alignment.",
    year:        2024,
    tags:        [
      { label: "Design Systems", color: "amethyst" },
      { label: "Tokens",         color: "lilac"    },
    ],
    featured:    true,
  },
  {
    slug:        "project-two",
    title:       "Project Two",
    description: "A deep dive into interaction design, balancing craft and user clarity across a complex multi-step flow.",
    year:        2024,
    tags:        [
      { label: "UX Design",   color: "gold"    },
      { label: "Prototyping", color: "neutral" },
    ],
    featured:    true,
  },
  {
    slug:        "project-three",
    title:       "Project Three",
    description: "End-to-end product design for a mobile-first platform, from discovery research to shipped components.",
    year:        2023,
    tags:        [
      { label: "Product Design", color: "peridot" },
      { label: "Mobile",         color: "neutral" },
    ],
    featured:    true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
