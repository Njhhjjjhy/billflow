import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableFooter, TableEmpty } from './Table';
import { FileText } from 'lucide-react';
import { Button } from './Button';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Neo-brutalist data table with sorting, keyboard navigation, and accessibility features. Uses composition pattern.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    sortable: {
      control: 'boolean',
      description: 'Enable column sorting',
    },
    caption: {
      control: 'text',
      description: 'Table caption for accessibility',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

const invoices = [
  { id: 'INV-001', client: 'Chen Design', amount: 'NT$15,000', status: 'Paid', date: '2024/01/15' },
  { id: 'INV-002', client: 'Taiwan Tech', amount: 'NT$28,000', status: 'Pending', date: '2024/01/20' },
  { id: 'INV-003', client: 'Taipei Foods', amount: 'NT$9,500', status: 'Overdue', date: '2024/01/05' },
  { id: 'INV-004', client: 'Ocean Imports', amount: 'NT$42,000', status: 'Paid', date: '2024/01/18' },
];

export const Playground: Story = {
  render: () => (
    <Table caption="Recent Invoices">
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell isRowHeader>{invoice.id}</TableCell>
            <TableCell>{invoice.client}</TableCell>
            <TableCell numeric>{invoice.amount}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 text-xs rounded border ${
                invoice.status === 'Paid' ? 'bg-green-100 text-green-700 border-green-500' :
                invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-500' :
                'bg-red-100 text-red-700 border-red-500'
              }`}>
                {invoice.status}
              </span>
            </TableCell>
            <TableCell>{invoice.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Sortable: Story = {
  render: () => (
    <Table caption="Sortable Invoices" sortable>
      <TableHeader>
        <TableRow>
          <TableHead sortKey="id">Invoice</TableHead>
          <TableHead sortKey="client">Client</TableHead>
          <TableHead sortKey="amount">Amount</TableHead>
          <TableHead sortKey="status">Status</TableHead>
          <TableHead sortKey="date">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell isRowHeader>{invoice.id}</TableCell>
            <TableCell>{invoice.client}</TableCell>
            <TableCell numeric>{invoice.amount}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>{invoice.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const ClickableRows: Story = {
  render: () => (
    <Table caption="Clickable Invoices">
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id} onClick={() => alert(`Clicked ${invoice.id}`)}>
            <TableCell isRowHeader>{invoice.id}</TableCell>
            <TableCell>{invoice.client}</TableCell>
            <TableCell numeric>{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Table caption="Invoice Summary">
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell isRowHeader>{invoice.id}</TableCell>
            <TableCell>{invoice.client}</TableCell>
            <TableCell numeric>{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2} className="font-semibold">Total</TableCell>
          <TableCell numeric className="font-semibold">NT$94,500</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <Table caption="Empty Table">
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableEmpty
          colSpan={3}
          icon={<FileText className="h-8 w-8" />}
          message="No invoices found"
          action={<Button size="sm">Create Invoice</Button>}
        />
      </TableBody>
    </Table>
  ),
};
