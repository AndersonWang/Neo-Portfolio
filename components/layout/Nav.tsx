"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const links = [
  { href: "/work",          label: "Work"          },
  { href: "/design-system", label: "Design System" },
  { href: "/about",         label: "About"         },
  { href: "/contact",       label: "Contact"       },
];

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4"/>
      <line x1="12" y1="2"  x2="12" y2="4"/>
      <line x1="12" y1="20" x2="12" y2="22"/>
      <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="2"  y1="12" x2="4"  y2="12"/>
      <line x1="20" y1="12" x2="22" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function Nav() {
  const pathname  = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  return (
    <motion.header
      initial={{ opacity: 1, y: 0 }}
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
            textDecoration: "none",
            flexShrink:    0,
            display:       "flex",
            alignItems:    "center",
          }}
        >
          <img
            src={mounted && resolvedTheme === "dark" ? "/wordmark-dark.svg" : "/wordmark.svg"}
            alt="Anderson Wang"
            style={{
              height: "28px",
              width:  "auto",
            }}
          />
        </Link>

        {/* Nav links + theme toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
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

          {/* Theme toggle */}
          {mounted && (
            <motion.button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.15 }}
              style={{
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "center",
                width:           "36px",
                height:          "36px",
                borderRadius:    "var(--radius-full)",
                border:          "1px solid var(--border-default)",
                backgroundColor: "transparent",
                color:           "var(--text-secondary)",
                cursor:          "pointer",
                flexShrink:      0,
                transition:      "color 150ms ease, border-color 150ms ease, background-color 150ms ease",
              }}
            >
              {resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
            </motion.button>
          )}
        </div>
      </nav>
    </motion.header>
  );
}
