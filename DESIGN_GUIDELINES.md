Billflow Design System 
Neo-Brutalist Invoice Management for Taiwan Freelancers
Version: 2.1
Last Updated: January 2026
Stack: Next.js 14 + Motion.dev + Tailwind CSS
Languages: English only (Chinese translations deferred to post-MVP)

TABLE OF CONTENTS
	1	Brand Foundation
	2	Responsive System
	3	Typography
	4	Color System
	5	Neo-Brutalist Styling
	6	Interactions & Animations ⭐
	7	WCAG AA Accessibility ⭐
	8	UX Writing & Voice ⭐
	9	Component Specifications
	10	Implementation Checklist

PART 1: BRAND FOUNDATION
1.1 Brand Positioning
Billflow is confident, transparent, and approachable—not another boring fintech tool.
Target User: Taiwan freelancers (designers, developers, consultants, creators) who:
	•	Invoice 2-10 clients monthly
	•	Need bilingual invoices (English + Chinese)
	•	Want to look professional without enterprise complexity
	•	Value time over features
Brand Promise: "Invoice in 2 minutes. Get paid faster."
1.2 Design Philosophy
"Professional doesn't mean boring. Trust doesn't require blandness."
Neo-brutalism for Billflow means:
	•	Thick borders instead of subtle shadows
	•	Hard offset shadows instead of blurred drop shadows
	•	Bold, vibrant colors that pop but remain professional
	•	Generous whitespace to balance visual weight
	•	Playful micro-interactions that reward user actions
1.3 Brand Personality Traits
Trait
How it manifests
Confident
Clear hierarchy, decisive colors, no hedging language
Efficient
Minimal clicks, smart defaults, fast interactions
Friendly
Warm copy, celebratory moments, helpful guidance
Trustworthy
Transparent fees, clear status, no dark patterns
Modern
Bold aesthetics, smooth animations, bilingual-native

PART 2: RESPONSIVE SYSTEM
2.1 Breakpoint Definitions
/* Mobile: 390px - 767px */
@media (min-width: 390px) and (max-width: 767px) { }

/* Tablet: 768px - 999px */
@media (min-width: 768px) and (max-width: 999px) { }

/* Desktop: 1000px - 1439px */
@media (min-width: 1000px) and (max-width: 1439px) { }

/* Desktop Large: 1440px+ */
@media (min-width: 1440px) { }
2.2 Tailwind Configuration
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'mobile': '390px',
      'tablet': '768px',
      'desktop': '1000px',
      'desktop-lg': '1440px',
    },
  },
}
2.3 Layout Behavior by Breakpoint
Element
Mobile (390-767)
Tablet (768-999)
Desktop (1000-1439)
Desktop-lg (1440+)
Navigation
Bottom bar 64px
Sidebar collapsed 72px
Sidebar expanded 240px
Sidebar expanded 260px
Invoice Builder
Tabbed (Edit/Preview)
Split 50/50
Split 55/45
Split 55/45
Dashboard Grid
1 column
2 columns
4 columns
4 columns
Client Cards
List view
2-column grid
3-column grid
4-column grid
Max content width
100% - 24px padding
100% - 32px padding
1200px centered
1400px centered
Base font size
16px
16px
15px
15px
Touch targets
48px minimum
44px minimum
40px minimum
40px minimum

PART 3: TYPOGRAPHY
3.1 Font Stack
:root {
  --font-display: 'Space Grotesk', 'Noto Sans TC', system-ui, sans-serif;
  --font-body: 'Noto Sans TC', 'Source Han Sans TC', system-ui, sans-serif;
  --font-mono: 'Space Mono', 'Noto Sans Mono CJK TC', monospace;
}
Primary (Display/Headings): Space Grotesk — quirky, tech-forwardSecondary (Body/UI): Noto Sans TC — excellent Chinese supportMonospace (Numbers/Code): Space Mono — tabular figures for financial data
3.2 Type Scale
Token
Size
Weight
Line Height
Use Case
text-xs
11px
400
1.4
Timestamps, captions
text-sm
13px
400
1.5
Table cells, metadata
text-base
15px
400
1.6
Body text, form labels
text-lg
17px
500
1.5
Emphasized text
text-xl
20px
600
1.4
Card titles
text-2xl
26px
700
1.3
Page titles
text-3xl
34px
700
1.2
Hero metrics
text-4xl
44px
700
1.1
Dashboard totals
3.3 Chinese Typography Rules
:lang(zh-TW) {
  line-height: 1.75;
  word-break: keep-all;
  overflow-wrap: break-word;
}

/* Financial numbers always use Space Mono */
.numeric, [data-numeric] {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
}

PART 4: COLOR SYSTEM
4.1 Primary Palette
:root {
  /* Primary Blue (#2563EB base) */
  --color-primary-50: #EFF6FF;
  --color-primary-100: #DBEAFE;
  --color-primary-200: #BFDBFE;
  --color-primary-300: #93C5FD;
  --color-primary-400: #60A5FA;
  --color-primary-500: #3B82F6;
  --color-primary-600: #2563EB;
  --color-primary-700: #1D4ED8;
  --color-primary-800: #1E40AF;
  --color-primary-900: #1E3A8A;
  
  /* Accent Yellow (neo-brutalist pop) */
  --color-accent-yellow: #FACC15;
  --color-accent-yellow-light: #FEF9C3;
  
  /* Accent Coral (warmth) */
  --color-accent-coral: #F97316;
  --color-accent-coral-light: #FFEDD5;
  
  /* Neutrals */
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F8FAFC;
  --color-bg-tertiary: #F1F5F9;
  --color-text-primary: #0F172A;
  --color-text-secondary: #475569;
  --color-text-tertiary: #94A3B8;
  
  /* Neo-brutalist borders */
  --color-border-default: #000000;
  --color-border-light: #E2E8F0;
}
4.2 Semantic Colors (Invoice Status)
:root {
  /* Success / Paid */
  --color-success-bg: #DCFCE7;
  --color-success-text: #166534;
  --color-success-border: #16A34A;
  
  /* Warning / Pending */
  --color-warning-bg: #FEF3C7;
  --color-warning-text: #92400E;
  --color-warning-border: #F59E0B;
  
  /* Error / Overdue */
  --color-error-bg: #FEE2E2;
  --color-error-text: #991B1B;
  --color-error-border: #DC2626;
  
  /* Info / Sent */
  --color-info-bg: #DBEAFE;
  --color-info-text: #1E40AF;
  --color-info-border: #3B82F6;
  
  /* Neutral / Draft */
  --color-neutral-bg: #F1F5F9;
  --color-neutral-text: #475569;
  --color-neutral-border: #94A3B8;
}

