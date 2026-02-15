# Landing Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a marketing landing page at `/` with email waitlist signup, Neo-Brutalist styling, GSAP scroll animations, and playful interactive elements.

**Architecture:** Replace the root redirect (`src/app/page.tsx`) with a `(marketing)` route group. All landing page components live in `src/components/landing/`. GSAP + ScrollTrigger handles scroll-driven animations; Motion.dev handles micro-interactions. Email form is UI-only (no backend yet).

**Tech Stack:** Next.js 14 App Router, GSAP 3.14 + ScrollTrigger, Motion.dev 12, Tailwind CSS 4, Lucide React icons, existing Neo-Brutalist design tokens.

**Design doc:** `docs/plans/2026-02-15-landing-page-design.md`

---

### Task 1: GSAP ScrollTrigger Setup

**Files:**
- Create: `src/lib/gsap.ts`

**Step 1: Create GSAP registration utility**

```typescript
// src/lib/gsap.ts
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
```

This centralizes GSAP plugin registration so every component imports from here instead of registering separately.

**Step 2: Commit**

```bash
git add src/lib/gsap.ts
git commit -m "feat: add GSAP ScrollTrigger registration utility"
```

---

### Task 2: Marketing Layout

**Files:**
- Create: `src/app/(marketing)/layout.tsx`
- Modify: `src/app/page.tsx` (delete — route group handles `/`)

**Step 1: Create the marketing layout**

The `(marketing)` route group wraps the landing page with a clean layout — no app sidebar, no ToastProvider. Just a `<main>` tag.

```typescript
// src/app/(marketing)/layout.tsx
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main id="main-content">{children}</main>;
}
```

**Step 2: Move the landing page route**

Delete `src/app/page.tsx` (the redirect). Create a placeholder page in the marketing group:

```typescript
// src/app/(marketing)/page.tsx
export default function LandingPage() {
  return <div>Landing page coming soon</div>;
}
```

**Step 3: Verify the app still works**

Run: `npm run dev`
- Visit `/` — should show "Landing page coming soon"
- Visit `/app` — should still show the dashboard app

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add marketing route group with placeholder landing page"
```

---

### Task 3: Email Signup Form

The only component with real logic (validation, state management). Used in both the Hero and Bottom CTA.

**Files:**
- Create: `src/components/landing/EmailSignupForm.tsx`

**Step 1: Build the EmailSignupForm component**

```typescript
// src/components/landing/EmailSignupForm.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CheckCircle } from "lucide-react";
import { spring } from "@/lib/motion";

interface EmailSignupFormProps {
  /** Visual variant for different backgrounds */
  variant?: "light" | "dark";
  className?: string;
}

export function EmailSignupForm({ variant = "light", className = "" }: EmailSignupFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [error, setError] = useState<string | undefined>(undefined);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(undefined);

    const trimmed = email.trim();
    if (!trimmed) {
      setError("Please enter your email");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email");
      return;
    }

    // TODO: Connect to Supabase or email service
    setStatus("success");
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring.bouncy}
        className={`flex items-center gap-3 ${className}`}
      >
        <CheckCircle
          className={`h-6 w-6 ${variant === "dark" ? "text-[var(--color-accent-yellow)]" : "text-[var(--color-success-border)]"}`}
          aria-hidden="true"
        />
        <p
          className={`text-base font-medium ${variant === "dark" ? "text-white" : "text-[var(--color-text-primary)]"}`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          You&apos;re on the list! We&apos;ll be in touch.
        </p>
      </motion.div>
    );
  }

  const isDark = variant === "dark";

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col sm:flex-row gap-3 ${className}`}
      noValidate
    >
      <div className="flex-1">
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(undefined);
          }}
          error={error}
          aria-label="Email address"
          required
          inputSize="lg"
          className={isDark ? "bg-white/10 text-white border-white/30 placeholder:text-white/50" : ""}
        />
      </div>
      <Button type="submit" size="lg" variant={isDark ? "secondary" : "primary"}>
        Get Early Access
      </Button>
    </form>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/landing/EmailSignupForm.tsx
git commit -m "feat: add EmailSignupForm with validation and success state"
```

---

### Task 4: Navbar

**Files:**
- Create: `src/components/landing/Navbar.tsx`

**Step 1: Build the Navbar component**

Fixed nav with: Billflow wordmark (left), "Get Early Access" button (right). On scroll: shrinks + adds backdrop blur. Uses GSAP ScrollTrigger for the scroll behavior.

