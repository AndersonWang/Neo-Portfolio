"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// ── Types ────────────────────────────────────────────────────────────────────

type HoveredPill = "past" | "future" | null;

// ── Constants ────────────────────────────────────────────────────────────────

const CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン" +
  "三能發等面人生學子出後之以定多學是電在和以發主家" +
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// Route targets — update when /experiments page is added
const ROUTES: Record<"past" | "future", string> = {
  past:   "/work",
  future: "/work", // TODO: update to /experiments when that page exists
};

// ── Component ────────────────────────────────────────────────────────────────

export default function HeroMatrixPaths() {
  const router    = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animIdRef = useRef<number | undefined>(undefined);

  // Animation state lives in refs — no re-render needed
  const targetTRef  = useRef(0); // 0 = green, 1 = amber
  const currentTRef = useRef(0);

  // React state only for CSS transitions on pills / descriptions
  const [hovered, setHovered] = useState<HoveredPill>(null);

  // Sync hover → targetT
  useEffect(() => {
    targetTRef.current = hovered === "past" ? 1 : 0;
  }, [hovered]);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cols: number;
    let drops: number[];

    const resize = () => {
      canvas.width  = canvas.parentElement?.clientWidth  || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      cols  = Math.floor(canvas.width / 20);
      drops = Array.from({ length: cols }, () => -Math.random() * canvas.height / 20);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;

      // Smooth lerp toward target hue
      currentTRef.current += (targetTRef.current - currentTRef.current) * 0.05;
      const t = currentTRef.current;

      // Background: dark green ↔ dark amber
      const bgR = Math.round(5  + (20 - 5)  * t);
      const bgG = Math.round(10 + (8  - 10) * t);
      const bgB = Math.round(5  + (2  - 5)  * t);
      ctx.fillStyle = `rgba(${bgR},${bgG},${bgB},0.065)`;
      ctx.fillRect(0, 0, W, H);

      ctx.font = "14px monospace";

      for (let i = 0; i < drops.length; i++) {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        const y  = drops[i] * 20;

        const isHead = Math.random() > 0.88;
        if (isHead) {
          // Head char: white-green ↔ white-amber
          const hR = Math.round(180 + (255 - 180) * t);
          const hG = Math.round(255 + (200 - 255) * t);
          const hB = Math.round(180 + (80  - 180) * t);
          ctx.fillStyle   = `rgb(${hR},${hG},${hB})`;
          ctx.shadowColor = t < 0.5
            ? `rgba(0,255,65,${0.8 * (1 - t * 2)})`
            : `rgba(255,160,0,${0.8 * (t - 0.5) * 2})`;
          ctx.shadowBlur = 8;
        } else {
          // Body chars: green ↔ amber
          const r   = Math.round(0   + (180 - 0)   * t);
          const g   = Math.round(160 + (100 - 160) * t);
          const b   = Math.round(40  + (0   - 40)  * t);
          const dim = Math.random() > 0.5 ? 1 : 0.4;
          ctx.fillStyle = `rgba(${r},${g},${b},${dim})`;
          ctx.shadowBlur = 0;
        }

        ctx.fillText(ch, i * 20, y);
        ctx.shadowBlur = 0;

        if (y > H && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.4;
      }

      animIdRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
    };
  }, []);

  const handleNavigate = (side: "past" | "future") => {
    router.push(ROUTES[side]);
  };

  return (
    <div
      style={{
        position:   "relative",
        width:      "100%",
        minHeight:  "100svh",
        overflow:   "hidden",
        background: "#050A05",
        display:    "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Matrix rain canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{
          position: "absolute",
          inset:    0,
          width:    "100%",
          height:   "100%",
          display:  "block",
        }}
      />

      {/* Vignette */}
      <div
        aria-hidden
        style={{
          position:   "absolute",
          inset:      0,
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.65) 100%)",
          zIndex:     2,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position:      "relative",
          zIndex:        10,
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          textAlign:     "center",
          padding:       "clamp(4rem, 10vw, 6rem) 2rem",
        }}
      >
        <h1
          style={{
            fontFamily:    "var(--font-display)",
            fontSize:      "clamp(2rem, 5vw, 3.75rem)",
            fontWeight:    300,
            lineHeight:    1.08,
            letterSpacing: "-0.03em",
            color:         "#fff",
            marginBottom:  "1rem",
            textShadow:    "0 2px 40px rgba(0,0,0,0.6)",
            maxWidth:      "820px",
          }}
        >
          Which side of me are<br />you most interested in?
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize:   "1.0625rem",
            color:      "rgba(255,255,255,0.45)",
            marginBottom: "2.75rem",
            letterSpacing: "0.01em",
          }}
        >
          The choice is yours.
        </p>

        {/* Pills + descriptions */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>

          {/* Pill row */}
          <div style={{ display: "flex", gap: "1.25rem" }}>
            <button
              onMouseEnter={() => setHovered("past")}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleNavigate("past")}
              style={{
                padding:      "0.9rem 2.4rem",
                borderRadius: "100px",
                fontSize:     "1rem",
                fontWeight:   600,
                fontFamily:   "var(--font-body)",
                cursor:       "pointer",
                border:       "none",
                letterSpacing: "0.01em",
                background:   "#C0392B",
                color:        "#fff",
                boxShadow:    hovered === "past"
                  ? "0 10px 40px rgba(192,57,43,0.65)"
                  : "0 6px 28px rgba(192,57,43,0.45)",
                opacity:   hovered === "future" ? 0.38 : 1,
                transform: hovered === "past"
                  ? "scale(1.06) translateY(-3px)"
                  : hovered === "future"
                  ? "scale(0.93)"
                  : "scale(1)",
                transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease, opacity 0.3s ease",
              }}
            >
              the past
            </button>

            <button
              onMouseEnter={() => setHovered("future")}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleNavigate("future")}
              style={{
                padding:      "0.9rem 2.4rem",
                borderRadius: "100px",
                fontSize:     "1rem",
                fontWeight:   600,
                fontFamily:   "var(--font-body)",
                cursor:       "pointer",
                border:       "none",
                letterSpacing: "0.01em",
                background:   "#2471A3",
                color:        "#fff",
                boxShadow:    hovered === "future"
                  ? "0 10px 40px rgba(52,152,219,0.65)"
                  : "0 6px 28px rgba(36,113,163,0.45)",
                opacity:   hovered === "past" ? 0.38 : 1,
                transform: hovered === "future"
                  ? "scale(1.06) translateY(-3px)"
                  : hovered === "past"
                  ? "scale(0.93)"
                  : "scale(1)",
                transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease, opacity 0.3s ease",
              }}
            >
              the future
            </button>
          </div>

          {/* Description row */}
          <div
            style={{
              display: "flex",
              gap:     "1.25rem",
              maxWidth: "520px",
              width:   "100%",
            }}
          >
            {/* Past description */}
            <p
              style={{
                flex:          1,
                textAlign:     "center",
                fontSize:      "0.8125rem",
                fontFamily:    "var(--font-mono)",
                letterSpacing: "0.02em",
                lineHeight:    1.6,
                color: hovered === "past"
                  ? "rgba(255,180,80,0.95)"
                  : hovered === "future"
                  ? "rgba(255,255,255,0.12)"
                  : "rgba(255,255,255,0.3)",
                textShadow: hovered === "past"
                  ? "0 0 20px rgba(255,140,0,0.4)"
                  : "none",
                padding:    "0 0.5rem",
                transition: "color 0.4s ease, text-shadow 0.4s ease",
              }}
            >
              Proven craft.<br />
              Systems thinking.<br />
              Works that got me here.
            </p>

            {/* Future description */}
            <p
              style={{
                flex:          1,
                textAlign:     "center",
                fontSize:      "0.8125rem",
                fontFamily:    "var(--font-mono)",
                letterSpacing: "0.02em",
                lineHeight:    1.6,
                color: hovered === "future"
                  ? "rgba(120,190,255,0.95)"
                  : hovered === "past"
                  ? "rgba(255,255,255,0.12)"
                  : "rgba(255,255,255,0.3)",
                textShadow: hovered === "future"
                  ? "0 0 20px rgba(52,152,219,0.5)"
                  : "none",
                padding:    "0 0.5rem",
                transition: "color 0.4s ease, text-shadow 0.4s ease",
              }}
            >
              AI-native process.<br />
              Experiments.<br />
              Where I&apos;m heading.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
