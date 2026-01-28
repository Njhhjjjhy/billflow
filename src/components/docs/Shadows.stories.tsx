import type { Meta, StoryObj } from '@storybook/react';

const Shadows = () => (
  <div className="max-w-4xl p-10 font-sans">
    <div className="mb-12">
      <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
        Shadows
      </h1>
      <p className="text-xl text-slate-500">
        Neo-brutalist shadows with hard offsets and no blur — a signature element of the Billflow design system.
      </p>
    </div>

    {/* Shadow Scale */}
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
        Shadow Scale
      </h2>
      <p className="text-slate-500 mb-6">
        Unlike traditional soft shadows, neo-brutalist shadows use hard offsets without blur,
        creating bold, graphic depth.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="text-center">
          <div
            className="w-24 h-24 mx-auto bg-white border-2 border-black rounded-xl mb-4"
            style={{ boxShadow: '2px 2px 0 0 #000000' }}
          />
          <div className="font-semibold">Small</div>
          <code className="text-xs text-slate-500">--shadow-sm</code>
          <div className="text-xs text-slate-400 mt-1">2px 2px 0 0</div>
        </div>

        <div className="text-center">
          <div
            className="w-24 h-24 mx-auto bg-white border-2 border-black rounded-xl mb-4"
            style={{ boxShadow: '4px 4px 0 0 #000000' }}
          />
          <div className="font-semibold">Medium</div>
          <code className="text-xs text-slate-500">--shadow-md</code>
          <div className="text-xs text-slate-400 mt-1">4px 4px 0 0</div>
        </div>

        <div className="text-center">
          <div
            className="w-24 h-24 mx-auto bg-white border-2 border-black rounded-xl mb-4"
            style={{ boxShadow: '6px 6px 0 0 #000000' }}
          />
          <div className="font-semibold">Large</div>
          <code className="text-xs text-slate-500">--shadow-lg</code>
          <div className="text-xs text-slate-400 mt-1">6px 6px 0 0</div>
        </div>

        <div className="text-center">
          <div
            className="w-24 h-24 mx-auto bg-white border-2 border-black rounded-xl mb-4"
            style={{ boxShadow: '8px 8px 0 0 #000000' }}
          />
          <div className="font-semibold">Extra Large</div>
          <code className="text-xs text-slate-500">--shadow-xl</code>
          <div className="text-xs text-slate-400 mt-1">8px 8px 0 0</div>
        </div>
      </div>
    </section>

    {/* Colored Shadows */}
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
        Colored Shadows
      </h2>
      <p className="text-slate-500 mb-6">
        Semantic colored shadows reinforce meaning and add visual interest.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div
            className="w-full h-24 bg-white border-2 border-black rounded-xl mb-4 flex items-center justify-center"
            style={{ boxShadow: '4px 4px 0 0 #2563EB' }}
          >
            <span className="font-semibold text-blue-600">Primary Action</span>
          </div>
          <code className="text-xs text-slate-500">--shadow-primary</code>
          <div className="text-xs text-slate-400 mt-1">4px 4px 0 0 #2563EB</div>
        </div>

        <div className="text-center">
          <div
            className="w-full h-24 bg-white border-2 border-black rounded-xl mb-4 flex items-center justify-center"
            style={{ boxShadow: '4px 4px 0 0 #16A34A' }}
          >
            <span className="font-semibold text-green-600">Success</span>
          </div>
          <code className="text-xs text-slate-500">--shadow-success</code>
          <div className="text-xs text-slate-400 mt-1">4px 4px 0 0 #16A34A</div>
        </div>

        <div className="text-center">
          <div
            className="w-full h-24 bg-white border-2 border-black rounded-xl mb-4 flex items-center justify-center"
            style={{ boxShadow: '4px 4px 0 0 #DC2626' }}
          >
            <span className="font-semibold text-red-600">Error / Danger</span>
          </div>
          <code className="text-xs text-slate-500">--shadow-error</code>
          <div className="text-xs text-slate-400 mt-1">4px 4px 0 0 #DC2626</div>
        </div>
      </div>
    </section>

    {/* Interactive States */}
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
        Interactive States
      </h2>
      <p className="text-slate-500 mb-6">
        Shadows shift with interaction to create a tactile, physical feel.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 rounded-lg border-2 border-black">
          <h3 className="font-semibold mb-3">Default</h3>
          <div
            className="w-full h-16 bg-blue-600 text-white border-2 border-black rounded-xl flex items-center justify-center font-semibold"
            style={{ boxShadow: '4px 4px 0 0 #000000' }}
          >
            Button
          </div>
          <p className="text-sm text-slate-500 mt-3">
            Standard shadow at rest position
          </p>
        </div>

        <div className="p-4 rounded-lg border-2 border-black">
          <h3 className="font-semibold mb-3">Hover</h3>
          <div
            className="w-full h-16 bg-blue-600 text-white border-2 border-black rounded-xl flex items-center justify-center font-semibold"
            style={{
              boxShadow: '6px 6px 0 0 #000000',
              transform: 'translate(-2px, -2px)'
            }}
          >
            Button
          </div>
          <p className="text-sm text-slate-500 mt-3">
            Element lifts up and shadow grows
          </p>
        </div>

        <div className="p-4 rounded-lg border-2 border-black">
          <h3 className="font-semibold mb-3">Active / Pressed</h3>
          <div
            className="w-full h-16 bg-blue-600 text-white border-2 border-black rounded-xl flex items-center justify-center font-semibold"
            style={{
              boxShadow: '2px 2px 0 0 #000000',
              transform: 'translate(2px, 2px)'
            }}
          >
            Button
          </div>
          <p className="text-sm text-slate-500 mt-3">
            Element presses down, shadow shrinks
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-slate-50 rounded-lg border-2 border-black">
        <h3 className="font-semibold mb-2">CSS for Interactive Shadows</h3>
        <pre className="text-sm font-mono bg-slate-900 text-slate-100 p-4 rounded overflow-x-auto">
{`.button {
  box-shadow: var(--shadow-md);
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}

.button:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-lg);
}

.button:active {
  transform: translate(2px, 2px);
  box-shadow: var(--shadow-sm);
}`}
        </pre>
      </div>
    </section>

    {/* Component Examples */}
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
        Component Examples
      </h2>
      <p className="text-slate-500 mb-6">
        How shadows are applied across different UI components.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-3">Cards</h3>
          <div
            className="p-6 bg-white border-2 border-black rounded-2xl"
            style={{ boxShadow: '4px 4px 0 0 #000000' }}
          >
            <h4 className="font-semibold mb-2">Invoice #INV-2024-001</h4>
            <p className="text-sm text-slate-500 mb-4">Client: Acme Corp</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold font-mono">NT$12,500</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-lg border-2 border-green-500">
                Paid
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Input Fields</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Default</label>
              <input
                type="text"
                placeholder="Enter amount"
                className="w-full h-11 px-3 border-2 border-black rounded-xl"
                style={{ boxShadow: 'none' }}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Focused</label>
              <input
                type="text"
                placeholder="Enter amount"
                className="w-full h-11 px-3 border-2 border-blue-600 rounded-xl"
                style={{ boxShadow: '4px 4px 0 0 #2563EB' }}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Error</label>
              <input
                type="text"
                placeholder="Enter amount"
                className="w-full h-11 px-3 border-2 border-red-600 rounded-xl"
                style={{ boxShadow: '4px 4px 0 0 #DC2626' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* CSS Variables Reference */}
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
        CSS Variables Reference
      </h2>

      <div className="rounded-lg border-2 border-black overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-3 border-b-2 border-black font-semibold">Variable</th>
              <th className="text-left p-3 border-b-2 border-black font-semibold">Value</th>
              <th className="text-left p-3 border-b-2 border-black font-semibold">Usage</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-200">
              <td className="p-3 font-mono text-sm">--shadow-sm</td>
              <td className="p-3 font-mono text-sm">2px 2px 0 0 #000</td>
              <td className="p-3 text-slate-500">Pressed states, subtle depth</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="p-3 font-mono text-sm">--shadow-md</td>
              <td className="p-3 font-mono text-sm">4px 4px 0 0 #000</td>
              <td className="p-3 text-slate-500">Default for cards, buttons</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="p-3 font-mono text-sm">--shadow-lg</td>
              <td className="p-3 font-mono text-sm">6px 6px 0 0 #000</td>
              <td className="p-3 text-slate-500">Hover states, emphasis</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="p-3 font-mono text-sm">--shadow-xl</td>
              <td className="p-3 font-mono text-sm">8px 8px 0 0 #000</td>
              <td className="p-3 text-slate-500">Modals, dropdowns</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="p-3 font-mono text-sm">--shadow-primary</td>
              <td className="p-3 font-mono text-sm">4px 4px 0 0 #2563EB</td>
              <td className="p-3 text-slate-500">Focus states, primary actions</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="p-3 font-mono text-sm">--shadow-success</td>
              <td className="p-3 font-mono text-sm">4px 4px 0 0 #16A34A</td>
              <td className="p-3 text-slate-500">Success states</td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-sm">--shadow-error</td>
              <td className="p-3 font-mono text-sm">4px 4px 0 0 #DC2626</td>
              <td className="p-3 text-slate-500">Error states, validation</td>
            </tr>
          </tbody>
        </table>
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
            <li>Use shadows consistently on interactive elements</li>
            <li>Animate shadow transitions smoothly (0.1-0.15s)</li>
            <li>Match shadow color to semantic meaning</li>
            <li>Always pair shadows with borders</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-2 text-red-700">Don&apos;t</h3>
          <ul className="text-sm text-slate-600 space-y-2">
            <li>Don&apos;t add blur to shadows (keep them sharp)</li>
            <li>Don&apos;t use shadows on static, non-interactive elements</li>
            <li>Don&apos;t mix blurred and hard shadows</li>
            <li>Don&apos;t forget to remove shadows on disabled states</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
);

const meta: Meta = {
  title: 'Foundations/Shadows',
  component: Shadows,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
