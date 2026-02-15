# QA Issue: Chart Animations & Client Card Readability

**Date:** 2026-02-15
**Status:** ✓ Completely Fixed
**Reporter:** QA Review

## Issue Description

Three related issues on the Dashboard and Clients pages:

1. **Revenue bar chart (Dashboard):** Completely static, no animation. Bars had fixed pixel width SVG leaving dead space in the card.
2. **Status donut chart (Dashboard):** Completely static, no animation.
3. **Client cards (Clients page):** Unreadable - names, emails, company names, and phone numbers all truncated with ellipsis. Cards were different heights. 4-column grid too narrow for content.

## Root Cause

1. **Charts:** Both `RevenueChart.tsx` and `StatusChart.tsx` rendered plain SVG elements with no Motion.dev integration. The bar chart SVG used fixed `width`/`height` attributes instead of a responsive `viewBox`.
2. **Client cards:** The `ClientCard` component used `truncate` CSS on name, company, and email fields. The horizontal layout (avatar + info + stats side-by-side) left too little width for the info section. The grid used `desktop-lg:grid-cols-4` which made columns too narrow.

## Solution

### Charts - Progressive Animation on Mouse Enter

**RevenueChart (bar chart):**
- Added `motion.rect` elements with `initial={{ height: 0, y: chartHeight }}` and animated to full height/position
- Uses `hasAnimated` state (not toggle) - bars animate once on first mouse enter and **stay visible**
- Staggered animation: each bar group delayed by 0.08s, paid bar offset by 0.04s within each group
- Removed static `y`/`height` attributes to prevent conflicts with Motion.dev
- Replaced fixed `width`/`height` with `viewBox` + `width="100%"` + `preserveAspectRatio` to fill container

**StatusChart (donut chart):**
- Added `motion.path` and `motion.circle` with `strokeDasharray`/`strokeDashoffset` animation for progressive fill effect
- Same `hasAnimated` one-shot logic - segments draw once and stay
- Staggered by 0.1s per segment (Paid -> Sent -> Overdue -> Draft)
- Uses `duration.slower` (0.6s) with `ease.out` from motion tokens

### Client Cards - Restructured Layout

- **Restructured card layout:** Changed from 3-column horizontal (avatar | info | stats) to structured vertical sections:
  - Header row: Avatar + Name/Company + Stats (right-aligned)
  - Divider line
  - Full-width contact info (email, phone)
  - Tags pushed to bottom with `mt-auto`
- **Removed all truncation** - no `truncate` or `break-all` classes
- **Reduced grid** from `desktop-lg:grid-cols-4` to max `desktop:grid-cols-3`
- **Equal height cards** via `h-full` on Card and Link wrapper

## Files Modified

- `src/components/charts/RevenueChart.tsx` - Added Motion.dev bar rise animation, responsive viewBox, hasAnimated state
- `src/components/charts/StatusChart.tsx` - Added Motion.dev progressive fill animation, hasAnimated state
- `src/app/app/clients/page.tsx` - Restructured ClientCard layout, reduced grid to 3 columns, removed all truncation

## Verification Results

### Code Review
- [x] Changes match approved plan
- [x] Design system compliance verified (uses motion tokens from lib/motion.ts)
- [x] No unintended side effects detected
- [x] Animation uses hasAnimated (one-shot) not toggle

### Browser Testing
- [x] Bar chart bars rise from baseline on first hover
- [x] Bar chart stays visible after mouse leaves
- [x] Bar chart fills container width (no dead space)
- [x] Donut chart segments progressively fill on first hover
- [x] Donut chart stays visible after mouse leaves
- [x] Client cards show full names, companies, emails, phone numbers
- [x] All client cards are equal height
- [x] Tags visible and aligned to bottom of cards

**Test notes:** First implementation had three bugs: bars floating off baseline (static y/height conflicting with motion), charts resetting to empty on mouse leave (isHovered toggle instead of one-shot), and cards still unreadable (break-all splitting emails mid-character, 4-column grid too narrow). All fixed in second pass.

## CLAUDE.md Updates

None - existing rules were sufficient.
