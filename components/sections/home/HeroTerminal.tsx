"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// ── Constants ────────────────────────────────────────────────────────────────

const CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン" +
  "三能發等面人生學子出後之以定多學是電在和" +
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// Route targets — update when /experiments page is added
const ROUTES: Record<"past" | "future", string> = {
  past:   "/work",
  future: "/work", // TODO: update to /experiments when that page exists
};

// ── Sequence data ─────────────────────────────────────────────────────────────

type LineStyle =
  | "prompt" | "dim" | "gap" | "bright"
  | "white" | "amber" | "success" | "error";

interface SequenceLine {
  style: LineStyle;
  text:  string;
  delay: number; // ms after previous line
}

const SEQUENCE: SequenceLine[] = [
  { style: "prompt",  text: "$ ssh anderson@wang.design",                          delay: 400  },
  { style: "dim",     text: "Connected to portfolio.v2",                           delay: 120  },
  { style: "gap",     text: "",                                                    delay: 80   },
  { style: "dim",     text: "Authenticating...",                                   delay: 200  },
  { style: "success", text: "✓ Identity confirmed",                                delay: 180  },
  { style: "gap",     text: "",                                                    delay: 60   },
  { style: "dim",     text: "> Loading profile...",                                delay: 150  },
  { style: "white",   text: "  name:           Anderson Wang",                     delay: 80   },
  { style: "white",   text: "  role:           Senior Product Designer",           delay: 80   },
  { style: "white",   text: "  specialization: Systems Thinking + AI-Native Workflow", delay: 80 },
  { style: "white",   text: "  years_exp:      10+",                               delay: 80   },
  { style: "gap",     text: "",                                                    delay: 80   },
  { style: "dim",     text: "> Scanning modules...",                               delay: 200  },
  { style: "white",   text: "  [■■■■■■■■░░]  legacy_work.pkg      ━━ READY",      delay: 120  },
  { style: "amber",   text: "  [■■■■■░░░░░]  ai_native.pkg        ━━ LOADING",    delay: 120  },
  { style: "gap",     text: "",                                                    delay: 100  },
  { style: "bright",  text: "> Which module would you like to initialize?",        delay: 300  },
];

// ── Line colour map ───────────────────────────────────────────────────────────

const LINE_COLORS: Record<LineStyle, string> = {
  prompt:  "rgba(0,255,65,0.45)",
  dim:     "rgba(0,255,65,0.25)",
  gap:     "transparent",
  bright:  "#00FF41",
  white:   "rgba(255,255,255,0.85)",
  amber:   "#FFA500",
  success: "#00FF41",
  error:   "#FF6B6B",
};

// ── Component ────────────────────────────────────────────────────────────────

