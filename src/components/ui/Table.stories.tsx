import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';

const meta: Meta<typeof Table> = { title: 'Components/Table', component: Table };
export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = { args: { columns: ['Invoice', 'Client', 'Amount', 'Status'], rows: [['INV-001', 'Chen Design', 'NT$15,000', 'Paid'], ['INV-002', 'Taiwan Tech', 'NT$28,000', 'Pending']] } };
