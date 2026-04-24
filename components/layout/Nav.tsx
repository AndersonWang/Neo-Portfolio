"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const links = [
  { href: "/work",          label: "Work"          },
  { href: "/design-system", label: "Design System" },
  { href: "/contact",       label: "Contact"       },
];

export default function Nav() {
  const pathname  = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1,  y: 0   }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position:        "fixed",
        top:             0,
        left:            0,
        right:           0,
        zIndex:          200,
        borderBottom:    scrolled ? "1px solid var(--border-default)" : "1px solid transparent",
        backgroundColor: scrolled ? "color-mix(in srgb, var(--bg-page) 88%, transparent)" : "transparent",
        backdropFilter:  scrolled ? "blur(16px)" : "none",
        transition:      "background-color 300ms ease, border-color 300ms ease, backdrop-filter 300ms ease",
      }}
    >
      <nav
        className="page-gutter"
        style={{
          maxWidth:       "1280px",
          margin:         "0 auto",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          height:         "64px",
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          style={{
            fontFamily:    "var(--font-display)",
            fontSize:      "1.125rem",
            fontWeight:    300,
            letterSpacing: "-0.02em",
            color:         "var(--text-primary)",
            textDecoration: "none",
          }}
        >
          Anderson Wang
        </Link>

        {/* Nav links */}
        <ul
          style={{
            display:    "flex",
            alignItems: "center",
            gap:        "2rem",
            listStyle:  "none",
            margin:     0,
            padding:    0,
          }}
        >
          {links.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <li key={href}>
                <Link
                  href={href}
                  style={{
                    fontFamily:    "var(--font-body)",
                    fontSize:      "0.875rem",
                    fontWeight:    500,
                    letterSpacing: "0.04em",
                    color:         active ? "var(--accent)" : "var(--text-secondary)",
                    textDecoration: "none",
                    transition:    "color 150ms ease",
                    position:      "relative",
                  }}
                  className="nav-link"
                >
                  {label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      style={{
                        position:        "absolute",
                        bottom:          "-4px",
                        left:            0,
                        right:           0,
                        height:          "1px",
                        backgroundColor: "var(--accent)",
                      }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.header>
  );
}
