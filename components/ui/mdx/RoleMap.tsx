interface RoleEntry {
  name: string;
  role: string;
  org:  string;
}

interface RoleMapProps {
  roles?: RoleEntry[];
}

export default function RoleMap({ roles = [] }: RoleMapProps) {
  if (!roles.length) return null;
  return (
    <div
      style={{
        display:             "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))",
        gap:                 "0.75rem",
        margin:              "1.5rem 0",
      }}
    >
      {roles.map(({ name, role, org }) => (
        <div
          key={`${name}-${role}`}
          style={{
            padding:         "1rem 1.25rem",
            borderRadius:    "var(--radius-md)",
            border:          "1px solid var(--border-default)",
            backgroundColor: "var(--bg-surface)",
          }}
        >
          <p style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "0.6875rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color:         "var(--text-muted)",
            margin:        "0 0 0.25rem",
          }}>
            {org}
          </p>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize:   "0.9375rem",
            fontWeight: 600,
            color:      "var(--text-primary)",
            margin:     "0 0 0.125rem",
          }}>
            {name}
          </p>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize:   "0.8125rem",
            color:      "var(--text-secondary)",
            margin:     0,
          }}>
            {role}
          </p>
        </div>
      ))}
    </div>
  );
}
