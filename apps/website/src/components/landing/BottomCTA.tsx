"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@billflow/ui/lib/gsap";
import { EmailSignupForm } from "./EmailSignupForm";

export function BottomCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const elements = [headingRef.current, subRef.current, formRef.current];
      gsap.set(elements, { opacity: 0, y: 40 });

      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-[var(--color-primary-800)] border-t-3 border-b-3 border-black relative overflow-hidden"
    >
      {/* Subtle dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <span
          className="inline-block text-sm font-bold uppercase tracking-widest text-[var(--color-accent-yellow)] mb-4"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Early Access
        </span>

        <h2
          ref={headingRef}
          className="text-3xl lg:text-5xl font-bold text-white mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Stop Chasing Payments.{" "}
          <span className="text-[var(--color-accent-yellow)]">Start Sending Invoices.</span>
        </h2>

        <p
          ref={subRef}
          className="text-lg text-white/90 max-w-xl mx-auto mb-12"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Join our early access list and be the first to know when Billflow launches.
        </p>

        <div ref={formRef} className="max-w-lg mx-auto">
          <EmailSignupForm variant="dark" />
        </div>
      </div>
    </section>
  );
}
