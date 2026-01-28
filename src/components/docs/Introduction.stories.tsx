import type { Meta, StoryObj } from '@storybook/react';

const Introduction = () => (
  <div className="max-w-4xl p-10 font-sans">
    <div className="mb-12">
      <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
        Billflow Design System
      </h1>
      <p className="text-xl text-slate-500 mb-8">
        A neo-brutalist design system for building professional invoicing applications with bold aesthetics and excellent accessibility.
      </p>
      <div className="flex gap-3 flex-wrap">
        <span className="badge badge-info">React 19</span>
        <span className="badge badge-info">TypeScript</span>
        <span className="badge badge-info">Tailwind CSS 4</span>
        <span className="badge badge-info">Motion.dev</span>
        <span className="badge badge-success">WCAG 2.2 AA</span>
      </div>
    </div>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Design Philosophy</h2>
      <p className="text-base text-slate-600 mb-6 leading-relaxed">
        Billflow embraces <strong>neo-brutalist design</strong> — characterized by bold black borders, hard-offset shadows (no blur),
        high contrast, and confident typography. This aesthetic conveys professionalism and trust while maintaining
        excellent readability for financial data.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <h3 className="font-semibold mb-2">Bold Borders</h3>
          <p className="text-sm text-slate-500">2-4px solid black borders define every interactive element</p>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-2">Hard Shadows</h3>
          <p className="text-sm text-slate-500">Offset shadows without blur create depth and dimension</p>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-2">High Contrast</h3>
          <p className="text-sm text-slate-500">WCAG AA compliant color contrast for all text</p>
        </div>
      </div>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>What&apos;s Included</h2>
      <div className="space-y-4">
        <div className="flex gap-4 items-start p-4 bg-slate-50 rounded-lg border-2 border-black">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">1</div>
          <div>
            <h3 className="font-semibold">Foundations</h3>
            <p className="text-sm text-slate-500">Colors, typography, spacing, shadows, and breakpoints that form the visual language</p>
          </div>
        </div>
        <div className="flex gap-4 items-start p-4 bg-slate-50 rounded-lg border-2 border-black">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">2</div>
          <div>
            <h3 className="font-semibold">Components</h3>
            <p className="text-sm text-slate-500">20+ accessible React components including buttons, inputs, cards, tables, modals, and more</p>
          </div>
        </div>
        <div className="flex gap-4 items-start p-4 bg-slate-50 rounded-lg border-2 border-black">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">3</div>
          <div>
            <h3 className="font-semibold">Guidelines</h3>
            <p className="text-sm text-slate-500">Best practices for accessibility, animations, and implementation patterns</p>
          </div>
        </div>
      </div>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Tech Stack</h2>
      <div className="overflow-hidden rounded-lg border-2 border-black">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-3 border-b-2 border-black font-semibold">Technology</th>
              <th className="text-left p-3 border-b-2 border-black font-semibold">Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-200">
              <td className="p-3 font-mono text-sm">Next.js 16</td>
              <td className="p-3 text-slate-600">App Router with SSR</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="p-3 font-mono text-sm">React 19</td>
              <td className="p-3 text-slate-600">UI with React Compiler</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="p-3 font-mono text-sm">TypeScript 5</td>
              <td className="p-3 text-slate-600">Type safety</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="p-3 font-mono text-sm">Tailwind CSS 4</td>
              <td className="p-3 text-slate-600">Utility-first styling</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="p-3 font-mono text-sm">Motion.dev</td>
              <td className="p-3 text-slate-600">Animations (Framer Motion)</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="p-3 font-mono text-sm">Headless UI</td>
              <td className="p-3 text-slate-600">Accessible primitives</td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-sm">Lucide React</td>
              <td className="p-3 text-slate-600">Icon library</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Quick Start</h2>
      <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
        <div className="text-slate-400 mb-2"># Install dependencies</div>
        <div className="mb-4">npm install</div>
        <div className="text-slate-400 mb-2"># Run Storybook</div>
        <div className="mb-4">npm run storybook</div>
        <div className="text-slate-400 mb-2"># Build for production</div>
        <div>npm run build-storybook</div>
      </div>
    </section>
  </div>
);

const meta: Meta = {
  title: 'Getting Started/Introduction',
  component: Introduction,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
