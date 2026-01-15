/**
 * Section Editor Types
 *
 * Common types for resume section editor components.
 */

export interface SectionEditorProps<T> {
 /** Current value */
 value: T | null;
 /** Change handler */
 onChange: (value: T) => void;
 /** Loading state */
 isLoading?: boolean;
 /** Disabled state */
 disabled?: boolean;
 /** Error message */
 error?: string;
 /** Optional className */
 className?: string;
}

export interface SectionListEditorProps<T> {
 /** Current items */
 items: T[];
 /** Add item handler */
 onAdd: (item: Omit<T, "id">) => void;
 /** Update item handler */
 onUpdate: (id: string, item: Partial<T>) => void;
 /** Delete item handler */
 onDelete: (id: string) => void;
 /** Reorder items handler */
 onReorder?: (ids: string[]) => void;
 /** Loading state */
 isLoading?: boolean;
 /** Disabled state */
 disabled?: boolean;
 /** Error message */
 error?: string;
 /** Optional className */
 className?: string;
 /** Maximum items allowed */
 maxItems?: number;
 /** Empty state message */
 emptyMessage?: string;
}

export interface WithId {
 id: string;
}

export interface DateRange {
 startDate: Date | string | null;
 endDate: Date | string | null;
 current?: boolean;
}

// ============================================================================
// Field Component (for internal use in forms)
// ============================================================================

export interface FieldProps {
 label: string;
 htmlFor: string;
 required?: boolean;
 children: React.ReactNode;
}

/**
 * Simple field wrapper for section editor forms.
 * This is a simplified version without form context dependency.
 */
export const Field = ({ label, htmlFor, required, children }: FieldProps) => (
 <div className="space-y-2">
  <label
   htmlFor={htmlFor}
   className="text-sm font-medium"
   style={{ color: "var(--text-primary)" }}
  >
   {label}
   {required && (
    <span className="ml-1" style={{ color: "var(--error)" }}>
     *
    </span>
   )}
  </label>
  {children}
 </div>
);
