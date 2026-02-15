# Monorepo Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert the single-app Billflow repo into a Turborepo monorepo with three independently deployable projects (app, website, design system) sharing a UI package.

**Architecture:** npm workspaces + Turborepo orchestration. Shared UI components, hooks, styles, and utilities live in `packages/ui`. Both `apps/web` (invoicing app) and `apps/website` (GTM marketing site) depend on `@billflow/ui`. Storybook documents the shared UI package.

**Tech Stack:** Turborepo 2, npm workspaces, Next.js 16, Tailwind CSS 4, Storybook 10, TypeScript 5.

**Design doc:** `docs/plans/2026-02-15-turborepo-monorepo-design.md`

---

### Task 1: Create Monorepo Root Scaffolding

**Files:**
- Create: `turbo.json`
- Modify: `package.json` (root — replace entirely)

**Step 1: Create `turbo.json`**

```jsonc
// turbo.json
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

**Step 2: Replace root `package.json`**

The root package.json becomes a workspace root — it no longer has app dependencies. Save the current one for reference first.

```jsonc
// package.json (root)
{
  "name": "billflow",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "turbo dev",
    "dev:web": "turbo dev --filter=@billflow/web",
    "dev:website": "turbo dev --filter=@billflow/website",
    "dev:storybook": "turbo dev --filter=@billflow/ui",
    "build": "turbo build",
    "lint": "turbo lint",
    "typecheck": "turbo typecheck"
  },
  "devDependencies": {
    "turbo": "^2"
  }
}
```

**Step 3: Create the directory structure**

```bash
mkdir -p apps/web/src apps/web/public
mkdir -p apps/website/src apps/website/public
mkdir -p packages/ui/src/components packages/ui/src/hooks packages/ui/src/lib packages/ui/src/styles packages/ui/src/docs
```

**Step 4: Install turbo**

```bash
npm install turbo --save-dev -w
```

**Step 5: Commit**

```bash
git add turbo.json package.json
git commit -m "chore: initialize Turborepo monorepo workspace root"
```

---

### Task 2: Create `packages/ui` — Shared Design System

**Files:**
- Create: `packages/ui/package.json`
- Create: `packages/ui/tsconfig.json`
- Create: `packages/ui/src/index.ts`
- Move: `src/components/ui/*` → `packages/ui/src/components/`
- Move: `src/components/docs/*` → `packages/ui/src/docs/`
- Move: `src/hooks/useReducedMotion.ts` → `packages/ui/src/hooks/`
- Move: `src/hooks/useMediaQuery.ts` → `packages/ui/src/hooks/`
- Move: `src/hooks/useShakeAnimation.ts` → `packages/ui/src/hooks/`
- Move: `src/hooks/index.ts` → `packages/ui/src/hooks/` (will be modified)
- Move: `src/lib/motion.ts` → `packages/ui/src/lib/`
- Move: `src/lib/gsap.ts` → `packages/ui/src/lib/`
- Move: `src/lib/format.ts` → `packages/ui/src/lib/`
- Move: `src/lib/utils.ts` → `packages/ui/src/lib/`
- Move: `src/app/globals.css` → `packages/ui/src/styles/globals.css`
- Move: `.storybook/*` → `packages/ui/.storybook/`

**Step 1: Create `packages/ui/package.json`**

```jsonc
// packages/ui/package.json
{
  "name": "@billflow/ui",
  "version": "0.0.0",
  "private": true,
  "sideEffects": ["*.css"],
  "exports": {
    "./components/*": "./src/components/*.tsx",
    "./hooks/*": "./src/hooks/*.ts",
    "./lib/*": "./src/lib/*.ts",
    "./styles/*": "./src/styles/*"
  },
  "scripts": {
    "dev": "storybook dev -p 6006",
    "build": "storybook build",
    "lint": "eslint src/",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@headlessui/react": "^2.2.9",
    "clsx": "^2.1.1",
    "date-fns": "^4.1.0",
    "gsap": "^3.14.2",
    "lucide-react": "^0.563.0",
    "motion": "^12.29.0"
  },
  "peerDependencies": {
    "react": "^19",
    "react-dom": "^19"
  },
  "devDependencies": {
    "@storybook/addon-a11y": "^10.2.8",
    "@storybook/addon-docs": "^10.2.8",
    "@storybook/addon-vitest": "^10.2.8",
    "@storybook/nextjs-vite": "^10.2.8",
    "@chromatic-com/storybook": "^5.0.1",
    "@tailwindcss/postcss": "^4",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-plugin-storybook": "^10.2.8",
    "postcss": "^8",
    "storybook": "^10.2.8",
    "tailwindcss": "^4",
    "typescript": "^5",
    "vite": "^7.3.1"
  }
}
```

**Step 2: Create `packages/ui/tsconfig.json`**

```jsonc
// packages/ui/tsconfig.json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "composite": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "exclude": ["node_modules", "storybook-static"]
}
```

**Step 3: Move UI components**

```bash
# Components (11 components + 11 stories + index)
mv src/components/ui/*.tsx packages/ui/src/components/
mv src/components/ui/*.stories.tsx packages/ui/src/components/
mv src/components/ui/index.ts packages/ui/src/components/

# Docs (7 MDX files)
mv src/components/docs/*.mdx packages/ui/src/docs/
```

**Step 4: Move shared hooks**

```bash
mv src/hooks/useReducedMotion.ts packages/ui/src/hooks/
mv src/hooks/useMediaQuery.ts packages/ui/src/hooks/
mv src/hooks/useShakeAnimation.ts packages/ui/src/hooks/
```

Create a new hooks index for the UI package:

```typescript
// packages/ui/src/hooks/index.ts
export { useMotionPreference, useReducedMotionPreference } from "./useReducedMotion";
export { useMediaQuery, useIsTablet } from "./useMediaQuery";
export { useShakeAnimation } from "./useShakeAnimation";
```

**Step 5: Move shared lib**

```bash
mv src/lib/motion.ts packages/ui/src/lib/
mv src/lib/gsap.ts packages/ui/src/lib/
mv src/lib/format.ts packages/ui/src/lib/
mv src/lib/utils.ts packages/ui/src/lib/
```

**Step 6: Move styles**

```bash
mv src/app/globals.css packages/ui/src/styles/globals.css
```

**Step 7: Move Storybook config**

```bash
mv .storybook packages/ui/.storybook
```

Update story paths in Storybook main config since files are now relative to `packages/ui/`:

```typescript
// packages/ui/.storybook/main.ts
import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: [
    '../src/docs/**/*.mdx',
    '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    '@chromatic-com/storybook',
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  staticDirs: ['../public'],
  docs: {},
};
export default config;
```

Update the Storybook preview to import from the new styles path:

```typescript
// packages/ui/.storybook/preview.ts
// Change the CSS import from '../src/app/globals.css' to:
import '../src/styles/globals.css';
// ... rest stays the same
```

**Step 8: Create `packages/ui/postcss.config.mjs`**

```javascript
// packages/ui/postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

