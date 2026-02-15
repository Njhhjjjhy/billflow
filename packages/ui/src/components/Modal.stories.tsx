import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, ConfirmModal } from './Modal';
import { Button } from './Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Neo-brutalist modal with focus trap, scroll lock, and keyboard accessibility. Uses composition pattern with ModalHeader, ModalBody, and ModalFooter.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Modal size',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Close modal when clicking overlay',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close modal when pressing Escape',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show close button in corner',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Interactive demo with toggle
const ModalDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader title="Create Invoice" description="Fill in the details below" />
        <ModalBody>
          <p className="text-slate-600">Modal content goes here. This modal uses composition with ModalHeader, ModalBody, and ModalFooter components.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => setIsOpen(false)}>Save</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export const Playground: Story = {
  render: () => <ModalDemo />,
};

// Confirmation modal demo
const ConfirmDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button variant="danger" onClick={() => setIsOpen(true)}>Delete Item</Button>
      <ConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
        title="Delete Invoice?"
        description="This action cannot be undone. The invoice will be permanently deleted."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </>
  );
};

export const Confirmation: Story = {
  render: () => <ConfirmDemo />,
};
