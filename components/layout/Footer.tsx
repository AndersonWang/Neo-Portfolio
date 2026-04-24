"use client";

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/in/andersonwang" },
  { label: "Dribbble", href: "https://dribbble.com/andersonwang"   },
  { label: "Read.cv",  href: "https://read.cv/andersonwang"        },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop:   "1px solid var(--border-default)",
        paddingTop:  "2rem",
        paddingBottom: "2rem",
      }}
      className="page-gutter"
    >
      <div
        style={{
          maxWidth:       "1280px",
          margin:         "0 auto",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          flexWrap:       "wrap",
          gap:            "1rem",
        }}
      >
        {/* Copyright */}
        <p
          style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.75rem",
            color:         "var(--text-muted)",
            letterSpacing: "0.04em",
            margin:        0,
          }}
        >
          © {year} Anderson Wang
        </p>

        {/* Social links */}
        <ul
          style={{
            display:   "flex",
            gap:       "1.5rem",
            listStyle: "none",
            margin:    0,
            padding:   0,
          }}
        >
          {socials.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily:    "var(--font-body)",
                  fontSize:      "0.75rem",
                  fontWeight:    500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color:         "var(--text-muted)",
                  textDecoration: "none",
                  transition:    "color 150ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
