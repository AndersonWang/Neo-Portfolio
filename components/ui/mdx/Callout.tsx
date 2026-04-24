import { CSSProperties } from "react";

type CalloutType = "insight" | "metric" | "quote" | "warning";

interface CalloutProps {
  type?:     CalloutType;
  label?:    string;
  children:  React.ReactNode;
}

const styles: Record<CalloutType, { bg: string; border: string; labelColor: string }> = {
  insight: {
    bg:         "var(--accent-subtle)",
    border:     "var(--accent)",
    labelColor: "var(--accent)",
  },
  metric: {
    bg:         "rgba(135,170,97,0.08)",
    border:     "#87AA61",
    labelColor: "#567A35",
  },
  quote: {
    bg:         "var(--bg-raised)",
    border:     "var(--border-strong)",
    labelColor: "var(--text-muted)",
  },
  warning: {
    bg:         "rgba(217,119,6,0.08)",
    border:     "var(--status-warning)",
    labelColor: "var(--status-warning)",
  },
};

const defaultLabels: Record<CalloutType, string> = {
  insight: "Key Insight",
  metric:  "Result",
  quote:   "Quote",
  warning: "Note",
};

export default function Callout({ type = "insight", label, children }: CalloutProps) {
  const { bg, border, labelColor } = styles[type];
  return (
    <div
      style={{
        backgroundColor: bg,
        borderLeft:      `3px solid ${border}`,
        borderRadius:    "0 var(--radius-md) var(--radius-md) 0",
        padding:         "1.25rem 1.5rem",
        margin:          "2rem 0",
      }}
    >
      <p style={{
        fontFamily:    "var(--font-mono)",
        fontSize:      "0.6875rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color:         labelColor,
        margin:        "0 0 0.5rem",
      }}>
        {label ?? defaultLabels[type]}
      </p>
      <div style={{
        fontFamily: "var(--font-body)",
        fontSize:   "1rem",
        lineHeight: 1.65,
        color:      "var(--text-primary)",
      }}>
        {children}
      </div>
    </div>
  );
}
