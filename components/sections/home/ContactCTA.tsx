"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function ContactCTA() {
  return (
    <section
      className="page-gutter"
      style={{
        paddingTop:    "clamp(5rem, 12vw, 9rem)",
        paddingBottom: "clamp(5rem, 12vw, 9rem)",
      }}
    >
      <div style={{
        maxWidth: "1280px",
        margin:   "0 auto",
        display:  "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}>

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
          Let's work together
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
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
          Got a project worth doing?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.16, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          style={{
            fontFamily:  "var(--font-body)",
            fontSize:    "1.125rem",
            lineHeight:  1.65,
            color:       "var(--text-secondary)",
            maxWidth:    "44ch",
            margin:      "0 0 3rem",
          }}
        >
          I'm open to senior IC, staff, or consulting roles. If you're building
          something that needs both design rigour and product thinking, let's talk.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}
        >
          <Button href="/contact" variant="primary" size="lg">Say hello →</Button>
          <Button href="mailto:wxzx6008@gmail.com" variant="ghost" size="lg" external>
            wxzx6008@gmail.com
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
