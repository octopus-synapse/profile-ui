import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { cva, type ExtractVariantProps } from "../../utils/cva";

const inputVariants = cva(
 "flex w-full rounded-lg border bg-[var(--surface-elevated,var(--input))] text-[var(--text-primary,var(--foreground))] transition-all duration-150 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--text-tertiary,var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus,var(--accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--surface-1,var(--muted))]",
 {
  variants: {
   inputSize: {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-3.5 text-sm",
    lg: "h-12 px-4 text-base",
   },
   state: {
    default:
     "border-[var(--border)] hover:border-[var(--border-emphasis,var(--border))]",
    error: "border-[var(--error)] focus-visible:ring-[var(--error)]",
    success: "border-[var(--success)] focus-visible:ring-[var(--success)]",
   },
  },
  defaultVariants: {
   inputSize: "md",
   state: "default",
  },
 }
);

export interface InputProps
 extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
  ExtractVariantProps<typeof inputVariants> {
 /**
  * Left addon element (icon, text, etc.)
  */
 leftAddon?: React.ReactNode;

 /**
  * Right addon element (icon, button, etc.)
  */
 rightAddon?: React.ReactNode;

 /**
  * Error state or message
  * - boolean: just shows error styling
  * - string: shows error styling + message below input
  */
 error?: boolean | string;

 /**
  * Helper text shown below input
  */
 helperText?: string;
}

/**
 * Input - Text input component
 * Universal design with clear states and accessibility
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
 (
  {
   className,
   inputSize,
   state,
   leftAddon,
   rightAddon,
   error,
   helperText,
   type = "text",
   id,
   ...props
  },
  ref
 ) => {
  const hasError = !!error || state === "error";
  const errorMessage = typeof error === "string" ? error : undefined;
  const helperId = id ? `${id}-helper` : undefined;

  return (
   <div className="w-full">
    <div className="relative flex items-center">
     {leftAddon && (
      <div className="absolute left-3 flex items-center text-[var(--text-tertiary,var(--muted-foreground))] pointer-events-none">
       {leftAddon}
      </div>
     )}
     <input
      ref={ref}
      id={id}
      type={type}
      className={cn(
       inputVariants({ inputSize, state: hasError ? "error" : state }),
       leftAddon && "pl-10",
       rightAddon && "pr-10",
       className
      )}
      aria-invalid={hasError}
      aria-describedby={errorMessage || helperText ? helperId : undefined}
      {...props}
     />
     {rightAddon && (
      <div className="absolute right-3 flex items-center text-[var(--text-tertiary,var(--muted-foreground))]">
       {rightAddon}
      </div>
     )}
    </div>
    {(errorMessage || helperText) && (
     <p
      id={helperId}
      className={cn(
       "mt-1.5 text-sm",
       errorMessage
        ? "text-[var(--error)]"
        : "text-[var(--text-secondary,var(--muted-foreground))]"
      )}
      role={errorMessage ? "alert" : undefined}
     >
      {errorMessage || helperText}
     </p>
    )}
   </div>
  );
 }
);

Input.displayName = "Input";
