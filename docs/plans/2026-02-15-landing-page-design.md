# Billflow Landing Page Design

**Date:** 2026-02-15
**Status:** Approved

## Overview

A single marketing landing page at `/` to collect email signups from potential Billflow users. Replaces the current redirect to `/app`. The app routes at `/app/*` remain untouched.

**Design inspiration:** Blend of [nvg8.io](https://nvg8.io/) (bold typography, rich scroll animations, vivid accents, interactive elements) and [nodcoding.com](https://nodcoding.com/) (clear section structure, approachable layout, animated decorative elements).

**Design system:** Uses the existing Billflow Neo-Brutalist design system — white background, black borders, hard offset shadows, primary blue (#2563EB), accent yellow (#FACC15), accent coral (#F97316), Space Grotesk/Noto Sans TC/Space Mono typography.

## Animation Strategy

**Hybrid approach:** GSAP + ScrollTrigger for scroll-driven animations (section reveals, parallax, staggered entries, text split animations). Motion.dev for micro-interactions (button hovers/presses, card hover lifts, input focus, mouse-tilt effects).

## Casing Rules

- **Title case:** Headings, CTAs, menu items
- **Sentence case:** Everything else (badge, descriptions, sub-headlines, body text)

---

## Page Structure

### 1. Navigation Bar

**Position:** Fixed at top, white background, 2px solid black bottom border.

- **Left:** "Billflow" wordmark in Space Grotesk bold
- **Right:** "Get Early Access" primary button
- **Scroll behavior:** Shrinks slightly, adds backdrop blur

### 2. Hero Section

**Layout:** Centered text, generous vertical padding (120-160px).

- **Overline badge:** "Built for freelancers in Taiwan" — small Neo-Brutalist badge (sentence case)
- **Headline:** "Invoicing Built for Taiwan" — large bold Space Grotesk (title case)
- **Sub-headline:** "Create bilingual invoices, handle local tax compliance, and get paid faster — all in one tool designed for freelancers like you." (sentence case)
- **Email signup:** Inline input + "Get Early Access" button
- **Illustration:** Stylized invoice card below the form with 3D mouse-tilt interaction. Floating decorative elements around it (currency symbols, checkmark, stamp icon)

**Animations:**
- Hero headline: staggered letter/word reveal (GSAP)
- Sub-headline: fades up after headline
- Form: slides up after sub-headline
- Invoice illustration: parallax float with orbiting decorative elements
- Mouse-move 3D tilt on illustration (Motion.dev)

### 3. Features Section

**Heading:** "Everything You Need to Invoice in Taiwan" (title case)

**Layout:** 3x2 grid of Neo-Brutalist cards. Each card has:
- Colored icon background circle (Lucide icon)
- Bold feature title (title case)
- 1-2 sentence description (sentence case)

**The 6 features:**

1. **Bilingual Invoicing** — Create invoices in English and Chinese. Switch languages with one click.
2. **Taiwan Tax Compliance** — Handles 統一發票 formatting, 5% 營業稅 calculation, and 統一編號 validation automatically.
3. **Multi-Currency Support** — Bill in TWD, USD, or EUR with exchange rates built in.
4. **PDF Export** — Download or email professional PDFs with full Chinese character support.
5. **Client Management** — Keep all your clients organized with Taiwan-specific fields like LINE ID and tax numbers.
6. **Payment Tracking** — See who's paid, who hasn't, and what's overdue at a glance.

**Animations:**
- Cards stagger in from below on scroll (GSAP ScrollTrigger)
- Each card: playful hover — lifts up, shadow grows, icon bounces (Motion.dev)
- Decorative shapes float between cards (GSAP parallax)

### 4. Bottom CTA Section

**Background:** Primary blue (#2563EB) to break the white monotony.

- **Heading:** "Ready to Simplify Your Invoicing?" (title case, white text)
- **Sub-text:** "Join our early access list and be the first to know when Billflow launches." (sentence case)
- **Email signup:** Input + "Get Early Access" button (repeated from hero)

**Animations:**
- Background color wipes in on scroll (GSAP ScrollTrigger)
- Text and form stagger up

### 5. Footer

- Billflow wordmark
- "Made in Taiwan" tagline
- Copyright 2026
- Placeholder links for future pages

---

## Decorative Elements

Scattered throughout the page between all sections:
- Floating geometric shapes (circles, squares, lines) in accent yellow and coral
- Parallax at different scroll speeds (GSAP ScrollTrigger)
- Small invoice-themed doodles (receipt icons, dollar signs, checkmarks) as accents

---

## Technical Details

### Route Structure

```
src/app/
  (marketing)/
    layout.tsx    — Marketing layout (no app sidebar, includes nav + footer)
    page.tsx      — Landing page content
  app/            — Existing app routes (untouched)
```

The root `src/app/page.tsx` redirect gets replaced or the marketing route group handles `/`.

### Components to Create

```
src/components/landing/
  Navbar.tsx           — Fixed nav with scroll behavior
  Hero.tsx             — Hero section with signup form
  FeatureCard.tsx      — Individual feature card
  FeaturesSection.tsx  — Features grid with scroll animation
  BottomCTA.tsx        — Colored CTA section with signup
  Footer.tsx           — Simple footer
  EmailSignupForm.tsx  — Reusable email input + button (UI only)
  FloatingElements.tsx — Decorative parallax shapes
  InvoiceIllustration.tsx — Hero illustration with 3D tilt
```

### Dependencies

- `gsap` (already installed) — need to register ScrollTrigger plugin
- `motion` (already installed) — for micro-interactions
- `lucide-react` (already installed) — for feature icons

### Email Form

UI only for now. Form captures email in local state, shows a success state on submit. Storage integration (Supabase or third-party) to be connected later.

### Accessibility

- All animations respect `prefers-reduced-motion`
- Email input has proper labels and ARIA attributes
- Focus indicators on all interactive elements
- Semantic HTML structure (nav, main, section, footer)
- Skip link maintained from root layout
