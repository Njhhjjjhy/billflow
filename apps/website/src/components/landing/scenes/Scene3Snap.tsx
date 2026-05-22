"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@billflow/ui/lib/gsap";

export function Scene3Snap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const darkOverlayRef = useRef<HTMLDivElement>(null);
  const whiteFlashRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) {
      if (whiteFlashRef.current) whiteFlashRef.current.style.opacity = "1";
      if (logoRef.current) {
        logoRef.current.style.opacity = "1";
        logoRef.current.style.transform = "none";
      }
      if (taglineRef.current) taglineRef.current.style.opacity = "1";
      if (darkOverlayRef.current) darkOverlayRef.current.style.opacity = "0";
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        scrub: 0.2,
        pinSpacing: true,
      },
    });

    // Start: dark screen
    gsap.set(darkOverlayRef.current, { opacity: 1 });
    gsap.set(whiteFlashRef.current, { opacity: 0, scale: 0 });
    gsap.set(logoRef.current, { opacity: 0, scale: 0.5, y: 20 });
    gsap.set(taglineRef.current, { opacity: 0, y: 20 });

    // 0-30%: Dark screen holds tension
    // 30-40%: White circle expands from center (the "snap")
    tl.to(whiteFlashRef.current, {
      opacity: 1,
      scale: 3,
      duration: 0.1,
      ease: "power4.in",
    }, 0.3);

    // 35-45%: Dark overlay fades away
    tl.to(darkOverlayRef.current, {
      opacity: 0,
      duration: 0.1,
      ease: "power2.in",
    }, 0.35);

    // 45-55%: White flash settles
    tl.to(whiteFlashRef.current, {
      scale: 1,
      duration: 0.15,
      ease: "power2.out",
    }, 0.45);

    // 55-70%: Logo appears with spring-like overshoot
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.15,
      ease: "back.out(2)",
    }, 0.55);

    // 70-80%: Tagline fades in
    tl.to(taglineRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.1,
      ease: "power3.out",
    }, 0.7);

    // 85-100%: Everything fades, preparing for next scene
    tl.to([logoRef.current, taglineRef.current], {
      opacity: 0,
      y: -30,
      duration: 0.15,
      ease: "power2.in",
    }, 0.85);

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
      className="relative h-[150vh] bg-white"
      aria-label="Scene: The moment everything changes"
    >
      <div className="h-screen relative flex items-center justify-center overflow-hidden">
        {/* Dark overlay (starts opaque) */}
        <div
          ref={darkOverlayRef}
          className="absolute inset-0 bg-[#0F172A] z-10"
        />

        {/* White flash circle */}
        <div
          ref={whiteFlashRef}
          className="absolute inset-0 z-20 flex items-center justify-center"
          style={{ opacity: 0 }}
        >
          <div
            className="w-[120vmax] h-[120vmax] rounded-full bg-white"
            style={{ transform: "inherit" }}
          />
        </div>

        {/* Logo + tagline */}
        <div className="relative z-30 text-center">
          <div
            ref={logoRef}
            className="inline-block"
            style={{ opacity: 0 }}
          >
            <div
              className="text-5xl lg:text-8xl font-bold text-[var(--color-text-primary)] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Billflow
            </div>
            <div
              className="mt-2 h-2 bg-[var(--color-accent-yellow)] rounded-full mx-auto"
              style={{ width: "60%" }}
            />
          </div>
          <p
            ref={taglineRef}
            className="mt-6 text-lg lg:text-xl text-[var(--color-text-secondary)]"
            style={{ fontFamily: "var(--font-body)", opacity: 0 }}
          >
            Invoicing that just works.
          </p>
        </div>
      </div>
    </div>
  );
}
