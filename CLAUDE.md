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
| Frontend | Next.js 14 (App Router) | SSR, routing, React |
| Styling | Tailwind CSS | Utility-first CSS |
| UI Components | Custom Neo-Brutalist | Bold borders, hard shadows |
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

// 3. Internal imports (absolute)
import { Button } from '@/components/ui/button';
import { useInvoice } from '@/hooks/useInvoice';

// 4. Relative imports
import { InvoiceLineItem } from './InvoiceLineItem';

// 5. Types
import type { Invoice } from '@/types/invoice';
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

```
billflow/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Auth routes (login, signup)
│   │   ├── login/
│   │   └── signup/
│   ├── (marketing)/         # Public pages
│   │   └── page.tsx         # Landing page
│   ├── app/                  # Protected app routes
│   │   ├── layout.tsx       # App shell with sidebar
│   │   ├── page.tsx         # Dashboard
│   │   ├── invoices/
│   │   │   ├── page.tsx     # Invoice list
│   │   │   ├── new/
│   │   │   └── [id]/
│   │   ├── clients/
│   │   │   ├── page.tsx
│   │   │   ├── new/
│   │   │   └── [id]/
│   │   └── settings/
│   ├── api/                  # API routes
│   │   ├── auth/
│   │   ├── invoices/
│   │   ├── clients/
│   │   └── dashboard/
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles + CSS variables
├── components/
│   ├── ui/                  # Neo-Brutalist UI components
│   │   ├── Button.tsx       # Press effect animations
│   │   ├── Card.tsx         # Lift effect on hover
│   │   ├── Input.tsx        # Focus shadow animations
│   │   ├── Select.tsx       # Dropdown component
│   │   ├── Badge.tsx        # Status badges
│   │   ├── Table.tsx        # Sortable, accessible
│   │   ├── Modal.tsx        # With focus trap
│   │   ├── Toast.tsx        # Notification system
│   │   └── Skeleton.tsx     # Loading states
│   ├── forms/               # Form components
│   ├── invoices/            # Invoice-specific components
│   ├── clients/             # Client-specific components
│   └── layout/              # Layout components (Sidebar, Nav)
├── lib/
│   ├── motion.ts           # Animation tokens (spring, duration, ease)
│   ├── supabase/           # Supabase client setup
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── validations/        # Zod schemas
│   ├── utils/              # Utility functions
│   ├── format.ts           # Currency, date formatters
│   └── pdf/                # PDF generation
├── hooks/
│   ├── useReducedMotion.ts # Accessibility: motion preference
│   ├── useShakeAnimation.ts # Error shake effect
│   └── ...                  # Other custom hooks
├── types/                   # TypeScript types
│   ├── database.ts         # Supabase generated types
│   ├── invoice.ts
│   └── client.ts
├── locales/                 # Translation files (react-i18next)
│   ├── en.json
│   └── zh-TW.json
├── public/
│   ├── fonts/              # Space Grotesk, Noto Sans TC, Space Mono
│   └── images/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── CLAUDE.md               # Technical guidelines (this file)
├── DESIGN_GUIDELINES.md    # Neo-Brutalist design system
├── docs/
│   └── THINGS_TO_AVOID.md  # Anti-patterns
├── package.json
├── tailwind.config.ts      # Custom breakpoints, colors
├── tsconfig.json
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

## Quick Reference Commands

```bash
# Development
npm run dev

# Build
npm run build

# Type check
npm run typecheck

# Lint
npm run lint

# Test
npm run test

# Generate Supabase types
npm run db:generate-types
```

---

*Last updated: January 2026*
*Version: 1.0*
