"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@billflow/ui/lib/gsap";

const SPREADSHEET_CELLS = [
  ["Item", "Qty", "Price", "Tax", "Total"],
  ["Design work", "40", "NT$1,500", "5%", "=B2*C2*1.05"],
  ["Consulting", "12", "NT$2,000", "5%", "=B3*C3*1.05"],
  ["Development", "80", "NT$1,800", "5%", "=B4*C4*1.05"],
  ["Translation", "15", "NT$800", "5%", "=B5*C5*1.05"],
  ["Revisions", "8", "NT$1,500", "5%", "=B6*C6*1.05"],
  ["PM hours", "20", "NT$1,200", "5%", "=SUM(E2:E6)"],
];

const BROWSER_TABS = [
  "Tax Calculator — Taiwan",
  "統一發票 format guide",
  "How to invoice in English",
  "TWD to USD converter",
  "Taiwan freelancer tax 2026",
  "Excel invoice template free",
  "營業稅 5% calculator",
];

const EMAIL_NOTIFICATIONS = [
  { from: "Client A", msg: "Where's my invoice?", time: "11:52 PM" },
  { from: "陳先生", msg: "可以重新寄中文版嗎？", time: "12:03 AM" },
  { from: "Acme Corp", msg: "Payment is 43 days late", time: "12:15 AM" },
  { from: "Tax Office", msg: "Did you include 營業稅？", time: "12:24 AM" },
  { from: "Client B", msg: "Wrong currency on invoice", time: "12:31 AM" },
];

