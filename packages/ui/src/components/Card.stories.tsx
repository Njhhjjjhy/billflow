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
    children: 'This is a basic card with default styling. Toggle interactive mode to see hover effects.',
    interactive: false,
    noPadding: false,
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Playground: Story = {};
