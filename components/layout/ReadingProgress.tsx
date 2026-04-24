"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping:   30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        position:        "fixed",
        top:             "64px",   // just below fixed nav
        left:            0,
        right:           0,
        height:          "2px",
        backgroundColor: "var(--accent)",
        transformOrigin: "0%",
        zIndex:          199,
      }}
    />
  );
}
