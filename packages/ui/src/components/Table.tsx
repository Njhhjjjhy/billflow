"use client";

import { createContext, useContext, forwardRef, useState, useCallback } from "react";
import { motion } from "motion/react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

// Types
export type SortDirection = "asc" | "desc" | null;

export interface SortState {
  column: string | null;
  direction: SortDirection;
}

interface TableContextValue {
  sortState: SortState;
  onSort: (column: string) => void;
}

const TableContext = createContext<TableContextValue | null>(null);

function useTableContext() {
  const context = useContext(TableContext);
  return context;
}

// Table Root
export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Caption for screen readers */
  caption?: string;
  /** Hide caption visually (still accessible) */
  captionHidden?: boolean;
  /** Enable sorting functionality */
  sortable?: boolean;
  /** Current sort state */
  sortState?: SortState;
  /** Callback when sort changes */
  onSortChange?: (state: SortState) => void;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      caption,
      captionHidden = true,
      sortable = false,
      sortState: controlledSortState,
      onSortChange,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const [internalSortState, setInternalSortState] = useState<SortState>({
      column: null,
      direction: null,
    });

    const sortState = controlledSortState ?? internalSortState;

    const handleSort = useCallback(
      (column: string) => {
        const newState: SortState = {
          column,
          direction:
            sortState.column === column
              ? sortState.direction === "asc"
                ? "desc"
                : sortState.direction === "desc"
                ? null
                : "asc"
              : "asc",
        };

        if (newState.direction === null) {
          newState.column = null;
        }

        if (onSortChange) {
          onSortChange(newState);
        } else {
          setInternalSortState(newState);
        }
      },
      [sortState, onSortChange]
    );

    const contextValue = sortable
      ? { sortState, onSort: handleSort }
      : null;

    return (
      <TableContext.Provider value={contextValue}>
        <div className="w-full overflow-x-auto">
          <table
            ref={ref}
            className={`
              w-full
              border-collapse
              border-2 border-black
              rounded-[16px]
              bg-white
              ${className}
            `.trim().replace(/\s+/g, " ")}
            {...props}
          >
            {caption && (
              <caption className={captionHidden ? "sr-only" : "text-left p-4 font-semibold"}>
                {caption}
              </caption>
            )}
            {children}
          </table>
        </div>
      </TableContext.Provider>
    );
  }
);

Table.displayName = "Table";

// Table Header
export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={`
          bg-[var(--color-bg-tertiary)]
          border-b-2 border-black
          ${className}
        `.trim().replace(/\s+/g, " ")}
        {...props}
      >
        {children}
      </thead>
    );
  }
);

TableHeader.displayName = "TableHeader";

// Table Body
export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <tbody ref={ref} className={className} {...props}>
        {children}
      </tbody>
    );
  }
);

TableBody.displayName = "TableBody";

// Table Row
export interface TableRowProps extends Omit<React.HTMLAttributes<HTMLTableRowElement>, "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag"> {
  /** Make row clickable */
  onClick?: () => void;
  /** Highlight row as selected */
  selected?: boolean;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ onClick, selected = false, className = "", children, ...props }, ref) => {
    const isInteractive = !!onClick;

    if (isInteractive) {
      return (
        <motion.tr
          ref={ref}
          whileHover={{
            backgroundColor: "var(--color-bg-secondary)",
            x: 4,
          }}
          whileTap={{ backgroundColor: "var(--color-bg-tertiary)" }}
          transition={{ duration: 0.15 }}
          onClick={onClick}
          onKeyDown={(e) => e.key === "Enter" && onClick?.()}
          tabIndex={0}
          role="button"
          className={`
            border-b border-[var(--color-border-light)]
            cursor-pointer
            outline-none
            focus-visible:bg-[var(--color-primary-50)]
            ${selected ? "bg-[var(--color-primary-50)]" : ""}
            ${className}
          `.trim().replace(/\s+/g, " ")}
          {...props}
        >
          {children}
        </motion.tr>
      );
    }

    return (
      <tr
        ref={ref}
        className={`
          border-b border-[var(--color-border-light)]
          ${selected ? "bg-[var(--color-primary-50)]" : ""}
          ${className}
        `.trim().replace(/\s+/g, " ")}
        {...props}
      >
        {children}
      </tr>
    );
  }
);

