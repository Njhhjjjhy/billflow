# Product Requirements Document (PRD)

## Taiwan Freelancer Invoicing & Client Management Tool

**Version:** 2.0
**Last Updated:** January 2026
**Author:** Riaan / fixmyscope
**Status:** MVP Development

> **Implementation Status:** UI/UX foundation complete. Core features use mock data. Backend integration (Supabase, Auth, Email) not yet started.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Target Users](#2-target-users)
3. [User Stories](#3-user-stories)
4. [Feature Specifications](#4-feature-specifications)
5. [Technical Architecture](#5-technical-architecture)
6. [Data Models](#6-data-models)
7. [API Routes](#7-api-routes)
8. [Security & Compliance](#8-security--compliance)
9. [Monetization](#9-monetization)
10. [Success Metrics](#10-success-metrics)
11. [Implementation Status](#11-implementation-status)

---

## 1. Executive Summary

### 1.1 Problem Statement

Taiwan freelancers and micro-businesses face a critical software gap: no bilingual (English/Chinese) tool exists that handles Taiwan's mandatory Uniform Invoice (統一發票) system while providing modern client management features.

Current options force users to choose between:
- **QuickBooks/FreshBooks:** Modern UI, no Chinese support, no Taiwan tax compliance
- **Local Taiwan software:** Chinese-only, dated interfaces, desktop-bound
- **Spreadsheets + CPA:** Manual, error-prone, no automation

This gap has been documented in Taiwan expat forums for 15+ years with no satisfactory solution.

### 1.2 Solution

A web-based, bilingual invoicing and client management tool built specifically for Taiwan's regulatory environment. The MVP focuses on generating compliant invoice documents and tracking client payments—not processing payments directly (avoiding financial regulation complexity).

### 1.3 Target Revenue

- **6-month goal:** 50 paying users × NT$399/month = NT$19,950/month (~$650 USD MRR)
- **12-month goal:** 200 paying users × NT$399/month = NT$79,800/month (~$2,600 USD MRR)

---

## 2. Target Users

### 2.1 Primary Persona: The Bilingual Freelancer

**Name:** Michelle Chen
**Age:** 32
**Location:** Taipei
**Occupation:** Freelance UX Designer

**Background:**
- Taiwanese citizen, educated abroad, works with both local and international clients
- Registered as a sole proprietor (行號) for tax purposes
- Sends 5-15 invoices per month, mix of TWD and USD
- Speaks fluent English and Mandarin

**Pain Points:**
- Hates switching between English tools (for international clients) and Chinese spreadsheets (for Taiwan tax compliance)
- Spends 3-4 hours monthly reconciling invoices with bank statements
- Anxious about GUI compliance—heard stories of fines but doesn't fully understand requirements
- Chases late payments manually via LINE/email

**Goals:**
- One system for all invoicing
- Clear visibility into who owes what
- Easy handoff to accountant at tax time
- Look professional to both local and international clients

### 2.2 Secondary Persona: The Expat Consultant

**Name:** David Miller
**Age:** 45
**Location:** Taichung
**Occupation:** Business Consultant

**Background:**
- American expat, 8 years in Taiwan
- Has Taiwan work permit and registered business
- Limited Mandarin reading ability
- All clients are Taiwan-based companies requiring 統一發票

**Pain Points:**
- Cannot use Chinese-only local software
- His CPA handles invoices but charges per document and is slow
- No visibility into his own business finances without asking CPA
- International tools don't understand Taiwan invoice requirements

**Goals:**
- Generate compliant Taiwan invoices independently
- Reduce CPA dependency for routine tasks
- English interface with Chinese output documents

### 2.3 Tertiary Persona: The Side Hustler

**Name:** 小明 (Xiao Ming)
**Age:** 26
**Location:** Kaohsiung
**Occupation:** Software Developer (employed) + Freelance side projects

**Background:**
- Full-time employee but takes freelance projects evenings/weekends
- Not registered as business yet, invoices under personal name
- 2-5 invoices per month, all local clients
- Tech-savvy, prefers modern tools

**Pain Points:**
- Unsure about tax obligations for side income
- Uses random invoice templates found online, not sure if compliant
- Wants to look professional but not ready to invest in full accounting setup

**Goals:**
- Simple, fast invoice generation
- Track side income separately from salary
- Eventually transition to registered freelancer

---

## 3. User Stories

### 3.1 MVP User Stories (Must Have)

#### Invoice Creation

| ID | Story | Acceptance Criteria | Status |
|----|-------|---------------------|--------|
| US-001 | As a freelancer, I want to create a professional invoice in under 2 minutes | Invoice created with 5 or fewer form fields; PDF generated instantly | ✅ Implemented |
| US-002 | As a freelancer, I want my invoices to include all Taiwan-required fields | Invoice includes: seller info, buyer info, date, invoice number, item details, amounts, tax calculation | ✅ Implemented |
| US-003 | As a freelancer, I want to toggle between English and Chinese invoice output | Same invoice data renders in either language; buyer can receive their preferred language | 🔄 Partial |
| US-004 | As a freelancer, I want to add my business logo and customize colors | Logo upload, primary color picker, preview before save | ❌ Not Started |
| US-005 | As a freelancer, I want to duplicate a previous invoice for recurring clients | One-click duplicate with auto-incremented invoice number | ❌ Not Started |

#### Client Management

| ID | Story | Acceptance Criteria | Status |
|----|-------|---------------------|--------|
| US-006 | As a freelancer, I want to save client details for reuse | Client saved with: name, company, tax ID (統一編號), email, address, notes | ✅ Implemented |
| US-007 | As a freelancer, I want to see all invoices for a specific client | Client detail page shows invoice history, total billed, total paid | 🔄 Partial |
| US-008 | As a freelancer, I want to mark invoices as paid/unpaid | Toggle payment status; paid date field; partial payment support | ✅ Implemented |
| US-009 | As a freelancer, I want to see who owes me money at a glance | Dashboard shows unpaid invoices sorted by due date, with aging indicators | ✅ Implemented |

#### Multi-Currency

| ID | Story | Acceptance Criteria | Status |
|----|-------|---------------------|--------|
| US-010 | As a freelancer, I want to invoice in TWD, USD, or EUR | Currency selector per invoice; correct symbol and formatting | ✅ Implemented |
| US-011 | As a freelancer, I want to see my total revenue in TWD regardless of invoice currency | Dashboard converts all revenue to TWD using exchange rate at invoice date | 🔄 Partial |

#### Export & Sharing

| ID | Story | Acceptance Criteria | Status |
|----|-------|---------------------|--------|
| US-012 | As a freelancer, I want to download invoices as PDF | High-quality PDF with proper fonts for Chinese characters | ✅ Implemented |
| US-013 | As a freelancer, I want to email invoices directly to clients | Send via app with customizable email template | ❌ Not Started |
| US-014 | As a freelancer, I want to export all invoices for my accountant | CSV/Excel export with all invoice data; date range filter | ❌ Not Started |

#### Authentication & Settings

| ID | Story | Acceptance Criteria | Status |
|----|-------|---------------------|--------|
| US-015 | As a user, I want to sign up with email or Google | OAuth with Google; email/password option | ❌ Not Started |
| US-016 | As a user, I want to set my business details once and have them appear on all invoices | Settings page for: business name, address, tax ID, bank details, logo | 🔄 Partial |
| US-017 | As a user, I want to switch the interface between English and Chinese | Language toggle in header; preference saved | ❌ Not Started |

### 3.2 Post-MVP User Stories (Nice to Have)

| ID | Story | Priority |
|----|-------|----------|
| US-018 | As a freelancer, I want automatic payment reminders sent to clients | High |
| US-019 | As a freelancer, I want to create quotes/estimates that convert to invoices | High |
| US-020 | As a freelancer, I want to track expenses alongside income | Medium |
| US-021 | As a freelancer, I want to generate GUI-compliant XML for e-invoice submission | Medium |
| US-022 | As a freelancer, I want to connect my bank account for automatic payment matching | Low |
| US-023 | As a freelancer, I want recurring invoices on a schedule | Medium |
| US-024 | As a freelancer, I want to see profit/loss reports by month/quarter | Medium |
| US-025 | As a freelancer, I want to manage multiple businesses/brands | Low |

---

## 4. Feature Specifications

### 4.1 Invoice Builder

#### Fields Required

**SELLER INFORMATION (from settings, pre-filled):**
- Business name (Chinese + English)
- Tax ID (統一編號) - 8 digits
- Address
- Contact email
- Contact phone
- Bank details (for payment instructions)

**BUYER INFORMATION (from client record or manual entry):**
- Client/Company name
- Tax ID (統一編號) - optional for individuals
- Contact person
- Email
- Address

**INVOICE DETAILS:**
- Invoice number (auto-generated, customizable prefix)
- Invoice date
- Due date (default: 30 days, configurable)
- Currency (TWD/USD/EUR)
- Payment terms (text field)

**LINE ITEMS:**
- Description
- Quantity
- Unit price
- Amount (calculated)
- [Add line item button]

**CALCULATIONS:**
- Subtotal
- Tax toggle (5% 營業稅 or tax-inclusive)
- Discount (optional, percentage or fixed)
- Total

**NOTES:**
- Notes to client (appears on invoice)
- Internal notes (does not appear on invoice)

#### Invoice Number Format

Default: `INV-YYYY-###` (e.g., INV-2026-001)
Customizable prefix in settings. Auto-increments.

#### PDF Output Requirements

- A4 size (210mm × 297mm)
- Professional layout with clear visual hierarchy
- Chinese character support (Noto Sans TC font)
- Logo placement top-left or top-center (user choice)
- QR code option for quick payment (links to payment page or bank details)
- Footer with page numbers for multi-page invoices

### 4.2 Dashboard

#### Key Metrics Display

- **Total Outstanding:** Sum of all unpaid invoices (in TWD)
- **Overdue Amount:** Sum of unpaid invoices past due date
- **This Month's Revenue:** Sum of paid invoices in current month
- **YTD Revenue:** Year-to-date paid invoices

#### Invoice List View

- Default sort: Most recent first
- Columns: Invoice #, Client, Amount, Status, Due Date, Actions
- Filters: Status (All/Paid/Unpaid/Overdue), Date range, Client, Currency
- Search: By invoice number, client name, or amount

#### Status Indicators

- 🟢 Paid
- 🟡 Pending (not yet due)
- 🔴 Overdue
- ⚫ Draft
- 📧 Sent
- 👁 Viewed

### 4.3 Client Management

#### Client Record Fields

**BASIC INFO:**
- Display name (how you refer to them)
- Company name (official, for invoices)
- Tax ID (統一編號)
- Industry/category (for your reference)

**CONTACT:**
- Primary contact name
- Email
- Phone
- LINE ID (common in Taiwan)

**ADDRESS:**
- Street address
- City
- Postal code
- Country (default: Taiwan)

**BILLING:**
- Default payment terms
- Preferred currency
- Preferred invoice language
- Notes

**INTERNAL:**
- Tags (e.g., "retainer", "project-based", "slow payer")
- Internal notes

#### Client Detail Page

- Overview: Total billed, total paid, average payment time
- Invoice history: All invoices for this client
- Quick actions: New invoice, Send reminder, Edit client

### 4.4 Settings

#### Business Profile
- Business name (Chinese)
- Business name (English)
- Tax ID (統一編號)
- Business address
- Logo upload (PNG/JPG, max 2MB)
- Primary brand color

#### Invoice Defaults
- Default payment terms (days)
- Default currency
- Invoice number prefix
- Tax rate (5% default)
- Default notes/terms text

#### Email Templates
- Invoice email subject line
- Invoice email body (with variables: {{client_name}}, {{invoice_number}}, {{amount}}, {{due_date}})
- Reminder email template

#### Account
- Email
- Password change
- Interface language preference
- Notification preferences
- Export all data
- Delete account

---

## 5. Technical Architecture

### 5.1 Stack

| Layer | Technology | Actual Version | Status |
|-------|------------|----------------|--------|
| Frontend | Next.js (App Router) | 16.1.4 | ✅ |
| React | React | 19.2.3 | ✅ |
| Styling | Tailwind CSS | 4.x | ✅ |
| UI Components | Custom Neo-Brutalist | - | ✅ |
| Animations | Motion.dev (Framer Motion) | 12.29.0 | ✅ |
| Backend | Next.js API Routes | - | ✅ |
| Database | Supabase (PostgreSQL) | - | ❌ Not Connected |
| Authentication | Supabase Auth | - | ❌ Not Connected |
| File Storage | Supabase Storage | - | ❌ Not Connected |
| PDF Generation | @react-pdf/renderer | 4.3.2 | ✅ |
| Email | Resend | - | ❌ Not Connected |
| Forms | React Hook Form | 7.71.1 | ✅ |
| Validation | Zod | 4.3.6 | ✅ |
| Data Fetching | TanStack Query | 5.90.20 | ✅ |
| i18n | react-i18next | 16.5.3 | ✅ (not wired) |
| Hosting | Vercel | - | ✅ |

### 5.2 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Client (Browser)                      │
│  ┌─────────────────────────────────────────────────────────┐│
│  │              Next.js 16 App (React 19)                  ││
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       ││
│  │  │Dashboard│ │Invoices │ │ Clients │ │Settings │       ││
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘       ││
│  │                                                          ││
│  │  ┌─────────────────────────────────────────────────────┐││
│  │  │       Neo-Brutalist Component Library               │││
│  │  │  Button, Card, Input, Select, Modal, Toast, etc.    │││
│  │  └─────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js API Routes                        │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │/invoices│ │/clients │ │  /pdf   │ │/dashboard│          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
│                    (Currently using mock data)               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼ (Future)
┌─────────────────────────────────────────────────────────────┐
│                    Supabase (Planned)                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │PostgreSQL│  │   Auth   │  │ Storage  │                  │
│  │    DB    │  │(OAuth+PW)│  │ (Files)  │                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Data Models

### Core Entities

```typescript
type Currency = 'TWD' | 'USD' | 'EUR';
type Language = 'zh' | 'en';
type InvoiceStatus = 'draft' | 'sent' | 'viewed' | 'paid' | 'overdue' | 'cancelled';

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
  brand_color: string;
  default_payment_terms: number; // days
  default_currency: Currency;
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
  preferred_currency: Currency | null;
  preferred_language: Language | null;
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
  status: InvoiceStatus;
  currency: Currency;
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
  language: Language;
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

## 7. API Routes

### Implemented Routes

| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| GET | `/api/invoices` | List invoices (with filtering) | ✅ Mock |
| POST | `/api/invoices` | Create invoice | ✅ Mock |
| GET | `/api/invoices/[id]` | Get single invoice | ✅ Mock |
| PUT | `/api/invoices/[id]` | Update invoice | ✅ Mock |
| GET | `/api/invoices/[id]/pdf` | Generate PDF | ✅ Mock |
| GET | `/api/clients` | List clients | ✅ Mock |
| POST | `/api/clients` | Create client | ✅ Mock |
| GET | `/api/clients/[id]` | Get single client | ✅ Mock |
| PUT | `/api/clients/[id]` | Update client | ✅ Mock |

### Planned Routes (Not Implemented)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | User registration |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | User logout |
| GET | `/api/auth/session` | Get current session |
| DELETE | `/api/invoices/[id]` | Delete invoice |
| POST | `/api/invoices/[id]/duplicate` | Duplicate invoice |
| POST | `/api/invoices/[id]/send` | Send invoice via email |
| DELETE | `/api/clients/[id]` | Delete client |
| GET | `/api/dashboard/stats` | Dashboard statistics |
| GET | `/api/dashboard/revenue` | Revenue chart data |
| GET | `/api/export/invoices` | Export invoices (CSV) |
| GET | `/api/business` | Get business profile |
| PUT | `/api/business` | Update business profile |
| POST | `/api/business/logo` | Upload logo |

---

## 8. Security & Compliance

### 8.1 Data Security

- All data encrypted in transit (HTTPS)
- Row Level Security (RLS) in Supabase for data isolation
- No PII stored in logs
- Regular security audits

### 8.2 Taiwan Compliance

**Tax ID Validation:**
- 8-digit format validation
- MOF checksum algorithm verification
- Stored securely, displayed masked when appropriate

**Invoice Requirements:**
- All mandatory fields for 統一發票
- Proper tax calculation (5% 營業稅)
- Bilingual support for international clients

### 8.3 GDPR/Privacy

- Data export functionality
- Account deletion capability
- Clear privacy policy
- Cookie consent (if applicable)

---

## 9. Monetization

### 9.1 Pricing Tiers

| Tier | Price | Features |
|------|-------|----------|
| **Free** | NT$0/month | 5 invoices/month, 3 clients, Basic PDF |
| **Pro** | NT$399/month | Unlimited invoices, Unlimited clients, Email sending, Custom branding |
| **Business** | NT$799/month | Everything in Pro + Multi-user, API access, Priority support |

### 9.2 Revenue Projections

- **Month 3:** 20 free users, 5 paid = NT$1,995/month
- **Month 6:** 100 free users, 50 paid = NT$19,950/month
- **Month 12:** 400 free users, 200 paid = NT$79,800/month

---

## 10. Success Metrics

### 10.1 Key Performance Indicators (KPIs)

| Metric | Target (Month 6) | Target (Month 12) |
|--------|------------------|-------------------|
| Monthly Active Users | 150 | 600 |
| Paid Subscribers | 50 | 200 |
| Monthly Recurring Revenue | NT$19,950 | NT$79,800 |
| Invoices Created | 500/month | 3,000/month |
| User Retention (30-day) | 60% | 70% |
| NPS Score | 30 | 50 |

### 10.2 User Satisfaction Metrics

- Time to create first invoice: < 5 minutes
- Invoice creation time (returning user): < 2 minutes
- Support ticket response time: < 24 hours
- Feature request implementation: Top 3 per quarter

---

## 11. Implementation Status

### Phase 1: Foundation ✅ COMPLETE

- [x] Next.js 16 App Router setup
- [x] Tailwind CSS 4 configuration
- [x] Neo-Brutalist design system
- [x] Motion.dev animations
- [x] TypeScript strict mode
- [x] Custom font loading (Space Grotesk, Noto Sans TC, Space Mono)

### Phase 2: UI Components ✅ COMPLETE

- [x] Button (all variants + animations)
- [x] Input, Textarea, Select
- [x] Card (static + interactive)
- [x] Badge (all status variants)
- [x] Table (sortable)
- [x] Modal + ConfirmModal
- [x] Toast notification system
- [x] Skeleton loading states
- [x] Checkbox, Radio components

### Phase 3: Layout ✅ COMPLETE

- [x] AppShell with sidebar
- [x] Mobile bottom navigation
- [x] Page transitions
- [x] Responsive breakpoints

### Phase 4: Pages 🔄 IN PROGRESS

- [x] Dashboard (mock data)
- [x] Invoice list (mock data, filtering)
- [x] Create invoice form
- [x] Client list (mock data, search)
- [ ] Invoice detail view (partial)
- [ ] Client detail view (partial)
- [ ] Settings page (basic structure)

### Phase 5: Backend ❌ NOT STARTED

- [ ] Supabase project setup
- [ ] Database schema & migrations
- [ ] Row Level Security (RLS)
- [ ] Supabase Auth integration
- [ ] API route migration to real data
- [ ] File storage for logos/PDFs

### Phase 6: Features ❌ NOT STARTED

- [ ] Email integration (Resend)
- [ ] Invoice emailing
- [ ] Payment reminders
- [ ] Data export (CSV)
- [ ] Full i18n implementation

### Phase 7: Polish ❌ NOT STARTED

- [ ] Error boundaries
- [ ] 404/500 pages
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] Accessibility audit

### Phase 8: Launch ❌ NOT STARTED

- [ ] Beta testing
- [ ] Documentation
- [ ] Pricing/billing integration
- [ ] Marketing site
- [ ] Production deployment

---

## Changelog

### v2.0 (January 2026)
- Converted from RTF to Markdown format
- Synced with actual codebase implementation
- Added implementation status tracking
- Updated tech stack to reflect actual versions
- Added status indicators to user stories
- Restructured for better navigation

### v1.0 (January 2026)
- Initial PRD creation

---

*Last Updated: January 2026*
