# Landing Page Redesign: "The Midnight Freelancer"

**Date:** 2026-02-15
**Status:** Implemented
**Supersedes:** [2026-02-15-landing-page-design.md](2026-02-15-landing-page-design.md)

## Overview

Complete redesign of the Billflow marketing landing page from a conventional SaaS layout (hero → features grid → CTA) to a **full cinematic scroll-driven narrative experience**. The page tells a story: a freelancer drowning in late-night invoicing chaos, followed by the moment Billflow resolves it all.

**Reference:** [nvg8.io](https://nvg8.io/) — scroll-driven storytelling with pinned sections, scroll-synced animations, and narrative pacing.

**Design system:** Billflow Neo-Brutalist — black borders, hard offset shadows, primary blue (#2563EB), accent yellow (#FACC15), Space Grotesk / Noto Sans TC / Space Mono.

## Narrative Structure

The page follows a **pain → snap → product** arc across six pinned scroll scenes:

```
Emotional
Tension
  ^
  │     Scene 2: CHAOS
  │    ╱  (spreadsheets, emails, panic)
  │   ╱
  │  ╱ Scene 1: SETUP              Scene 5: GET PAID
  │ ╱  (mood, empathy)            ╱  (payoff, dashboard)
  │╱                    Scene 4  ╱
  │          Scene 3:  ╱CREATE  ╱
  │          THE SNAP ╱        ╱    Scene 6: CLOSE
  │            ╱     ╱        ╱      (CTA)
  +──────────────────────────────────────> Scroll
       Dark               Light
```

| Act | Scenes | Emotion | Color |
|-----|--------|---------|-------|
| I: Pain | 1–2 | Frustration, overwhelm | Dark (#0F172A) |
| II: Snap | 3 | Relief, clarity | Dark → White |
| III: Product | 4–6 | Confidence, desire | Light (design system) |

## Scene Specifications

### Scene 1: "The Setup"

**Pin duration:** 2× viewport height
**Background:** `#0F172A` (text-primary as background)

**Content:** Three lines of monospace text revealed character-by-character as the user scrolls:

> It's 11:47 PM.
> You just delivered the project.
> Now comes the part nobody warned you about.

**Animation technique:** GSAP ScrollTrigger with `pin: true`, `scrub: 0.3`. Each line uses `clip-path: inset(0 100% 0 0)` → `inset(0 0% 0 0)` keyed to scroll progress. Blinking cursor on the last line via CSS `animate-pulse`. Content fades to `opacity: 0` at 90% scroll progress.

**Beat sheet:**
1. **Orient** — Black screen, cursor blinks (idle state)
2. **Reveal line 1** — "It's 11:47 PM." types in (scroll 0–25%)
3. **Reveal line 2** — "You just delivered the project." (scroll 25–50%)
4. **Breathe** — Empty line pause (scroll 50–55%)
5. **Reveal line 3** — "Now comes the part nobody warned you about." (scroll 55–85%)
6. **Fade** — All text fades out (scroll 90–100%)

---

### Scene 2: "The Chaos"

**Pin duration:** 3× viewport height
**Background:** `#0F172A`

**Content:** Four phases of visual chaos layered on screen:

1. **Spreadsheet** (0–25%) — A tilted spreadsheet grid with formulas (`=SUM(B2:B6)`), 7 rows of invoice data. 3D perspective with `rotateX: 5deg`. Rows stagger in from left.
2. **Browser tabs** (20–45%) — 7 tab elements: "Tax Calculator", "統一發票 format guide", "How to invoice in English", etc. Stagger in with `back.out(1.7)` easing.
3. **Email notifications** (40–65%) — 5 cards positioned around edges: "Where's my invoice?", "可以重新寄中文版嗎？", "Payment is 43 days late", etc. Slide in from alternating sides.
4. **Peak chaos** (60–80%) — Clock reads `12:34 AM`. Spreadsheet jitters (rotateX/Y shift, scale down). All elements overlap.
5. **The line** (80–95%) — All chaos dims to 15% opacity. Center text appears: **"There has to be a better way."**

**Beat sheet:**
1. **Build** — Spreadsheet tilts into view, rows cascade
2. **Layer** — Tabs stack across top, overlapping
3. **Overwhelm** — Emails flood in from edges, clock appears
4. **Jitter** — Everything trembles, scale shifts
5. **Cut through** — Dim everything, reveal the pivotal line

---

### Scene 3: "The Snap"

**Pin duration:** 1.5× viewport height
**Background:** Dark → White transition

**Content:** The shortest, most dramatic scene. Everything implodes, white expands, Billflow logo lands.

**Animation sequence:**
1. **Hold** (0–30%) — Dark screen, tension builds
2. **White explosion** (30–40%) — White circle scales from 0 to 3× with `power4.in` easing, expanding from center
3. **Dark dissolve** (35–45%) — Dark overlay fades to 0
4. **Settle** (45–55%) — White circle scales back to 1 (fills screen naturally)
5. **Logo land** (55–70%) — "Billflow" text + yellow accent bar appears with `back.out(2)` spring overshoot
6. **Tagline** (70–80%) — "Invoicing that just works." fades in
7. **Exit** (85–100%) — Logo and tagline fade up and out

---

### Scene 4: "Create"

**Pin duration:** 3× viewport height
**Background:** `var(--color-bg-secondary)` (light gray)

**Content:** A neo-brutalist browser frame containing a simplified version of the real invoice creation form. The form fills itself in as the user scrolls.

**Browser chrome:** macOS-style traffic lights, URL bar showing `app.billflow.tw/invoices/new`.

**Scroll-driven form fill:**
1. **Heading enters** (0–8%) — "How it works" badge + "Create an invoice in 2 minutes" h2
2. **Browser frame** (8–18%) — Slides up with scale 0.95 → 1
3. **Client types in** (18–25%) — "Taipei Digital Co." / "台北數位有限公司" appears
4. **Line items** (25–50%) — Three rows slide in one-by-one:
   - Brand identity design — NT$25,000
   - Website development (40hrs) — NT$72,000
   - Content translation (EN→中文) — NT$12,000
5. **Total calculates** (50–60%) — Subtotal NT$109,000, Tax NT$5,450, **Total NT$114,450**
6. **Tax highlight** (60–68%) — Blue info card pulses in: "營業稅 Auto-applied — 5% Taiwan business tax included"
7. **Language toggle** (68–75%) — EN/中文 toggle appears
8. **Language flip** (75–85%) — Line item descriptions crossfade to Chinese
9. **Flip back** (88–95%) — Returns to English

---

### Scene 5: "Send & Get Paid"

**Pin duration:** 2.5× viewport height
**Background:** White

**Content:** The invoice's journey from send to payment.

**Sequence:**
1. **Invoice card** (0–12%) — Mini invoice card slides in (Taipei Digital Co., 3 items, NT$114,450, "Ready to send" badge)
2. **Send button** (12–20%) — Large primary button appears with spring
3. **Click** (20–25%) — Button press animation (scale 0.95 → 1)
4. **Fly off** (25–30%) — Invoice card rotates 5° and flies right with opacity fade
5. **Toast** (30–38%) — Success toast: "Invoice sent!" with email address
6. **Time passes** (40–50%) — 5 day tiles (Mon–Fri), Friday highlighted green. "A few days later..." italic text
7. **Payment** (55–65%) — Large payment notification card: green border, dollar icon, "Payment Received", **NT$114,450**, "From Taipei Digital Co."
8. **PAID stamp** (60–68%) — Oversized PAID text slams in with `back.out(3)` spring, rotated -12°, 30% opacity
9. **Dashboard** (78–92%) — Everything clears, dashboard stats slide up:
   - 3 KPI cards (Paid this month, Outstanding, Total clients)
   - Revenue bar chart (6 months)

---

### Scene 6: "The Close"

**Pin duration:** None (natural scroll)
**Background:** `var(--color-primary-800)` (dark blue)

**Content:** Final CTA section.

- **Headline:** "Stop working past midnight." (white) + "Start getting paid on time." (accent yellow)
- **Subtitle:** "Bilingual invoices. Taiwan tax compliance. Payment tracking. All in one tool."
- **Email signup:** `EmailSignupForm` component (dark variant)
- **Trust signals:** Three items — "統一發票 compliant", "English & 中文", "2 minute setup"

**Animation:** Standard GSAP entrance (fade up, staggered) triggered at 70% viewport intersection. `once: true`.

---

## Navbar Behavior

The navbar starts **hidden** (`-translate-y-full`, `opacity: 0`, `pointer-events: none`) during the dark scenes (1–3). It slides in after the user scrolls past ~4× viewport height (roughly when Scene 3 completes and Scene 4 begins). Standard scroll behavior applies after it appears (blur + padding shrink).

---

## Technical Architecture

### File Structure

```
apps/website/src/components/landing/
├── scenes/
│   ├── index.ts              — Barrel export
│   ├── Scene1Setup.tsx       — Typing text on black
│   ├── Scene2Chaos.tsx       — Spreadsheet, tabs, emails
│   ├── Scene3Snap.tsx        — Implosion + white transition
│   ├── Scene4Create.tsx      — Invoice form showcase
│   ├── Scene5SendPaid.tsx    — Send, time, payment, dashboard
│   └── Scene6Close.tsx       — CTA with email signup
├── Navbar.tsx                — Updated: hidden during dark scenes
├── EmailSignupForm.tsx       — Reused in Scene 6 (dark variant)
├── Footer.tsx                — Unchanged
└── index.ts                  — Barrel export (updated)
```

### Page Composition

```tsx
// apps/website/src/app/page.tsx
<Scene1Setup />
<Scene2Chaos />
<Scene3Snap />
<Scene4Create />
<Scene5SendPaid />
<Scene6Close />
```

**Removed components:** `Hero.tsx`, `FeaturesSection.tsx`, `FeatureCard.tsx`, `BottomCTA.tsx`, `FloatingElements.tsx`, `InvoiceIllustration.tsx` — all replaced by scene components. Files retained in the codebase but no longer imported.

### ScrollTrigger Configuration

Every scene (1–5) uses GSAP ScrollTrigger with:

| Parameter | Value | Purpose |
|-----------|-------|---------|
| `pin` | `true` | Locks viewport while scroll drives animation |
| `scrub` | `0.2–0.5` | Ties animation progress to scroll position |
| `pinSpacing` | `true` | Adds padding to prevent content overlap |
| `start` | `"top top"` | Pin begins when section hits viewport top |
| `end` | `"bottom top"` | Pin releases when section scrolls past |

Scene 6 uses a standard trigger (`once: true`, no pin) for entrance animation.

### Total Scroll Depth

| Scene | Height | Pin Duration |
|-------|--------|-------------|
| 1: Setup | 200vh | 2× viewport |
| 2: Chaos | 300vh | 3× viewport |
| 3: Snap | 150vh | 1.5× viewport |
| 4: Create | 300vh | 3× viewport |
| 5: Send & Paid | 250vh | 2.5× viewport |
| 6: Close | ~100vh | Natural scroll |
| **Total** | **~1300vh** | **~12× viewport** |

### Performance

- All animations are **transform + opacity only** (GPU-composited, no layout thrashing)
- ScrollTrigger `scrub` prevents competing timers — scroll position is the single source of truth
- No heavy assets (video, canvas, WebGL) — all UI built with DOM elements
- Browser tabs, emails, and spreadsheet are static DOM — no re-renders during scroll

### Dependencies

All already installed:
- `gsap` + `ScrollTrigger` — via `@billflow/ui/lib/gsap`
- `motion` (Framer Motion) — for `EmailSignupForm` success state
- `lucide-react` — for icons

No new dependencies required.

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| `prefers-reduced-motion` | Every scene checks the media query on mount. If enabled: all elements shown immediately, no pinning, no scroll-driven animation. Content is fully readable. |
| Semantic HTML | Each scene wrapped in `<div>` with descriptive `aria-label`. Scene 6 uses `<section>`. |
| Skip link | Preserved from root layout (`#main-content`) |
| Focus indicators | WCAG 2.4.11 compliant via global CSS |
| Keyboard navigation | Email form in Scene 6 is fully keyboard accessible. Decorative elements use `tabIndex={-1}` and `aria-hidden="true"`. |
| Content without JS | Static content visible in all scenes even without animation |

---

## Casing Rules

Inherited from v1:
- **Title case:** Headings, CTA button labels
- **Sentence case:** Body text, descriptions, badge text, trust signals
- **Monospace:** Financial amounts, URLs, code references