Key details:
- `position: fixed`, `z-index: 50`, white bg, 2px black bottom border
- Wordmark: "Billflow" in Space Grotesk bold, links to `#` (top of page)
- Button: scrolls to the hero email form (smooth scroll to `#signup`)
- Scroll state: use `useState` + `useEffect` with a scroll listener (simpler than GSAP for this). When `scrollY > 50`: reduce padding, add `backdrop-blur-md`, slight bg opacity change
- Respect `prefers-reduced-motion` for any animated transitions

**Step 2: Commit**

```bash
git add src/components/landing/Navbar.tsx
git commit -m "feat: add landing page Navbar with scroll shrink behavior"
```

---

### Task 5: Invoice Illustration with 3D Tilt

**Files:**
- Create: `src/components/landing/InvoiceIllustration.tsx`

**Step 1: Build the InvoiceIllustration component**

A stylized invoice card built with divs (not an image). Shows a mini invoice preview with:
- "INVOICE" header text
- A few fake line items (gray bars)
- A "PAID" stamp badge rotated at an angle
- NT$ total amount at bottom

The card has a 3D mouse-tilt effect using Motion.dev's `useMotionValue` and `useTransform`:
- Track mouse position relative to the card center
- Map to `rotateX` and `rotateY` values (max ~8 degrees)
- Apply `perspective(1000px)` to the parent
- Reset to 0 on mouse leave

Around the card, floating decorative elements:
- A "NT$" text chip
- A checkmark circle
- A small "統一發票" badge
- These float with gentle `animate` loops (Motion.dev)

Respect `prefers-reduced-motion`: disable tilt, disable floating animations.

**Step 2: Commit**

```bash
git add src/components/landing/InvoiceIllustration.tsx
git commit -m "feat: add InvoiceIllustration with 3D mouse-tilt effect"
```

---

### Task 6: Floating Decorative Elements

**Files:**
- Create: `src/components/landing/FloatingElements.tsx`

**Step 1: Build the FloatingElements component**

SVG geometric shapes (circles, squares, lines, small crosses) in accent yellow and coral. Positioned absolutely around the page. Each shape has a GSAP ScrollTrigger parallax effect — they move at different scroll speeds to create depth.

Implementation:
- Define an array of shape configs: `{ type, color, size, x, y, speed, rotation }`
- Render SVG elements absolutely positioned
- On mount, create GSAP ScrollTrigger animations for each shape:
  - `scrub: true` — tied to scroll position
  - `y` movement proportional to each shape's `speed` value
  - Different rotation amounts for variety
- Clean up GSAP timelines on unmount
- Render nothing if `prefers-reduced-motion` is set (use the existing `useReducedMotion` hook or `window.matchMedia`)

Place two sets: one between Hero and Features, one between Features and CTA.

**Step 2: Commit**

```bash
git add src/components/landing/FloatingElements.tsx
git commit -m "feat: add floating decorative elements with GSAP parallax"
```

---

### Task 7: Hero Section

**Files:**
- Create: `src/components/landing/Hero.tsx`

**Step 1: Build the Hero section**

Assembles: overline badge, headline, sub-headline, EmailSignupForm, InvoiceIllustration.

Layout:
- Section with generous padding: `py-32 lg:py-40` (120-160px)
- Max-width container centered: `max-w-4xl mx-auto px-6`
- Everything centered: `text-center`

Content:
- Overline: Badge component (info variant) with text "Built for freelancers in Taiwan"
- Headline: `<h1>` with text "Invoicing Built for Taiwan", styled with `font-display text-5xl lg:text-7xl font-bold`
- Sub-headline: `<p>` with the sub-copy, `text-lg lg:text-xl text-secondary max-w-2xl mx-auto`
- EmailSignupForm (variant="light") with `id="signup"` on the form wrapper for scroll targeting
- InvoiceIllustration below

GSAP animations on mount (use `useGSAP` or `useEffect` + `useRef`):
1. Create a timeline
2. Badge fades in + slides up (duration: 0.5s)
3. Headline words stagger in (split by word, each fades up, 0.08s stagger)
4. Sub-headline fades up (duration: 0.5s)
5. Form fades up (duration: 0.5s)
6. Illustration fades in + scales from 0.9 (duration: 0.6s)

All animations use `ease: "power3.out"`.

If `prefers-reduced-motion`: skip timeline, show everything immediately (set opacity to 1 on all elements).

**Step 2: Commit**

```bash
git add src/components/landing/Hero.tsx
git commit -m "feat: add Hero section with GSAP staggered entrance animations"
```

---

### Task 8: Feature Card

**Files:**
- Create: `src/components/landing/FeatureCard.tsx`

**Step 1: Build the FeatureCard component**

