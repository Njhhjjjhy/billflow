# QA Issue: Dashboard Mobile Responsiveness

**Date:** 2026-02-14
**Status:** Partially Fixed
**Reporter:** QA Review

## Issue Description

The dashboard page has multiple mobile responsiveness issues. On devices ~390px wide, content overflows card boundaries and gets clipped at the viewport edge. Affected areas:

- KPI stat cards: monetary values (e.g. "NT$345,000") overflow the card border
- Top clients section: amounts and invoice counts clipped on the right
- Recent invoices: amounts and status badges cut off
- StatusChart: horizontal layout (chart + legend) too wide for mobile
- RevenueChart: fixed-width SVG doesn't scale to container, "Jan" label clipped

## Root Cause

Multiple overlapping layout issues:

1. **Card component** had no `overflow-hidden`, allowing child content to visually bleed past card borders
2. **Card padding** was fixed at `p-6` (24px) on all breakpoints, consuming too much space on small screens
3. **KPI card values** used `text-2xl` (24px) monospace font, too wide for the available space in a 2-column grid
4. **KPI card icon** was fixed at 40x40px with no `shrink-0`, competing with value text for space
5. **Top clients row** right column had `shrink-0`, preventing it from flexing when space was tight
6. **StatusChart** used a fixed horizontal layout (chart beside legend) with no mobile stacking
7. **RevenueChart** SVG used fixed `width`/`height` attributes instead of a responsive `viewBox`, and `chartWidth` calculation didn't account for the 60px left offset

## Solution

Applied responsive fixes across 4 files, focusing on proper overflow handling, responsive sizing, and flexible layouts.

## Files Modified

- `src/components/ui/Card.tsx` - Added `overflow-hidden` to base classes; changed padding from `p-6` to `p-4 tablet:p-6`
- `src/app/app/page.tsx` - KPI card: reduced value font to `text-lg tablet:text-2xl desktop:text-3xl`, added `truncate` and `min-w-0`, shrunk icon to `w-8 h-8 tablet:w-10 tablet:h-10`. KPI grid: tightened gap to `gap-3 tablet:gap-4 desktop:gap-6`. Invoice row: added `text-sm tablet:text-base` to amounts. Client row: added `min-w-0 flex-1` to left side, `shrink-0` to avatar, responsive margin and font sizing on right side
- `src/components/charts/StatusChart.tsx` - Changed layout to `flex-col items-center` on mobile, `tablet:flex-row` on tablet+. Legend wraps horizontally on mobile via `flex-wrap justify-center gap-x-4 gap-y-2`
- `src/components/charts/RevenueChart.tsx` - Replaced fixed `width`/`height` with `viewBox` + `width="100%"` + `preserveAspectRatio`. Fixed `chartWidth` calculation to include the 60px left offset

## Verification Results

### Code Review
- [x] Changes match approved plan
- [x] Design system compliance verified (uses design tokens, responsive breakpoints)
- [x] No unintended side effects detected

### Browser Testing
- [x] KPI card values no longer overflow card borders
- [x] StatusChart stacks vertically on mobile with wrapped legend
- [x] RevenueChart scales to container width
- [ ] Top clients amounts still need verification after latest round of fixes
- [ ] Recent invoice amounts/badges need verification after latest round

**Test notes:** User tested on mobile device (~390px). First round of fixes resolved KPI cards and chart layout. Revenue chart "Jan" label was still clipped due to viewBox width calculation not including the 60px offset — fixed in second pass. Content was still bleeding past card borders — resolved by adding `overflow-hidden` to Card component in third pass. Final verification pending.

## CLAUDE.md Updates

None — existing rules were sufficient. The responsive breakpoint system and Card component specs already covered the expected behavior; the implementation just hadn't followed them.
