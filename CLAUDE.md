# Billflow - Technical Guidelines

> A bilingual invoicing and client management tool for Taiwan freelancers.

## Related Documentation

- **[Design Guidelines](DESIGN_GUIDELINES.md)** - Neo-Brutalist design system, animations, accessibility, UX writing
- **[Things to Avoid](docs/THINGS_TO_AVOID.md)** - Anti-patterns, common mistakes, security pitfalls

---

## Project Overview

### Mission
Provide Taiwan freelancers with a professional, bilingual invoicing tool that handles local tax requirements while supporting international clients.

### Target Users
1. **Bilingual Freelancers** - Taiwanese professionals working with local and international clients
2. **Expat Consultants** - Foreign professionals needing English UI with Chinese invoice output
3. **Side Hustlers** - Part-time freelancers needing simple, compliant invoicing

### Core Features (MVP)
- Invoice creation with Taiwan tax fields (統一發票 format)
- Bilingual toggle (English/Chinese output)
- Client management with Taiwan-specific fields
- Payment tracking (paid/unpaid/overdue dashboard)
- Multi-currency support (TWD, USD, EUR)
- PDF export with Chinese character support
- Email invoices to clients

---

## Technical Architecture

### Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Monorepo | Turborepo 2 + npm workspaces | Build orchestration, workspace management |
| Frontend | Next.js 16 (App Router) | SSR, routing, React |
| Styling | Tailwind CSS 4 | Utility-first CSS |
| UI Components | Custom Neo-Brutalist (`@billflow/ui`) | Shared design system package |
| Animations | Motion.dev (Framer Motion) | React component animations |
| Scroll Animations | GSAP + ScrollTrigger | Complex timeline/scroll animations |
| Backend | Next.js API Routes | Serverless functions |
| Database | Supabase (PostgreSQL) | Data persistence |
| Auth | Supabase Auth | Authentication |
| Storage | Supabase Storage | File uploads |
| PDF Generation | @react-pdf/renderer | Invoice PDFs |
| Email | Resend | Transactional email |
| Hosting | Vercel | Deployment |
| Validation | Zod | Schema validation |
| Forms | React Hook Form | Form management |
| State | Zustand (if needed) | Client state |
| Data Fetching | TanStack Query | Server state |
| i18n | react-i18next | Bilingual support (EN/zh-TW) |

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Resend
RESEND_API_KEY=

# App
NEXT_PUBLIC_APP_URL=
```

---

## Coding Conventions

### TypeScript

```typescript
// Use strict TypeScript
// tsconfig.json should include:
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}

// Always define explicit return types for functions
function calculateTotal(items: LineItem[]): number {
  // ...
}

// Use type over interface for simple types
type Currency = 'TWD' | 'USD' | 'EUR';
type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';

// Use interface for objects with methods or that will be extended
interface Invoice {
  id: string;
  number: string;
  // ...
}

// No 'any' types - use 'unknown' if type is truly unknown
// Use discriminated unions for complex state
type FormState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Invoice }
  | { status: 'error'; error: string };
```

### React Components

```typescript
// Use function declarations for components
export function InvoiceCard({ invoice }: InvoiceCardProps) {
  // ...
}

// Props interface named [ComponentName]Props
interface InvoiceCardProps {
  invoice: Invoice;
  onEdit?: (id: string) => void;
}

// Hooks at top of component, in consistent order:
// 1. useState
// 2. useRef
// 3. useContext
// 4. useMemo/useCallback
// 5. useEffect
// 6. Custom hooks
```

### File Naming

```
Components: PascalCase
- InvoiceCard.tsx
- ClientList.tsx

Utilities/Hooks: camelCase
- useInvoice.ts
- formatCurrency.ts

Pages (App Router): lowercase with hyphens
- app/invoices/page.tsx
- app/clients/[id]/page.tsx

Types: PascalCase
- types/invoice.ts
- types/client.ts
```

### Import Order

```typescript
// 1. React/Next imports
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. Third-party imports
import { format } from 'date-fns';
import { z } from 'zod';

// 3. Shared UI package imports
import { Button } from '@billflow/ui/components/Button';
import { useMotionPreference } from '@billflow/ui/hooks/useReducedMotion';
import { cn } from '@billflow/ui/lib/utils';

