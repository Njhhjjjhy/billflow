import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { Mail, ArrowRight } from 'lucide-react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Neo-brutalist button with thick borders and offset shadows. Supports multiple variants, sizes, and loading states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Visual style of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows loading spinner and disables interaction',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    leftIcon: {
      control: false,
      description: 'Icon to display on the left side',
    },
    rightIcon: {
      control: false,
      description: 'Icon to display on the right side',
    },
  },
  args: {
    onClick: fn(),
    children: 'Button',
    variant: 'primary',
    size: 'md',
    isLoading: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Single interactive story - use controls to change variant, size, and state
export const Playground: Story = {
  args: {
    children: 'Click me',
  },
};

// Showcase all variants in one view
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-4 items-center">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <Button isLoading>Loading</Button>
        <Button disabled>Disabled</Button>
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <Button leftIcon={<Mail className="h-4 w-4" />}>With Left Icon</Button>
        <Button rightIcon={<ArrowRight className="h-4 w-4" />}>With Right Icon</Button>
        <Button leftIcon={<Mail className="h-4 w-4" />} rightIcon={<ArrowRight className="h-4 w-4" />}>Both Icons</Button>
      </div>
    </div>
  ),
};
