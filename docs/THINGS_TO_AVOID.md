# Billflow: Things to Avoid

> A comprehensive guide to anti-patterns, common mistakes, and pitfalls to avoid when building Billflow.

---

## Table of Contents
1. [Code Anti-Patterns](#code-anti-patterns)
2. [Design Anti-Patterns](#design-anti-patterns)
3. [UX Anti-Patterns](#ux-anti-patterns)
4. [Security Anti-Patterns](#security-anti-patterns)
5. [Performance Anti-Patterns](#performance-anti-patterns)
6. [Accessibility Anti-Patterns](#accessibility-anti-patterns)
7. [Business Logic Mistakes](#business-logic-mistakes)
8. [Taiwan-Specific Mistakes](#taiwan-specific-mistakes)
9. [Communication Anti-Patterns](#communication-anti-patterns)

---

## Code Anti-Patterns

### TypeScript

#### Never use `any` type
```typescript
// BAD
function processInvoice(data: any) {
  return data.total;
}

// GOOD
function processInvoice(data: InvoiceData): number {
  return data.total;
}
```

#### Don't ignore TypeScript errors
```typescript
// BAD
// @ts-ignore
const amount = calculateTotal(undefined);

// GOOD
const amount = invoice ? calculateTotal(invoice) : 0;
```

#### Don't use non-null assertion carelessly
```typescript
// BAD
const clientName = client!.name;

// GOOD
const clientName = client?.name ?? 'Unknown';
// or
if (!client) throw new Error('Client not found');
const clientName = client.name;
```

### React

#### Don't use index as key for dynamic lists
```tsx
// BAD
{invoices.map((invoice, index) => (
  <InvoiceRow key={index} invoice={invoice} />
))}

// GOOD
{invoices.map((invoice) => (
  <InvoiceRow key={invoice.id} invoice={invoice} />
))}
```

#### Don't mutate state directly
```typescript
// BAD
const [items, setItems] = useState<LineItem[]>([]);
items.push(newItem); // Direct mutation!
setItems(items);

// GOOD
setItems([...items, newItem]);
// or
setItems(prev => [...prev, newItem]);
```

#### Don't create components inside components
```tsx
// BAD
function InvoiceForm() {
  // This creates a new component every render!
  const LineItemRow = ({ item }) => <div>{item.name}</div>;

  return <LineItemRow item={item} />;
}

// GOOD
// Define outside or in separate file
function LineItemRow({ item }: { item: LineItem }) {
  return <div>{item.name}</div>;
}

function InvoiceForm() {
  return <LineItemRow item={item} />;
}
```

#### Don't use useEffect for derived state
```typescript
// BAD
const [items, setItems] = useState<LineItem[]>([]);
const [total, setTotal] = useState(0);

useEffect(() => {
  setTotal(items.reduce((sum, item) => sum + item.amount, 0));
}, [items]);

// GOOD
const [items, setItems] = useState<LineItem[]>([]);
const total = useMemo(
  () => items.reduce((sum, item) => sum + item.amount, 0),
  [items]
);
```

#### Don't fetch data in useEffect for initial load in App Router
```tsx
// BAD (for server components)
function InvoiceList() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetch('/api/invoices').then(res => res.json()).then(setInvoices);
  }, []);
}

// GOOD (server component)
async function InvoiceList() {
  const invoices = await getInvoices();
  return <InvoiceListView invoices={invoices} />;
}
```

### API Routes

#### Never trust client input
```typescript
// BAD
export async function POST(request: Request) {
  const { userId, amount } = await request.json();
  await db.invoices.create({ userId, amount }); // Trusts userId!
}

// GOOD
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const validated = createInvoiceSchema.parse(body);

  await db.invoices.create({
    userId: session.user.id, // From verified session
    amount: validated.amount
  });
}
```

#### Don't forget error handling
```typescript
// BAD
export async function GET() {
  const invoices = await db.invoices.findMany();
  return Response.json(invoices);
}

// GOOD
export async function GET() {
  try {
    const invoices = await db.invoices.findMany();
    return Response.json({ data: invoices });
  } catch (error) {
    console.error('Failed to fetch invoices:', error);
    return Response.json(
      { error: 'Failed to fetch invoices' },
      { status: 500 }
    );
  }
}
```

### Database

#### Don't write N+1 queries
```typescript
// BAD
const invoices = await db.invoices.findMany();
for (const invoice of invoices) {
  const client = await db.clients.findUnique({ where: { id: invoice.clientId } });
  invoice.client = client;
}

// GOOD
const invoices = await db.invoices.findMany({
  include: { client: true }
});
```

#### Don't skip pagination
```typescript
// BAD
const allInvoices = await db.invoices.findMany(); // Could be thousands!

// GOOD
const invoices = await db.invoices.findMany({
  take: 50,
  skip: (page - 1) * 50,
  orderBy: { createdAt: 'desc' }
});
```

### File/Code Organization

#### Don't put business logic in components
```tsx
// BAD
function InvoiceForm() {
  const calculateTax = (subtotal: number) => {
    // Complex tax logic here
    return subtotal * 0.05;
  };

  const formatInvoiceNumber = () => {
    // Complex formatting logic
  };
}

// GOOD
// lib/invoice-utils.ts
export function calculateTax(subtotal: number, rate: number): number {
  return subtotal * rate;
}

// components/InvoiceForm.tsx
import { calculateTax } from '@/lib/invoice-utils';
```

#### Don't use magic numbers
```typescript
// BAD
const tax = amount * 0.05;
if (status === 3) { /* overdue */ }

// GOOD
const TAX_RATE = 0.05;
const InvoiceStatus = {
  DRAFT: 0,
  SENT: 1,
  PAID: 2,
  OVERDUE: 3,
} as const;

const tax = amount * TAX_RATE;
if (status === InvoiceStatus.OVERDUE) { }
```

---

## Design Anti-Patterns

### Visual Design

#### No unnecessary visual complexity
```
BAD:
- Gradients everywhere
- Drop shadows on every element
- Animated backgrounds
- Multiple accent colors

GOOD:
- Flat colors with subtle shadows
- Animation only for feedback
- Single accent color (blue)
- Generous white space
```

#### No inconsistent spacing
```
BAD:
- Random padding values (12px, 15px, 18px)
- Different margins throughout
- Eyeballing alignment

GOOD:
- 4px grid system
- Consistent spacing tokens (4, 8, 12, 16, 24, 32, 48)
- Use Tailwind spacing classes consistently
```

#### No color accessibility violations
```
BAD:
- Light gray text on white (#aaa on #fff)
- Red/green only differentiation
- Low contrast UI elements

GOOD:
- Minimum 4.5:1 contrast for text
- Color + icon/text for status
- Test with color blindness simulators
```

### Layout

#### No unexpected scroll behavior
```
BAD:
- Multiple scroll areas
- Horizontal scroll in main content
- Content jumping on load

GOOD:
- Single main scroll area
- Fixed header/sidebar
- Reserved space for dynamic content
```

#### No cramped interfaces
```
BAD:
- Buttons touching each other
- Text against edges
- Dense forms with no breathing room

GOOD:
- Minimum 8px between interactive elements
- 16px+ padding in containers
- Group related items with spacing
```

### Typography

#### No excessive font weights
```
BAD:
- Using 6 different weights on one page
- Bold everything for emphasis
- Mixing font families randomly

GOOD:
- 2-3 weights per page (regular, medium, semibold)
- Use size hierarchy, not just weight
- Single font family for UI
```

#### No tiny text
```
BAD:
- Body text under 14px
- Critical info in 10px

GOOD:
- Minimum 14px for body text
- 12px only for captions/labels
- Important info gets larger treatment
```

---

## UX Anti-Patterns

### Forms

#### Never lose user data
```
BAD:
- Navigate away without warning
- Clear form on error
- No auto-save for long forms

GOOD:
- "You have unsaved changes" dialog
- Preserve input on validation error
- Auto-save drafts periodically
```

#### No hidden required fields
```
BAD:
- Show required field only after submit
- Conditional required fields without indication

GOOD:
- Mark all required fields upfront
- Show all required fields at once
- Inline validation as user types
```

#### No confusing validation
```
BAD:
- Red border with no explanation
- "Invalid input" (what's wrong?)
- Validation on every keystroke (annoying)

GOOD:
- Specific error messages ("Tax ID must be 8 digits")
- Validation on blur or submit
- Clear format hints ("Format: 12345678")
```

### Navigation

#### No disorienting navigation
```
BAD:
- Deep nesting (> 3 levels)
- No back button
- No breadcrumbs in complex flows

GOOD:
- Flat hierarchy (2 levels max)
- Clear back/cancel buttons
- Breadcrumbs for detail pages
```

#### No dead ends
```
BAD:
- Empty state with no action
- Error page with no recovery option
- 404 with no navigation

GOOD:
- Empty state: "No invoices yet" + Create button
- Error: "Something went wrong" + Retry + Go back
- 404: Helpful message + Home link
```

### Feedback

#### Never leave users guessing
```
BAD:
- Click button, nothing happens
- Long operation with no progress
- Silent failures

GOOD:
- Loading spinner immediately
- Progress indicator for long operations
- Clear success/error messages
```

#### No surprise actions
```
BAD:
- Delete without confirmation
- Send invoice on single click
- Auto-submit on last field

GOOD:
- "Delete invoice? This cannot be undone."
- "Send invoice to client@email.com?"
- Explicit submit button always
```

### Destructive Actions

#### Never make deletion easy
```
BAD:
- Delete button same style as other actions
- Single click to delete
- No way to recover

GOOD:
- Delete in danger color (red) or hidden in menu
- Confirmation required
- Consider soft delete with recovery period
```

### Mobile

#### No desktop-only design
```
BAD:
- Hover-dependent interactions
- Tiny touch targets (< 44px)
- Tables that don't work on mobile

GOOD:
- Touch-friendly alternatives
- 44px minimum touch target
- Responsive tables or card views
```

---

## Security Anti-Patterns

### Authentication

#### Never expose sensitive tokens to client
```typescript
// BAD
const supabase = createClient(url, serviceRoleKey); // In client code!

// GOOD
// Client uses anon key
const supabase = createClient(url, anonKey);
// Server uses service role key
// SUPABASE_SERVICE_ROLE_KEY in server-only code
```

#### Don't store sensitive data in localStorage
```typescript
// BAD
localStorage.setItem('authToken', token);
localStorage.setItem('userId', userId);

// GOOD
// Use httpOnly cookies for auth
// Let Supabase handle session management
```

### Data Handling

#### Never trust client-side calculations
```typescript
// BAD - Client sends total
const { items, total } = await request.json();
await db.invoices.create({ items, total }); // Trusts client's total!

// GOOD - Server calculates
const { items } = await request.json();
const total = calculateTotal(items); // Server calculates
await db.invoices.create({ items, total });
```

#### Don't expose internal IDs unnecessarily
```typescript
// BAD
// URL: /invoices/1, /invoices/2 (sequential, guessable)

// GOOD
// URL: /invoices/inv_a1b2c3d4 (UUIDs or prefixed IDs)
```

#### Never log sensitive data
```typescript
// BAD
console.log('User data:', userData);
console.log('Payment info:', { cardNumber, cvv });

// GOOD
console.log('User login:', { userId: user.id });
// Never log: passwords, tokens, card numbers, tax IDs
```

### Input Validation

#### Always validate on server
```typescript
// BAD - Rely only on client validation
// "The form has required fields, so we're safe"

// GOOD
const schema = z.object({
  taxId: z.string().regex(/^\d{8}$/, 'Invalid Taiwan tax ID'),
  email: z.string().email(),
  amount: z.number().positive(),
});

const validated = schema.parse(await request.json());
```

#### Sanitize output for XSS
```tsx
// BAD
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// GOOD
<div>{userInput}</div>
// or sanitize if HTML needed
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
```

---

## Performance Anti-Patterns

### Bundle Size

#### Don't import entire libraries
```typescript
// BAD
import _ from 'lodash';
const result = _.get(obj, 'path.to.value');

// GOOD
import get from 'lodash/get';
// or
const result = obj?.path?.to?.value;
```

#### Don't skip code splitting
```typescript
// BAD
import { PDFViewer } from '@react-pdf/renderer'; // Always loaded!

// GOOD
const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFViewer),
  { ssr: false, loading: () => <Spinner /> }
);
```

### Rendering

#### Don't cause unnecessary re-renders
```tsx
// BAD - Creates new function every render
<button onClick={() => handleClick(item.id)}>Click</button>

// GOOD - Memoize or use data attributes
const handleClick = useCallback((id: string) => {
  // handle click
}, []);

<button data-id={item.id} onClick={handleClick}>Click</button>
```

#### Don't render large lists without virtualization
```tsx
// BAD
{allItems.map(item => <Item key={item.id} {...item} />)}
// Renders 1000+ items!

// GOOD
import { useVirtualizer } from '@tanstack/react-virtual';
// Only render visible items
```

### Data Fetching

#### Don't fetch same data multiple times
```tsx
// BAD
// Component A fetches /api/invoices
// Component B fetches /api/invoices
// Same request twice!

// GOOD
// Use React Query/SWR for caching
const { data } = useQuery({
  queryKey: ['invoices'],
  queryFn: fetchInvoices,
});
```

#### Don't block rendering for non-critical data
```tsx
// BAD
async function Page() {
  const invoices = await getInvoices();
  const stats = await getStats(); // Blocks even if slow
  return <Dashboard invoices={invoices} stats={stats} />;
}

// GOOD
function Page() {
  return (
    <div>
      <Suspense fallback={<StatsSkeleton />}>
        <Stats />
      </Suspense>
      <Suspense fallback={<InvoicesSkeleton />}>
        <InvoiceList />
      </Suspense>
    </div>
  );
}
```

### Images

#### Don't skip image optimization
```tsx
// BAD
<img src="/logo.png" />

// GOOD
import Image from 'next/image';
<Image src="/logo.png" alt="Logo" width={200} height={50} />
```

---

## Accessibility Anti-Patterns

### Semantic HTML

#### Don't use divs for everything
```tsx
// BAD
<div onClick={handleClick}>Click me</div>
<div className="heading">Title</div>

// GOOD
<button onClick={handleClick}>Click me</button>
<h1>Title</h1>
```

#### Don't skip form labels
```tsx
// BAD
<input placeholder="Email" />

// GOOD
<label htmlFor="email">Email</label>
<input id="email" type="email" />
// or
<label>
  Email
  <input type="email" />
</label>
```

### Keyboard Navigation

#### Don't break tab order
```tsx
// BAD
<div tabIndex={5}>First</div>
<div tabIndex={1}>Second</div>

// GOOD
// Use natural DOM order
// tabIndex={0} to make non-interactive elements focusable
// tabIndex={-1} to remove from tab order but keep focusable
```

#### Don't trap keyboard focus
```
BAD:
- Modal opens, can't tab out
- Focus disappears into invisible element

GOOD:
- Focus trap within modals (cycles through modal content)
- Return focus to trigger when modal closes
- Escape key closes modals
```

### Screen Readers

#### Don't forget alt text
```tsx
// BAD
<img src="chart.png" />
<img src="icon.svg" alt="icon" /> // Useless alt

// GOOD
<img src="chart.png" alt="Revenue chart showing 20% growth" />
<img src="search-icon.svg" alt="" aria-hidden="true" /> // Decorative
```

#### Don't hide important info visually only
```tsx
// BAD
// Color-only status indicator
<span className="text-red-500">●</span>

// GOOD
<span className="text-red-500" aria-label="Overdue">●</span>
// or
<span className="text-red-500">● Overdue</span>
```

---

## Business Logic Mistakes

### Invoice Calculations

#### Don't use floating point for money
```typescript
// BAD
const tax = subtotal * 0.05; // 999.9999999999999

// GOOD
// Use integers (cents) or decimal library
const taxCents = Math.round(subtotalCents * 0.05);
// or
import Decimal from 'decimal.js';
const tax = new Decimal(subtotal).times(0.05).toDecimalPlaces(2);
```

#### Don't assume currency formats
```typescript
// BAD
const formatted = '$' + amount.toFixed(2);

// GOOD
const formatted = new Intl.NumberFormat('zh-TW', {
  style: 'currency',
  currency: 'TWD',
  minimumFractionDigits: 0, // TWD doesn't use decimals
}).format(amount);
```

### Status Management

#### Don't allow invalid status transitions
```typescript
// BAD
// Any status can change to any other
await updateInvoice({ status: newStatus });

// GOOD
const validTransitions = {
  draft: ['sent', 'cancelled'],
  sent: ['paid', 'overdue', 'cancelled'],
  paid: [], // Final state
  overdue: ['paid', 'cancelled'],
  cancelled: [], // Final state
};

if (!validTransitions[currentStatus].includes(newStatus)) {
  throw new Error(`Cannot transition from ${currentStatus} to ${newStatus}`);
}
```

#### Don't forget timezone handling
```typescript
// BAD
const dueDate = new Date(invoice.dueDate);
const isOverdue = dueDate < new Date();

// GOOD
import { isAfter, startOfDay } from 'date-fns';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

const taiwanTz = 'Asia/Taipei';
const today = startOfDay(utcToZonedTime(new Date(), taiwanTz));
const dueDate = startOfDay(utcToZonedTime(invoice.dueDate, taiwanTz));
const isOverdue = isAfter(today, dueDate);
```

---

## Taiwan-Specific Mistakes

### Tax ID (統一編號)

#### Don't skip validation
```typescript
// BAD
const taxId = formData.taxId; // Just accept anything

// GOOD
function validateTaiwanTaxId(taxId: string): boolean {
  if (!/^\d{8}$/.test(taxId)) return false;

  // Taiwan tax ID has a checksum algorithm
  const weights = [1, 2, 1, 2, 1, 2, 4, 1];
  const digits = taxId.split('').map(Number);

  let sum = 0;
  for (let i = 0; i < 8; i++) {
    const product = digits[i] * weights[i];
    sum += Math.floor(product / 10) + (product % 10);
  }

  // Special case for 7th digit being 7
  if (digits[6] === 7) {
    return sum % 10 === 0 || (sum + 1) % 10 === 0;
  }

  return sum % 10 === 0;
}
```

### Invoice Numbers

#### Don't use sequential numbers carelessly
```
BAD:
- INV-001, INV-002... (exposes business volume)
- Random numbers (hard to track)

GOOD:
- INV-YYYYMM-### (by month, resets each month)
- User-configurable prefix
- Guaranteed uniqueness per business
```

### Currency

#### Don't mix currency display rules
```typescript
// BAD
// TWD: NT$1,000.00 (decimals shown)
// USD: $1000 (no decimals, no commas)

// GOOD
const formatCurrency = (amount: number, currency: Currency): string => {
  const config = {
    TWD: { locale: 'zh-TW', minimumFractionDigits: 0 },
    USD: { locale: 'en-US', minimumFractionDigits: 2 },
    EUR: { locale: 'de-DE', minimumFractionDigits: 2 },
  };

  return new Intl.NumberFormat(config[currency].locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: config[currency].minimumFractionDigits,
  }).format(amount);
};
```

### Chinese Characters

#### Don't forget font support in PDFs
```typescript
// BAD
// PDF shows squares/boxes for Chinese text

// GOOD
import { Font } from '@react-pdf/renderer';

Font.register({
  family: 'NotoSansTC',
  src: '/fonts/NotoSansTC-Regular.ttf',
});

// Use in PDF styles
const styles = StyleSheet.create({
  text: {
    fontFamily: 'NotoSansTC',
  },
});
```

#### Don't truncate Chinese text carelessly
```typescript
// BAD
const truncated = text.slice(0, 20) + '...';
// Might cut in middle of character

// GOOD
// Use CSS text-overflow: ellipsis
// Or use library that handles Unicode properly
```

---

## Communication Anti-Patterns

### Error Messages

#### Don't show technical errors to users
```
BAD:
"Error: SQLITE_CONSTRAINT: UNIQUE constraint failed"
"undefined is not an object"

GOOD:
"This email is already registered. Try logging in instead."
"Something went wrong. Please try again."
```

#### Don't be vague
```
BAD:
"Invalid input"
"Error occurred"
"Failed"

GOOD:
"Tax ID must be exactly 8 digits"
"Could not send invoice. Please check client email."
"Payment failed: Card declined"
```

### Success Messages

#### Don't over-confirm obvious actions
```
BAD:
- Toast: "Button clicked!"
- Alert: "Form field updated!"

GOOD:
- Toast only for completed workflows: "Invoice sent to client@email.com"
- Important state changes: "Invoice marked as paid"
```

### Loading States

#### Don't use generic loading messages
```
BAD:
"Loading..."
"Please wait..."

GOOD:
"Generating PDF..."
"Sending invoice..."
"Saving changes..."
```

### Empty States

#### Don't leave empty screens blank
```
BAD:
[Blank area where invoices would be]

GOOD:
[Illustration]
"No invoices yet"
"Create your first invoice to start tracking payments"
[Create Invoice button]
```

---

## Quick Reference Checklist

Before merging any PR, verify:

### Code
- [ ] No `any` types
- [ ] No console.logs (except intentional debug in dev)
- [ ] All API inputs validated with Zod
- [ ] Error boundaries for client components
- [ ] Loading states for async operations

### Design
- [ ] Follows spacing system (4px grid)
- [ ] Uses defined color palette only
- [ ] Typography from type scale
- [ ] Responsive on mobile
- [ ] Consistent with existing patterns

### UX
- [ ] Clear primary action per screen
- [ ] Form validation with helpful messages
- [ ] Confirmation for destructive actions
- [ ] Loading indicators for all async ops
- [ ] No dead ends

### Security
- [ ] Server-side validation
- [ ] No sensitive data in client
- [ ] Auth checks on all protected routes
- [ ] SQL injection prevented (parameterized queries)

### Accessibility
- [ ] Color contrast passes WCAG AA
- [ ] All interactive elements keyboard accessible
- [ ] Form labels present
- [ ] Meaningful alt text

### Performance
- [ ] No N+1 queries
- [ ] Large components code-split
- [ ] Images optimized
- [ ] Pagination for lists

---

*Last updated: January 2026*
*Version: 1.0*
