"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@billflow/ui/lib/gsap";

export function Scene5SendPaid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const invoiceCardRef = useRef<HTMLDivElement>(null);
  const sendBtnRef = useRef<HTMLDivElement>(null);
  const sentToastRef = useRef<HTMLDivElement>(null);
  const timePassRef = useRef<HTMLDivElement>(null);
  const paidNotifRef = useRef<HTMLDivElement>(null);
  const paidStampRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) {
      const allRefs = [invoiceCardRef, sendBtnRef, sentToastRef, timePassRef, paidNotifRef, paidStampRef, dashboardRef];
      allRefs.forEach((r) => {
        if (r.current) r.current.style.opacity = "1";
      });
      return;
    }

    // Initial states
    gsap.set(invoiceCardRef.current, { opacity: 0, y: 40 });
    gsap.set(sendBtnRef.current, { opacity: 0, scale: 0.9 });
    gsap.set(sentToastRef.current, { opacity: 0, y: 20, x: 40 });
    gsap.set(timePassRef.current, { opacity: 0 });
    gsap.set(paidNotifRef.current, { opacity: 0, x: 60 });
    gsap.set(paidStampRef.current, { opacity: 0, scale: 1.5, rotation: -30 });
    gsap.set(dashboardRef.current, { opacity: 0, y: 40 });

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

    // 0-12%: Invoice card slides in
    tl.to(invoiceCardRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.12,
      ease: "power3.out",
    }, 0);

    // 12-20%: Send button appears
    tl.to(sendBtnRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.08,
      ease: "back.out(2)",
    }, 0.12);

    // 20-25%: Button "clicks" (press effect)
    tl.to(sendBtnRef.current, {
      scale: 0.95,
      y: 2,
      duration: 0.03,
      ease: "power2.in",
    }, 0.2);
    tl.to(sendBtnRef.current, {
      scale: 1,
      y: 0,
      duration: 0.02,
      ease: "power2.out",
    }, 0.23);

    // 25-30%: Invoice card flies off to the right
    tl.to(invoiceCardRef.current, {
      x: 300,
      opacity: 0,
      rotation: 5,
      duration: 0.08,
      ease: "power3.in",
    }, 0.25);

    // 28-35%: Send button fades, toast slides in
    tl.to(sendBtnRef.current, {
      opacity: 0,
      duration: 0.05,
    }, 0.28);
    tl.to(sentToastRef.current, {
      opacity: 1,
      y: 0,
      x: 0,
      duration: 0.07,
      ease: "back.out(1.5)",
    }, 0.3);

    // 35-42%: Toast fades, time passing appears
    tl.to(sentToastRef.current, {
      opacity: 0,
      duration: 0.05,
    }, 0.38);
    tl.to(timePassRef.current, {
      opacity: 1,
      duration: 0.07,
      ease: "power2.out",
    }, 0.4);

    // 48-55%: Time passing fades, payment notification slides in
    tl.to(timePassRef.current, {
      opacity: 0,
      duration: 0.05,
    }, 0.5);
    tl.to(paidNotifRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.08,
      ease: "power3.out",
    }, 0.55);

    // 60-68%: PAID stamp appears
    tl.to(paidStampRef.current, {
      opacity: 1,
      scale: 1,
      rotation: -12,
      duration: 0.08,
      ease: "back.out(3)",
    }, 0.6);

    // 70-80%: Everything moves up, dashboard peeks in from below
    tl.to([paidNotifRef.current, paidStampRef.current], {
      y: -100,
      opacity: 0,
      duration: 0.1,
      ease: "power2.in",
    }, 0.72);

    tl.to(dashboardRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.12,
      ease: "power3.out",
    }, 0.78);

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
      className="relative h-[250vh] bg-white"
      aria-label="Scene: Send invoice and get paid"
    >
      <div className="h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="relative w-full max-w-3xl">

          {/* Mini invoice card */}
          <div
            ref={invoiceCardRef}
            className="mx-auto w-80 bg-white border-2 border-black rounded-2xl shadow-[var(--shadow-lg)] p-5"
            style={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[var(--color-primary-600)] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>
                Invoice
              </span>
              <span className="text-xs text-[var(--color-text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>
                #BF-0042
              </span>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">Taipei Digital Co.</span>
              </div>
              <div className="h-px bg-[var(--color-border-light)]" />
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">3 items</span>
                <span className="font-bold" style={{ fontFamily: "var(--font-mono)" }}>NT$114,450</span>
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-[var(--color-info-bg)] border border-[var(--color-info-border)] rounded-lg px-2.5 py-1 text-xs font-medium text-[var(--color-info-text)]">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-info-border)]" />
              Ready to send
            </div>
          </div>

          {/* Send button */}
          <div
            ref={sendBtnRef}
            className="mx-auto mt-6 w-fit"
            style={{ opacity: 0 }}
          >
            <div
              className="h-14 px-8 bg-[var(--color-primary-600)] text-white font-bold rounded-xl border-2 border-black shadow-[var(--shadow-lg)] text-base flex items-center gap-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send Invoice
            </div>
          </div>

          {/* Sent toast */}
          <div
            ref={sentToastRef}
            className="absolute top-4 right-4 flex items-center gap-3 bg-white border-2 border-[var(--color-success-border)] rounded-xl px-4 py-3 shadow-[4px_4px_0_0_var(--color-success-border)]"
            style={{ opacity: 0 }}
          >
            <div className="w-8 h-8 rounded-full bg-[var(--color-success-bg)] border-2 border-[var(--color-success-border)] flex items-center justify-center">
              <svg className="w-4 h-4 text-[var(--color-success-border)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold" style={{ fontFamily: "var(--font-display)" }}>Invoice sent!</p>
              <p className="text-xs text-[var(--color-text-tertiary)]">taipei.digital@email.com</p>
            </div>
          </div>

          {/* Time passing */}
          <div
            ref={timePassRef}
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: 0 }}
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
                  <div
                    key={day}
                    className={`w-12 h-12 rounded-xl border-2 border-black flex items-center justify-center text-xs font-bold ${
                      i < 4
                        ? "bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)]"
                        : "bg-[var(--color-success-bg)] text-[var(--color-success-text)] shadow-[var(--shadow-sm)]"
                    }`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <p className="text-sm text-[var(--color-text-tertiary)] italic" style={{ fontFamily: "var(--font-body)" }}>
                A few days later...
              </p>
            </div>
          </div>

          {/* Payment notification */}
          <div
            ref={paidNotifRef}
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: 0 }}
          >
            <div className="bg-white border-3 border-[var(--color-success-border)] rounded-2xl p-6 shadow-[6px_6px_0_0_var(--color-success-border)] text-center max-w-sm" style={{ borderWidth: "3px" }}>
              <div className="w-16 h-16 rounded-full bg-[var(--color-success-bg)] border-2 border-[var(--color-success-border)] flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[var(--color-success-border)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xs uppercase tracking-widest text-[var(--color-success-text)] font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                Payment Received
              </p>
              <p className="text-3xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-mono)" }}>
                NT$114,450
              </p>
              <p className="text-sm text-[var(--color-text-tertiary)] mt-2" style={{ fontFamily: "var(--font-body)" }}>
                From Taipei Digital Co.
              </p>
            </div>
          </div>

          {/* PAID stamp (overlays on payment notification) */}
          <div
            ref={paidStampRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: 0 }}
          >
            <div
              className="text-6xl lg:text-8xl font-bold text-[var(--color-success-border)] border-[6px] border-[var(--color-success-border)] rounded-xl px-8 py-2"
              style={{
                fontFamily: "var(--font-display)",
                transform: "rotate(-12deg)",
                opacity: 0.3,
              }}
            >
              PAID
            </div>
          </div>

          {/* Dashboard glimpse */}
          <div
            ref={dashboardRef}
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: 0 }}
          >
            <div className="w-full max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-tertiary)] mb-4 text-center" style={{ fontFamily: "var(--font-display)" }}>
                Your Dashboard
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Paid this month", value: "NT$345,000", trend: "+8%", color: "success" },
                  { label: "Outstanding", value: "NT$127,500", trend: "3 invoices", color: "info" },
                  { label: "Total clients", value: "24", trend: "+2 new", color: "primary" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white border-2 border-black rounded-xl p-4 shadow-[var(--shadow-md)]"
                  >
                    <p className="text-xs text-[var(--color-text-tertiary)] mb-1" style={{ fontFamily: "var(--font-display)" }}>
                      {stat.label}
                    </p>
                    <p className="text-xl font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                      {stat.value}
                    </p>
                    <p className={`text-xs mt-1 font-medium ${
                      stat.color === "success" ? "text-[var(--color-success-text)]" :
                      stat.color === "info" ? "text-[var(--color-info-text)]" :
                      "text-[var(--color-primary-600)]"
                    }`}>
                      {stat.trend}
                    </p>
                  </div>
                ))}
              </div>

              {/* Mini revenue chart */}
              <div className="mt-4 bg-white border-2 border-black rounded-xl p-4 shadow-[var(--shadow-md)]">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-tertiary)] mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  Revenue (6 months)
                </p>
                <div className="flex items-end gap-2 h-20">
                  {[35, 42, 38, 55, 48, 65].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t-md bg-[var(--color-primary-600)] border border-black/10"
                        style={{ height: `${h}%` }}
                      />
                      <span className="text-[10px] text-[var(--color-text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>
                        {["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
