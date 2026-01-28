import type { Meta, StoryObj } from '@storybook/react';

interface SpacingRowProps {
  name: string;
  size: number;
  tailwind: string;
  usage: string;
}

const SpacingRow = ({ name, size, tailwind, usage }: SpacingRowProps) => (
  <div className="flex items-center gap-4 py-3 border-b border-slate-200">
    <div className="w-20 font-mono text-sm">{name}</div>
    <div className="w-16 text-sm text-slate-500">{size}px</div>
    <div
      className="h-6 bg-blue-600 rounded"
      style={{ width: `${size}px`, minWidth: '4px' }}
    />
    <div className="flex-1">
      <code className="text-xs bg-slate-100 px-2 py-1 rounded">{tailwind}</code>
    </div>
    <div className="text-sm text-slate-500">{usage}</div>
  </div>
);

const Spacing = () => (
  <div className="max-w-4xl p-10 font-sans">
    <div className="mb-12">
      <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
        Spacing
      </h1>
      <p className="text-xl text-slate-500">
        A consistent 4px base unit spacing system for maintaining visual rhythm throughout the interface.
      </p>
    </div>

    {/* Spacing Scale */}
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
        Spacing Scale
      </h2>
      <p className="text-slate-500 mb-6">
        Based on a 4px grid, ensuring pixel-perfect alignment across all elements.
      </p>

      <div className="rounded-lg border-2 border-black overflow-hidden">
        <div className="p-4 bg-slate-50 border-b-2 border-black">
          <div className="flex items-center gap-4 text-sm font-semibold text-slate-600">
            <div className="w-20">Token</div>
            <div className="w-16">Size</div>
            <div className="flex-1">Visual</div>
            <div className="flex-1">Tailwind</div>
            <div>Usage</div>
          </div>
        </div>
        <div className="p-4">
          <SpacingRow name="0" size={0} tailwind="p-0, m-0, gap-0" usage="Reset" />
          <SpacingRow name="0.5" size={2} tailwind="p-0.5, m-0.5" usage="Micro spacing" />
          <SpacingRow name="1" size={4} tailwind="p-1, m-1, gap-1" usage="Tight spacing" />
          <SpacingRow name="2" size={8} tailwind="p-2, m-2, gap-2" usage="Compact elements" />
          <SpacingRow name="3" size={12} tailwind="p-3, m-3, gap-3" usage="Default padding" />
          <SpacingRow name="4" size={16} tailwind="p-4, m-4, gap-4" usage="Form fields, cards" />
          <SpacingRow name="5" size={20} tailwind="p-5, m-5, gap-5" usage="Medium sections" />
          <SpacingRow name="6" size={24} tailwind="p-6, m-6, gap-6" usage="Card content" />
          <SpacingRow name="8" size={32} tailwind="p-8, m-8, gap-8" usage="Page sections" />
          <SpacingRow name="10" size={40} tailwind="p-10, m-10, gap-10" usage="Large sections" />
          <SpacingRow name="12" size={48} tailwind="p-12, m-12, gap-12" usage="Page padding" />
          <SpacingRow name="16" size={64} tailwind="p-16, m-16, gap-16" usage="Major sections" />
        </div>
      </div>
    </section>

    {/* Component Spacing */}
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
        Component Spacing
      </h2>
      <p className="text-slate-500 mb-6">
        Recommended spacing values for common UI components.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border-2 border-black">
          <h3 className="font-semibold mb-3">Buttons</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Small</span>
              <code className="bg-slate-100 px-2 py-0.5 rounded">h-9 px-3</code>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Medium</span>
              <code className="bg-slate-100 px-2 py-0.5 rounded">h-11 px-4</code>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Large</span>
              <code className="bg-slate-100 px-2 py-0.5 rounded">h-13 px-6</code>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg border-2 border-black">
          <h3 className="font-semibold mb-3">Inputs</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Height</span>
              <code className="bg-slate-100 px-2 py-0.5 rounded">h-11 (44px)</code>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Padding</span>
              <code className="bg-slate-100 px-2 py-0.5 rounded">px-3</code>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Gap (with label)</span>
              <code className="bg-slate-100 px-2 py-0.5 rounded">gap-1.5</code>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg border-2 border-black">
          <h3 className="font-semibold mb-3">Cards</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Padding</span>
              <code className="bg-slate-100 px-2 py-0.5 rounded">p-6 (24px)</code>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Border Radius</span>
              <code className="bg-slate-100 px-2 py-0.5 rounded">rounded-2xl (16px)</code>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Gap between cards</span>
              <code className="bg-slate-100 px-2 py-0.5 rounded">gap-4</code>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg border-2 border-black">
          <h3 className="font-semibold mb-3">Forms</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Field gap</span>
              <code className="bg-slate-100 px-2 py-0.5 rounded">gap-4</code>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Section gap</span>
              <code className="bg-slate-100 px-2 py-0.5 rounded">gap-8</code>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Label to input</span>
              <code className="bg-slate-100 px-2 py-0.5 rounded">gap-1.5</code>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Responsive Breakpoints */}
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
        Responsive Breakpoints
      </h2>
      <p className="text-slate-500 mb-6">
        Custom breakpoints optimized for Billflow&apos;s use cases.
      </p>

      <div className="rounded-lg border-2 border-black overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-3 border-b-2 border-black font-semibold">Breakpoint</th>
              <th className="text-left p-3 border-b-2 border-black font-semibold">Min Width</th>
              <th className="text-left p-3 border-b-2 border-black font-semibold">CSS Variable</th>
              <th className="text-left p-3 border-b-2 border-black font-semibold">Target Devices</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-200">
              <td className="p-3 font-mono text-sm">mobile</td>
              <td className="p-3">390px</td>
              <td className="p-3"><code className="bg-slate-100 px-2 py-0.5 rounded text-xs">--breakpoint-mobile</code></td>
              <td className="p-3 text-slate-500">iPhone 12+ and modern phones</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="p-3 font-mono text-sm">tablet</td>
              <td className="p-3">768px</td>
              <td className="p-3"><code className="bg-slate-100 px-2 py-0.5 rounded text-xs">--breakpoint-tablet</code></td>
              <td className="p-3 text-slate-500">iPad and tablets</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="p-3 font-mono text-sm">desktop</td>
              <td className="p-3">1000px</td>
              <td className="p-3"><code className="bg-slate-100 px-2 py-0.5 rounded text-xs">--breakpoint-desktop</code></td>
              <td className="p-3 text-slate-500">Laptops, small monitors</td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-sm">desktop-lg</td>
              <td className="p-3">1440px</td>
              <td className="p-3"><code className="bg-slate-100 px-2 py-0.5 rounded text-xs">--breakpoint-desktop-lg</code></td>
              <td className="p-3 text-slate-500">Large monitors, 27&quot;+</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    {/* Touch Targets */}
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
        Touch Targets (WCAG 2.5.8)
      </h2>
      <p className="text-slate-500 mb-6">
        Minimum touch target sizes for accessibility compliance.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border-2 border-black">
          <h3 className="font-semibold mb-3">Mobile</h3>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg border-2 border-black flex items-center justify-center text-white text-xs font-mono">
              48px
            </div>
            <div className="text-sm text-slate-500">
              Minimum touch target size on mobile devices
            </div>
          </div>
        </div>
        <div className="p-4 rounded-lg border-2 border-black">
          <h3 className="font-semibold mb-3">Desktop</h3>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg border-2 border-black flex items-center justify-center text-white text-xs font-mono">
              40px
            </div>
            <div className="text-sm text-slate-500">
              Minimum clickable area on desktop
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Usage Guidelines */}
    <section>
      <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
        Usage Guidelines
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-semibold mb-2 text-green-700">Do</h3>
          <ul className="text-sm text-slate-600 space-y-2">
            <li>Use 4px increments for all spacing</li>
            <li>Maintain consistent padding within components</li>
            <li>Use larger gaps between sections (32px+)</li>
            <li>Respect minimum touch target sizes</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-2 text-red-700">Don&apos;t</h3>
          <ul className="text-sm text-slate-600 space-y-2">
            <li>Don&apos;t use arbitrary pixel values</li>
            <li>Don&apos;t make touch targets smaller than 48px on mobile</li>
            <li>Don&apos;t pack elements too tightly</li>
            <li>Don&apos;t mix spacing systems</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
);

const meta: Meta = {
  title: 'Foundations/Spacing',
  component: Spacing,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
