import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Neo-brutalist card with thick borders and offset shadows. Supports interactive hover/tap animations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    interactive: {
      control: 'boolean',
      description: 'Makes the card interactive with hover lift and tap press animations',
    },
    noPadding: {
      control: 'boolean',
      description: 'Removes default padding for custom content layouts',
    },
    children: {
      control: 'text',
      description: 'Card content',
    },
  },
  args: {
    children: 'Card content goes here',
    interactive: false,
    noPadding: false,
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: 'This is a basic card with default styling.',
  },
};

export const Interactive: Story = {
  args: {
    interactive: true,
    children: 'Hover over me! I have lift and press animations.',
  },
};

export const NoPadding: Story = {
  args: {
    noPadding: true,
    children: (
      <div className="p-6 border-b-2 border-black">
        <h3 className="font-semibold">Custom Header</h3>
      </div>
    ),
  },
  render: (args) => (
    <Card {...args}>
      <div className="p-6 border-b border-slate-200">
        <h3 className="font-semibold">Card Header</h3>
      </div>
      <div className="p-6">
        <p className="text-slate-600">Card body with custom padding structure.</p>
      </div>
    </Card>
  ),
};

export const InvoiceCard: Story = {
  render: () => (
    <Card interactive className="w-80">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold">INV-2024-001</h3>
          <p className="text-sm text-slate-500">Chen Design Co.</p>
        </div>
        <span className="px-3 py-1 text-sm bg-green-100 text-green-700 border-2 border-green-500 rounded-lg">
          Paid
        </span>
      </div>
      <div className="text-3xl font-bold font-mono">NT$125,000</div>
      <p className="text-sm text-slate-500 mt-2">Due: Jan 15, 2024</p>
    </Card>
  ),
};

export const KPICard: Story = {
  render: () => (
    <Card className="w-64">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <span className="text-blue-600 font-bold">$</span>
        </div>
        <span className="text-slate-500">Outstanding</span>
      </div>
      <div className="text-3xl font-bold font-mono">NT$125,000</div>
    </Card>
  ),
};
