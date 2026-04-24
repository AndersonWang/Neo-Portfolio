export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen page-gutter">
      <p
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--text-muted)",
          fontSize: "0.875rem",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        Anderson Wang · Portfolio
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3rem, 6.5vw, 7rem)",
          fontWeight: 300,
          lineHeight: 1.0,
          letterSpacing: "-0.03em",
          color: "var(--text-primary)",
          marginTop: "1rem",
        }}
      >
        Coming soon.
      </h1>
    </main>
  );
}
