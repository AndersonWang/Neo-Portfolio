"use client";

import { motion } from "framer-motion";

interface Job {
  company:     string;
  title:       string;
  years:       string;
  achievement: string;
}

const JOBS: Job[] = [
  {
    company:     "Scientific Games",
    title:       "Senior UI/UX Designer",
    years:       "Apr 2023 – Nov 2025",
    achievement: "Led the redesign of a complex lottery retail system across 11 states, migrating 6+ years of legacy assets into a component-based design system that reached ~95% adoption across products.",
  },
  {
    company:     "Bally's Interactive (Bet.Works)",
    title:       "UX/UI Designer",
    years:       "Jan 2021 – Jan 2023",
    achievement: "Owned end-to-end design of a sportsbook retail terminal deployed across 19 resort properties, reducing operational complexity by 30% for front-line staff.",
  },
  {
    company:     "CoinSeason Capital",
    title:       "UI/UX Designer",
    years:       "May 2018 – May 2020",
    achievement: "Founding designer — defined product direction and owned all UI/UX from zero to launch, contributing to 110% DAU growth within six months.",
  },
  {
    company:     "G6 Idea Media Ltd.",
    title:       "Product Designer",
    years:       "Apr 2016 – Feb 2018",
    achievement: "Delivered end-to-end wireframes, UI/UX designs, and functional prototypes for local business clients across campaign and web projects.",
  },
  {
    company:     "Self-Employed",
    title:       "Freelance Product Designer",
    years:       "Jun 2015 – Present",
    achievement: "Designed and launched a free-to-play NHL game that attracted 1M+ users during the 2023 Stanley Cup Playoffs, while building AI-native design workflows across client work.",
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