export function Scene2Chaos() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const spreadsheetRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const emailsRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) {
      // Show all elements statically
      [spreadsheetRef, tabsRef, emailsRef, clockRef, textRef].forEach((r) => {
        if (r.current) r.current.style.opacity = "1";
      });
      return;
    }

    const els = {
      spreadsheet: spreadsheetRef.current,
      tabs: tabsRef.current,
      emails: emailsRef.current,
      clock: clockRef.current,
      text: textRef.current,
    };

    // Set initial states
    if (els.spreadsheet) gsap.set(els.spreadsheet, { opacity: 0, scale: 0.8, rotateX: 15 });
    if (els.tabs) gsap.set(els.tabs, { opacity: 0, y: -60 });
    if (els.emails) {
      const cards = els.emails.querySelectorAll(".email-card");
      gsap.set(cards, { opacity: 0, x: (i: number) => (i % 2 === 0 ? -200 : 200) });
    }
    if (els.clock) gsap.set(els.clock, { opacity: 0 });
    if (els.text) gsap.set(els.text, { opacity: 0, scale: 0.9 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        scrub: 0.5,
        pinSpacing: true,
      },
    });

    // Phase 1: Spreadsheet appears and tilts in 3D (0% - 25%)
    tl.to(els.spreadsheet, {
      opacity: 1,
      scale: 1,
      rotateX: 5,
      duration: 0.15,
      ease: "power2.out",
    }, 0);

    // Spreadsheet rows appear with stagger
    if (els.spreadsheet) {
      const rows = els.spreadsheet.querySelectorAll(".spreadsheet-row");
      tl.fromTo(
        rows,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, stagger: 0.02, duration: 0.1, ease: "power2.out" },
        0.05
      );
    }

    // Phase 2: Browser tabs pile up (20% - 45%)
    tl.to(els.tabs, {
      opacity: 1,
      y: 0,
      duration: 0.1,
      ease: "power2.out",
    }, 0.2);

    if (els.tabs) {
      const tabs = els.tabs.querySelectorAll(".browser-tab");
      tl.fromTo(
        tabs,
        { opacity: 0, y: -20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.025, duration: 0.15, ease: "back.out(1.7)" },
        0.22
      );
    }

    // Phase 3: Emails slide in from sides (40% - 65%)
    if (els.emails) {
      const cards = els.emails.querySelectorAll(".email-card");
      tl.to(cards, {
        opacity: 1,
        x: 0,
        stagger: 0.03,
        duration: 0.15,
        ease: "power3.out",
      }, 0.4);
    }

    // Phase 4: Clock appears, everything starts jittering (60% - 80%)
    tl.to(els.clock, {
      opacity: 1,
      duration: 0.05,
    }, 0.6);

    // Add jitter to spreadsheet
    tl.to(els.spreadsheet, {
      rotateX: 8,
      rotateY: -3,
      scale: 0.95,
      duration: 0.15,
      ease: "power1.inOut",
    }, 0.65);

    // Phase 5: "There has to be a better way" text (80% - 95%)
    tl.to(els.text, {
      opacity: 1,
      scale: 1,
      duration: 0.08,
      ease: "power3.out",
    }, 0.8);

    // Dim everything else when text appears
    tl.to(
      [els.spreadsheet, els.tabs, els.emails, els.clock],
      { opacity: 0.15, duration: 0.08, ease: "power2.in" },
      0.8
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
      className="relative h-[300vh] bg-[#0F172A] overflow-hidden"
      aria-label="Scene: The chaos of manual invoicing"
    >
      <div className="h-screen relative flex items-center justify-center" style={{ perspective: "1200px" }}>

        {/* Spreadsheet */}
        <div
          ref={spreadsheetRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: 0, transformStyle: "preserve-3d" }}
        >
          <div className="w-[90%] max-w-2xl bg-white/10 border border-white/20 rounded-lg overflow-hidden backdrop-blur-sm">
            {SPREADSHEET_CELLS.map((row, ri) => (
              <div
                key={ri}
                className={`spreadsheet-row grid grid-cols-5 ${
                  ri === 0 ? "bg-white/15 font-bold" : "border-t border-white/10"
                }`}
              >
                {row.map((cell, ci) => (
                  <div
                    key={ci}
                    className={`px-3 py-2 text-xs lg:text-sm truncate ${
                      ri === 0 ? "text-white/90" : "text-white/60"
                    } ${ci >= 3 ? "text-right" : ""}`}
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Browser Tabs */}
        <div
          ref={tabsRef}
          className="absolute top-[8%] left-[5%] right-[5%] flex flex-wrap gap-2"
          style={{ opacity: 0 }}
        >
          {BROWSER_TABS.map((tab, i) => (
            <div
              key={i}
              className="browser-tab flex items-center gap-2 bg-white/10 border border-white/20 rounded-t-lg px-4 py-2 text-xs text-white/70 whitespace-nowrap"
              style={{
                fontFamily: "var(--font-body)",
                transform: `rotate(${(i - 3) * 1.5}deg)`,
              }}
            >
              <span className="w-2 h-2 rounded-full bg-white/30" />
              {tab}
              <span className="text-white/30 ml-1">×</span>
            </div>
          ))}
        </div>

        {/* Email Notifications */}
        <div
          ref={emailsRef}
          className="absolute inset-0 pointer-events-none"
        >
          {EMAIL_NOTIFICATIONS.map((email, i) => {
            const positions = [
              "top-[20%] right-[5%] rotate-2",
              "top-[35%] left-[3%] -rotate-1",
              "bottom-[30%] right-[8%] rotate-3",
              "bottom-[18%] left-[5%] -rotate-2",
              "top-[55%] right-[3%] rotate-1",
            ];
            return (
              <div
                key={i}
                className={`email-card absolute ${positions[i]} w-72 bg-white/10 border border-white/20 rounded-lg p-3 backdrop-blur-sm`}
                style={{ opacity: 0 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white/80" style={{ fontFamily: "var(--font-display)" }}>
                    {email.from}
                  </span>
                  <span className="text-[10px] text-white/40" style={{ fontFamily: "var(--font-mono)" }}>
                    {email.time}
                  </span>
                </div>
                <p className="text-xs text-white/60" style={{ fontFamily: "var(--font-body)" }}>
                  {email.msg}
                </p>
              </div>
            );
          })}
        </div>

        {/* Clock */}
        <div
          ref={clockRef}
          className="absolute top-6 right-6 text-white/40 text-lg"
          style={{ fontFamily: "var(--font-mono)", opacity: 0 }}
        >
          12:34 AM
        </div>

        {/* "There has to be a better way" */}
        <p
          ref={textRef}
          className="absolute inset-0 flex items-center justify-center text-2xl lg:text-5xl font-bold text-white z-10 px-6 text-center"
          style={{ fontFamily: "var(--font-display)", opacity: 0 }}
        >
          There has to be a better way.
        </p>
      </div>
    </div>
  );
}
