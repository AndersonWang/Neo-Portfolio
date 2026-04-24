import { CSSProperties } from "react";

type TagColor = "amethyst" | "lilac" | "rose" | "gold" | "peridot" | "neutral";
type TagSize  = "sm" | "md";

interface TagProps {
  label:    string;
  color?:   TagColor;
  size?:    TagSize;
  style?:   CSSProperties;
}

// Each color maps to a background + text pair using CSS variables / raw values
const colorMap: Record<TagColor, { bg: string; text: string; border: string }> = {
  amethyst: { bg: "var(--accent-subtle)",       text: "var(--accent)",        border: "var(--accent)" },
  lilac:    { bg: "rgba(191,146,240,0.12)",      text: "#8A50C8",              border: "#CF9FF5"       },
  rose:     { bg: "rgba(215,143,141,0.12)",      text: "#B05F5D",              border: "#E3AAAA"       },
  gold:     { bg: "rgba(219,161,102,0.12)",      text: "#B07030",              border: "#E8C08A"       },
  peridot:  { bg: "rgba(135,170,97,0.12)",       text: "#567A35",              border: "#A8C882"       },
  neutral:  { bg: "var(--bg-raised)",            text: "var(--text-secondary)",border: "var(--border-default)" },
};

const sizeMap: Record<TagSize, CSSProperties> = {
  sm: { height: "22px", padding: "0 0.5rem",  fontSize: "0.625rem", letterSpacing: "0.08em" },
  md: { height: "28px", padding: "0 0.75rem", fontSize: "0.75rem",  letterSpacing: "0.06em" },
};

export default function Tag({ label, color = "neutral", size = "md", style }: TagProps) {
  const { bg, text, border } = colorMap[color];
  return (
    <span
      style={{
        display:        "inline-flex",
        alignItems:     "center",
        borderRadius:   "var(--radius-full)",
        fontFamily:     "var(--font-body)",
        fontWeight:     500,
        textTransform:  "uppercase",
        border:         `1px solid ${border}`,
        backgroundColor: bg,
        color:          text,
        whiteSpace:     "nowrap",
        ...sizeMap[size],
        ...style,
      }}
    >
      {label}
    </span>
  );
}
