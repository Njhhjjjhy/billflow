import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = { title: 'Components/Select', component: Select };
export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = { args: { label: 'Client', placeholder: 'Select a client', options: [{ value: '1', label: 'Chen Design Co.' }, { value: '2', label: 'Taiwan Tech Inc.' }] } };
