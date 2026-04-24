interface StatProps {
  value:    string;
  label:    string;
  sublabel?: string;
}

interface StatRowProps {
  children: React.ReactNode;
}

export function StatRow({ children }: StatRowProps) {
  return (
    <div style={{
      display:             "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
      gap:                 "1px",
      backgroundColor:     "var(--border-default)",
      border:              "1px solid var(--border-default)",
      borderRadius:        "var(--radius-lg)",
      overflow:            "hidden",
      margin:              "2.5rem 0",
    }}>
      {children}
    </div>
  );
}

export function Stat({ value, label, sublabel }: StatProps) {
  return (
    <div style={{
      padding:         "1.75rem",
      backgroundColor: "var(--bg-surface)",
      display:         "flex",
      flexDirection:   "column",
      gap:             "0.25rem",
    }}>
      <p style={{
        fontFamily:    "var(--font-display)",
        fontSize:      "2.5rem",
        fontWeight:    300,
        letterSpacing: "-0.03em",
        lineHeight:    1,
        color:         "var(--accent)",
        margin:        0,
      }}>
        {value}
      </p>
      <p style={{
        fontFamily: "var(--font-body)",
        fontSize:   "0.875rem",
        fontWeight: 500,
        color:      "var(--text-primary)",
        margin:     0,
      }}>
        {label}
      </p>
      {sublabel && (
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize:   "0.8125rem",
          color:      "var(--text-muted)",
          margin:     0,
        }}>
          {sublabel}
        </p>
      )}
    </div>
  );
}
