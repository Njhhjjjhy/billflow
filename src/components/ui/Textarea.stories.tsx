import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = { title: 'Components/Textarea', component: Textarea };
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = { args: { label: 'Notes', placeholder: 'Add notes to this invoice...' } };
export const WithHelper: Story = { args: { label: 'Description', placeholder: 'Describe the work...', helperText: 'This will appear on the invoice' } };
