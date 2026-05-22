"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@billflow/ui/lib/gsap";

const LINE_ITEMS = [
  { desc: "Brand identity design", qty: 1, price: "NT$25,000", amount: "NT$25,000" },
  { desc: "Website development", qty: 40, price: "NT$1,800", amount: "NT$72,000" },
  { desc: "Content translation (EN→中文)", qty: 15, price: "NT$800", amount: "NT$12,000" },
];

export function Scene4Create() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const browserRef = useRef<HTMLDivElement>(null);
  const clientRef = useRef<HTMLDivElement>(null);
  const lineItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const totalRef = useRef<HTMLDivElement>(null);
  const taxRef = useRef<HTMLDivElement>(null);
  const langToggleRef = useRef<HTMLDivElement>(null);
  const invoiceEnRef = useRef<HTMLDivElement>(null);
  const invoiceZhRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) {
      // Show everything
      const allEls = [headingRef, browserRef, clientRef, totalRef, taxRef, langToggleRef, invoiceEnRef];
      allEls.forEach((r) => {
        if (r.current) r.current.style.opacity = "1";
      });
      lineItemRefs.current.forEach((el) => {
        if (el) el.style.opacity = "1";
      });
      return;
    }

    // Initial states
    gsap.set(headingRef.current, { opacity: 0, y: 40 });
    gsap.set(browserRef.current, { opacity: 0, y: 60, scale: 0.95 });
    gsap.set(clientRef.current, { opacity: 0 });
    lineItemRefs.current.forEach((el) => {
      if (el) gsap.set(el, { opacity: 0, x: -30 });
    });
    gsap.set(totalRef.current, { opacity: 0 });
    gsap.set(taxRef.current, { opacity: 0, scale: 0.9 });
    gsap.set(langToggleRef.current, { opacity: 0 });
    gsap.set(invoiceEnRef.current, { opacity: 1 });
    gsap.set(invoiceZhRef.current, { opacity: 0 });

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

    // 0-8%: Heading enters
    tl.to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.08,
      ease: "power3.out",
    }, 0);

    // 8-18%: Browser frame slides in
    tl.to(browserRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.1,
      ease: "power3.out",
    }, 0.08);

    // 18-25%: Client name types in
    tl.to(clientRef.current, {
      opacity: 1,
      duration: 0.07,
      ease: "power2.out",
    }, 0.18);

    // 25-50%: Line items appear one by one
    lineItemRefs.current.forEach((el, i) => {
      if (!el) return;
      tl.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.07,
        ease: "power2.out",
      }, 0.25 + i * 0.08);
    });

    // 50-60%: Total calculates
    tl.to(totalRef.current, {
      opacity: 1,
      duration: 0.08,
      ease: "power2.out",
    }, 0.5);

    // 60-68%: Tax highlight pulse
    tl.to(taxRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.08,
      ease: "back.out(2)",
    }, 0.6);

    // 68-75%: Language toggle appears
    tl.to(langToggleRef.current, {
      opacity: 1,
      duration: 0.07,
      ease: "power2.out",
    }, 0.68);

    // 75-85%: Language flips to Chinese
    tl.to(invoiceEnRef.current, {
      opacity: 0,
      duration: 0.05,
    }, 0.75);
    tl.to(invoiceZhRef.current, {
      opacity: 1,
      duration: 0.05,
    }, 0.78);

    // 88-95%: Flip back to English
    tl.to(invoiceZhRef.current, {
      opacity: 0,
      duration: 0.05,
    }, 0.88);
    tl.to(invoiceEnRef.current, {
      opacity: 1,
      duration: 0.05,
    }, 0.91);

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
      className="relative h-[300vh] bg-[var(--color-bg-secondary)]"
      aria-label="Scene: Create an invoice in 2 minutes"
    >
      <div className="h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-8" style={{ opacity: 0 }}>
          <span
            className="inline-block bg-[var(--color-primary-600)] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border-2 border-black mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            How it works
          </span>
          <h2
            className="text-3xl lg:text-5xl font-bold text-[var(--color-text-primary)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Create an invoice in{" "}
            <span className="relative inline-block">
              2 minutes
              <span className="absolute bottom-1 left-0 right-0 h-[0.3em] bg-[var(--color-accent-yellow)] -z-10 -skew-x-2" />
            </span>
          </h2>
        </div>

        {/* Browser Frame */}
        <div
          ref={browserRef}
          className="w-full max-w-4xl"
          style={{ opacity: 0 }}
        >
          {/* Browser chrome */}
          <div className="bg-[var(--color-bg-tertiary)] border-2 border-black border-b-0 rounded-t-2xl px-4 py-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400 border border-black/20" />
              <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black/20" />
              <div className="w-3 h-3 rounded-full bg-green-400 border border-black/20" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-white border border-black/15 rounded-lg px-3 py-1 text-xs text-[var(--color-text-tertiary)]" style={{ fontFamily: "var(--font-mono)" }}>
                app.billflow.tw/invoices/new
              </div>
            </div>
          </div>

          {/* Invoice form content */}
          <div className="bg-white border-2 border-black rounded-b-2xl shadow-[var(--shadow-lg)] p-6 lg:p-8">
            <div className="grid lg:grid-cols-[1fr_280px] gap-6">
              {/* Left: Form */}
              <div>
                {/* Client */}
                <div ref={clientRef} className="mb-6" style={{ opacity: 0 }}>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2" style={{ fontFamily: "var(--font-display)" }}>
                    Client
                  </label>
                  <div className="border-2 border-black rounded-xl px-4 py-3 bg-white flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>Taipei Digital Co.</div>
                      <div className="text-xs text-[var(--color-text-tertiary)]">台北數位有限公司</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[var(--color-primary-100)] border-2 border-black flex items-center justify-center text-xs font-bold text-[var(--color-primary-700)]">
                      T
                    </div>
                  </div>
                </div>

                {/* Line Items */}
                <div className="mb-4">
                  <div className="grid grid-cols-[1fr_60px_90px_90px] gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]" style={{ fontFamily: "var(--font-display)" }}>
                    <span>Description</span>
                    <span className="text-right">Qty</span>
                    <span className="text-right">Price</span>
                    <span className="text-right">Amount</span>
                  </div>

                  {/* English line items */}
                  <div ref={invoiceEnRef}>
                    {LINE_ITEMS.map((item, i) => (
                      <div
                        key={i}
                        ref={(el) => { lineItemRefs.current[i] = el; }}
                        className="grid grid-cols-[1fr_60px_90px_90px] gap-2 items-center py-2 border-b border-[var(--color-border-light)]"
                        style={{ opacity: 0 }}
                      >
                        <span className="text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>{item.desc}</span>
                        <span className="text-sm text-right" style={{ fontFamily: "var(--font-mono)" }}>{item.qty}</span>
                        <span className="text-sm text-right" style={{ fontFamily: "var(--font-mono)" }}>{item.price}</span>
                        <span className="text-sm text-right font-bold" style={{ fontFamily: "var(--font-mono)" }}>{item.amount}</span>
                      </div>
                    ))}
                  </div>

                  {/* Chinese line items (overlaid) */}
                  <div ref={invoiceZhRef} className="absolute" style={{ opacity: 0 }}>
                    {[
                      { desc: "品牌識別設計", qty: 1, price: "NT$25,000", amount: "NT$25,000" },
                      { desc: "網站開發", qty: 40, price: "NT$1,800", amount: "NT$72,000" },
                      { desc: "內容翻譯（英→中）", qty: 15, price: "NT$800", amount: "NT$12,000" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-[1fr_60px_90px_90px] gap-2 items-center py-2 border-b border-[var(--color-border-light)]"
                      >
                        <span className="text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>{item.desc}</span>
                        <span className="text-sm text-right" style={{ fontFamily: "var(--font-mono)" }}>{item.qty}</span>
                        <span className="text-sm text-right" style={{ fontFamily: "var(--font-mono)" }}>{item.price}</span>
                        <span className="text-sm text-right font-bold" style={{ fontFamily: "var(--font-mono)" }}>{item.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Summary sidebar */}
              <div className="lg:border-l-2 lg:border-black lg:pl-6">
                {/* Language toggle */}
                <div ref={langToggleRef} className="mb-6" style={{ opacity: 0 }}>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2" style={{ fontFamily: "var(--font-display)" }}>
                    Language
                  </label>
                  <div className="flex border-2 border-black rounded-xl overflow-hidden">
                    <div className="flex-1 py-2 text-center text-xs font-bold bg-[var(--color-primary-600)] text-white" style={{ fontFamily: "var(--font-display)" }}>
                      English
                    </div>
                    <div className="flex-1 py-2 text-center text-xs font-bold bg-white text-[var(--color-text-secondary)]" style={{ fontFamily: "var(--font-display)" }}>
                      中文
                    </div>
                  </div>
                </div>

                {/* Tax highlight */}
                <div ref={taxRef} className="mb-6" style={{ opacity: 0 }}>
                  <div className="bg-[var(--color-info-bg)] border-2 border-[var(--color-info-border)] rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-[var(--color-info-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xs font-bold text-[var(--color-info-text)]" style={{ fontFamily: "var(--font-display)" }}>
                        營業稅 Auto-applied
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-info-text)]">
                      5% Taiwan business tax included
                    </p>
                  </div>
                </div>

                {/* Totals */}
                <div ref={totalRef} className="space-y-2" style={{ opacity: 0 }}>
                  <div className="flex justify-between text-sm text-[var(--color-text-secondary)]">
                    <span>Subtotal</span>
                    <span style={{ fontFamily: "var(--font-mono)" }}>NT$109,000</span>
                  </div>
                  <div className="flex justify-between text-sm text-[var(--color-text-secondary)]">
                    <span>Tax (5%)</span>
                    <span style={{ fontFamily: "var(--font-mono)" }}>NT$5,450</span>
                  </div>
                  <div className="border-t-2 border-dashed border-black pt-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-bold" style={{ fontFamily: "var(--font-display)" }}>Total</span>
                      <span className="text-2xl font-bold text-[var(--color-primary-600)]" style={{ fontFamily: "var(--font-mono)" }}>
                        NT$114,450
                      </span>
                    </div>
                  </div>

                  {/* Send button */}
                  <button
                    className="w-full mt-4 h-12 bg-[var(--color-primary-600)] text-white font-bold rounded-xl border-2 border-black shadow-[var(--shadow-md)] text-sm flex items-center justify-center gap-2"
                    style={{ fontFamily: "var(--font-display)" }}
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
