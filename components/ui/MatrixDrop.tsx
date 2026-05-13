"use client";

import { useEffect, useRef } from "react";

const CHINESE  = "三能發等面人生學子出後之以定多學是電在和以發主家到種家";
const KATAKANA = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
const LATIN    = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS  = "0123456789";
const ALL_CHARS = CHINESE + KATAKANA + LATIN + NUMBERS;

interface Column {
  x: number;
  y: number;
  speed: number;
  length: number;
  chars: string[];
  frameCounter: number;
  resetDelay: number;
  isResetting: boolean;
}

interface MatrixDropProps {
  backgroundColor?: string;
  canvasOpacity?: number;
  minSpeed?: number;
  maxSpeed?: number;
  minStreamLength?: number;
  maxStreamLength?: number;
}

export default function MatrixDrop({
  backgroundColor    = "#0D0208",
  canvasOpacity      = 0.85,
  minSpeed           = 1.5,
  maxSpeed           = 3.5,
  minStreamLength    = 8,
  maxStreamLength    = 24,
}: MatrixDropProps) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const columnsRef   = useRef<Column[]>([]);
  const animIdRef    = useRef<number>();
  const cellSize     = 20;

  const getRandomChar = () => ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)];

  const initColumns = (width: number, height: number): Column[] => {
    const count = Math.floor(width / cellSize);
    return Array.from({ length: count }, (_, i) => {
      const length = Math.floor(Math.random() * (maxStreamLength - minStreamLength + 1)) + minStreamLength;
      return {
        x: i * cellSize,
        y: -Math.random() * height,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        length,
        chars: Array.from({ length }, () => getRandomChar()),
        frameCounter: 0,
        resetDelay: 0,
        isResetting: false,
      };
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isTransparent = backgroundColor === "transparent";
    const ctx = canvas.getContext("2d", { alpha: isTransparent });
    if (!ctx) return;

    const resize = () => {
      const width  = canvas.parentElement?.clientWidth  || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width  = width;
      canvas.height = height;
      columnsRef.current = initColumns(width, height);
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      if (isTransparent) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(0,0,0,0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.font = `${cellSize}px monospace`;

      for (const col of columnsRef.current) {
        if (col.isResetting) {
          col.resetDelay -= 1 / 60;
          if (col.resetDelay <= 0) {
            col.y           = -col.length * cellSize;
            col.isResetting = false;
            col.length      = Math.floor(Math.random() * (maxStreamLength - minStreamLength + 1)) + minStreamLength;
            col.chars       = Array.from({ length: col.length }, () => getRandomChar());
            col.speed       = Math.random() * (maxSpeed - minSpeed) + minSpeed;
          }
          continue;
        }

        col.frameCounter++;
        if (col.frameCounter >= 2 && col.frameCounter <= 4 && Math.random() < 0.3) {
          col.chars[Math.floor(Math.random() * col.chars.length)] = getRandomChar();
          col.frameCounter = 0;
        }
        if (col.frameCounter > 4) col.frameCounter = 0;

        for (let i = 0; i < col.length; i++) {
          const charY = col.y + i * cellSize;
          if (charY <= -cellSize || charY >= canvas.height) continue;

          if (i === col.length - 1) {
            ctx.shadowColor = Math.random() > 0.5 ? "#FFFFFF" : "#E0FFE0";
            ctx.shadowBlur  = 10;
            ctx.fillStyle   = ctx.shadowColor;
          } else if (i >= col.length - 3) {
            ctx.shadowColor = "#00FF41";
            ctx.shadowBlur  = 5;
            ctx.fillStyle   = "#00FF41";
          } else if (i >= col.length / 2) {
            ctx.shadowBlur  = 0;
            ctx.fillStyle   = "#008F11";
          } else {
            const opacity   = i / (col.length / 2);
            ctx.shadowBlur  = 0;
            ctx.fillStyle   = `rgba(0,59,0,${opacity})`;
          }

          ctx.fillText(col.chars[i], col.x, charY);
          ctx.shadowBlur = 0;
        }

        col.y += col.speed;

        if (col.y - col.length * cellSize > canvas.height) {
          col.isResetting = true;
          col.resetDelay  = Math.random() * 3;
        }
      }

      animIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
    };
  }, [backgroundColor, canvasOpacity, minSpeed, maxSpeed, minStreamLength, maxStreamLength]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset:    0,
        width:    "100%",
        height:   "100%",
        display:  "block",
        opacity:  canvasOpacity,
      }}
    />
  );
}