// 4. App-local imports (absolute)
import { useInvoice } from '@/hooks/useInvoice';
import { InvoiceForm } from '@/components/forms/InvoiceForm';

// 5. Relative imports
import { InvoiceLineItem } from './InvoiceLineItem';

// 6. Types
import type { Invoice } from '@/types/invoice';
```

### Shared Package Imports

Components in `apps/web` and `apps/website` import shared code from `@billflow/ui`:

```typescript
// UI components
import { Button } from '@billflow/ui/components/Button';
import { Card } from '@billflow/ui/components/Card';

// Hooks
import { useMotionPreference } from '@billflow/ui/hooks/useReducedMotion';

// Utilities
import { cn } from '@billflow/ui/lib/utils';
import { spring, duration } from '@billflow/ui/lib/motion';
import { formatCurrency } from '@billflow/ui/lib/format';

// App-local code stays with @/ alias
import { useZodForm } from '@/hooks/useZodForm';
import { validateInvoice } from '@/lib/validations';
```

### API Routes

```typescript
// Use Zod for request validation
const createInvoiceSchema = z.object({
  clientId: z.string().uuid(),
  items: z.array(lineItemSchema).min(1),
  currency: z.enum(['TWD', 'USD', 'EUR']),
});

// Consistent error handling
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = createInvoiceSchema.parse(body);

    // ... process

    return Response.json({ data: result }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Invoice creation failed:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Database Queries

```typescript
// Use Supabase client with proper typing
import { createServerClient } from '@/lib/supabase/server';
import type { Database } from '@/types/database';

// Always handle errors
const { data, error } = await supabase
  .from('invoices')
  .select('*, client:clients(*)')
  .eq('business_id', businessId)
  .order('created_at', { ascending: false });

if (error) {
  throw new Error(`Failed to fetch invoices: ${error.message}`);
}

// Use RLS (Row Level Security) for authorization
```

---

## Testing Guidelines

### Testing Strategy

```
Unit Tests: Utility functions, calculations
Integration Tests: API routes, database operations
E2E Tests: Critical user flows (create invoice, mark paid)
```

### What to Test

1. **Invoice calculations**
   - Subtotal calculation
   - Tax calculation (5% 營業稅)
   - Discount application
   - Currency formatting

2. **Validation**
   - Taiwan tax ID format (8 digits)
   - Required fields
   - Date logic (due date after issue date)

3. **Critical flows**
   - Create and send invoice
   - Mark invoice as paid
   - Export to PDF

### Testing Tools

```
Unit/Integration: Vitest
E2E: Playwright
API Testing: Built-in Vitest + supertest
```

---

## Taiwan-Specific Requirements

### 統一編號 (Unified Business Number)

```typescript
// Validation: exactly 8 digits with checksum
const taxIdSchema = z.string().regex(/^\d{8}$/, 'Tax ID must be 8 digits');

// Display format: no spaces or dashes
// Example: 12345678
```

### 統一發票 (Uniform Invoice) Fields

Required fields for Taiwan tax compliance:
1. **Seller Information**
   - Business name (Chinese required)
   - 統一編號 (Tax ID)
   - Address
   - Phone

2. **Buyer Information**
   - Name/Company
   - 統一編號 (if business)

3. **Invoice Details**
   - Invoice number
   - Date
   - Item descriptions
   - Quantities and unit prices
   - Tax amount (5% 營業稅)
   - Total amount

### Currency Formatting

```typescript
// TWD: NT$ prefix, no decimals
formatCurrency(1000, 'TWD') // "NT$1,000"

// USD: $ prefix, 2 decimals
formatCurrency(1000, 'USD') // "$1,000.00"

// EUR: € prefix, 2 decimals
formatCurrency(1000, 'EUR') // "€1,000.00"
```

### Date Formatting

```typescript
// For Taiwan audience: YYYY/MM/DD
formatDate(date, 'zh') // "2026/01/25"

// For international: locale-based
formatDate(date, 'en') // "01/25/2026" or "25/01/2026"
```

---

## File Structure

This is a Turborepo monorepo with npm workspaces.

```
billflow/
├── apps/
│   ├── web/                          # @billflow/web — Invoicing app
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── (dashboard)/      # Protected app routes (AppShell wrapper)
│   │   │   │   │   ├── layout.tsx    # AppShell + ToastProvider
│   │   │   │   │   ├── page.tsx      # Dashboard
│   │   │   │   │   ├── invoices/     # Invoice CRUD
│   │   │   │   │   ├── clients/      # Client CRUD
│   │   │   │   │   ├── settings/
│   │   │   │   │   └── help/
│   │   │   │   ├── api/              # API routes
│   │   │   │   │   ├── clients/
│   │   │   │   │   └── invoices/
│   │   │   │   ├── demo/             # Demo pages
│   │   │   │   ├── layout.tsx        # Root layout (fonts, globals.css)
│   │   │   │   └── globals.css       # Imports @billflow/ui styles
│   │   │   ├── components/
│   │   │   │   ├── forms/            # Form components (FormField, FormInput, etc.)
│   │   │   │   ├── invoices/         # Invoice-specific (LineItemsTable, etc.)
│   │   │   │   ├── layout/           # AppShell, Sidebar, MobileNav
│   │   │   │   └── charts/           # RevenueChart, StatusChart
│   │   │   ├── hooks/                # App-specific hooks (useZodForm)
│   │   │   ├── lib/
│   │   │   │   ├── pdf/              # PDF generation (@react-pdf/renderer)
│   │   │   │   └── validations/      # Zod schemas
│   │   │   ├── types/                # TypeScript types
│   │   │   └── locales/              # i18n translation files
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── next.config.ts
│   │   └── postcss.config.mjs
│   │
│   └── website/                      # @billflow/website — Marketing site
│       ├── src/
│       │   ├── app/
│       │   │   ├── layout.tsx        # Root layout (fonts, Navbar, Footer)
│       │   │   ├── page.tsx          # Landing page
│       │   │   └── globals.css       # Imports @billflow/ui styles
│       │   └── components/
│       │       └── landing/          # Hero, FeaturesSection, BottomCTA, etc.
│       ├── package.json
│       ├── tsconfig.json
│       ├── next.config.ts
│       └── postcss.config.mjs
│
├── packages/
│   └── ui/                           # @billflow/ui — Shared design system
│       ├── src/
│       │   ├── components/           # Neo-Brutalist UI components + stories
│       │   │   ├── Button.tsx        # Press effect animations
│       │   │   ├── Card.tsx          # Lift effect on hover
│       │   │   ├── Input.tsx         # Focus shadow animations
│       │   │   ├── Select.tsx        # Dropdown component
│       │   │   ├── Badge.tsx         # Status badges
│       │   │   ├── Table.tsx         # Sortable, accessible
│       │   │   ├── Modal.tsx         # With focus trap
│       │   │   ├── Toast.tsx         # Notification system
│       │   │   ├── Skeleton.tsx      # Loading states
│       │   │   ├── *.stories.tsx     # Storybook stories
│       │   │   └── index.ts          # Barrel export
│       │   ├── docs/                 # Storybook MDX documentation
│       │   ├── hooks/                # Shared hooks
│       │   │   ├── useReducedMotion.ts
│       │   │   ├── useMediaQuery.ts
│       │   │   └── useShakeAnimation.ts
│       │   ├── lib/                  # Shared utilities
│       │   │   ├── motion.ts         # Animation tokens
│       │   │   ├── gsap.ts           # GSAP setup
│       │   │   ├── format.ts         # Currency, date formatters
│       │   │   └── utils.ts          # cn() helper, etc.
│       │   ├── styles/
│       │   │   └── globals.css       # Design tokens, base styles
│       │   ├── types/
│       │   │   └── index.ts          # Shared types (Currency, Language)
│       │   └── index.ts              # Package entry point
│       ├── .storybook/               # Storybook config
│       ├── package.json
│       └── tsconfig.json
│
├── docs/                             # Project documentation
│   ├── THINGS_TO_AVOID.md
│   └── plans/                        # Implementation plans
├── CLAUDE.md                         # Technical guidelines (this file)
├── DESIGN_GUIDELINES.md              # Neo-Brutalist design system
├── turbo.json                        # Turborepo task config
├── package.json                      # Workspace root
├── vercel.json                       # Must stay empty {} — see deployment notes
└── .env.local
```

---

## Data Models

```typescript
interface User {
  id: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

interface Business {
  id: string;
  user_id: string;
  name_zh: string;
  name_en: string;
  tax_id: string; // 統一編號, 8 digits
  address: string;
  phone: string;
  email: string;
  logo_url: string | null;
  default_payment_terms: number; // days
  default_currency: 'TWD' | 'USD' | 'EUR';
  default_tax_rate: number; // e.g., 0.05
  invoice_prefix: string;
  invoice_next_number: number;
  created_at: Date;
  updated_at: Date;
}

interface Client {
  id: string;
  business_id: string;
  display_name: string;
  company_name: string;
  tax_id: string | null;
  contact_name: string;
  email: string;
  phone: string | null;
  line_id: string | null;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  default_payment_terms: number | null;
  preferred_currency: 'TWD' | 'USD' | 'EUR' | null;
  preferred_language: 'zh' | 'en' | null;
  tags: string[];
  notes: string;
  created_at: Date;
  updated_at: Date;
}

interface Invoice {
  id: string;
  business_id: string;
  client_id: string;
  invoice_number: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  currency: 'TWD' | 'USD' | 'EUR';
  exchange_rate_to_twd: number;
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  discount_type: 'percentage' | 'fixed' | null;
  discount_value: number;
  discount_amount: number;
  total: number;
  issue_date: Date;
  due_date: Date;
  paid_date: Date | null;
  paid_amount: number;
  language: 'zh' | 'en';
  notes_external: string;
  notes_internal: string;
  pdf_url: string | null;
  sent_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

interface InvoiceLineItem {
  id: string;
  invoice_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
  sort_order: number;
}

interface PaymentRecord {
  id: string;
  invoice_id: string;
  amount: number;
  payment_date: Date;
  payment_method: string;
  notes: string;
  created_at: Date;
}
```

---

## API Routes

```
Authentication:
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/session

Business:
GET    /api/business
PUT    /api/business
POST   /api/business/logo

Clients:
GET    /api/clients
POST   /api/clients
GET    /api/clients/[id]
PUT    /api/clients/[id]
DELETE /api/clients/[id]

Invoices:
GET    /api/invoices
POST   /api/invoices
GET    /api/invoices/[id]
PUT    /api/invoices/[id]
DELETE /api/invoices/[id]
POST   /api/invoices/[id]/duplicate
POST   /api/invoices/[id]/send
GET    /api/invoices/[id]/pdf

Payments:
POST   /api/invoices/[id]/payments
DELETE /api/invoices/[id]/payments/[paymentId]

Dashboard:
GET    /api/dashboard/stats
GET    /api/dashboard/revenue

Export:
GET    /api/export/invoices
```

---

## Vercel Deployment

Three Vercel projects deploy from this repo:

| Project | Package | Root Directory | Framework | Build Command |
|---------|---------|----------------|-----------|---------------|
| `billflow` | `@billflow/web` | `apps/web` | Next.js | `next build` |
| `billflow-design-system` | `@billflow/ui` | `packages/ui` | None | `npx storybook build` |
| `billflow-website` | `@billflow/website` | `apps/website` | Next.js | `next build` |

**`vercel.json` must stay empty `{}`** — framework is set at project level, not in the file.

---

## Quick Reference Commands

```bash
# Development (all packages)
npm run dev

# Development (specific)
npm run dev:web          # Invoicing app on port 3000
npm run dev:website      # Marketing site on port 3001
npm run dev:storybook    # Storybook on port 6006

# Build (all packages via Turborepo)
npm run build

# Type check
npm run typecheck

# Lint
npm run lint

# Build a specific package
npx turbo build --filter=@billflow/web
npx turbo build --filter=@billflow/website
npx turbo build --filter=@billflow/ui

# Generate Supabase types
npm run db:generate-types
```

---

*Last updated: February 2026*
*Version: 2.0*


## Obsidian vault

- Path: /Users/riaan/Documents/personal/obsidian-vault
- After each session, write a handoff note to /Users/riaan/Documents/personal/obsidian-vault/sessions/
- Use filename format: YYYY-MM-DD-[project-name]-[topic].md