**Step 9: Create the UI package entry point**

```typescript
// packages/ui/src/index.ts
// Re-export everything for convenience
export * from "./components";
export * from "./hooks";
```

**Step 10: Update internal imports within packages/ui**

All UI components currently import from `@/components/ui/...`, `@/hooks/...`, `@/lib/...`. These need to become relative imports or `@/` imports within the package.

Since `packages/ui/tsconfig.json` maps `@/*` to `./src/*`, internal imports like `@/lib/motion` will resolve to `packages/ui/src/lib/motion`. However, component-to-component imports (e.g., Card importing from "./") should already be relative.

Scan all files in `packages/ui/src/` for imports containing `@/` and verify they resolve correctly within the package. The key imports to check:

- Components importing `@/lib/motion` → resolves to `packages/ui/src/lib/motion` ✓
- Components importing `@/lib/utils` → resolves to `packages/ui/src/lib/utils` ✓
- Components importing `@/hooks/useReducedMotion` → resolves to `packages/ui/src/hooks/useReducedMotion` ✓
- Components importing `@/components/ui/Button` → needs to change to `@/components/Button` (no `ui/` subfolder now)

**CRITICAL: Fix component cross-imports.** Components currently import other components as `@/components/ui/Button`. After the move, they're in `packages/ui/src/components/Button.tsx`, so imports should be `@/components/Button` or relative `./Button`.

