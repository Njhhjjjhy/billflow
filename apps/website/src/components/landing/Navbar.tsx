"use client";

import { useState, useEffect } from "react";
import { Button } from "@billflow/ui/components/Button";

export function Navbar() {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      // Show navbar after scrolling past the dark scenes (~4 viewports)
      const showAfter = window.innerHeight * 4;
      setVisible(window.scrollY > showAfter);
      setScrolled(window.scrollY > showAfter + 100);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToSignup() {
    const el = document.getElementById("signup");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 border-b-2 border-black transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      } ${
        scrolled
          ? "py-3 bg-white/90 backdrop-blur-md"
          : "py-5 bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Billflow
        </a>

        <Button
          size="sm"
          variant="primary"
          onClick={scrollToSignup}
          className="!bg-[var(--color-accent-yellow)] !text-[var(--color-text-primary)] !border-black"
        >
          Get Early Access
        </Button>
      </div>
    </nav>
  );
}