TableRow.displayName = "TableRow";

// Table Head Cell
export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Column key for sorting */
  sortKey?: string;
  /** Disable sorting for this column */
  sortable?: boolean;
}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ sortKey, sortable = true, className = "", children, ...props }, ref) => {
    const context = useTableContext();
    const isSortable = context && sortable && sortKey;
    const isSorted = context?.sortState.column === sortKey;
    const sortDirection = isSorted ? context?.sortState.direction : null;

    const handleClick = () => {
      if (isSortable && sortKey) {
        context.onSort(sortKey);
      }
    };

    const SortIcon = sortDirection === "asc"
      ? ArrowUp
      : sortDirection === "desc"
      ? ArrowDown
      : ArrowUpDown;

    return (
      <th
        ref={ref}
        scope="col"
        onClick={isSortable ? handleClick : undefined}
        onKeyDown={isSortable ? (e) => e.key === "Enter" && handleClick() : undefined}
        tabIndex={isSortable ? 0 : undefined}
        aria-sort={
          isSorted
            ? sortDirection === "asc"
              ? "ascending"
              : "descending"
            : undefined
        }
        className={`
          px-4 py-3
          text-left
          text-sm font-semibold
          text-[var(--color-text-primary)]
          ${isSortable ? "cursor-pointer select-none hover:bg-[var(--color-bg-secondary)]" : ""}
          ${className}
        `.trim().replace(/\s+/g, " ")}
        style={{ fontFamily: "var(--font-display)" }}
        {...props}
      >
        <span className="flex items-center gap-2">
          {children}
          {isSortable && (
            <SortIcon
              className={`h-4 w-4 ${isSorted ? "text-[var(--color-primary-600)]" : "text-[var(--color-text-tertiary)]"}`}
              aria-hidden="true"
            />
          )}
        </span>
      </th>
    );
  }
);

TableHead.displayName = "TableHead";

// Table Cell
export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /** Use as row header */
  isRowHeader?: boolean;
  /** Numeric/monospace content */
  numeric?: boolean;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ isRowHeader = false, numeric = false, className = "", children, ...props }, ref) => {
    const baseClasses = `
      px-4 py-3
      text-sm
      text-[var(--color-text-primary)]
      ${numeric ? "font-mono tabular-nums" : ""}
      ${className}
    `.trim().replace(/\s+/g, " ");

    if (isRowHeader) {
      return (
        <th ref={ref} scope="row" className={`${baseClasses} font-medium`} {...props}>
          {children}
        </th>
      );
    }

    return (
      <td ref={ref} className={baseClasses} {...props}>
        {children}
      </td>
    );
  }
);

TableCell.displayName = "TableCell";

// Table Footer
export interface TableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <tfoot
        ref={ref}
        className={`
          bg-[var(--color-bg-secondary)]
          border-t-2 border-black
          ${className}
        `.trim().replace(/\s+/g, " ")}
        {...props}
      >
        {children}
      </tfoot>
    );
  }
);

TableFooter.displayName = "TableFooter";

// Empty state for tables
export interface TableEmptyProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Number of columns to span */
  colSpan: number;
  /** Icon to display */
  icon?: React.ReactNode;
  /** Empty state message */
  message?: string;
  /** Action button/element */
  action?: React.ReactNode;
}

export function TableEmpty({
  colSpan,
  icon,
  message = "No data available",
  action,
  className = "",
  ...props
}: TableEmptyProps) {
  return (
    <tr {...props}>
      <td
        colSpan={colSpan}
        className={`
          px-4 py-12
          text-center
          text-[var(--color-text-secondary)]
          ${className}
        `.trim().replace(/\s+/g, " ")}
      >
        <div className="flex flex-col items-center gap-3">
          {icon && <div className="text-[var(--color-text-tertiary)]">{icon}</div>}
          <p className="text-sm">{message}</p>
          {action && <div className="mt-2">{action}</div>}
        </div>
      </td>
    </tr>
  );
}
