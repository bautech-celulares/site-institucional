import React from "react";
import { cn } from "@/lib/utils";

interface SparklesProps {
  className?: string;
  /** Cor dos pontos (padrão: ciano Bautech) */
  color?: string;
  count?: number;
}

// Posições determinísticas (mesmo HTML no build e no cliente, sem JS)
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const rand = seeded(7);
const DEFAULT_COUNT = 44;
const SPARKLES = Array.from({ length: 80 }, () => ({
  left: Math.round(rand() * 1000) / 10,
  top: Math.round(rand() * 1000) / 10,
  size: Math.round((0.8 + rand() * 1.6) * 10) / 10,
  duration: Math.round((3 + rand() * 4) * 10) / 10,
  delay: Math.round(rand() * 60) / 10,
}));

/** Partículas decorativas em CSS puro: só animam opacidade, sem canvas nem JavaScript. */
export function SparklesCore({
  className,
  color = "#00B1E2",
  count = DEFAULT_COUNT,
}: SparklesProps) {
  return (
    <div aria-hidden="true" className={cn("sparkles", className)}>
      {SPARKLES.slice(0, count).map((p, i) => (
        <span
          key={i}
          className="sparkle"
          style={
            {
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: color,
              "--sparkle-duration": `${p.duration}s`,
              "--sparkle-delay": `-${p.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
