# Turborepo Monorepo Design

> Convert the Billflow single-app repo into a monorepo with three projects that deploy independently but share a design system.

## Goal

Three separate deployments from one repo:

| Project | Purpose | URL |
|---------|---------|-----|
| **Billflow App** | Invoicing tool | app.billflow.com |
| **Billflow Website** | GTM marketing site | billflow.com |
| **Billflow Design System** | Storybook component docs | design.billflow.com |

All three share the same visual identity (components, tokens, fonts, styles) via a shared UI package.

---

## Architecture

### Directory Structure

```
billflow/
├── apps/
│   ├── web/                          # Billflow App
│   │   ├── src/
│   │   │   ├── app/                  # Next.js routes (dashboard, invoices, clients, settings, help, api/)
│   │   │   ├── components/           # App-only components (layout/, forms/, invoices/, charts/)
│   │   │   ├── hooks/                # App-only hooks (useZodForm)
│   │   │   ├── lib/                  # App-only utils (pdf/, validations/, supabase/)
│   │   │   ├── types/                # App types
│   │   │   └── locales/              # i18n (en.json, zh-TW.json)
│   │   ├── public/                   # App static assets (fonts, images)
│   │   ├── next.config.ts
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json              # depends on @billflow/ui
│   │
│   └── website/                      # Billflow GTM Website
│       ├── src/
│       │   ├── app/                  # Next.js routes (landing page, future: pricing, about, blog)
│       │   │   ├── layout.tsx        # Root layout with fonts
│       │   │   └── page.tsx          # Landing page
│       │   └── components/           # Website-only components (landing/)
│       ├── public/                   # Website static assets
│       ├── next.config.ts
│       ├── tailwind.config.ts
│       ├── tsconfig.json
│       └── package.json              # depends on @billflow/ui
│
├── packages/
│   └── ui/                           # Billflow Design System
│       ├── src/
│       │   ├── components/           # Shared UI (Button, Card, Input, Select, Badge, etc.)
│       │   ├── hooks/                # Shared hooks (useReducedMotion, useMediaQuery, useShakeAnimation)
│       │   ├── lib/                  # Shared utils (motion.ts, gsap.ts, format.ts, utils.ts)
│       │   ├── styles/               # globals.css (design tokens, base styles)
│       │   └── index.ts              # Package entry point
│       ├── .storybook/               # Storybook config
│       ├── package.json              # @billflow/ui
│       └── tsconfig.json
│
├── turbo.json                        # Build pipeline config
├── package.json                      # Root workspace config
├── vercel.json                       # Stays empty {}
├── eslint.config.mjs                 # Shared ESLint config
├── CLAUDE.md
├── DESIGN_GUIDELINES.md
└── docs/
```

### Package Dependency Graph

```
@billflow/web ──────┐
                     ├──> @billflow/ui (shared components, styles, tokens)
@billflow/website ──┘
```

Both apps depend on `@billflow/ui`. Neither app depends on the other.

---

## Migration Map

### What moves to `packages/ui/`

| Current Location | New Location | Notes |
|-----------------|--------------|-------|
| `src/components/ui/*.tsx` | `packages/ui/src/components/` | All shared UI components |
| `src/components/ui/*.stories.tsx` | `packages/ui/src/components/` | Co-located stories |
| `src/components/docs/*.mdx` | `packages/ui/src/docs/` | Storybook doc pages |
| `src/hooks/useReducedMotion.ts` | `packages/ui/src/hooks/` | Shared animation hook |
| `src/hooks/useMediaQuery.ts` | `packages/ui/src/hooks/` | Shared utility hook |
| `src/hooks/useShakeAnimation.ts` | `packages/ui/src/hooks/` | Shared animation hook |
| `src/lib/motion.ts` | `packages/ui/src/lib/` | Animation tokens |
| `src/lib/gsap.ts` | `packages/ui/src/lib/` | GSAP registration |
| `src/lib/format.ts` | `packages/ui/src/lib/` | Currency/date formatting (shared) |
| `src/lib/utils.ts` | `packages/ui/src/lib/` | General utils (clsx, etc.) |
| `src/app/globals.css` | `packages/ui/src/styles/globals.css` | Design tokens + base styles |
| `.storybook/` | `packages/ui/.storybook/` | Storybook config |
| `public/fonts/` | `packages/ui/public/fonts/` | Shared font files |

