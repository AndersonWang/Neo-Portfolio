"use client";

import { motion } from "framer-motion";

interface Job {
  company:     string;
  title:       string;
  years:       string;
  achievement: string;
}

// One sentence per role — what you moved, shipped, or changed.
// Draft copy for Seamax, CoinSeason, G6, Freelance — update with your own words.
const JOBS: Job[] = [
  {
    company:     "Scientific Games",
    title:       "Senior UI/UX Designer",
    years:       "2023 – 2025",
    achievement: "Consolidated fragmented legacy design across a multi-product portfolio, established a shared component library and design system, and led the redesign of several multi-state omnichannel products.",
  },
  {
    company:     "Bally's Interactive",
    title:       "UX/UI Designer",
    years:       "2021 – 2023",
    achievement: "Designed the Sports Betting Terminal — a physical-digital touchpoint deployed across 19 resort properties — bridging Bally's mobile Ballyverse ecosystem with the casino floor.",
  },
  {
    company:     "Seamax Marine and Outdoor",
    title:       "E-Commerce Digital Designer",
    years:       "2020 – 2021",
    // TODO: replace with your own sentence
    achievement: "Redesigned the digital shopping experience for a marine and outdoor products brand, improving product storytelling and purchase flow.",
  },
  {
    company:     "CoinSeason Capital",
    title:       "UI/UX Designer",
    years:       "2018 – 2020",
    // TODO: replace with your own sentence
    achievement: "Designed investment and portfolio management interfaces for a crypto-native capital platform, making complex financial data navigable for retail investors.",
  },
  {
    company:     "G6 Idea Media",
    title:       "Product Designer",
    years:       "2016 – 2018",
    // TODO: replace with your own sentence
    achievement: "Shipped product design across multi-industry agency clients, building a broad foundation in visual systems, interaction patterns, and digital brand.",
  },
  {
    company:     "Freelance",
    title:       "UI/UX Designer",
    years:       "2015 – 2021",
    achievement: "Delivered end-to-end design for independent clients across web, mobile, and brand — running parallel to full-time roles for six years.",
  },
];

export default function AboutExperience() {
  return (
    <section
      className="page-gutter"
      style={{
        paddingTop:    "clamp(4rem, 8vw, 6rem)",
        paddingBottom: "clamp(4rem, 8vw, 6rem)",
        borderBottom:  "1px solid var(--border-default)",
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
            marginBottom:  "3rem",
          }}
        >
          Experience
        </motion.p>

        {/* Job list */}
        <div style={{ borderTop: "1px solid var(--border-default)" }}>
          {JOBS.map((job, i) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display:       "grid",
                gridTemplateColumns: "1fr auto",
                gap:           "1rem 2rem",
                padding:       "1.75rem 0",
                borderBottom:  "1px solid var(--border-default)",
                alignItems:    "start",
              }}
            >
              {/* Left: company, title, achievement */}
              <div>
                <div style={{
                  display:    "flex",
                  alignItems: "baseline",
                  gap:        "0.75rem",
                  flexWrap:   "wrap",
                  marginBottom: "0.375rem",
                }}>
                  <span style={{
                    fontFamily: "var(--font-body)",
                    fontSize:   "1rem",
                    fontWeight: 600,
                    color:      "var(--text-primary)",
                  }}>
                    {job.company}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-body)",
                    fontSize:   "0.875rem",
                    color:      "var(--text-muted)",
                  }}>
                    {job.title}
                  </span>
                </div>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize:   "0.9375rem",
                  lineHeight: 1.65,
                  color:      "var(--text-secondary)",
                  margin:     0,
                  maxWidth:   "72ch",
                }}>
                  {job.achievement}
                </p>
              </div>

              {/* Right: year range */}
              <span style={{
                fontFamily:    "var(--font-mono)",
                fontSize:      "0.75rem",
                letterSpacing: "0.04em",
                color:         "var(--text-muted)",
                whiteSpace:    "nowrap",
                paddingTop:    "0.125rem",
              }}>
                {job.years}
              </span>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
