"use client";

import {
  useEffect,
  useRef,
  useCallback,
  useId,
  createContext,
  useContext,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { modalOverlayVariants, modalContentVariants } from "@/lib/motion";
import { Button } from "./Button";

// Modal context for nested components
interface ModalContextValue {
  titleId: string;
  descriptionId: string;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal components must be used within a Modal");
  }
  return context;
}

// Focus trap hook
function useFocusTrap(isOpen: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Store the previously focused element
    const previouslyFocused = document.activeElement as HTMLElement;

    // Focus the first focusable element
    firstElement?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Tab") return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    }

    container.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  return containerRef;
}

// Scroll lock hook
function useScrollLock(isOpen: boolean) {
  useEffect(() => {
    if (!isOpen) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);
}

// Modal sizes
export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-4xl",
};

// Main Modal component
export interface ModalProps {
  /** Controls visibility */
  isOpen: boolean;
  /** Called when modal should close */
  onClose: () => void;
  /** Modal size */
  size?: ModalSize;
  /** Close on overlay click */
  closeOnOverlayClick?: boolean;
  /** Close on Escape key */
  closeOnEscape?: boolean;
  /** Show close button */
  showCloseButton?: boolean;
  /** Children */
  children: React.ReactNode;
  /** Custom class name for content */
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  size = "md",
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  children,
  className = "",
}: ModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const containerRef = useFocusTrap(isOpen);
  useScrollLock(isOpen);

  // Handle escape key
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === "Escape") {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  // Don't render on server
  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <ModalContext.Provider value={{ titleId, descriptionId, onClose }}>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              variants={modalOverlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={closeOnOverlayClick ? onClose : undefined}
              className="absolute inset-0 bg-black/50"
              aria-hidden="true"
            />

            {/* Modal content */}
            <motion.div
              ref={containerRef}
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              className={`
                relative
                w-full ${sizeClasses[size]}
                bg-white
                border-2 border-black
                rounded-[16px]
                shadow-[8px_8px_0_0_#000000]
                max-h-[90vh]
                overflow-y-auto
                ${className}
              `.trim().replace(/\s+/g, " ")}
            >
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="
                    absolute top-4 right-4
                    p-1
                    rounded-[8px]
                    text-[var(--color-text-secondary)]
                    hover:text-[var(--color-text-primary)]
                    hover:bg-[var(--color-bg-tertiary)]
                    transition-colors
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[var(--color-primary-600)]
                  "
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              )}
              {children}
            </motion.div>
          </div>
        </ModalContext.Provider>
      )}
    </AnimatePresence>,
    document.body
  );
}

// Modal Header
export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Title text */
  title: string;
  /** Description text */
  description?: string;
}

export function ModalHeader({
  title,
  description,
  className = "",
  ...props
}: ModalHeaderProps) {
  const { titleId, descriptionId } = useModalContext();

  return (
    <div className={`px-6 pt-6 pb-4 ${className}`} {...props}>
      <h2
        id={titleId}
        className="text-xl font-semibold text-[var(--color-text-primary)] pr-8"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      {description && (
        <p
          id={descriptionId}
          className="mt-2 text-sm text-[var(--color-text-secondary)]"
        >
          {description}
        </p>
      )}
    </div>
  );
}

// Modal Body
export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ModalBody({ className = "", children, ...props }: ModalBodyProps) {
  return (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

// Modal Footer
export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ModalFooter({ className = "", children, ...props }: ModalFooterProps) {
  return (
    <div
      className={`
        flex items-center justify-end gap-3
        px-6 py-4
        border-t border-[var(--color-border-light)]
        ${className}
      `.trim().replace(/\s+/g, " ")}
      {...props}
    >
      {children}
    </div>
  );
}

// Confirmation Modal - convenience component
export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "primary";
  isLoading?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "primary",
  isLoading = false,
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalHeader title={title} description={description} />
      <ModalFooter>
        <Button variant="secondary" onClick={onClose} disabled={isLoading}>
          {cancelText}
        </Button>
        <Button
          variant={variant === "danger" ? "danger" : "primary"}
          onClick={onConfirm}
          isLoading={isLoading}
        >
          {confirmText}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