### What moves to `apps/web/`

| Current Location | New Location | Notes |
|-----------------|--------------|-------|
| `src/app/app/` | `apps/web/src/app/` | All app routes (renamed from /app to /) |
| `src/app/api/` | `apps/web/src/app/api/` | API routes |
| `src/app/demo/` | `apps/web/src/app/demo/` | Demo pages |
| `src/app/layout.tsx` | `apps/web/src/app/layout.tsx` | Root layout (modified) |
| `src/components/layout/` | `apps/web/src/components/layout/` | App shell, sidebar, nav |
| `src/components/forms/` | `apps/web/src/components/forms/` | Form wrapper components |
| `src/components/invoices/` | `apps/web/src/components/invoices/` | Invoice components |
| `src/components/charts/` | `apps/web/src/components/charts/` | Chart components |
| `src/hooks/useZodForm.ts` | `apps/web/src/hooks/` | Form-specific hook |
| `src/lib/pdf/` | `apps/web/src/lib/pdf/` | PDF generation |
| `src/lib/validations/` | `apps/web/src/lib/validations/` | Zod schemas |
| `src/types/` | `apps/web/src/types/` | App types |
| `src/locales/` | `apps/web/src/locales/` | i18n files |

### What moves to `apps/website/`

| Current Location | New Location | Notes |
|-----------------|--------------|-------|
| `src/app/(marketing)/layout.tsx` | `apps/website/src/app/layout.tsx` | Root layout (no route group needed) |
| `src/app/(marketing)/page.tsx` | `apps/website/src/app/page.tsx` | Landing page |
| `src/components/landing/` | `apps/website/src/components/landing/` | All landing components |

---

## Import Path Changes

### Before (current)
```typescript
import { Button } from "@/components/ui/Button";
import { spring } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
```

### After (both apps)
```typescript
import { Button } from "@billflow/ui/components/Button";
import { spring } from "@billflow/ui/lib/motion";
import { useReducedMotion } from "@billflow/ui/hooks/useReducedMotion";
```

App-internal imports stay as `@/` paths — only shared imports change.

---

## Key Configuration Files

### Root `package.json`

```jsonc
{
  "name": "billflow",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "devDependencies": {
    "turbo": "^2"
  },
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "typecheck": "turbo typecheck"
  }
}
```

### `turbo.json`

```jsonc
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "storybook-static/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "typecheck": {
      "dependsOn": ["^build"]
    }
  }
}
```

### `packages/ui/package.json`

```jsonc
{
  "name": "@billflow/ui",
  "version": "0.0.0",
  "private": true,
  "exports": {
    "./components/*": "./src/components/*.tsx",
    "./hooks/*": "./src/hooks/*.ts",
    "./lib/*": "./src/lib/*.ts",
    "./styles/*": "./src/styles/*"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "gsap": "^3.14.2",
    "lucide-react": "^0.563.0",
    "motion": "^12.29.0"
  },
  "peerDependencies": {
    "react": "^19",
    "react-dom": "^19",
    "tailwindcss": "^4"
  },
  "devDependencies": {
    "storybook": "^10.2.8",
    "@storybook/nextjs-vite": "^10.2.8",
    "@storybook/addon-docs": "^10.2.8",
    "@storybook/addon-a11y": "^10.2.8",
    "typescript": "^5"
  },
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build": "npx storybook build",
    "lint": "eslint src/",
    "typecheck": "tsc --noEmit"
  }
}
```

### Each app's `package.json` (example: `apps/web`)

