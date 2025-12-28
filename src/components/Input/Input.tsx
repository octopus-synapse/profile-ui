import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { cva, type ExtractVariantProps } from "../../utils/cva";
import type { Variant } from "../../types";

const inputVariants = cva(
 "flex w-full rounded-md border bg-[var(--input)] text-[var(--foreground)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:cursor-not-allowed disabled:opacity-50",
 {
  variants: {
   inputSize: {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-4 text-base",
   },
   state: {
    default: "border-[var(--border)]",
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
  * Tech area variant for focus ring color
  */
 variant?: Variant;

 /**
  * Left addon element
  */
 leftAddon?: React.ReactNode;

 /**
  * Right addon element
  */
 rightAddon?: React.ReactNode;

 /**
  * Error message
  */
 error?: string;

 /**
  * Helper text
  */
 helperText?: string;
}

/**
 * Input - Text input component
 * Clean B&W input with variant accent on focus
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
 (
  {
   className,
   inputSize,
   state,
   variant,
   leftAddon,
   rightAddon,
   error,
   helperText,
   type = "text",
   ...props
  },
  ref
 ) => {
  const hasError = !!error || state === "error";

  return (
   <div className="w-full">
    <div className="relative flex items-center">
     {leftAddon && (
      <div className="absolute left-3 flex items-center text-[var(--muted-foreground)]">
       {leftAddon}
      </div>
     )}
     <input
      ref={ref}
      type={type}
      className={cn(
       inputVariants({ inputSize, state: hasError ? "error" : state }),
       leftAddon && "pl-10",
       rightAddon && "pr-10",
       className
      )}
      data-variant={variant}
      {...props}
     />
     {rightAddon && (
      <div className="absolute right-3 flex items-center text-[var(--muted-foreground)]">
       {rightAddon}
      </div>
     )}
    </div>
    {(error || helperText) && (
     <p
      className={cn(
       "mt-1.5 text-sm",
       error ? "text-[var(--error)]" : "text-[var(--muted-foreground)]"
      )}
     >
      {error || helperText}
     </p>
    )}
   </div>
  );
 }
);

Input.displayName = "Input";