Search for `@/components/ui/` in all files under `packages/ui/src/` and replace with `@/components/`:

```bash
# Find files that need updating
grep -r "@/components/ui/" packages/ui/src/
```

Replace `@/components/ui/` with `@/components/` in all matches.

Also update story files that import from `@/components/ui/`:
```
@/components/ui/Button → @/components/Button
@/components/ui/Card → @/components/Card
# etc.
```

**Step 11: Commit**

```bash
git add packages/ui/ -A
git add src/components/ui/ src/components/docs/ src/hooks/useReducedMotion.ts src/hooks/useMediaQuery.ts src/hooks/useShakeAnimation.ts src/lib/motion.ts src/lib/gsap.ts src/lib/format.ts src/lib/utils.ts src/app/globals.css .storybook/
git commit -m "refactor: move shared UI, hooks, lib, and styles to packages/ui"
```

---

### Task 3: Verify Storybook Builds in `packages/ui`

**Step 1: Install dependencies**

```bash
cd packages/ui && npm install
```

(Or from root: `npm install` — workspace hoisting handles it)

**Step 2: Run Storybook build**

```bash
npx turbo build --filter=@billflow/ui
```

Expected: Storybook builds to `packages/ui/storybook-static/`.

**Step 3: Fix any import errors**

If the build fails, the errors will indicate which imports need updating. The most common issues:
- `@/components/ui/X` → `@/components/X`
- Missing peer dependencies
- CSS import path issues

**Step 4: Run typecheck**

```bash
cd packages/ui && npx tsc --noEmit
```

Expected: No TypeScript errors.

**Step 5: Commit fixes if any**

```bash
git add -A
git commit -m "fix: resolve packages/ui build issues"
```

---

### Task 4: Create `apps/web` — Billflow Invoicing App

**Files:**
- Create: `apps/web/package.json`
- Create: `apps/web/tsconfig.json`
- Create: `apps/web/next.config.ts`
- Create: `apps/web/postcss.config.mjs`
- Move: `src/app/app/*` → `apps/web/src/app/` (flatten — remove `/app` nesting)
- Move: `src/app/api/*` → `apps/web/src/app/api/`
- Move: `src/app/demo/*` → `apps/web/src/app/demo/`
- Move: `src/app/favicon.ico` → `apps/web/src/app/`
- Move: `src/components/layout/*` → `apps/web/src/components/layout/`
- Move: `src/components/forms/*` → `apps/web/src/components/forms/`
- Move: `src/components/invoices/*` → `apps/web/src/components/invoices/`
- Move: `src/components/charts/*` → `apps/web/src/components/charts/`
- Move: `src/hooks/useZodForm.ts` → `apps/web/src/hooks/`
- Move: `src/lib/pdf/*` → `apps/web/src/lib/pdf/`
- Move: `src/lib/validations/*` → `apps/web/src/lib/validations/`
- Move: `src/types/*` → `apps/web/src/types/`
- Move: `src/locales/*` → `apps/web/src/locales/`
- Create: `apps/web/src/app/layout.tsx` (new root layout)
- Create: `apps/web/src/app/globals.css` (imports shared tokens)

**Step 1: Create `apps/web/package.json`**

