"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@billflow/ui/lib/gsap";

const LINES = [
  "It's 11:47 PM.",
  "You just delivered the project.",
  "",
  "Now comes the part nobody warned you about.",
];

export function Scene1Setup() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !sectionRef.current || !linesRef.current) {
      // Show everything immediately
      if (linesRef.current) {
        const spans = linesRef.current.querySelectorAll(".line-text");
        spans.forEach((s) => ((s as HTMLElement).style.clipPath = "none"));
      }
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
      return;
    }

    const lineEls = linesRef.current.querySelectorAll(".line-text");

    // Each line gets a portion of the scroll progress
    // Total "characters" across all lines for proportional timing
    const totalChars = LINES.reduce((sum, l) => sum + Math.max(l.length, 1), 0);
    let accumulated = 0;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        scrub: 0.3,
        pinSpacing: true,
      },
    });

    lineEls.forEach((el, i) => {
      const line = LINES[i];
      if (!line) {
        // Empty line — just a pause
        const start = accumulated / totalChars;
        accumulated += 1;
        tl.to({}, { duration: 0.05 }, start);
        return;
      }

      const start = accumulated / totalChars;
      const duration = line.length / totalChars;
      accumulated += line.length;

      // Reveal via clip-path from left to right
      tl.fromTo(
        el,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration,
          ease: "none",
        },
        start
      );
    });

    // Fade out everything at the end
    tl.to(
      linesRef.current,
      { opacity: 0, duration: 0.1, ease: "power2.in" },
      0.9
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative h-[200vh] bg-[#0F172A]"
      aria-label="Scene: It's late at night, you just finished a project"
    >
      <div className="h-screen flex items-center justify-center">
        <div
          ref={linesRef}
          className="max-w-3xl px-6 text-center"
        >
          {LINES.map((line, i) =>
            line === "" ? (
              <div key={i} className="h-8" />
            ) : (
              <p
                key={i}
                className={`line-text mb-4 ${
                  i === LINES.length - 1
                    ? "text-2xl lg:text-4xl font-bold text-white"
                    : "text-xl lg:text-3xl text-white/80"
                }`}
                style={{
                  fontFamily: "var(--font-mono)",
                  clipPath: "inset(0 100% 0 0)",
                }}
              >
                {line}
                {i === LINES.length - 1 && (
                  <span
                    ref={cursorRef}
                    className="inline-block w-[3px] h-[1em] bg-white ml-1 align-text-bottom animate-pulse"
                    aria-hidden="true"
                  />
                )}
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
}
