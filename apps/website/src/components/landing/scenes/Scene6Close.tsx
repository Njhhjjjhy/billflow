"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@billflow/ui/lib/gsap";
import { EmailSignupForm } from "../EmailSignupForm";

export function Scene6Close() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) {
      [headingRef, subRef, formRef, trustRef].forEach((r) => {
        if (r.current) r.current.style.opacity = "1";
      });
      return;
    }

    gsap.set(headingRef.current, { opacity: 0, y: 40 });
    gsap.set(subRef.current, { opacity: 0, y: 30 });
    gsap.set(formRef.current, { opacity: 0, y: 30 });
    gsap.set(trustRef.current, { opacity: 0, y: 20 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "top 20%",
        scrub: false,
        once: true,
      },
    });

    tl.to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
    });

    tl.to(subRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    }, "-=0.4");

    tl.to(formRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    }, "-=0.3");

    tl.to(trustRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power3.out",
    }, "-=0.2");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--color-primary-800)] border-t-3 border-black py-32 lg:py-40"
      style={{ borderTopWidth: "3px" }}
      aria-label="Sign up for early access"
    >
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        {/* Headline */}
        <div ref={headingRef} style={{ opacity: 0 }}>
          <h2
            className="text-3xl lg:text-6xl font-bold text-white leading-tight mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Stop working past midnight.
          </h2>
          <h2
            className="text-3xl lg:text-6xl font-bold text-[var(--color-accent-yellow)] leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Start getting paid on time.
          </h2>
        </div>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="mt-6 text-lg text-white/70 max-w-xl mx-auto"
          style={{ fontFamily: "var(--font-body)", opacity: 0 }}
        >
          Bilingual invoices. Taiwan tax compliance. Payment tracking. All in one tool.
        </p>

        {/* Email form */}
        <div ref={formRef} id="signup" className="mt-10 max-w-lg mx-auto" style={{ opacity: 0 }}>
          <EmailSignupForm variant="dark" />
        </div>

        {/* Trust signals */}
        <div ref={trustRef} className="mt-10 flex flex-wrap items-center justify-center gap-6" style={{ opacity: 0 }}>
          {[
            { icon: "✓", text: "統一發票 compliant" },
            { icon: "🌐", text: "English & 中文" },
            { icon: "⚡", text: "2 minute setup" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-2 text-sm text-white/60"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span aria-hidden="true">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