```jsonc
// apps/web/package.json
{
  "name": "@billflow/web",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3000",
    "build": "next build",
    "start": "next start",
    "lint": "eslint src/",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@billflow/ui": "*",
    "@hookform/resolvers": "^5.2.2",
    "@react-pdf/renderer": "^4.3.2",
    "@tanstack/react-query": "^5.90.20",
    "@vercel/speed-insights": "^1.3.1",
    "i18next": "^25.8.0",
    "next": "16.1.4",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "react-hook-form": "^7.71.1",
    "react-i18next": "^16.5.3",
    "zod": "^4.3.6"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.1.4",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

**Step 2: Create `apps/web/tsconfig.json`**

```jsonc
// apps/web/tsconfig.json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"],
      "@billflow/ui/*": ["../../packages/ui/src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

**Step 3: Create `apps/web/next.config.ts`**

```typescript
// apps/web/next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@billflow/ui"],
};

export default nextConfig;
```

**Step 4: Create `apps/web/postcss.config.mjs`**

```javascript
// apps/web/postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

**Step 5: Move app source files**

```bash
# App routes — flatten from src/app/app/ to apps/web/src/app/
# The /app prefix goes away since this is now its own Next.js app
cp -r src/app/app/* apps/web/src/app/
cp src/app/favicon.ico apps/web/src/app/

# API routes
mkdir -p apps/web/src/app/api
cp -r src/app/api/* apps/web/src/app/api/

# Demo routes
mkdir -p apps/web/src/app/demo
cp -r src/app/demo/* apps/web/src/app/demo/

# App-specific components
mkdir -p apps/web/src/components
cp -r src/components/layout apps/web/src/components/
cp -r src/components/forms apps/web/src/components/
cp -r src/components/invoices apps/web/src/components/
cp -r src/components/charts apps/web/src/components/

# App-specific hooks
mkdir -p apps/web/src/hooks
cp src/hooks/useZodForm.ts apps/web/src/hooks/

# App-specific lib
mkdir -p apps/web/src/lib
cp -r src/lib/pdf apps/web/src/lib/
cp -r src/lib/validations apps/web/src/lib/

# Types
cp -r src/types apps/web/src/

# Locales
cp -r src/locales apps/web/src/
```

**Step 6: Create `apps/web/src/app/layout.tsx`**

This is the new root layout for the app. It includes font loading (previously in `src/app/layout.tsx`) and imports shared styles.

```typescript
// apps/web/src/app/layout.tsx
import type { Metadata } from "next";
import { Space_Grotesk, Noto_Sans_TC, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  variable: "--font-noto-sans-tc",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Billflow — Invoicing for Taiwan Freelancers",
  description: "Create bilingual invoices, handle local tax compliance, and get paid faster.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${notoSansTC.variable} ${spaceMono.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
```

**Step 7: Create `apps/web/src/app/globals.css`**

```css
/* apps/web/src/app/globals.css */
/* Import shared design system tokens and base styles */
@import "../../../packages/ui/src/styles/globals.css";

/* Tell Tailwind to scan the shared UI package for class names */
@source "../../../packages/ui/src";
```

**Step 8: Create `apps/web/src/hooks/index.ts`**

```typescript
// apps/web/src/hooks/index.ts
export { useZodForm } from "./useZodForm";
// Re-export shared hooks from UI package for convenience
export { useMotionPreference, useReducedMotionPreference } from "@billflow/ui/hooks/useReducedMotion";
export { useMediaQuery, useIsTablet } from "@billflow/ui/hooks/useMediaQuery";
export { useShakeAnimation } from "@billflow/ui/hooks/useShakeAnimation";
```

**Step 9: Commit**

```bash
git add apps/web/ -A
git commit -m "refactor: scaffold apps/web and move app source files"
```

---

### Task 5: Update Imports in `apps/web`

All files in `apps/web/src/` that import from the old shared paths need updating.

**Step 1: Update imports from `@/components/ui/` to `@billflow/ui/components/`**

Search and replace across all files in `apps/web/src/`:

```
@/components/ui/Button    → @billflow/ui/components/Button
@/components/ui/Card      → @billflow/ui/components/Card
@/components/ui/Input     → @billflow/ui/components/Input
@/components/ui/Textarea  → @billflow/ui/components/Textarea
@/components/ui/Checkbox  → @billflow/ui/components/Checkbox
@/components/ui/Select    → @billflow/ui/components/Select
@/components/ui/Badge     → @billflow/ui/components/Badge
@/components/ui/Table     → @billflow/ui/components/Table
@/components/ui/Modal     → @billflow/ui/components/Modal
@/components/ui/Toast     → @billflow/ui/components/Toast
@/components/ui/Skeleton  → @billflow/ui/components/Skeleton
@/components/ui           → @billflow/ui/components  (barrel imports)
```

**Step 2: Update imports from `@/lib/` for shared utils**

```
@/lib/motion  → @billflow/ui/lib/motion
@/lib/gsap    → @billflow/ui/lib/gsap
@/lib/format  → @billflow/ui/lib/format
@/lib/utils   → @billflow/ui/lib/utils
```

Note: `@/lib/pdf` and `@/lib/validations` stay as `@/lib/...` since they're app-local.

**Step 3: Update imports from `@/hooks/` for shared hooks**

```
@/hooks/useReducedMotion  → @billflow/ui/hooks/useReducedMotion
@/hooks/useMediaQuery     → @billflow/ui/hooks/useMediaQuery
@/hooks/useShakeAnimation → @billflow/ui/hooks/useShakeAnimation
```

Note: `@/hooks/useZodForm` stays as `@/hooks/useZodForm` since it's app-local.

**Step 4: Fix the app layout reference**

The current `src/app/app/layout.tsx` (now `apps/web/src/app/layout.tsx` for the dashboard) wraps with `AppShell` and `ToastProvider`. This file becomes the dashboard layout, NOT the root layout. It should be at `apps/web/src/app/(dashboard)/layout.tsx` or the routes should be restructured.

Since the app previously had routes under `/app/*`, and now the entire Next.js app IS the app, the current structure `apps/web/src/app/page.tsx` (dashboard), `apps/web/src/app/invoices/`, etc. is correct. But the old `src/app/app/layout.tsx` (the AppShell wrapper) now becomes the root layout's child layout.

Move the old app shell layout:
- `apps/web/src/app/layout.tsx` → this is the NEW root layout (from Step 6 above)
- The old `src/app/app/layout.tsx` content (AppShell + ToastProvider) should be inlined into the root layout OR kept as a route group layout

Simplest: make a `(dashboard)` route group that wraps all app routes with the AppShell:

```
apps/web/src/app/
├── layout.tsx              # Root layout (fonts, globals.css)
├── (dashboard)/
│   ├── layout.tsx          # AppShell + ToastProvider wrapper
│   ├── page.tsx            # Dashboard
│   ├── invoices/
│   ├── clients/
│   ├── settings/
│   └── help/
├── api/                    # API routes (no shell needed)
└── demo/                   # Demo pages
```

This means we need to nest the dashboard content under a `(dashboard)` group.

**Step 5: Restructure dashboard routes**

```bash
cd apps/web/src/app
mkdir -p "(dashboard)"
# Move dashboard routes into the group
mv page.tsx "(dashboard)/"
mv layout.tsx.old "(dashboard)/layout.tsx"  # The old AppShell layout
mv invoices "(dashboard)/"
mv clients "(dashboard)/"
mv settings "(dashboard)/"
mv help "(dashboard)/"
```

Note: The root `layout.tsx` created in Task 4 Step 6 stays at `apps/web/src/app/layout.tsx`. The old app layout (with AppShell) moves to `apps/web/src/app/(dashboard)/layout.tsx`.

**Step 6: Verify with grep that no old import paths remain**

```bash
grep -r "@/components/ui/" apps/web/src/
grep -r "from \"@/lib/motion\"" apps/web/src/
grep -r "from \"@/lib/gsap\"" apps/web/src/
grep -r "from \"@/lib/format\"" apps/web/src/
grep -r "from \"@/lib/utils\"" apps/web/src/
grep -r "from \"@/hooks/useReducedMotion\"" apps/web/src/
grep -r "from \"@/hooks/useMediaQuery\"" apps/web/src/
grep -r "from \"@/hooks/useShakeAnimation\"" apps/web/src/
```

Expected: No matches for any of the above.

**Step 7: Commit**

```bash
git add apps/web/ -A
git commit -m "refactor: update apps/web imports to use @billflow/ui"
```

---

### Task 6: Verify `apps/web` Builds

**Step 1: Install dependencies from root**

```bash
cd <repo-root>
npm install
```

**Step 2: Run typecheck**

```bash
npx turbo typecheck --filter=@billflow/web
```

Expected: No TypeScript errors.

**Step 3: Run build**

```bash
npx turbo build --filter=@billflow/web
```

Expected: Next.js build succeeds.

**Step 4: Fix any issues**

Common issues:
- Missing dependencies in `apps/web/package.json` (add them)
- Import path typos (fix the specific import)
- CSS resolution issues (verify the relative path to globals.css)
- `transpilePackages` not set (already handled in next.config.ts)

**Step 5: Commit fixes**

```bash
git add -A
git commit -m "fix: resolve apps/web build issues"
```

---

### Task 7: Create `apps/website` — GTM Marketing Site

**Files:**
- Create: `apps/website/package.json`
- Create: `apps/website/tsconfig.json`
- Create: `apps/website/next.config.ts`
- Create: `apps/website/postcss.config.mjs`
- Move: `src/components/landing/*` → `apps/website/src/components/landing/`
- Create: `apps/website/src/app/layout.tsx` (root layout with Navbar + Footer)
- Create: `apps/website/src/app/page.tsx` (landing page)
- Create: `apps/website/src/app/globals.css`

**Step 1: Create `apps/website/package.json`**

```jsonc
// apps/website/package.json
{
  "name": "@billflow/website",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3001",
    "build": "next build",
    "start": "next start",
    "lint": "eslint src/",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@billflow/ui": "*",
    "next": "16.1.4",
    "react": "19.2.3",
    "react-dom": "19.2.3"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.1.4",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

**Step 2: Create `apps/website/tsconfig.json`**

```jsonc
// apps/website/tsconfig.json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"],
      "@billflow/ui/*": ["../../packages/ui/src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

**Step 3: Create `apps/website/next.config.ts`**

```typescript
// apps/website/next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@billflow/ui"],
};

export default nextConfig;
```

**Step 4: Create `apps/website/postcss.config.mjs`**

```javascript
// apps/website/postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

**Step 5: Move landing page components**

```bash
mkdir -p apps/website/src/components
cp -r src/components/landing apps/website/src/components/
```

**Step 6: Create `apps/website/src/app/globals.css`**

```css
/* apps/website/src/app/globals.css */
@import "../../../packages/ui/src/styles/globals.css";
@source "../../../packages/ui/src";
```

**Step 7: Create `apps/website/src/app/layout.tsx`**

The marketing layout merges the root layout (fonts) with the marketing wrapper (Navbar + Footer):

```typescript
// apps/website/src/app/layout.tsx
import type { Metadata } from "next";
import { Space_Grotesk, Noto_Sans_TC, Space_Mono } from "next/font/google";
import { Navbar, Footer } from "@/components/landing";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  variable: "--font-noto-sans-tc",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Billflow — Invoicing Built for Taiwan",
  description: "Create bilingual invoices, handle local tax compliance, and get paid faster — all in one tool designed for freelancers like you.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${notoSansTC.variable} ${spaceMono.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

**Step 8: Create `apps/website/src/app/page.tsx`**

```typescript
// apps/website/src/app/page.tsx
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

**Step 9: Update imports in landing components**

Landing components currently import from `@/components/ui/Button`, `@/lib/motion`, etc. These need to become `@billflow/ui/...` imports.

Search and replace in `apps/website/src/components/landing/`:

```
@/components/ui/Button → @billflow/ui/components/Button
@/components/ui/Input  → @billflow/ui/components/Input
@/components/ui/Badge  → @billflow/ui/components/Badge
@/lib/motion           → @billflow/ui/lib/motion
@/lib/gsap             → @billflow/ui/lib/gsap
@/hooks/useReducedMotion → @billflow/ui/hooks/useReducedMotion
```

**Step 10: Commit**

```bash
git add apps/website/ -A
git commit -m "refactor: scaffold apps/website and move landing page components"
```

---

### Task 8: Verify `apps/website` Builds

**Step 1: Install dependencies**

```bash
cd <repo-root>
npm install
```

**Step 2: Run typecheck**

```bash
npx turbo typecheck --filter=@billflow/website
```

**Step 3: Run build**

```bash
npx turbo build --filter=@billflow/website
```

Expected: Next.js build succeeds, landing page is statically generated.

**Step 4: Fix any issues and commit**

```bash
git add -A
git commit -m "fix: resolve apps/website build issues"
```

---

### Task 9: Clean Up Old Source Directory

Now that everything has been moved to `apps/` and `packages/`, remove the old `src/` directory and leftover root config files.

**Step 1: Remove old source files**

```bash
# Remove old src/ directory
rm -rf src/

# Remove old root configs that are now per-package
rm -f next.config.ts
rm -f postcss.config.mjs
rm -f vitest.config.ts

# Keep at root: turbo.json, package.json, tsconfig.json (optional), eslint.config.mjs, vercel.json, CLAUDE.md, DESIGN_GUIDELINES.md, docs/

# Remove old storybook-static (will be rebuilt in packages/ui)
rm -rf storybook-static/
```

**Step 2: Update root `.gitignore`**

Add entries for all workspace packages:

```
# Build outputs
apps/*/.next
packages/ui/storybook-static

# Dependencies
node_modules

# Environment
.env.local
.env*.local
```

**Step 3: Verify the full monorepo builds**

```bash
npx turbo build
```

Expected: All three packages build successfully:
- `@billflow/ui` → `packages/ui/storybook-static/`
- `@billflow/web` → `apps/web/.next/`
- `@billflow/website` → `apps/website/.next/`

**Step 4: Commit**

```bash
git add -A
git commit -m "refactor: remove old src/ directory and clean up root configs"
```

---

### Task 10: Update Documentation

**Files:**
- Modify: `CLAUDE.md` — update file structure, paths, commands
- Modify: `DESIGN_GUIDELINES.md` — update if any paths are referenced

**Step 1: Update CLAUDE.md**

Update the following sections:
- **File Structure** — replace with the new monorepo structure
- **Quick Reference Commands** — update to use `turbo` commands:
  ```bash
  # Development (all)
  npm run dev

  # Development (specific)
  npm run dev:web          # Invoicing app on port 3000
  npm run dev:website      # Marketing site on port 3001
  npm run dev:storybook    # Storybook on port 6006

  # Build
  npm run build            # All packages

  # Type check
  npm run typecheck

  # Lint
  npm run lint
  ```
- **Import conventions** — document `@billflow/ui/*` pattern
- **Vercel deployment** — update root directories

**Step 2: Commit**

```bash
git add CLAUDE.md DESIGN_GUIDELINES.md
git commit -m "docs: update project docs for monorepo structure"
```

---

### Task 11: Update Vercel Project Settings

This task requires Vercel CLI or dashboard changes.

**Step 1: Update `billflow` (app) project**

```bash
# Set root directory for the app project
vercel link --project prj_u0tLXiu8eh1RUUxw8YfabeERaVce
# Then in Vercel dashboard: set Root Directory to "apps/web"
```

**Step 2: Update `billflow-design-system` project**

```bash
# Set root directory for Storybook
# In Vercel dashboard: set Root Directory to "packages/ui"
# Build command: npx storybook build
# Output directory: storybook-static
```

**Step 3: Create `billflow-website` project**

```bash
# Create new Vercel project for the marketing site
vercel link --project billflow-website
# Or via dashboard: create new project, same repo, Root Directory "apps/website"
# Framework: Next.js
```

**Step 4: Verify all deployments**

Push the branch and check all three Vercel projects build correctly.

**Step 5: Commit any Vercel config changes**

```bash
git add .vercel/
git commit -m "chore: update Vercel project configuration for monorepo"
```

---

## Summary

| Task | What | Depends On |
|------|------|-----------|
| 1 | Root scaffolding (turbo.json, package.json) | None |
| 2 | Create packages/ui, move shared code | Task 1 |
| 3 | Verify Storybook builds | Task 2 |
| 4 | Create apps/web, move app code | Task 1 |
| 5 | Update apps/web imports | Task 2, 4 |
| 6 | Verify apps/web build | Task 5 |
| 7 | Create apps/website, move landing code | Task 2 |
| 8 | Verify apps/website build | Task 7 |
| 9 | Clean up old files | Tasks 3, 6, 8 |
| 10 | Update documentation | Task 9 |
| 11 | Vercel project settings | Task 9 |

**Parallelizable:** Tasks 4-5 and 7 can run in parallel (both depend on Task 2 but not each other). Tasks 3, 6, 8 are verification gates.
