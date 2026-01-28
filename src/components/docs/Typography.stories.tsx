import type { Meta, StoryObj } from '@storybook/react';

const Typography = () => (
  <div className="max-w-4xl p-10 font-sans">
    <div className="mb-12">
      <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
        Typography
      </h1>
      <p className="text-xl text-slate-500">
        A thoughtfully crafted type system optimized for financial data and bilingual support (English + Traditional Chinese).
      </p>
    </div>

    {/* Font Families */}
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
        Font Families
      </h2>
      <div className="space-y-6">
        <div className="p-6 rounded-lg border-2 border-black">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-3xl" style={{ fontFamily: 'var(--font-display)' }}>Space Grotesk</span>
            <code className="text-sm bg-slate-100 px-2 py-1 rounded">--font-display</code>
          </div>
          <p className="text-slate-500 mb-4">Tech-forward geometric sans-serif for headings and display text.</p>
          <div className="text-lg" style={{ fontFamily: 'var(--font-display)' }}>
            ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
            abcdefghijklmnopqrstuvwxyz<br />
            0123456789 $€¥ NT$1,234.56
          </div>
        </div>

        <div className="p-6 rounded-lg border-2 border-black">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-3xl" style={{ fontFamily: 'var(--font-body)' }}>Noto Sans TC</span>
            <code className="text-sm bg-slate-100 px-2 py-1 rounded">--font-body</code>
          </div>
          <p className="text-slate-500 mb-4">Excellent Traditional Chinese support with clean Latin characters for body text.</p>
          <div className="text-lg" style={{ fontFamily: 'var(--font-body)' }}>
            ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
            abcdefghijklmnopqrstuvwxyz<br />
            發票 客戶 付款 逾期 草稿<br />
            0123456789
          </div>
        </div>

        <div className="p-6 rounded-lg border-2 border-black">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-3xl" style={{ fontFamily: 'var(--font-mono)' }}>Space Mono</span>
            <code className="text-sm bg-slate-100 px-2 py-1 rounded">--font-mono</code>
          </div>
          <p className="text-slate-500 mb-4">Monospace font for financial data, numbers, and code.</p>
          <div className="text-lg" style={{ fontFamily: 'var(--font-mono)' }}>
            ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
            abcdefghijklmnopqrstuvwxyz<br />
            NT$1,234,567.89 | INV-2024-0001
          </div>
        </div>
      </div>
    </section>

    {/* Type Scale */}
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
        Type Scale
      </h2>
      <p className="text-slate-500 mb-6">
        A harmonious scale optimized for readability at all sizes.
      </p>

      <div className="space-y-0 rounded-lg border-2 border-black overflow-hidden">
        <div className="p-4 border-b-2 border-black bg-slate-50">
          <div className="grid grid-cols-4 gap-4 text-sm font-semibold text-slate-600">
            <div>Name</div>
            <div>Size / Weight / Line Height</div>
            <div>Usage</div>
            <div>Preview</div>
          </div>
        </div>

        <div className="p-4 border-b border-slate-200">
          <div className="grid grid-cols-4 gap-4 items-center">
            <div className="font-mono text-sm">text-4xl</div>
            <div className="text-sm text-slate-500">44px / 700 / 1.1</div>
            <div className="text-sm text-slate-500">Dashboard totals</div>
            <div className="text-4xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>$12,345</div>
          </div>
        </div>

        <div className="p-4 border-b border-slate-200">
          <div className="grid grid-cols-4 gap-4 items-center">
            <div className="font-mono text-sm">text-3xl</div>
            <div className="text-sm text-slate-500">34px / 700 / 1.2</div>
            <div className="text-sm text-slate-500">Hero metrics</div>
            <div className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Revenue</div>
          </div>
        </div>

        <div className="p-4 border-b border-slate-200">
          <div className="grid grid-cols-4 gap-4 items-center">
            <div className="font-mono text-sm">text-2xl</div>
            <div className="text-sm text-slate-500">26px / 700 / 1.3</div>
            <div className="text-sm text-slate-500">Page titles</div>
            <div className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Invoices</div>
          </div>
        </div>

        <div className="p-4 border-b border-slate-200">
          <div className="grid grid-cols-4 gap-4 items-center">
            <div className="font-mono text-sm">text-xl</div>
            <div className="text-sm text-slate-500">20px / 600 / 1.4</div>
            <div className="text-sm text-slate-500">Card titles</div>
            <div className="text-xl font-semibold">Invoice Details</div>
          </div>
        </div>

        <div className="p-4 border-b border-slate-200">
          <div className="grid grid-cols-4 gap-4 items-center">
            <div className="font-mono text-sm">text-lg</div>
            <div className="text-sm text-slate-500">17px / 500 / 1.5</div>
            <div className="text-sm text-slate-500">Emphasized text</div>
            <div className="text-lg font-medium">Total Amount Due</div>
          </div>
        </div>

        <div className="p-4 border-b border-slate-200">
          <div className="grid grid-cols-4 gap-4 items-center">
            <div className="font-mono text-sm">text-base</div>
            <div className="text-sm text-slate-500">15px / 400 / 1.6</div>
            <div className="text-sm text-slate-500">Body text, labels</div>
            <div className="text-base">Invoice description and notes</div>
          </div>
        </div>

        <div className="p-4 border-b border-slate-200">
          <div className="grid grid-cols-4 gap-4 items-center">
            <div className="font-mono text-sm">text-sm</div>
            <div className="text-sm text-slate-500">13px / 400 / 1.5</div>
            <div className="text-sm text-slate-500">Table cells, metadata</div>
            <div className="text-sm">Due: Jan 15, 2024</div>
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-4 gap-4 items-center">
            <div className="font-mono text-sm">text-xs</div>
            <div className="text-sm text-slate-500">11px / 400 / 1.4</div>
            <div className="text-sm text-slate-500">Timestamps, captions</div>
            <div className="text-xs text-slate-500">Last updated 2 hours ago</div>
          </div>
        </div>
      </div>
    </section>

    {/* Financial Numbers */}
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
        Financial Numbers
      </h2>
      <p className="text-slate-500 mb-6">
        Always use monospace font with tabular numbers for financial data to ensure proper alignment.
      </p>

      <div className="p-6 rounded-lg border-2 border-black bg-slate-50">
        <div className="mb-4">
          <code className="text-sm bg-white px-2 py-1 rounded border">className=&quot;numeric&quot;</code>
          <span className="text-sm text-slate-500 ml-2">or</span>
          <code className="text-sm bg-white px-2 py-1 rounded border ml-2">data-numeric</code>
        </div>
        <div className="space-y-2 font-mono" style={{ fontVariantNumeric: 'tabular-nums' }}>
          <div className="text-2xl">NT$  1,234,567.89</div>
          <div className="text-2xl">NT$    987,654.32</div>
          <div className="text-2xl">NT$     12,345.00</div>
          <div className="text-2xl">NT$        567.89</div>
        </div>
        <p className="text-sm text-slate-500 mt-4">
          Notice how the numbers align perfectly due to tabular figures.
        </p>
      </div>
    </section>

    {/* Chinese Typography */}
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
        Chinese Typography
      </h2>
      <p className="text-slate-500 mb-6">
        Special rules apply for Traditional Chinese text to ensure optimal readability.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border-2 border-black">
          <h3 className="font-semibold mb-2">Line Height</h3>
          <p className="text-sm text-slate-500 mb-2">Chinese text uses 1.75 line-height (vs 1.6 for English)</p>
          <div className="p-3 bg-slate-50 rounded" style={{ lineHeight: 1.75 }}>
            發票管理系統讓您輕鬆追蹤所有帳單。建立專業發票，設定付款提醒，並即時查看付款狀態。
          </div>
        </div>
        <div className="p-4 rounded-lg border-2 border-black">
          <h3 className="font-semibold mb-2">Word Breaking</h3>
          <p className="text-sm text-slate-500 mb-2">Uses <code>word-break: keep-all</code> to prevent mid-word breaks</p>
          <div className="p-3 bg-slate-50 rounded" style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
            統一編號：12345678<br />
            發票號碼：AB-12345678
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
            <li>Use Space Grotesk for headings and display</li>
            <li>Use Noto Sans TC for body text</li>
            <li>Use Space Mono for all financial numbers</li>
            <li>Maintain consistent type hierarchy</li>
            <li>Use tabular-nums for number columns</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-2 text-red-700">Don&apos;t</h3>
          <ul className="text-sm text-slate-600 space-y-2">
            <li>Don&apos;t use body font for numbers</li>
            <li>Don&apos;t go below 11px font size</li>
            <li>Don&apos;t use more than 3 font weights per page</li>
            <li>Don&apos;t mix Chinese and English fonts inconsistently</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
);

const meta: Meta = {
  title: 'Foundations/Typography',
  component: Typography,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
