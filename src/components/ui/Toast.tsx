"use client";

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useId,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";
import { toastVariants } from "@/lib/motion";

// Types
export type ToastType = "success" | "error" | "warning" | "info";
export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

// Hook to use toast
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  const { addToast, removeToast, clearToasts } = context;

  return {
    toast: (message: string, options?: Partial<Omit<Toast, "id" | "message">>) =>
      addToast({ message, type: "info", ...options }),
    success: (message: string, options?: Partial<Omit<Toast, "id" | "message" | "type">>) =>
      addToast({ message, type: "success", ...options }),
    error: (message: string, options?: Partial<Omit<Toast, "id" | "message" | "type">>) =>
      addToast({ message, type: "error", ...options }),
    warning: (message: string, options?: Partial<Omit<Toast, "id" | "message" | "type">>) =>
      addToast({ message, type: "warning", ...options }),
    info: (message: string, options?: Partial<Omit<Toast, "id" | "message" | "type">>) =>
      addToast({ message, type: "info", ...options }),
    dismiss: removeToast,
    dismissAll: clearToasts,
  };
}

// Toast Provider
export interface ToastProviderProps {
  children: React.ReactNode;
  /** Position of toast container */
  position?: ToastPosition;
  /** Default duration in ms (0 for no auto-dismiss) */
  defaultDuration?: number;
  /** Maximum number of visible toasts */
  maxToasts?: number;
}

const positionClasses: Record<ToastPosition, string> = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
};

export function ToastProvider({
  children,
  position = "bottom-right",
  defaultDuration = 5000,
  maxToasts = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: Toast = {
        id,
        duration: defaultDuration,
        ...toast,
      };

      setToasts((prev) => {
        const updated = [...prev, newToast];
        // Keep only maxToasts
        return updated.slice(-maxToasts);
      });

      // Auto-dismiss
      if (newToast.duration && newToast.duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, newToast.duration);
      }

      return id;
    },
    [defaultDuration, maxToasts]
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
      {children}
      {typeof window !== "undefined" &&
        createPortal(
          <div
            className={`
              fixed z-50
              flex flex-col gap-3
              pointer-events-none
              ${positionClasses[position]}
            `.trim().replace(/\s+/g, " ")}
            aria-live="polite"
            aria-label="Notifications"
          >
            <AnimatePresence mode="sync">
              {toasts.map((toast) => (
                <ToastItem
                  key={toast.id}
                  toast={toast}
                  onDismiss={() => removeToast(toast.id)}
                />
              ))}
            </AnimatePresence>
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
}

// Toast Item
interface ToastItemProps {
  toast: Toast;
  onDismiss: () => void;
}

const typeConfig: Record<
  ToastType,
  {
    icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
    bg: string;
    border: string;
    iconColor: string;
  }
> = {
  success: {
    icon: CheckCircle,
    bg: "bg-[var(--color-success-bg)]",
    border: "border-[var(--color-success-border)]",
    iconColor: "text-[var(--color-success-border)]",
  },
  error: {
    icon: AlertCircle,
    bg: "bg-[var(--color-error-bg)]",
    border: "border-[var(--color-error-border)]",
    iconColor: "text-[var(--color-error-border)]",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-[var(--color-warning-bg)]",
    border: "border-[var(--color-warning-border)]",
    iconColor: "text-[var(--color-warning-border)]",
  },
  info: {
    icon: Info,
    bg: "bg-[var(--color-info-bg)]",
    border: "border-[var(--color-info-border)]",
    iconColor: "text-[var(--color-info-border)]",
  },
};

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const config = typeConfig[toast.type];
  const Icon = config.icon;
  const labelId = useId();

  return (
    <motion.div
      layout
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      role={toast.type === "error" ? "alert" : "status"}
      aria-labelledby={labelId}
      className={`
        pointer-events-auto
        flex items-start gap-3
        w-80
        p-4
        ${config.bg}
        border-2 ${config.border}
        rounded-[12px]
        shadow-[4px_4px_0_0_#000000]
      `.trim().replace(/\s+/g, " ")}
    >
      <Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${config.iconColor}`} aria-hidden={true} />

      <div className="flex-1 min-w-0">
        <p
          id={labelId}
          className="text-sm font-medium text-[var(--color-text-primary)]"
        >
          {toast.message}
        </p>
        {toast.description && (
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {toast.description}
          </p>
        )}
      </div>

      <button
        onClick={onDismiss}
        className="
          flex-shrink-0
          p-1
          rounded-[6px]
          text-[var(--color-text-secondary)]
          hover:text-[var(--color-text-primary)]
          hover:bg-black/5
          transition-colors
        "
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </motion.div>
  );
}

// Standalone toast function for use outside React
let toastFn: ReturnType<typeof useToast> | null = null;

export function setToastHandler(handler: ReturnType<typeof useToast>) {
  toastFn = handler;
}

export const toast = {
  success: (message: string, options?: Partial<Omit<Toast, "id" | "message" | "type">>) =>
    toastFn?.success(message, options),
  error: (message: string, options?: Partial<Omit<Toast, "id" | "message" | "type">>) =>
    toastFn?.error(message, options),
  warning: (message: string, options?: Partial<Omit<Toast, "id" | "message" | "type">>) =>
    toastFn?.warning(message, options),
  info: (message: string, options?: Partial<Omit<Toast, "id" | "message" | "type">>) =>
    toastFn?.info(message, options),
  dismiss: (id: string) => toastFn?.dismiss(id),
  dismissAll: () => toastFn?.dismissAll(),
};
