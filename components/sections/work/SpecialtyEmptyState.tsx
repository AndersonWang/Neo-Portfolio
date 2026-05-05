import type { TagColor } from "@/components/ui/Tag";

interface SpecialtyEmptyStateProps {
  tagColor: TagColor;
  label:    string;
}

const tintMap: Record<TagColor, string> = {
  amethyst: "rgba(124, 58, 237, 0.04)",
  lilac:    "rgba(167, 139, 250, 0.04)",
  rose:     "rgba(244, 114, 182, 0.04)",
  gold:     "rgba(217, 119, 6,   0.04)",
  peridot:  "rgba(101, 163, 13,  0.04)",
  neutral:  "var(--bg-surface)",
};

export default function SpecialtyEmptyState({ tagColor, label }: SpecialtyEmptyStateProps) {
  return (
    <div
      style={{
        backgroundColor: tintMap[tagColor],
        border:          "1px dashed var(--border-strong)",
        borderRadius:    "var(--radius-xl)",
        padding:         "3rem 2rem",
        display:         "flex",
        flexDirection:   "column",
        alignItems:      "center",
        justifyContent:  "center",
        gap:             "0.5rem",
        minHeight:       "200px",
        textAlign:       "center",
      }}
    >
      <p
        style={{
          fontFamily:    "var(--font-mono)",
          fontSize:      "0.6875rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color:         "var(--text-muted)",
          margin:        0,
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize:   "0.9375rem",
          color:      "var(--text-muted)",
          margin:     0,
          maxWidth:   "32ch",
          lineHeight: 1.6,
        }}
      >
        More work in this area is on the way.
      </p>
    </div>
  );
}
