"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
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
      className="py-32 bg-[var(--color-primary-600)] border-t-2 border-b-2 border-black"
    >
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2
          ref={headingRef}
          className="text-3xl lg:text-5xl font-bold text-white mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Ready to Simplify Your Invoicing?
        </h2>

        <p
          ref={subRef}
          className="text-lg text-white/80 max-w-xl mx-auto mb-10"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Join our early access list and be the first to know when Billflow launches.
        </p>

        <div ref={formRef} className="max-w-md mx-auto">
          <EmailSignupForm variant="dark" />
        </div>
      </div>
    </section>
  );
}
