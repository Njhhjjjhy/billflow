"use client";

import {
  useState,
  useRef,
  useId,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Check, Search, Plus, User } from "lucide-react";
import { spring, dropdownVariants } from "@/lib/motion";
import type { Client } from "@/types";

export interface ClientSelectorProps {
  clients: Client[];
  value?: string;
  onChange?: (clientId: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  onAddNew?: () => void;
  className?: string;
  id?: string;
}

export function ClientSelector({
  clients,
  value,
  onChange,
  placeholder = "Select a client",
  label,
  error,
  helperText,
  disabled = false,
  required = false,
  onAddNew,
  className = "",
  id: providedId,
}: ClientSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const generatedId = useId();
  const id = providedId || generatedId;
  const listboxId = `${id}-listbox`;
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;
  const searchId = `${id}-search`;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Find selected client
  const selectedClient = clients.find((c) => c.id === value);

  // Filter clients by search query
  const filteredClients = useMemo(() => {
    if (!searchQuery.trim()) return clients;

    const query = searchQuery.toLowerCase();
    return clients.filter(
      (client) =>
        client.display_name.toLowerCase().includes(query) ||
        client.company_name?.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query)
    );
  }, [clients, searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        listboxRef.current &&
        !listboxRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
        setSearchQuery("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (disabled) return;

      switch (event.key) {
        case "Enter":
          event.preventDefault();
          if (isOpen && focusedIndex >= 0 && focusedIndex < filteredClients.length) {
            const focusedClient = filteredClients[focusedIndex];
            if (focusedClient) {
              onChange?.(focusedClient.id);
              setIsOpen(false);
              setSearchQuery("");
              triggerRef.current?.focus();
            }
          } else if (!isOpen) {
            setIsOpen(true);
          }
          break;

        case "ArrowDown":
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setFocusedIndex(0);
          } else {
            setFocusedIndex((prev) =>
              prev < filteredClients.length - 1 ? prev + 1 : 0
            );
          }
          break;

        case "ArrowUp":
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setFocusedIndex(filteredClients.length - 1);
          } else {
            setFocusedIndex((prev) =>
              prev > 0 ? prev - 1 : filteredClients.length - 1
            );
          }
          break;

        case "Escape":
          event.preventDefault();
          setIsOpen(false);
          setSearchQuery("");
          triggerRef.current?.focus();
          break;

        case "Tab":
          setIsOpen(false);
          setSearchQuery("");
          break;
      }
    },
    [disabled, isOpen, focusedIndex, filteredClients, onChange]
  );

  const handleToggle = () => {
    if (disabled) return;
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    setFocusedIndex(newIsOpen ? 0 : -1);
  };

  const handleSelect = (clientId: string) => {
    onChange?.(clientId);
    setIsOpen(false);
    setFocusedIndex(-1);
    setSearchQuery("");
    triggerRef.current?.focus();
  };

  const handleAddNew = () => {
    setIsOpen(false);
    setFocusedIndex(-1);
    setSearchQuery("");
    onAddNew?.();
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-[var(--color-text-primary)] mb-2"
        >
          {label}
          {required && (
            <>
              <span className="text-[var(--color-error-border)] ml-1" aria-hidden="true">
                *
              </span>
              <span className="sr-only">(required)</span>
            </>
          )}
        </label>
      )}

      <div className="relative">
        {/* Trigger button */}
        <motion.button
          ref={triggerRef}
          type="button"
          id={id}
          disabled={disabled}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          aria-required={required}
          animate={{
            boxShadow: isOpen
              ? "4px 4px 0 0 #2563EB"
              : error
              ? "4px 4px 0 0 #DC2626"
              : "0 0 0 0 transparent",
            borderColor: isOpen ? "#2563EB" : error ? "#DC2626" : "#000000",
          }}
          transition={spring.snappy}
          className={`
            w-full h-11
            flex items-center justify-between
            bg-white
            border-2
            rounded-[12px]
            px-3
            text-left
            outline-none
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            focus-visible:ring-2 focus-visible:ring-[var(--color-primary-600)] focus-visible:ring-offset-2
          `.trim().replace(/\s+/g, " ")}
        >
          {selectedClient ? (
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[var(--color-bg-tertiary)] border-2 border-black flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-[var(--color-text-secondary)]" />
              </div>
              <div className="min-w-0">
                <div className="text-[15px] font-medium text-[var(--color-text-primary)] truncate">
                  {selectedClient.display_name}
                </div>
                {selectedClient.company_name && (
                  <div className="text-xs text-[var(--color-text-tertiary)] truncate">
                    {selectedClient.company_name}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <span className="text-[var(--color-text-tertiary)]">
              {placeholder}
            </span>
          )}
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown
              className="h-5 w-5 text-[var(--color-text-secondary)] flex-shrink-0"
              aria-hidden="true"
            />
          </motion.span>
        </motion.button>

        {/* Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={listboxRef}
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`
                absolute z-20
                w-full mt-2
                bg-white
                border-2 border-black
                rounded-[12px]
                shadow-[4px_4px_0_0_#000000]
                overflow-hidden
              `.trim().replace(/\s+/g, " ")}
            >
              {/* Search input */}
              <div className="p-2 border-b-2 border-[var(--color-border-light)]">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-tertiary)]"
                    aria-hidden="true"
                  />
                  <input
                    ref={searchInputRef}
                    type="text"
                    id={searchId}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search clients..."
                    className="w-full h-9 pl-9 pr-3 text-sm bg-[var(--color-bg-secondary)] border-2 border-transparent rounded-lg outline-none focus:border-[var(--color-primary-600)] transition-colors"
                    aria-label="Search clients"
                  />
                </div>
              </div>

              {/* Client list */}
              <ul
                id={listboxId}
                role="listbox"
                aria-labelledby={id}
                className="max-h-60 overflow-auto py-1"
              >
                {filteredClients.length === 0 ? (
                  <li className="px-3 py-4 text-center text-sm text-[var(--color-text-tertiary)]">
                    {searchQuery ? "No clients found" : "No clients yet"}
                  </li>
                ) : (
                  filteredClients.map((client, index) => {
                    const isSelected = client.id === value;
                    const isFocused = index === focusedIndex;

                    return (
                      <li
                        key={client.id}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelect(client.id)}
                        className={`
                          flex items-center justify-between gap-3
                          px-3 py-2
                          cursor-pointer
                          ${isFocused ? "bg-[var(--color-bg-tertiary)]" : ""}
                          ${!isFocused ? "hover:bg-[var(--color-bg-secondary)]" : ""}
                        `.trim().replace(/\s+/g, " ")}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-[var(--color-bg-tertiary)] border-2 border-black flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-[var(--color-text-secondary)]" />
                          </div>
                          <div className="min-w-0">
                            <div
                              className={`text-[15px] truncate ${
                                isSelected
                                  ? "font-medium text-[var(--color-primary-600)]"
                                  : "text-[var(--color-text-primary)]"
                              }`}
                            >
                              {client.display_name}
                            </div>
                            <div className="text-xs text-[var(--color-text-tertiary)] truncate">
                              {client.company_name || client.email}
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <Check
                            className="h-4 w-4 text-[var(--color-primary-600)] flex-shrink-0"
                            aria-hidden="true"
                          />
                        )}
                      </li>
                    );
                  })
                )}
              </ul>

              {/* Add new client button */}
              {onAddNew && (
                <div className="border-t-2 border-[var(--color-border-light)] p-2">
                  <button
                    type="button"
                    onClick={handleAddNew}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--color-primary-600)] rounded-lg hover:bg-[var(--color-bg-secondary)] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add new client
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-sm text-[var(--color-error-text)] mt-2"
        >
          {error}
        </p>
      )}

      {helperText && !error && (
        <p
          id={helperId}
          className="text-sm text-[var(--color-text-tertiary)] mt-2"
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
