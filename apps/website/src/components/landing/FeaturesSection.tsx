"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@billflow/ui/lib/gsap";
import { Languages, ShieldCheck, Coins, FileDown, Users, TrendingUp } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

const features = [
  {
    icon: Languages,
    title: "Bilingual Invoicing",
    description: "Create invoices in English and Chinese. Switch languages with one click.",
    color: "#2563EB",
  },
  {
    icon: ShieldCheck,
    title: "Taiwan Tax Compliance",
    description: "Handles 統一發票 formatting, 5% 營業稅 calculation, and 統一編號 validation automatically.",
    color: "#16A34A",
  },
  {
    icon: Coins,
    title: "Multi-Currency Support",
    description: "Bill in TWD, USD, or EUR with exchange rates built in.",
    color: "#F97316",
  },
  {
    icon: FileDown,
    title: "PDF Export",
    description: "Download or email professional PDFs with full Chinese character support.",
    color: "#DC2626",
  },
  {
    icon: Users,
    title: "Client Management",
    description: "Keep all your clients organized with Taiwan-specific fields like LINE ID and tax numbers.",
    color: "#7C3AED",
  },
  {
    icon: TrendingUp,
    title: "Payment Tracking",
    description: "See who\u2019s paid, who hasn\u2019t, and what\u2019s overdue at a glance.",
    color: "#FACC15",
  },
];

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        gsap.set(headingRef.current, { opacity: 0, y: 40 });
        gsap.to(headingRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }

      // Cards stagger animation
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.set(cards, { opacity: 0, y: 60 });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-3xl lg:text-5xl font-bold text-center text-[var(--color-text-primary)] mb-16"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Everything You Need to Invoice in Taiwan
        </h2>

        {/* Feature grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