PART 5: NEO-BRUTALIST STYLING
5.1 Shadow System
:root {
  /* Hard offset shadows (no blur) */
  --shadow-sm: 2px 2px 0 0 #000000;
  --shadow-md: 4px 4px 0 0 #000000;
  --shadow-lg: 6px 6px 0 0 #000000;
  --shadow-xl: 8px 8px 0 0 #000000;
  
  /* Colored shadows */
  --shadow-primary: 4px 4px 0 0 var(--color-primary-600);
  --shadow-success: 4px 4px 0 0 var(--color-success-border);
  --shadow-error: 4px 4px 0 0 var(--color-error-border);
}
5.2 Border System
:root {
  --border-thin: 1px solid var(--color-border-light);
  --border-default: 2px solid var(--color-border-default);
  --border-bold: 3px solid var(--color-border-default);
  --border-heavy: 4px solid var(--color-border-default);
}

5.3 Squircle Border Radius
All components use "squircle" rounded corners for a softer, more modern feel while maintaining the neo-brutalist aesthetic.

:root {
  /* Squircle border radius values */
  --radius-sm: 8px;   /* Badges, small elements */
  --radius-md: 12px;  /* Buttons, inputs */
  --radius-lg: 16px;  /* Cards, modals */
  --radius-xl: 20px;  /* Large containers */
}

Component Border Radius Reference:
- Badges: 8px (--radius-sm)
- Buttons: 12px (--radius-md)
- Inputs: 12px (--radius-md)
- Select dropdowns: 12px (--radius-md)
- Cards: 16px (--radius-lg)
- Modals: 16px (--radius-lg)
- Toast notifications: 12px (--radius-md)
- Icon containers: 8px (--radius-sm)

PART 6: INTERACTIONS & ANIMATIONS
6.1 Animation Philosophy
Principle
Implementation
Purposeful
Every animation serves feedback, guidance, or delight
Quick
Most interactions 150-300ms
Bouncy
Spring physics for personality
Respectful
Honor prefers-reduced-motion
Consistent
Same easing/timing across similar interactions
6.2 Library Choice: Motion.dev vs GSAP
Use Motion.dev (Framer Motion) for:
	•	React component animations
	•	Layout animations
	•	Gesture interactions (drag, hover, tap)
	•	Exit animations (AnimatePresence)
	•	Most UI micro-interactions
Use GSAP + ScrollTrigger for:
	•	Complex timeline sequences
	•	Scroll-linked animations
	•	SVG morphing
	•	Number counting animations
	•	Marketing/landing page sections
# Install both
npm install motion gsap
6.3 Animation Tokens
// lib/motion.ts
export const spring = {
  snappy: { type: 'spring', stiffness: 500, damping: 30 },
  bouncy: { type: 'spring', stiffness: 400, damping: 20 },
  smooth: { type: 'spring', stiffness: 300, damping: 30 },
  gentle: { type: 'spring', stiffness: 200, damping: 25 },
};

export const duration = {
  instant: 0.1,
  fast: 0.15,
  normal: 0.25,
  slow: 0.4,
  slower: 0.6,
};

export const ease = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
};

6.4 BUTTON INTERACTIONS
Primary Button (Neo-Brutalist Press Effect)
The signature Billflow interaction: buttons "lift" on hover and "press" on click.
// components/ui/Button.tsx
import { motion } from 'motion/react';

const buttonVariants = {
  idle: { 
    scale: 1, 
    x: 0, 
    y: 0,
    boxShadow: '4px 4px 0 0 #000000'
  },
  hover: { 
    scale: 1.02, 
    x: -2, 
    y: -2,
    boxShadow: '6px 6px 0 0 #000000'
  },
  tap: { 
    scale: 0.98, 
    x: 2, 
    y: 2,
    boxShadow: '2px 2px 0 0 #000000'
  },
  disabled: {
    scale: 1,
    opacity: 0.5,
    boxShadow: '2px 2px 0 0 #94A3B8'
  }
};