export default function HeroTerminal() {
  const router      = useRouter();
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const animIdRef   = useRef<number | undefined>(undefined);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const [visibleLines, setVisibleLines] = useState<SequenceLine[]>([]);
  const [showChoices,  setShowChoices]  = useState(false);
  const [hoveredChoice, setHoveredChoice] = useState<"past" | "future" | null>(null);

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
      cols  = Math.floor(canvas.width / 18);
      drops = Array.from({ length: cols }, () => -Math.random() * canvas.height / 18);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.fillStyle = "rgba(5,10,5,0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "13px monospace";

      for (let i = 0; i < drops.length; i++) {
        const ch     = CHARS[Math.floor(Math.random() * CHARS.length)];
        const y      = drops[i] * 18;
        const isHead = Math.random() > 0.85;
        ctx.fillStyle = isHead ? "#a0ffa0" : Math.random() > 0.5 ? "#00c832" : "#005a15";
        ctx.fillText(ch, i * 18, y);
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.35;
      }
      animIdRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
    };
  }, []);

  // Typewriter sequence
  useEffect(() => {
    let cumulative = 600; // initial pause

    SEQUENCE.forEach((line, idx) => {
      cumulative += line.delay + Math.random() * 60;
      const id = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
      }, cumulative);
      timeoutsRef.current.push(id);

      if (idx === SEQUENCE.length - 1) {
        const choiceId = setTimeout(() => setShowChoices(true), cumulative + 350);
        timeoutsRef.current.push(choiceId);
      }
    });

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, []);

  return (
    <div
      style={{
        position:       "relative",
        width:          "100%",
        minHeight:      "100svh",
        overflow:       "hidden",
        background:     "#050A05",
        display:        "flex",
        alignItems:     "center",
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
          opacity:  0.35,
        }}
      />

      {/* CRT scanline overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset:    0,
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.015) 2px, rgba(0,255,65,0.015) 4px)",
          pointerEvents: "none",
          zIndex:   3,
        }}
      />

      {/* Terminal window */}
      <div
        role="log"
        aria-label="Portfolio terminal"
        style={{
          position:   "relative",
          zIndex:     10,
          width:      "min(680px, 90vw)",
          background: "rgba(0,8,0,0.88)",
          border:     "1px solid rgba(0,255,65,0.2)",
          borderRadius: "10px",
          boxShadow:  "0 0 0 1px rgba(0,255,65,0.08), 0 40px 80px rgba(0,0,0,0.9), 0 0 60px rgba(0,255,65,0.04) inset",
          backdropFilter: "blur(12px)",
          overflow:   "hidden",
          margin:     "2rem",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display:      "flex",
            alignItems:   "center",
            gap:          "0.5rem",
            padding:      "0.75rem 1rem",
            background:   "rgba(0,255,65,0.03)",
            borderBottom: "1px solid rgba(0,255,65,0.1)",
          }}
        >
          {(["#FF5F57", "#FEBC2E", "#28C840"] as const).map((color) => (
            <div
              key={color}
              aria-hidden
              style={{ width: 12, height: 12, borderRadius: "50%", background: color }}
            />
          ))}
          <span
            style={{
              marginLeft:    "auto",
              marginRight:   "auto",
              fontSize:      "0.6875rem",
              fontFamily:    "monospace",
              color:         "rgba(0,255,65,0.35)",
              letterSpacing: "0.08em",
            }}
          >
            anderson_wang.portfolio — bash
          </span>
        </div>

        {/* Body */}
        <div style={{ padding: "1.5rem" }}>

          {/* Lines */}
          <div>
            {visibleLines.map((line, i) => (
              <span
                key={i}
                style={{
                  display:       "block",
                  fontFamily:    "monospace",
                  fontSize:      "0.8125rem",
                  lineHeight:    1.8,
                  whiteSpace:    "pre",
                  color:         LINE_COLORS[line.style],
                  fontWeight:    line.style === "bright" ? "bold" : "normal",
                  minHeight:     line.style === "gap" ? "0.9rem" : undefined,
                }}
              >
                {line.text}
              </span>
            ))}
          </div>

          {/* Choice buttons */}
          {showChoices && (
            <div style={{ marginTop: "0.25rem" }}>
              {(["past", "future"] as const).map((side, i) => (
                <button
                  key={side}
                  onMouseEnter={() => setHoveredChoice(side)}
                  onMouseLeave={() => setHoveredChoice(null)}
                  onClick={() => router.push(ROUTES[side])}
                  style={{
                    display:       "flex",
                    alignItems:    "flex-start",
                    gap:           "1rem",
                    width:         "100%",
                    padding:       "0.875rem 1rem",
                    background:    hoveredChoice === side ? "rgba(0,255,65,0.05)" : "transparent",
                    border:        "none",
                    borderTop:     i === 0
                      ? "1px solid rgba(0,255,65,0.15)"
                      : "1px solid rgba(0,255,65,0.08)",
                    cursor:        "pointer",
                    textAlign:     "left",
                    transition:    "background 0.2s ease",
                  }}
                >
                  <span
                    style={{
                      fontFamily:    "monospace",
                      fontSize:      "0.75rem",
                      color:         "rgba(0,255,65,0.35)",
                      flexShrink:    0,
                      marginTop:     "0.15rem",
                    }}
                  >
                    $
                  </span>
                  <span>
                    <span
                      style={{
                        display:       "block",
                        fontFamily:    "monospace",
                        fontSize:      "0.875rem",
                        color:         hoveredChoice === side
                          ? "#00FF41"
                          : "rgba(0,255,65,0.75)",
                        marginBottom:  "0.2rem",
                        transition:    "color 0.2s",
                      }}
                    >
                      {side === "past"
                        ? "./view_portfolio --mode=legacy"
                        : "./view_portfolio --mode=ai_native"}
                    </span>
                    <span
                      style={{
                        display:       "block",
                        fontFamily:    "monospace",
                        fontSize:      "0.6875rem",
                        color:         "rgba(0,255,65,0.3)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {side === "past"
                        ? "Proven craft · Design systems · Shipped product · A decade of work"
                        : "AI workflow · Experiments · What I'm building next"}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
