"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface FloatingElementsProps {
  variant: "hero-to-features" | "features-to-cta";
}

interface ShapeConfig {
  type: "circle" | "square" | "cross" | "line";
  color: string;
  size: number;
  x: string;
  y: string;
  speed: number;
  rotation: number;
}

const heroToFeaturesShapes: ShapeConfig[] = [
  { type: "circle", color: "var(--color-accent-yellow)", size: 20, x: "10%", y: "20%", speed: 80, rotation: 0 },
  { type: "square", color: "var(--color-accent-coral)", size: 16, x: "85%", y: "40%", speed: 120, rotation: 45 },
  { type: "cross", color: "var(--color-primary-400)", size: 18, x: "75%", y: "15%", speed: 60, rotation: 15 },
  { type: "line", color: "var(--color-accent-yellow)", size: 30, x: "20%", y: "60%", speed: 100, rotation: -30 },
  { type: "circle", color: "var(--color-primary-300)", size: 12, x: "50%", y: "70%", speed: 90, rotation: 0 },
];

const featuresToCtaShapes: ShapeConfig[] = [
  { type: "square", color: "var(--color-accent-yellow)", size: 14, x: "15%", y: "30%", speed: 70, rotation: 20 },
  { type: "cross", color: "var(--color-accent-coral)", size: 16, x: "80%", y: "50%", speed: 110, rotation: -10 },
  { type: "circle", color: "var(--color-primary-400)", size: 18, x: "60%", y: "20%", speed: 85, rotation: 0 },
  { type: "line", color: "var(--color-accent-coral)", size: 24, x: "30%", y: "65%", speed: 95, rotation: 45 },
];

function renderShape(shape: ShapeConfig) {
  switch (shape.type) {
    case "circle":
      return (
        <circle
          cx={shape.size / 2}
          cy={shape.size / 2}
          r={shape.size / 2}
          fill={shape.color}
        />
      );
    case "square":
      return (
        <rect
          width={shape.size}
          height={shape.size}
          rx={2}
          fill={shape.color}
        />
      );
    case "cross":
      return (
        <g stroke={shape.color} strokeWidth={3} strokeLinecap="round">
          <line x1={shape.size / 2} y1={0} x2={shape.size / 2} y2={shape.size} />
          <line x1={0} y1={shape.size / 2} x2={shape.size} y2={shape.size / 2} />
        </g>
      );
    case "line":
      return (
        <line
          x1={0}
          y1={shape.size / 2}
          x2={shape.size}
          y2={shape.size / 2}
          stroke={shape.color}
          strokeWidth={3}
          strokeLinecap="round"
        />
      );
  }
}

export function FloatingElements({ variant }: FloatingElementsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<(SVGSVGElement | null)[]>([]);

  const shapes = variant === "hero-to-features" ? heroToFeaturesShapes : featuresToCtaShapes;

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      shapesRef.current.forEach((el, i) => {
        if (!el) return;
        const shape = shapes[i];
        gsap.to(el, {
          y: -shape.speed,
          rotation: `+=${shape.rotation}`,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [shapes]);

  // Check reduced motion with matchMedia (SSR-safe via useEffect above)
  return (
    <div
      ref={containerRef}
      className="relative h-24 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {shapes.map((shape, i) => (
        <svg
          key={`${variant}-${i}`}
          ref={(el) => { shapesRef.current[i] = el; }}
          width={shape.size}
          height={shape.size}
          viewBox={`0 0 ${shape.size} ${shape.size}`}
          className="absolute"
          style={{
            left: shape.x,
            top: shape.y,
            transform: `rotate(${shape.rotation}deg)`,
          }}
        >
          {renderShape(shape)}
        </svg>
      ))}
    </div>
  );
}
