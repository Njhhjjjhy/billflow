import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = { title: 'Components/Modal', component: Modal };
export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = { args: { isOpen: true, title: 'Create Invoice', children: 'Modal content here' } };
