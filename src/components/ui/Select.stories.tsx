import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Client',
    placeholder: 'Select a client',
    options: [
      { value: '1', label: 'Chen Design Co.' },
      { value: '2', label: 'Taiwan Tech Inc.' },
      { value: '3', label: 'Acme Corp' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Playground: Story = {};