A Neo-Brutalist card displaying one feature. Uses the existing Card component (non-interactive mode — we'll add Motion.dev hover ourselves for the icon bounce).

Props: `{ icon: LucideIcon, title: string, description: string, color: string }`

Layout inside the card:
- Icon in a colored circle (40x40, `rounded-full`, background is the `color` prop at 20% opacity, icon in full color)
- Title below: `font-display font-semibold text-lg`
- Description below: `text-sm text-secondary`

Hover effect (Motion.dev):
- Wrap in `motion.div` with `whileHover`: card lifts (`y: -4`, shadow grows to `--shadow-lg`)
- Icon bounces on card hover: use `motion.div` with `whileHover` on the parent to trigger icon scale (`1 -> 1.15 -> 1`)

**Step 2: Commit**

```bash
git add src/components/landing/FeatureCard.tsx
git commit -m "feat: add FeatureCard with hover lift and icon bounce"
```

---

### Task 9: Features Section

**Files:**
- Create: `src/components/landing/FeaturesSection.tsx`

**Step 1: Build the FeaturesSection component**

Contains the heading and a 3x2 grid of FeatureCards.

Layout:
- Section with `py-32` padding
- Max-width container: `max-w-6xl mx-auto px-6`
- Heading: `<h2>` "Everything You Need to Invoice in Taiwan", `font-display text-3xl lg:text-5xl font-bold text-center mb-16`
- Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

Feature data (hardcoded array):
```typescript
const features = [
  { icon: Languages, title: "Bilingual Invoicing", description: "Create invoices in English and Chinese. Switch languages with one click.", color: "#2563EB" },
  { icon: ShieldCheck, title: "Taiwan Tax Compliance", description: "Handles 統一發票 formatting, 5% 營業稅 calculation, and 統一編號 validation automatically.", color: "#16A34A" },
  { icon: Coins, title: "Multi-Currency Support", description: "Bill in TWD, USD, or EUR with exchange rates built in.", color: "#F97316" },
  { icon: FileDown, title: "PDF Export", description: "Download or email professional PDFs with full Chinese character support.", color: "#DC2626" },
  { icon: Users, title: "Client Management", description: "Keep all your clients organized with Taiwan-specific fields like LINE ID and tax numbers.", color: "#7C3AED" },
  { icon: TrendingUp, title: "Payment Tracking", description: "See who's paid, who hasn't, and what's overdue at a glance.", color: "#FACC15" },
];
```

GSAP ScrollTrigger animation:
- On scroll into view, cards stagger in from below
- Each card: `opacity: 0, y: 60` → `opacity: 1, y: 0`
- Stagger: 0.1s between cards
- Trigger: when section top hits 80% of viewport
- `once: true` — animation plays once, not on reverse scroll
- Heading also fades up before cards

If `prefers-reduced-motion`: no scroll animation, everything visible immediately.

**Step 2: Commit**

```bash
git add src/components/landing/FeaturesSection.tsx
git commit -m "feat: add FeaturesSection with GSAP staggered scroll reveal"
```

---

### Task 10: Bottom CTA Section

**Files:**
- Create: `src/components/landing/BottomCTA.tsx`

**Step 1: Build the BottomCTA section**

Full-width section with primary blue background.

Layout:
- Section with `py-32` padding, `bg-[var(--color-primary-600)]`
- Black top and bottom borders: `border-t-2 border-b-2 border-black`
- Max-width container centered: `max-w-3xl mx-auto px-6 text-center`
- Heading: `<h2>` "Ready to Simplify Your Invoicing?" — white, `font-display text-3xl lg:text-5xl font-bold`
- Sub-text: white/80, "Join our early access list and be the first to know when Billflow launches."
- EmailSignupForm with `variant="dark"`

GSAP ScrollTrigger animation:
- Heading + sub-text + form stagger up on scroll
- Same pattern as features: `opacity: 0, y: 40` → `opacity: 1, y: 0`

**Step 2: Commit**

```bash
git add src/components/landing/BottomCTA.tsx
git commit -m "feat: add BottomCTA section with blue background and signup form"
```

---

### Task 11: Footer

**Files:**
- Create: `src/components/landing/Footer.tsx`

**Step 1: Build the Footer**

Simple, clean footer.

Layout:
- `<footer>` with `py-12` padding, light gray background `bg-[var(--color-bg-secondary)]`
- Border top: `border-t-2 border-black`
- Centered content: `max-w-6xl mx-auto px-6`
- Row 1: "Billflow" wordmark (Space Grotesk bold) + "Made in Taiwan" tagline (right side or below on small screens)
- Row 2: Copyright "© 2026 Billflow. All rights reserved." + placeholder links (Privacy, Terms) as muted text

No animations needed for the footer.

**Step 2: Commit**

```bash
git add src/components/landing/Footer.tsx
git commit -m "feat: add landing page Footer"
```

---

### Task 12: Landing Page Component Index

**Files:**
- Create: `src/components/landing/index.ts`

**Step 1: Create barrel export**

```typescript
// src/components/landing/index.ts
export { Navbar } from "./Navbar";
export { Hero } from "./Hero";
export { FeaturesSection } from "./FeaturesSection";
export { BottomCTA } from "./BottomCTA";
export { Footer } from "./Footer";
export { EmailSignupForm } from "./EmailSignupForm";
export { FeatureCard } from "./FeatureCard";
export { InvoiceIllustration } from "./InvoiceIllustration";
export { FloatingElements } from "./FloatingElements";
```

**Step 2: Commit**

```bash
git add src/components/landing/index.ts
git commit -m "feat: add landing component barrel exports"
```

---

### Task 13: Assemble the Landing Page

**Files:**
- Modify: `src/app/(marketing)/page.tsx`
- Modify: `src/app/(marketing)/layout.tsx`

**Step 1: Update the marketing layout**

Add the Navbar and Footer to the layout so they wrap the page content:

```typescript
// src/app/(marketing)/layout.tsx
import { Navbar, Footer } from "@/components/landing";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
```

**Step 2: Assemble the landing page**

```typescript
// src/app/(marketing)/page.tsx
import { Hero, FeaturesSection, BottomCTA, FloatingElements } from "@/components/landing";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <FloatingElements variant="hero-to-features" />
      <FeaturesSection />
      <FloatingElements variant="features-to-cta" />
      <BottomCTA />
    </>
  );
}
```

**Step 3: Delete the old redirect**

Remove `src/app/page.tsx` — the `(marketing)` route group now handles `/`.

**Step 4: Verify everything works**

Run: `npm run dev`
- Visit `/` — full landing page renders with all sections
- Visit `/app` — dashboard app still works
- Scroll through — GSAP animations trigger
- Hover feature cards — lift effect works
- Submit email form — shows success state
- Check reduced motion — animations disabled

Run: `npm run typecheck`
Expected: No TypeScript errors.

Run: `npm run lint`
Expected: No lint errors.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: assemble landing page with all sections and animations"
```

---

### Task 14: Polish and Visual QA

**Files:**
- Potentially modify any component from Tasks 3-11

**Step 1: Visual QA checklist**

Open the landing page in the browser and verify:

- [ ] Nav is fixed and visible on scroll
- [ ] Nav shrinks/blurs on scroll
- [ ] Hero text is legible and properly sized
- [ ] Hero badge renders with correct styling
- [ ] Email form validates empty + invalid emails
- [ ] Email form shows success message after submission
- [ ] Invoice illustration renders and tilts on mouse hover
- [ ] Feature cards display all 6 features correctly
- [ ] Feature cards have hover lift effect
- [ ] Bottom CTA has blue background with white text
- [ ] Bottom CTA email form works (dark variant)
- [ ] Footer renders with wordmark and copyright
- [ ] Floating decorative elements are visible and parallax on scroll
- [ ] GSAP scroll animations fire at correct scroll positions
- [ ] Spacing feels generous between all sections
- [ ] Typography uses correct fonts (Space Grotesk for headings, Noto Sans TC for body)
- [ ] Focus indicators visible on keyboard navigation
- [ ] `prefers-reduced-motion` disables all animations

**Step 2: Fix any issues found**

Adjust spacing, timing, colors, or layout as needed based on QA.

**Step 3: Commit**

```bash
git add -A
git commit -m "fix: polish landing page visual QA issues"
```

---

### Task 15: Build Verification

**Step 1: Run the full build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

**Step 2: Test production build**

```bash
npm run start
```

Visit `/` and `/app` — both work correctly in production mode.

**Step 3: Final commit if any changes were needed**

```bash
git add -A
git commit -m "fix: resolve build issues for landing page"
```

---

## Summary

| Task | Component | Dependencies |
|------|-----------|-------------|
| 1 | GSAP setup | None |
| 2 | Marketing layout + route | None |
| 3 | EmailSignupForm | None |
| 4 | Navbar | None |
| 5 | InvoiceIllustration | None |
| 6 | FloatingElements | Task 1 (GSAP) |
| 7 | Hero | Tasks 3, 5 |
| 8 | FeatureCard | None |
| 9 | FeaturesSection | Tasks 1, 8 |
| 10 | BottomCTA | Task 3 |
| 11 | Footer | None |
| 12 | Component index | Tasks 3-11 |
| 13 | Page assembly | All above |
| 14 | Visual QA | Task 13 |
| 15 | Build verification | Task 14 |

**Parallelizable tasks:** Tasks 3, 4, 5, 8, 11 can all be built independently. Tasks 6, 7, 9, 10 depend on earlier tasks. Tasks 12-15 are sequential.
