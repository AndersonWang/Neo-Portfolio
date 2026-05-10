"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface LightboxImageProps {
  src:      string;
  alt?:     string;
  sizes?:   string;
  /** Optional border radius on the thumbnail */
  radius?:  string;
}

export default function LightboxImage({
  src,
  alt = "",
  sizes = "(max-width: 768px) 100vw, 720px",
  radius = "var(--radius-lg)",
}: LightboxImageProps) {
  const [open, setOpen] = useState(false);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);
  useEffect(() => {
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, handleKey]);

  return (
    <>
      {/* ── Thumbnail ────────────────────────────────────── */}
      <div
        onClick={() => setOpen(true)}
        style={{
          cursor:       "zoom-in",
          overflow:     "hidden",
          borderRadius: radius,
          display:      "block",
          lineHeight:   0,   // removes ghost space below inline img
          // subtle ring on hover — driven by CSS var so it picks up accent colour
          transition:   "box-shadow 200ms ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 0 0 2px var(--accent)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={0}
          height={0}
          sizes={sizes}
          style={{
            width:      "100%",
            height:     "auto",
            display:    "block",
            transition: "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
          }}
        />
      </div>

      {/* ── Lightbox overlay ─────────────────────────────── */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position:        "fixed",
            inset:           0,
            zIndex:          9999,
            backgroundColor: "rgba(10, 9, 8, 0.9)",
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            padding:         "clamp(1rem, 4vw, 3rem)",
            backdropFilter:  "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            animation:       "lightbox-in 200ms ease forwards",
          }}
        >
          {/* Close button */}
          <button
            onClick={(e) => { e.stopPropagation(); setOpen(false); }}
            aria-label="Close image"
            style={{
              position:        "absolute",
              top:             "1.25rem",
              right:           "1.25rem",
              width:           "2.75rem",   /* 44px — WCAG 2.5.5 minimum touch target */
              height:          "2.75rem",
              borderRadius:    "9999px",
              border:          "1px solid rgba(255,255,255,0.2)",
              backgroundColor: "rgba(255,255,255,0.08)",
              color:           "#fff",
              fontSize:        "1.1rem",
              cursor:          "pointer",
              display:         "flex",
              alignItems:      "center",
              justifyContent:  "center",
              lineHeight:      1,
              backdropFilter:  "blur(4px)",
              transition:      "background-color 150ms ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "rgba(255,255,255,0.18)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "rgba(255,255,255,0.08)";
            }}
          >
            ✕
          </button>

          {/* Full image — stop propagation so clicking the image doesn't close */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth:     "90vw",
              maxHeight:    "90vh",
              width:        "auto",
              height:       "auto",
              borderRadius: "var(--radius-lg)",
              boxShadow:    "0 32px 80px rgba(0,0,0,0.6)",
              objectFit:    "contain",
              display:      "block",
            }}
          />
        </div>
      )}

      {/* Keyframe for overlay fade-in */}
      <style>{`
        @keyframes lightbox-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </>
  );
}