```jsonc
{
  "name": "@billflow/web",
  "version": "0.0.0",
  "private": true,
  "dependencies": {
    "@billflow/ui": "workspace:*",
    "next": "16.1.4",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    // ... app-specific deps
  },
  "scripts": {
    "dev": "next dev --port 3000",
    "build": "next build",
    "start": "next start",
    "lint": "eslint src/",
    "typecheck": "tsc --noEmit"
  }
}
```

### Each app's CSS entry point

```css
/* apps/web/src/app/globals.css */
@import "@billflow/ui/styles/globals.css";

/* App-specific styles below */
```

### Each app's `tailwind.config.ts`

```typescript
// apps/web/tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",  // Scan shared UI for classes
  ],
} satisfies Config;
```

### Each app's `tsconfig.json`

```jsonc
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@billflow/ui/*": ["../../packages/ui/src/*"]
    }
  }
}
```

---

## Vercel Deployment

Three Vercel projects, all from the same GitHub repo:

| Vercel Project | Root Directory | Build Command | Output Dir | Framework |
|---------------|----------------|---------------|------------|-----------|
| `billflow` | `apps/web` | `cd ../.. && npx turbo build --filter=@billflow/web` | `apps/web/.next` | Next.js |
| `billflow-website` | `apps/website` | `cd ../.. && npx turbo build --filter=@billflow/website` | `apps/website/.next` | Next.js |
| `billflow-design-system` | `packages/ui` | `cd ../.. && npx turbo build --filter=@billflow/ui` | `packages/ui/storybook-static` | Other |

**Note:** Vercel has native Turborepo support. When it detects a monorepo, it automatically scopes builds to the correct project. The root directory setting tells Vercel which package to focus on.

`vercel.json` stays empty `{}` — all config at project level in the Vercel dashboard.

---

## App Routing Changes

### Billflow App (`apps/web`)

The current app lives under `/app/*` routes because it coexists with the marketing `(marketing)` route group. Once separated, the app becomes the root:

- Current: `billflow-one.vercel.app/app/invoices` → New: `app.billflow.com/invoices`
- Current: `billflow-one.vercel.app/app/clients` → New: `app.billflow.com/clients`
- Current: `billflow-one.vercel.app/app/settings` → New: `app.billflow.com/settings`

The `/app` prefix goes away. The app route structure becomes:

```
apps/web/src/app/
├── layout.tsx          # Root layout (with AppShell/Sidebar)
├── page.tsx            # Dashboard (was /app)
├── invoices/
├── clients/
├── settings/
├── help/
├── demo/
└── api/
```

### Billflow Website (`apps/website`)

No route group needed — the marketing layout IS the root:

```
apps/website/src/app/
├── layout.tsx          # Root layout (with Navbar + Footer)
├── page.tsx            # Landing page (was /(marketing))
├── pricing/            # Future
├── about/              # Future
└── blog/               # Future
```

---

## Shared Fonts Strategy

Font files (Space Grotesk, Noto Sans TC, Space Mono) currently live in `public/fonts/`. Both apps need them.

**Approach:** Keep font files in `packages/ui/public/fonts/`. Each app copies or references them:
- Next.js `next/font` can load fonts from the package
- Alternatively, each app's `public/fonts/` symlinks or copies from the package during build

The simplest: each app includes the fonts in its own `public/fonts/` directory. Slight duplication but zero complexity.

---

## What Stays The Same

- **Design tokens** — same CSS custom properties, same visual language
- **Component API** — Button, Card, Input, etc. work identically
- **Animation system** — GSAP + Motion.dev, same tokens
- **Accessibility** — same focus indicators, reduced motion support
- **Git repo** — single repo, single branch strategy
- **vercel.json** — stays empty `{}`

---

## Summary

This is a file reorganization + workspace setup. No component logic changes. No design changes. The three projects that already exist conceptually (app, website, design system) get their own directories and deployments.