export function Button({ children, disabled, ...props }) {
  return (
    <motion.button
      variants={buttonVariants}
      initial="idle"
      whileHover={disabled ? undefined : "hover"}
      whileTap={disabled ? undefined : "tap"}
      animate={disabled ? "disabled" : "idle"}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
}
Button Loading State
import { AnimatePresence, motion } from 'motion/react';

function LoadingButton({ isLoading, children, ...props }) {
  return (
    <motion.button
      animate={{ opacity: isLoading ? 0.8 : 1 }}
      disabled={isLoading}
      aria-busy={isLoading}
      {...props}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.span
            key="loading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2"
          >
            <LoadingSpinner aria-hidden="true" />
            <span>Saving...</span>
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

6.5 CARD INTERACTIONS
Hover Lift Effect
const cardVariants = {
  idle: { 
    scale: 1,
    y: 0,
    boxShadow: '4px 4px 0 0 #000000',
  },
  hover: { 
    scale: 1.01,
    y: -4,
    boxShadow: '8px 8px 0 0 #000000',
  },
  tap: {
    scale: 0.99,
    y: 0,
    boxShadow: '2px 2px 0 0 #000000',
  }
};

function InvoiceCard({ invoice, onClick }) {
  return (
    <motion.article
      variants={cardVariants}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
      className="card cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {/* Card content */}
    </motion.article>
  );
}
Card Selection Animation
const selectableCardVariants = {
  unselected: {
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
    boxShadow: '4px 4px 0 0 #000000',
  },
  selected: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
    boxShadow: '4px 4px 0 0 #2563EB',
  }
};

6.6 INPUT INTERACTIONS
Focus Animation
const inputVariants = {
  idle: { 
    boxShadow: '0 0 0 0 transparent',
    borderColor: '#000000',
  },
  focus: { 
    boxShadow: '4px 4px 0 0 #2563EB',
    borderColor: '#2563EB',
  },
  error: {
    borderColor: '#DC2626',
    boxShadow: '4px 4px 0 0 #DC2626',
  },
  success: {
    borderColor: '#16A34A',
    boxShadow: '0 0 0 0 transparent',
  }
};

function Input({ error, success, ...props }) {
  const [isFocused, setIsFocused] = useState(false);
  
  const currentVariant = error ? 'error' : success ? 'success' : isFocused ? 'focus' : 'idle';
  
  return (
    <motion.input
      variants={inputVariants}
      animate={currentVariant}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      aria-invalid={error ? 'true' : undefined}
      {...props}
    />
  );
}
Error Shake Animation
// hooks/useShakeAnimation.ts
import { useAnimationControls } from 'motion/react';

export function useShakeAnimation() {
  const controls = useAnimationControls();
  
  const shake = async () => {
    await controls.start({
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.4, ease: 'easeInOut' }
    });
  };
  
  return { controls, shake };
}

// Usage
function FormField({ error, children }) {
  const { controls, shake } = useShakeAnimation();
  
  useEffect(() => {
    if (error) shake();
  }, [error]);
  
  return (
    <motion.div animate={controls}>
      {children}
    </motion.div>
  );
}
Character Counter
function CharacterCounter({ current, max }) {
  const isNearLimit = current > max * 0.9;
  const isOverLimit = current > max;
  
  return (
    <motion.span
      animate={{
        color: isOverLimit ? '#DC2626' : isNearLimit ? '#F59E0B' : '#64748B',
        scale: isNearLimit ? [1, 1.1, 1] : 1,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      aria-live="polite"
    >
      {current}/{max}
    </motion.span>
  );
}

6.7 LIST & TABLE ANIMATIONS
Staggered List Entry
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
};

function InvoiceList({ invoices }) {
  return (
    <motion.ul 
      variants={containerVariants} 
      initial="hidden" 
      animate="show"
      role="list"
    >
      {invoices.map(invoice => (
        <motion.li key={invoice.id} variants={itemVariants}>
          <InvoiceRow invoice={invoice} />
        </motion.li>
      ))}
    </motion.ul>
  );
}
Table Row Hover
function TableRow({ children, onClick }) {
  return (
    <motion.tr
      whileHover={{ 
        backgroundColor: '#F8FAFC',
        x: 4,
      }}
      whileTap={{ backgroundColor: '#F1F5F9' }}
      transition={{ duration: 0.15 }}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {children}
    </motion.tr>
  );
}
Drag & Drop Reorder (Line Items)
import { Reorder } from 'motion/react';

function LineItemList({ items, setItems }) {
  return (
    <Reorder.Group 
      axis="y" 
      values={items} 
      onReorder={setItems}
      as="ul"
    >
      {items.map((item) => (
        <Reorder.Item
          key={item.id}
          value={item}
          whileDrag={{
            scale: 1.02,
            boxShadow: '8px 8px 0 0 #2563EB',
            zIndex: 50,
            cursor: 'grabbing',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <LineItem item={item} />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}

6.8 NUMBER ANIMATIONS
Animated Counter (Dashboard KPIs)
import { useMotionValue, useTransform, animate } from 'motion/react';

function AnimatedNumber({ value, prefix = '', suffix = '' }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [value]);

  return (
    <span className="font-mono tabular-nums">
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

// Usage
<AnimatedNumber value={145000} prefix="NT$" />
Progress Bar
function ProgressBar({ progress, label }) {
  return (
    <div className="w-full">
      <div 
        className="h-3 bg-gray-100 border-2 border-black overflow-hidden"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <motion.div
          className="h-full bg-primary-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>
    </div>
  );
}

6.9 PAGE TRANSITIONS
Route Transition Wrapper
// components/PageTransition.tsx
import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: { duration: 0.2 }
  },
};

export function PageTransition({ children }) {
  const pathname = usePathname();
  
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}

6.10 TOAST NOTIFICATIONS
const toastVariants = {
  initial: { 
    opacity: 0, 
    y: 50, 
    scale: 0.9,
  },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring', stiffness: 400, damping: 20 }
  },
  exit: { 
    opacity: 0, 
    y: 20, 
    scale: 0.95,
    transition: { duration: 0.15 }
  },
};

function Toast({ type, message, onClose }) {
  return (
    <motion.div
      layout
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`toast toast-${type}`}
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
    >
      <ToastIcon type={type} aria-hidden="true" />
      <span>{message}</span>
      <button 
        onClick={onClose} 
        aria-label="Dismiss notification"
        className="toast-close"
      >
        ×
      </button>
    </motion.div>
  );
}

6.11 MODAL ANIMATIONS
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
    y: 20,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 400, damping: 25 }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.15 }
  }
};

function Modal({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            className="modal-content"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <h2 id="modal-title">{title}</h2>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

6.12 SCROLL-TRIGGERED ANIMATIONS (GSAP)
Dashboard KPI Card Reveal
// For complex scroll animations, use GSAP
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function DashboardKPIs({ kpis }) {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.kpi-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <div ref={containerRef} className="kpi-grid">
      {kpis.map(kpi => (
        <div key={kpi.id} className="kpi-card">
          {/* KPI content */}
        </div>
      ))}
    </div>
  );
}

6.13 SKELETON LOADING STATES
function SkeletonPulse({ className }) {
  return (
    <motion.div
      className={`bg-gray-200 rounded ${className}`}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      aria-hidden="true"
    />
  );
}

function InvoiceCardSkeleton() {
  return (
    <div className="card" aria-label="Loading invoice...">
      <SkeletonPulse className="h-4 w-24 mb-2" />
      <SkeletonPulse className="h-6 w-40 mb-4" />
      <SkeletonPulse className="h-8 w-32" />
    </div>
  );
}

6.14 REDUCED MOTION SUPPORT
// hooks/useReducedMotion.ts
import { useReducedMotion } from 'motion/react';

export function useMotionPreference() {
  const shouldReduceMotion = useReducedMotion();

  return {
    transition: shouldReduceMotion 
      ? { duration: 0 } 
      : { type: 'spring', stiffness: 400, damping: 25 },
    shouldAnimate: !shouldReduceMotion,
  };
}
/* Global CSS fallback */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

6.15 MICRO-INTERACTION INVENTORY
Component
Trigger
Animation
Duration
Button
Hover
Lift up-left, shadow grows
150ms
Button
Click
Press down-right, shadow shrinks
100ms
Card
Hover
Lift up, shadow grows
200ms
Input
Focus
Blue shadow appears
150ms
Input
Error
Shake left-right
400ms
Checkbox
Toggle
Scale bounce
200ms
Status badge
Change
Fade + slight scale
200ms
Toast
Enter
Slide up + fade + scale
300ms
Toast
Exit
Fade + slide down
150ms
Modal
Enter
Fade + scale from 95%
250ms
Modal
Exit
Fade + scale to 95%
150ms
List item
Enter
Stagger fade + slide up
50ms stagger
Number
Change
Count up animation
1000ms
Page
Enter
Fade + slide up
300ms
Dropdown
Open
Scale Y from 0
150ms

PART 7: WCAG AA ACCESSIBILITY
7.1 Compliance Target
WCAG 2.2 Level AA — the globally accepted standard for web accessibility.
Key Requirements Summary
Category
Requirement
Success Criteria
Perceivable
Text contrast 4.5:1
1.4.3
Perceivable
UI contrast 3:1
1.4.11
Perceivable
Resize to 200%
1.4.4
Operable
Keyboard accessible
2.1.1
Operable
Focus visible
2.4.7
Operable
Focus not obscured
2.4.11
Operable
Target size 24×24px
2.5.8
Understandable
Error identification
3.3.1
Understandable
Labels/instructions
3.3.2
Robust
Name, role, value
4.1.2

7.2 COLOR CONTRAST
Required Ratios
Element Type
Minimum Ratio
Example
Normal text (<18px)
4.5:1
Body copy
Large text (≥18px or ≥14px bold)
3:1
Headings
UI components
3:1
Buttons, icons
Focus indicators
3:1
Outlines
Verified Color Combinations
Background
Foreground
Ratio
Pass?
#FFFFFF
#0F172A (text-primary)
15.7:1
✅
#FFFFFF
#475569 (text-secondary)
7.0:1
✅
#2563EB
#FFFFFF
4.6:1
✅
#DCFCE7
#166534 (success)
6.8:1
✅
#FEE2E2
#991B1B (error)
7.3:1
✅
#FEF3C7
#92400E (warning)
5.8:1
✅
#000000
#FFFFFF
21:1
✅
Never Rely on Color Alone
// ❌ Bad: Color only indicates status
<span className="text-green-500">Paid</span>

// ✅ Good: Icon + text + color
<span className="badge badge-success">
  <CheckIcon aria-hidden="true" />
  Paid
</span>

7.3 FOCUS MANAGEMENT
Focus Indicator Specifications (WCAG 2.4.11)
/* 
 * Focus indicators must:
 * 1. Have 3:1 contrast against adjacent colors
 * 2. Be at least 2px thick perimeter
 * 3. Not be completely obscured
 */

:focus-visible {
  outline: 3px solid var(--color-primary-600);
  outline-offset: 2px;
}

/* Neo-brutalist focus for interactive elements */
.btn:focus-visible,
.card-interactive:focus-visible {
  outline: 3px solid var(--color-primary-600);
  outline-offset: 2px;
  box-shadow: 0 0 0 6px var(--color-primary-100);
}

/* High contrast mode support */
@media (forced-colors: active) {
  :focus-visible {
    outline: 3px solid CanvasText;
  }
}
Focus Trap for Modals
import { FocusTrap } from '@headlessui/react';

function Modal({ isOpen, onClose, children }) {
  return (
    <FocusTrap>
      <div 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="modal-title"
      >
        {children}
      </div>
    </FocusTrap>
  );
}
Skip Link
// First element in layout
<a 
  href="#main-content" 
  className="skip-link"
>
  Skip to main content
</a>

// CSS
.skip-link {
  position: absolute;
  left: -9999px;
  z-index: 9999;
  padding: 1rem;
  background: var(--color-primary-600);
  color: white;
  border: 2px solid black;
}

.skip-link:focus {
  left: 1rem;
  top: 1rem;
}

7.4 KEYBOARD NAVIGATION
Required Keyboard Support
Component
Keys
Action
Button
Enter, Space
Activate
Link
Enter
Navigate
Dropdown menu
↓ ↑
Navigate options
Dropdown menu
Enter Space
Select option
Dropdown menu
Escape
Close
Modal
Escape
Close
Modal
Tab
Cycle through focusable elements
Tab panel
← →
Switch tabs
Checkbox
Space
Toggle
Radio group
↓ ↑
Change selection
Date picker
Arrow keys
Navigate dates
Combobox
↓ ↑
Navigate suggestions
Combobox
Enter
Select
Tab Order
// Ensure logical tab order
// ❌ Bad: Random tabindex values
<button tabIndex={5}>First</button>
<button tabIndex={2}>Second</button>

// ✅ Good: Natural DOM order or tabIndex 0/-1
<button>First</button>
<button>Second</button>

// Use tabIndex="-1" for programmatic focus only
<h2 tabIndex={-1} ref={headingRef}>Section Title</h2>

7.5 SEMANTIC HTML
Landmark Regions
<body>
  <a href="#main" class="skip-link">Skip to main content</a>
  
  <header role="banner">
    <nav aria-label="Main navigation">
      <!-- Primary nav -->
    </nav>
  </header>
  
  <aside role="complementary" aria-label="Sidebar navigation">
    <!-- Sidebar -->
  </aside>
  
  <main id="main" role="main">
    <h1>Page Title</h1>
    <!-- Page content -->
  </main>
  
  <footer role="contentinfo">
    <!-- Footer -->
  </footer>
</body>
Heading Hierarchy
<!-- ✅ Correct: Logical hierarchy -->
<h1>Dashboard</h1>
  <h2>Outstanding Invoices</h2>
  <h2>Recent Activity</h2>
    <h3>This Week</h3>
    <h3>Last Week</h3>

<!-- ❌ Wrong: Skipping levels -->
<h1>Dashboard</h1>
  <h3>Outstanding Invoices</h3> <!-- Skipped h2! -->

7.6 FORM ACCESSIBILITY
Label Association
// ✅ Explicit label association
<div className="form-field">
  <label htmlFor="client-name">
    Client name
    <span aria-hidden="true" className="text-error-600">*</span>
    <span className="sr-only">(required)</span>
  </label>
  <input 
    id="client-name" 
    type="text"
    required
    aria-required="true"
  />
</div>
Error Messages
function FormField({ id, label, error, children }) {
  const errorId = `${id}-error`;
  
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {React.cloneElement(children, {
        id,
        'aria-invalid': error ? 'true' : undefined,
        'aria-describedby': error ? errorId : undefined,
      })}
      {error && (
        <p 
          id={errorId} 
          role="alert" 
          className="text-error-600 text-sm mt-1"
        >
          {error}
        </p>
      )}
    </div>
  );
}
Form Instructions
<form aria-describedby="form-instructions">
  <p id="form-instructions" className="text-sm text-gray-600 mb-4">
    Fields marked with <span aria-hidden="true">*</span> are required.
  </p>
  {/* Form fields */}
</form>

7.7 STATUS MESSAGES & LIVE REGIONS
Toast Notifications
// Non-urgent: Use role="status" + aria-live="polite"
<div role="status" aria-live="polite" aria-atomic="true">
  Invoice saved successfully
</div>

// Urgent/Error: Use role="alert" + aria-live="assertive"
<div role="alert" aria-live="assertive">
  Error: Payment failed. Please try again.
</div>
Loading States
<button 
  disabled={isLoading} 
  aria-busy={isLoading}
  aria-disabled={isLoading}
>
  {isLoading ? (
    <>
      <span className="sr-only">Saving invoice, please wait...</span>
      <LoadingSpinner aria-hidden="true" />
      Saving...
    </>
  ) : (
    'Save Invoice'
  )}
</button>
Dynamic Content Updates
// For content that updates without user action
<div aria-live="polite" aria-atomic="true">
  {invoiceCount} invoices found
</div>

7.8 TOUCH TARGETS
/* WCAG 2.5.8: Minimum 24×24px, recommended 44×44px */
/* Billflow uses 48px on mobile for better UX */

.btn,
.nav-link,
.icon-btn,
[role="button"] {
  min-height: 48px;
  min-width: 48px;
}

/* Ensure adequate spacing between targets */
.btn + .btn,
.nav-link + .nav-link {
  margin-left: 8px; /* Minimum 8px gap */
}

/* Desktop can use slightly smaller */
@media (min-width: 1000px) {
  .btn,
  .nav-link,
  .icon-btn {
    min-height: 40px;
    min-width: 40px;
  }
}

7.9 IMAGES & ICONS
// Decorative icon (hidden from assistive tech)
<CheckIcon aria-hidden="true" />

// Icon with adjacent text label
<button>
  <DownloadIcon aria-hidden="true" />
  Download PDF
</button>

// Icon-only button (needs accessible name)
<button aria-label="Delete invoice INV-2026-001">
  <TrashIcon aria-hidden="true" />
</button>

// Meaningful image
<img 
  src="chart.png" 
  alt="Bar chart showing monthly revenue: January $10k, February $15k, March $12k"
/>

// Decorative image
<img src="decorative-pattern.svg" alt="" role="presentation" />

7.10 TABLES
<table>
  <caption className="sr-only">
    Invoice list showing number, client, amount, status, and date
  </caption>
  <thead>
    <tr>
      <th scope="col">Invoice #</th>
      <th scope="col">Client</th>
      <th scope="col">Amount</th>
      <th scope="col">Status</th>
      <th scope="col">Date</th>
      <th scope="col">
        <span className="sr-only">Actions</span>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">INV-2026-001</th>
      <td>Chen Design Co.</td>
      <td className="tabular-nums">NT$45,000</td>
      <td>
        <span className="badge badge-success">
          <CheckIcon aria-hidden="true" />
          Paid
        </span>
      </td>
      <td>Jan 15, 2026</td>
      <td>
        <button aria-label="View invoice INV-2026-001">
          View
        </button>
      </td>
    </tr>
  </tbody>
</table>

7.11 ANIMATION ACCESSIBILITY
// Always check for reduced motion preference
function AnimatedComponent({ children }) {
  const shouldReduceMotion = useReducedMotion();
  
  if (shouldReduceMotion) {
    return <div>{children}</div>;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

// Provide pause controls for auto-playing content
function AnimatedBanner() {
  const [isPaused, setIsPaused] = useState(false);
  
  return (
    <div>
      {isPaused ? <StaticContent /> : <AnimatedContent />}
      <button 
        onClick={() => setIsPaused(!isPaused)}
        aria-label={isPaused ? 'Play animation' : 'Pause animation'}
      >
        {isPaused ? '▶' : '⏸'}
      </button>
    </div>
  );
}

7.12 SCREEN READER UTILITIES
/* Visually hidden but accessible to screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Visible when focused (for skip links) */
.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}

7.13 ACCESSIBILITY TESTING CHECKLIST
Automated Testing
	•	[ ] Run axe-core / Lighthouse accessibility audit
	•	[ ] Check color contrast with WebAIM Contrast Checker
	•	[ ] Validate HTML with W3C validator
Manual Testing
	•	[ ] Navigate entire app using only keyboard
	•	[ ] Test with screen reader (VoiceOver on Mac, NVDA on Windows)
	•	[ ] Verify focus indicators are always visible
	•	[ ] Check heading hierarchy with browser extension
	•	[ ] Test at 200% zoom
	•	[ ] Verify touch targets on mobile device
Content Testing
	•	[ ] All images have appropriate alt text
	•	[ ] Form fields have visible labels
	•	[ ] Error messages are clear and helpful
	•	[ ] Status changes are announced to screen readers

PART 8: UX WRITING & VOICE
8.1 BRAND VOICE
Billflow speaks like a knowledgeable friend who happens to be good with money—not a corporate accountant, not a chatbot, not a startup bro.
Voice Attributes
Attribute
What it means
How it sounds
Confident
We know our stuff
"Your invoice is ready" not "Your invoice should be ready"
Clear
No jargon, no ambiguity
"Payment received" not "Transaction completed successfully"
Warm
Friendly but professional
"Nice work!" not "Operation successful"
Helpful
Guide, don't lecture
"Add a client to get started" not "No clients found"
Respectful
Value user's time
Short, scannable, no fluff
Voice Don'ts
❌ Don't
Why
Be robotic: "Error code 500"
Confusing, unhelpful
Be overly casual: "Oopsie! Something broke lol"
Undermines trust in fintech
Be condescending: "Are you sure you want to do this?"
Wastes time
Use jargon: "API rate limit exceeded"
Not everyone is technical
Be vague: "Something went wrong"
Doesn't help user fix it

8.2 TONE SPECTRUM
Voice stays consistent. Tone adapts to context.
Context
Tone
Example
Onboarding
Encouraging, helpful
"Let's create your first invoice — it only takes 2 minutes"
Success
Celebratory but brief
"Invoice sent! 🎉"
Error
Calm, solution-focused
"We couldn't send that email. Check the address and try again."
Warning
Clear, not alarming
"This invoice is 30 days overdue"
Destructive action
Serious, clear consequences
"Delete this client? This removes all 12 of their invoices too."
Empty state
Helpful, action-oriented
"No invoices yet. Create your first one →"
Loading
Informative
"Sending invoice..." not "Loading..."

8.3 CAPITALIZATION RULES
Use sentence case everywhere, with ONE exception: hero/landing page headlines use Title Case.

SENTENCE CASE (default for everything):
- Button labels: "Create invoice", "View clients", "Save changes"
- Page titles: "Invoice details", "Client management"
- Section headings: "Recent invoices", "Payment history"
- Form labels: "Client name", "Due date"
- Menu items: "Settings", "Log out"
- Status badges: "Paid", "Pending", "Overdue"
- Tooltips and help text
- Error and success messages
- Table headers

TITLE CASE (hero headlines only):
- Landing page hero: "Invoice in 2 Minutes. Get Paid Faster."
- Marketing headlines: "Professional Invoicing for Taiwan Freelancers"
- Feature section titles on marketing pages

❌ Wrong: "Create Invoice", "View All Clients", "Invoice Details"
✅ Correct: "Create invoice", "View all clients", "Invoice details"

8.4 WRITING PRINCIPLES
1. Clarity Over Cleverness
❌ "Looks like your digits got jumbled!"
✅ "Enter a valid phone number"
2. Lead With the Action
❌ "To save your invoice, click the Save button"
✅ "Save invoice"
3. Use Active Voice
❌ "Your invoice has been sent"
✅ "Invoice sent to chen@design.co"
4. Be Specific
❌ "Something went wrong"
✅ "We couldn't save. Check your internet and try again."
5. Front-Load Important Info
❌ "Click here to create a new invoice for your client"
✅ "Create invoice"

8.5 MICROCOPY PATTERNS
Buttons
Type
Pattern
Examples
Primary action
Verb + noun
"Send invoice", "Add client", "Save changes"
Secondary action
Verb or short phrase
"Cancel", "Back", "Skip for now"
Destructive action
Clear consequence
"Delete invoice", "Remove client"
Button Rules:
	•	Use sentence case, not Title Case
	•	Keep under 3 words when possible
	•	Use active verbs: "Save" not "Submit"
	•	Be specific: "Send invoice" not "Continue"
Form Labels
✅ Good labels:
- Client name
- Invoice amount
- Due date
- Payment terms

❌ Bad labels:
- Enter client name here
- Amount (in NT$)
- When is this due?
- Payment terms (required)
Label Rules:
	•	Use nouns, not questions or instructions
	•	Don't repeat the field type
	•	Keep labels above inputs (not as placeholders)
	•	Mark required fields consistently
Placeholder Text
✅ Good placeholders:
- Search invoices...
- e.g., NT$10,000
- YYYY-MM-DD

❌ Bad placeholders:
- Enter invoice amount
- Type here
- Required field
Placeholder Rules:
	•	Use for format hints or examples only
	•	Never use as the only label
	•	Keep short (disappears on focus)

8.6 ERROR MESSAGES
Formula: What went wrong + How to fix it
✅ Good error messages:

"Enter a valid email address"
"Amount must be greater than 0"
"Client name is required"
"This tax ID should be 8 digits"
"We couldn't connect. Check your internet and try again."

❌ Bad error messages:

"Invalid input"
"Error in field"
"Please enter a valid value"
"Validation failed"
"Error 500"
Error Message Guidelines
	1	State the problem clearly — Avoid technical jargon
	2	Explain what to do — Give the next step
	3	Don't blame the user — "This email format isn't valid" not "You entered an invalid email"
	4	Be specific — "Password needs 8+ characters" not "Password too short"
	5	Match the severity — Don't use alarming language for minor issues
Error Tone by Severity
Severity
Tone
Example
Field validation
Neutral, instructive
"Enter a valid email"
Form submission
Helpful
"Fix the highlighted fields to continue"
System error
Apologetic, actionable
"Something went wrong on our end. Try again in a moment."
Payment failure
Clear, reassuring
"Payment didn't go through. Your card wasn't charged."

8.7 SUCCESS MESSAGES
✅ Good success messages:

"Invoice sent to chen@design.co"
"Client added"
"Changes saved"
"Payment received — NT$45,000"
"Invoice marked as paid"

❌ Bad success messages:

"Success!"
"Operation completed successfully"
"Your request has been processed"
"Done"
Success Message Rules:
	•	Be specific about what happened
	•	Include relevant details (email, amount)
	•	Keep brief — success shouldn't need explanation
	•	Consider adding next action when helpful

8.8 EMPTY STATES
Formula: What's missing + What to do + (Optional) Why it matters
No invoices yet

Create your first invoice and get paid faster.
You can set up automatic payment reminders too.

[Create Invoice]
No clients

Add your first client to start invoicing.

[Add Client]
No results for "chen"

Try a different search term or [clear filters]
Empty State Guidelines
	•	Be helpful, not apologetic — Guide to next action
	•	Explain the benefit — Why should they add something?
	•	Include a clear CTA — Make it easy to take action
	•	Consider the context — First-time vs returning user

8.9 CONFIRMATION DIALOGS
Formula: Clear question + Consequence + Clear actions
Delete "Chen Design Co."?

This removes the client and all 12 of their invoices.
This can't be undone.

[Cancel]  [Delete Client]
Send invoice?

INV-2026-042 for NT$45,000 will be sent to chen@design.co

[Cancel]  [Send Invoice]
Confirmation Rules
	•	Restate what they're doing — Include specifics
	•	Explain consequences — Especially for destructive actions
	•	Make buttons specific — "Delete Client" not "OK"
	•	Default to safe option — Cancel should be easy to hit
	•	Don't overuse — Only for destructive or significant actions

8.10 LOADING STATES
✅ Good loading messages:

"Sending invoice..."
"Loading clients..."
"Calculating totals..."
"Generating PDF..."

❌ Bad loading messages:

"Loading..."
"Please wait..."
"Processing your request..."
"One moment..."

8.11 TOOLTIPS & HELP TEXT
When to Use
	•	Complex features that need explanation
	•	Technical terms users might not know
	•	Important consequences of an action
	•	Format requirements
How to Write
✅ Good help text:

Payment terms
How many days your client has to pay. Most freelancers use 14 or 30 days.

Tax ID (統一編號)
Your 8-digit business registration number. Leave blank if you don't have one.

❌ Bad help text:

Payment terms
Enter the number of days for payment terms as an integer value.

Tax ID
Enter your tax identification number.

8.12 BILINGUAL CONSIDERATIONS (DEFERRED)
Language Toggle
	•	Show languages in native script: "English" and "中文"
	•	Never use flags for language selection (politically sensitive in Taiwan)
	•	Save preference and apply immediately
	•	Position consistently (usually top-right)
Translation Guidelines
Principle
Example
Don't translate literally
"Save" → "儲存" (not "保存")
Keep UI terms consistent
Always use "發票" for invoice
Match tone across languages
Friendly in English = friendly in Chinese
Account for length
Chinese is often shorter
Test with real users
Native speakers catch nuance
Key Term Glossary
English
Chinese (zh-TW)
Notes
Invoice
發票
Not 帳單 (bill)
Client
客戶
Not 顧客 (customer)
Due date
到期日

Tax ID
統一編號
Taiwan-specific
Payment
付款

Amount
金額

Status
狀態

Overdue
逾期

Draft
草稿

Paid
已付款

Pending
待付款

Sent
已寄送

Line item
項目

Subtotal
小計

Tax
稅金

Total
總計


8.13 NUMBER & DATE FORMATTING
Currency
// Taiwan Dollar — no decimals
formatCurrency(45000, 'TWD') // "NT$45,000"

// Other currencies — 2 decimals
formatCurrency(1234.56, 'USD') // "$1,234.56"
Dates
// English format
formatDate(date, 'en') // "Jan 25, 2026"

// Chinese format
formatDate(date, 'zh-TW') // "2026年1月25日"

// Relative dates
formatRelative(date) // "Today", "Yesterday", "3 days ago"
Percentages
5%      // Tax rates
10% off // Discounts
75%     // Progress

8.14 CONTENT PATTERNS BY SCREEN
Dashboard
Element
Content
Page title
Dashboard
KPI labels
Outstanding, Paid this month, Overdue, Draft
Empty state
"No recent activity. Create an invoice to get started."
Invoice Builder
Element
Content
Page title (new)
New Invoice
Page title (edit)
Edit INV-2026-042
Section headers
Client Details, Line Items, Payment
Add line item
"+ Add item"
Remove item
(icon only with aria-label)
Preview tab
Preview
Save button
Save Draft
Send button
Send Invoice
Client List
Element
Content
Page title
Clients
Add button
Add Client
Search placeholder
Search clients...
Empty state
"No clients yet. Add your first client to start invoicing."
Delete confirm
"Delete [Client Name]? This removes the client and all their invoices."

8.15 WRITING CHECKLIST
Before shipping any copy, verify:
	•	[ ] Is it clear without context?
	•	[ ] Is it as short as possible without losing meaning?
	•	[ ] Does it use active voice?
	•	[ ] Does it tell users what TO do (not what NOT to do)?
	•	[ ] Is the action clear?
	•	[ ] Does it match our voice (confident, clear, warm)?
	•	[ ] Is it accessible (no color-only meaning, no jargon)?
	•	[ ] Does it work in both English and Chinese?
	•	[ ] Are numbers and dates formatted correctly?
	•	[ ] Is the tone appropriate for the context?

PART 9: COMPONENT SPECIFICATIONS
9.1 Button
// Variants: primary, secondary, ghost, danger
// Sizes: sm (36px), md (44px), lg (52px)
// States: default, hover, active, disabled, loading

<Button variant="primary" size="md">
  Send Invoice
</Button>
Property
Primary
Secondary
Ghost
Danger
Background
primary-600
white
transparent
error-600
Border
2px black
2px black
2px black
2px black
Text
white
text-primary
text-primary
white
Shadow
4px 4px black
4px 4px black
none
4px 4px black
9.2 Input
// States: default, focus, error, disabled, success

<Input
  label="Client name"
  placeholder="e.g., Chen Design Co."
  error="Client name is required"
/>
9.3 Card
// Variants: static, interactive (hoverable)

<Card variant="interactive" onClick={handleClick}>
  <CardHeader>Invoice #INV-2026-042</CardHeader>
  <CardContent>...</CardContent>
</Card>
9.4 Badge (Status)
Status
Background
Text
Border
Icon
Draft
gray-100
gray-700
gray-300
—
Sent
blue-100
blue-800
blue-300
✉
Viewed
purple-100
purple-800
purple-300
👁
Paid
green-100
green-800
green-300
✓
Overdue
red-100
red-800
red-300
⚠
Pending
yellow-100
yellow-800
yellow-300
⏳

PART 10: IMPLEMENTATION CHECKLIST
Phase 1: Foundation
	•	[ ] Next.js 14 with App Router
	•	[ ] Tailwind CSS with custom config
	•	[ ] Font loading (Space Grotesk, Noto Sans TC, Space Mono)
	•	[ ] Motion.dev setup
	•	[ ] CSS custom properties
	•	[ ] Animation tokens
Phase 2: Accessibility Infrastructure
	•	[ ] Skip link component
	•	[ ] Focus trap utility
	•	[ ] Reduced motion hook
	•	[ ] Screen reader utilities
	•	[ ] ARIA live regions
Phase 3: Core Components
	•	[ ] Button (all variants + animations)
	•	[ ] Input (all states + error shake)
	•	[ ] Select / Combobox
	•	[ ] Card (static + interactive)
	•	[ ] Badge (all status variants)
	•	[ ] Table (sortable, accessible)
	•	[ ] Modal (with focus trap)
	•	[ ] Toast system
Phase 4: Layout
	•	[ ] Sidebar navigation (desktop)
	•	[ ] Bottom navigation (mobile)
	•	[ ] Page transition wrapper
	•	[ ] Responsive container
Phase 5: Features
	•	[ ] Invoice builder
	•	[ ] Invoice list with animations
	•	[ ] Client management
	•	[ ] Dashboard KPIs with counters
	•	[ ] PDF preview
Phase 6: Polish
	•	[ ] Micro-interaction audit
	•	[ ] Loading states
	•	[ ] Empty states
	•	[ ] Error boundaries
	•	[ ] 404 / 500 pages
Phase 7: i18n
	•	[ ] react-i18next setup
	•	[ ] English translations
	•	[ ] Chinese translations
	•	[ ] Number/date formatters
	•	[ ] RTL-safe styles (future-proofing)
Phase 8: Testing
	•	[ ] Automated accessibility audit (axe)
	•	[ ] Keyboard navigation test
	•	[ ] Screen reader test
	•	[ ] Cross-browser testing
	•	[ ] Mobile device testing
	•	[ ] Animation performance (60fps)

APPENDIX: QUICK REFERENCE
Animation Durations
	•	Instant feedback: 100ms
	•	Button press: 150ms
	•	Card hover: 200ms
	•	Page transition: 300ms
	•	Error shake: 400ms
	•	Number count: 1000ms
Key Contrast Ratios
	•	Text on white: 4.5:1 minimum
	•	Large text: 3:1 minimum
	•	UI components: 3:1 minimum
	•	Focus indicators: 3:1 minimum
Touch Target Sizes
	•	Mobile: 48×48px minimum
	•	Desktop: 40×40px minimum
	•	Spacing between: 8px minimum
Z-Index Scale
	•	Base content: 0
	•	Sticky header: 10
	•	Dropdown: 20
	•	Modal overlay: 30
	•	Modal content: 40
	•	Toast: 50
	•	Tooltip: 60

End of Billflow Design System v2.0
