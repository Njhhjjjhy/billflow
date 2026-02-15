"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@billflow/ui/lib/gsap";
import { EmailSignupForm } from "./EmailSignupForm";
import { InvoiceIllustration } from "./InvoiceIllustration";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Make everything visible immediately if reduced motion
    const elements = [badgeRef.current, subRef.current, formRef.current, illustrationRef.current];
    if (prefersReducedMotion) {
      elements.forEach((el) => {
        if (el) el.style.opacity = "1";
      });
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".hero-word");
        words.forEach((w) => ((w as HTMLElement).style.opacity = "1"));
      }
      return;
    }

    // Set initial states
    elements.forEach((el) => {
      if (el) gsap.set(el, { opacity: 0, y: 30 });
    });

    // Split headline into words and set initial state
    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll(".hero-word");
      gsap.set(words, { opacity: 0, y: 20 });
    }

    // Build timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.5 });

    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll(".hero-word");
      tl.to(words, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, "-=0.2");
    }

    tl.to(subRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");
    tl.to(formRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");
    tl.to(illustrationRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.6 }, "-=0.3");

    // Set illustration initial scale
    if (illustrationRef.current) {
      gsap.set(illustrationRef.current, { scale: 0.9 });
    }

    return () => {
      tl.kill();
    };
  }, []);

  const headlineParts = [
    { text: "Invoice in", highlight: false },
    { text: "2 Minutes.", highlight: true },
    { text: "Get Paid", highlight: false },
    { text: "Faster.", highlight: true },
  ];

  return (
    <section ref={sectionRef} className="pt-40 pb-32 lg:pt-48 lg:pb-40">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Overline badge */}
        <div ref={badgeRef} className="mb-8" style={{ opacity: 0 }}>
          <span
            className="inline-flex items-center gap-2 bg-[var(--color-accent-yellow)] border-2 border-black rounded-full px-5 py-2 text-sm font-bold text-[var(--color-text-primary)] shadow-[var(--shadow-sm)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span aria-hidden="true">🇹🇼</span>
            Built for freelancers in Taiwan
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-5xl lg:text-7xl font-bold tracking-tight text-[var(--color-text-primary)] mb-8 leading-[1.1]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {headlineParts.map((part) => (
            <span
              key={part.text}
              className={`hero-word inline-block mr-[0.3em] ${
                part.highlight
                  ? "relative"
                  : ""
              }`}
              style={{ opacity: 0 }}
            >
              {part.text}
              {part.highlight && (
                <span
                  className="absolute bottom-1 left-0 right-0 h-[0.3em] bg-[var(--color-accent-yellow)] -z-10 -skew-x-2"
                  aria-hidden="true"
                />
              )}
            </span>
          ))}
        </h1>

        {/* Sub-headline */}
        <p
          ref={subRef}
          className="text-lg lg:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-12"
          style={{ fontFamily: "var(--font-body)", opacity: 0 }}
        >
          Bilingual invoices, Taiwan tax compliance, and payment tracking — all in one tool. Stop
          juggling spreadsheets.
        </p>

        {/* Email signup */}
        <div ref={formRef} id="signup" className="max-w-lg mx-auto mb-20" style={{ opacity: 0 }}>
          <EmailSignupForm variant="light" />
        </div>

        {/* Invoice illustration */}
        <div ref={illustrationRef} style={{ opacity: 0 }}>
          <InvoiceIllustration />
        </div>
      </div>
    </section>
  );
}
