import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Status badges for invoices with semantic colors. Each variant has distinct background, text, and border colors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['draft', 'sent', 'viewed', 'paid', 'overdue', 'pending', 'neutral', 'info', 'success', 'warning', 'error'],
      description: 'Visual variant of the badge',
    },
    children: {
      control: 'text',
      description: 'Badge label text',
    },
  },
  args: {
    children: 'Badge',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// Invoice Status Badges
export const Draft: Story = {
  args: { variant: 'draft', children: 'Draft' },
};

export const Sent: Story = {
  args: { variant: 'sent', children: 'Sent' },
};

export const Viewed: Story = {
  args: { variant: 'viewed', children: 'Viewed' },
};

export const Paid: Story = {
  args: { variant: 'paid', children: 'Paid' },
};

export const Overdue: Story = {
  args: { variant: 'overdue', children: 'Overdue' },
};

export const Pending: Story = {
  args: { variant: 'pending', children: 'Pending' },
};

// Semantic Badges
export const Success: Story = {
  args: { variant: 'success', children: 'Success' },
};

export const Warning: Story = {
  args: { variant: 'warning', children: 'Warning' },
};

export const Error: Story = {
  args: { variant: 'error', children: 'Error' },
};

export const Info: Story = {
  args: { variant: 'info', children: 'Info' },
};

export const Neutral: Story = {
  args: { variant: 'neutral', children: 'Neutral' },
};
