import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard, SkeletonInvoiceCard, SkeletonKPI } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Loading skeleton components with pulse animation. Includes variants for text, avatars, cards, and domain-specific skeletons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular', 'rounded'],
      description: 'Shape variant',
    },
    animate: {
      control: 'boolean',
      description: 'Enable pulse animation',
    },
    width: {
      control: 'text',
      description: 'Width (number or string)',
    },
    height: {
      control: 'text',
      description: 'Height (number or string)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Playground: Story = {
  args: {
    width: 200,
    height: 20,
    variant: 'text',
    animate: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      <div>
        <p className="text-sm text-slate-500 mb-2">Text (default)</p>
        <Skeleton variant="text" width={200} height="1em" />
      </div>
      <div>
        <p className="text-sm text-slate-500 mb-2">Circular</p>
        <Skeleton variant="circular" width={48} height={48} />
      </div>
      <div>
        <p className="text-sm text-slate-500 mb-2">Rectangular</p>
        <Skeleton variant="rectangular" width={200} height={100} />
      </div>
      <div>
        <p className="text-sm text-slate-500 mb-2">Rounded</p>
        <Skeleton variant="rounded" width={200} height={100} />
      </div>
    </div>
  ),
};

export const TextBlock: Story = {
  render: () => (
    <div className="w-80">
      <SkeletonText lines={4} />
    </div>
  ),
};

export const CardExample: Story = {
  render: () => (
    <div className="w-80">
      <SkeletonCard showHeader showFooter lines={3} />
    </div>
  ),
};

export const InvoiceCard: Story = {
  render: () => (
    <div className="w-80">
      <SkeletonInvoiceCard />
    </div>
  ),
};

export const KPICard: Story = {
  render: () => (
    <div className="w-48">
      <SkeletonKPI />
    </div>
  ),
};

export const Avatars: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <SkeletonAvatar size="sm" />
      <SkeletonAvatar size="md" />
      <SkeletonAvatar size="lg" />
      <SkeletonAvatar size="xl" />
    </div>
  ),
};
