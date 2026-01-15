"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { cva, type ExtractVariantProps } from "../../utils/cva";

// ============================================================================
// Checkbox Variants
// ============================================================================

const checkboxVariants = cva(
 "peer h-4 w-4 shrink-0 rounded border border-[var(--border)] bg-[var(--surface-1)] ring-offset-[var(--surface-0)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
 {
  variants: {
   variant: {
    default:
     "data-[state=checked]:bg-[var(--primary)] data-[state=checked]:border-[var(--primary)] data-[state=checked]:text-[var(--primary-foreground)]",
    error:
     "border-[var(--error)] data-[state=checked]:bg-[var(--error)] data-[state=checked]:border-[var(--error)]",
   },
  },
  defaultVariants: {
   variant: "default",
  },
 }
);

// ============================================================================
// Checkbox
// ============================================================================

export interface CheckboxProps
 extends Omit<InputHTMLAttributes<HTMLInputElement>, "type">,
  ExtractVariantProps<typeof checkboxVariants> {
 onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
 (
  { className, variant, checked, onCheckedChange, onChange, ...props },
  ref
 ) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   onChange?.(e);
   onCheckedChange?.(e.target.checked);
  };

  return (
   <input
    ref={ref}
    type="checkbox"
    checked={checked}
    onChange={handleChange}
    data-state={checked ? "checked" : "unchecked"}
    className={cn(checkboxVariants({ variant }), className)}
    {...props}
   />
  );
 }
);
Checkbox.displayName = "Checkbox";

// ============================================================================
// Checkbox with Label
// ============================================================================

export interface CheckboxWithLabelProps extends CheckboxProps {
 label: React.ReactNode;
 description?: React.ReactNode;
 error?: string;
}

export const CheckboxWithLabel = forwardRef<
 HTMLInputElement,
 CheckboxWithLabelProps
>(({ className, label, description, error, id, ...props }, ref) => {
 const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

 return (
  <div className={cn("flex items-start gap-3", className)}>
   <Checkbox
    ref={ref}
    id={checkboxId}
    variant={error ? "error" : "default"}
    {...props}
   />
   <div className="grid gap-1 leading-none">
    <label
     htmlFor={checkboxId}
     className={cn(
      "text-sm font-medium text-[var(--text-primary)] cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      error && "text-[var(--error)]"
     )}
    >
     {label}
    </label>
    {description && (
     <p className="text-xs text-[var(--text-tertiary)]">{description}</p>
    )}
    {error && (
     <p className="text-xs text-[var(--error)]" role="alert">
      {error}
     </p>
    )}
   </div>
  </div>
 );
});
CheckboxWithLabel.displayName = "CheckboxWithLabel";
