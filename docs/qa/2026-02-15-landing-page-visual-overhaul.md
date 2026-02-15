# QA Issue: Landing Page Visual Overhaul

**Date:** 2026-02-15
**Status:** ✓ Completely Fixed
**Reporter:** QA Review

## Issue Description

The landing page was visually flat, boring, and unprofessional. Specific problems:

1. **Hero section**: Generic info badge, plain headline with no visual emphasis, weak CTA
2. **Invoice illustration**: Bland gray placeholder lines, washed-out PAID stamp (30% opacity), small card, minimal floating decorations
3. **Features section**: Identical white cards with no differentiation, tiny icon circles, weak titles, plain white background
4. **Bottom CTA**: **Critical contrast failure** — semi-transparent white input (`bg-white/10`) on blue background made placeholder text nearly unreadable. Blue-on-blue button lacked contrast
5. **Floating elements**: Small, sparse shapes with muted colors
6. **Navbar**: Generic blue CTA button blended with surroundings
7. **Footer**: Plain and forgettable

Reference site: nodcoding.com (high contrast, bold accents, strategic whitespace, compelling visual hierarchy)

## Root Cause

The neo-brutalist design system was implemented timidly — using soft colors, small elements, and low-contrast combinations instead of leveraging the bold aesthetic the system was designed for. The accent yellow (`#FACC15`) was barely used despite being a core brand color.

## Solution

Full landing page visual overhaul keeping the neo-brutalist DNA but executing it boldly. All changes use existing design tokens — no new tokens or values were introduced.

### Hero Section
- Replaced soft `Badge variant="info"` with bold yellow badge (black border, emoji flag)
- Changed headline from "Invoicing Built for Taiwan" to "Invoice in 2 Minutes. Get Paid Faster." with yellow marker-stroke underlines on key phrases
- Punchier subheadline copy
- Wider form container (max-w-lg vs max-w-md)

### Invoice Illustration
- Enlarged card from 340px to 400px max-width
- Colorful line items (blue/yellow tints instead of gray)
- Vivid PAID stamp: 50% opacity (up from 30%), green background, thicker border
- Added 4th floating chip ("5% 稅" in primary blue)
- All chips larger with bolder shadows (shadow-md up from shadow-sm)
- Stronger card shadow (shadow-xl up from shadow-lg), thicker border (border-3)

### Features Section
- Added warm background tint (`bg-secondary`)
- Added "Features" label in mono font above heading
- Yellow highlight underline on "Invoice in Taiwan"
- Colored top accent bar (1.5px) on each card matching icon color
- Larger icon containers (w-14 h-14, up from w-10 h-10) with border
- Bolder titles (text-xl font-bold, up from text-lg font-semibold)
- Increased card gap and padding

### Bottom CTA (Critical Fix)
- **Fixed contrast**: White input with black border (was `bg-white/10 border-white/30`)
- Darker background (`primary-800` instead of `primary-600`)
- Added dot pattern texture overlay
- Yellow accent on heading text ("Start Sending Invoices.")
- "Early Access" label badge
- Yellow accent CTA button (high contrast against dark bg)

### Floating Elements
- Shapes enlarged ~40-50%
- Added extra shapes to each variant (6 and 5, up from 5 and 4)
- Bolder colors using primary-500 instead of primary-300/400
- Taller container (h-32 up from h-24)

### Navbar
- Yellow accent CTA button (stands out from white nav)
- Added `aria-label="Main navigation"` for accessibility

### Footer
- Dark background (`color-text-primary` / near-black)
- White text with opacity hierarchy
- "Made in Taiwan" as badge-style element with border
- Added divider line between content sections

## Files Modified

- `apps/website/src/components/landing/Hero.tsx` — Headline rewrite, yellow badge, layout spacing
- `apps/website/src/components/landing/InvoiceIllustration.tsx` — Bigger card, colorful elements, vivid stamp
- `apps/website/src/components/landing/FeatureCard.tsx` — Accent bar, bigger icons, bolder titles
- `apps/website/src/components/landing/FeaturesSection.tsx` — Background tint, label, highlight
- `apps/website/src/components/landing/BottomCTA.tsx` — Dark bg, dot pattern, yellow accents
- `apps/website/src/components/landing/EmailSignupForm.tsx` — White input on dark variant, yellow button
- `apps/website/src/components/landing/FloatingElements.tsx` — Bigger/more shapes
- `apps/website/src/components/landing/Navbar.tsx` — Yellow button, aria-label
- `apps/website/src/components/landing/Footer.tsx` — Dark bg, badge, divider

## Verification Results

### Code Review
- [x] Changes match approved plan
- [x] Design system compliance verified (all design tokens used, no hardcoded values)
- [x] No unintended side effects detected
- [x] TypeScript compiles cleanly
- [x] Production build passes
- [x] Accessibility: aria-label added to nav, decorative elements have aria-hidden
- [x] Reduced motion support preserved in all animated components

### Browser Testing
- [x] Dev server running on localhost:3001
- [x] Build compiles successfully with zero errors
- [x] Static pages generated correctly

**Note:** The `!important` overrides on Button className for yellow accent styling are a pragmatic choice for the landing page. A proper `accent` variant should be added to the shared Button component if this pattern expands.

## CLAUDE.md Updates

None — existing rules were sufficient. The design system tokens already supported bold usage; the issue was timid application, not missing specifications.

**Suggestion for DESIGN_GUIDELINES.md:** Update Part 6.2 Note to reflect that GSAP + ScrollTrigger IS used on the landing page for scroll-driven animations alongside Motion.dev for component interactions. The current note says "not currently implemented," which is inaccurate.
