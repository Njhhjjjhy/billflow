import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { ToastProvider, useToast } from './Toast';

// Demo component that triggers toasts
const ToastDemo = ({ type, message, description }: { type: 'success' | 'error' | 'warning' | 'info'; message: string; description?: string }) => {
  const toast = useToast();

  useEffect(() => {
    // Add toast on mount based on type
    toast[type](message, { description, duration: 10000 });
  }, [toast, type, message, description]);

  return (
    <div className="p-8">
      <p className="text-slate-500">Toast notification displayed in the corner.</p>
    </div>
  );
};

// Wrapper component with ToastProvider
const ToastStory = (props: { type: 'success' | 'error' | 'warning' | 'info'; message: string; description?: string }) => (
  <ToastProvider position="top-right">
    <ToastDemo {...props} />
  </ToastProvider>
);

const meta: Meta<typeof ToastStory> = {
  title: 'Components/Toast',
  component: ToastStory,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Toast notifications for displaying brief messages. Supports success, error, warning, and info types with automatic dismissal.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
      description: 'Type of toast notification',
    },
    message: {
      control: 'text',
      description: 'Main message text',
    },
    description: {
      control: 'text',
      description: 'Optional description text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToastStory>;

export const Success: Story = {
  args: {
    type: 'success',
    message: 'Invoice sent successfully!',
    description: 'The client will receive an email notification.',
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    message: 'Failed to send invoice',
    description: 'Please check your connection and try again.',
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    message: 'Invoice is overdue',
    description: 'Payment was due 5 days ago.',
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    message: 'New client added',
    description: 'You can now create invoices for this client.',
  },
};
