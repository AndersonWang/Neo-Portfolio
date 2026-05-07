interface DecisionRecordProps {
  label:      string;
  chosen:     string;
  rejected:   string;
  rationale:  string;
}

export default function DecisionRecord({ label, chosen, rejected, rationale }: DecisionRecordProps) {
  return (
    <div
      style={{
        borderRadius:    "var(--radius-lg)",
        border:          "1px solid var(--border-default)",
        overflow:        "hidden",
        margin:          "2rem 0",
      }}
    >
      {/* Header */}
      <div style={{
        padding:         "0.75rem 1.25rem",
        backgroundColor: "var(--bg-surface)",
        borderBottom:    "1px solid var(--border-default)",
        display:         "flex",
        alignItems:      "center",
        gap:             "0.625rem",
      }}>
        <span style={{
          fontFamily:    "var(--font-mono)",
          fontSize:      "0.6875rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color:         "var(--text-muted)",
        }}>
          Decision
        </span>
        <span style={{
          fontFamily:  "var(--font-body)",
          fontSize:    "0.875rem",
          fontWeight:  600,
          color:       "var(--text-primary)",
        }}>
          {label}
        </span>
      </div>

      {/* Chosen */}
      <div style={{
        display:      "flex",
        gap:          "1rem",
        padding:      "1rem 1.25rem",
        borderBottom: "1px solid var(--border-default)",
        alignItems:   "flex-start",
      }}>
        <span style={{
          fontFamily:      "var(--font-mono)",
          fontSize:        "0.6875rem",
          letterSpacing:   "0.06em",
          textTransform:   "uppercase",
          color:           "var(--status-success)",
          backgroundColor: "rgba(22,163,74,0.08)",
          padding:         "0.2rem 0.5rem",
          borderRadius:    "var(--radius-sm)",
          flexShrink:      0,
          marginTop:       "0.1rem",
        }}>
          Chosen
        </span>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize:   "0.9375rem",
          lineHeight: 1.6,
          color:      "var(--text-primary)",
          margin:     0,
        }}>
          {chosen}
        </p>
      </div>

      {/* Rejected */}
      <div style={{
        display:      "flex",
        gap:          "1rem",
        padding:      "1rem 1.25rem",
        borderBottom: "1px solid var(--border-default)",
        alignItems:   "flex-start",
      }}>
        <span style={{
          fontFamily:      "var(--font-mono)",
          fontSize:        "0.6875rem",
          letterSpacing:   "0.06em",
          textTransform:   "uppercase",
          color:           "var(--text-muted)",
          backgroundColor: "var(--bg-raised)",
          padding:         "0.2rem 0.5rem",
          borderRadius:    "var(--radius-sm)",
          flexShrink:      0,
          marginTop:       "0.1rem",
          textDecoration:  "line-through",
        }}>
          Rejected
        </span>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize:   "0.9375rem",
          lineHeight: 1.6,
          color:      "var(--text-secondary)",
          margin:     0,
        }}>
          {rejected}
        </p>
      </div>

      {/* Rationale */}
      <div style={{
        display:         "flex",
        gap:             "1rem",
        padding:         "1rem 1.25rem",
        backgroundColor: "var(--accent-subtle)",
        alignItems:      "flex-start",
      }}>
        <span style={{
          fontFamily:    "var(--font-mono)",
          fontSize:      "0.6875rem",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color:         "var(--accent)",
          flexShrink:    0,
          marginTop:     "0.1rem",
        }}>
          Why
        </span>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize:   "0.9375rem",
          lineHeight: 1.6,
          color:      "var(--text-primary)",
          margin:     0,
        }}>
          {rationale}
        </p>
      </div>
    </div>
  );
}
