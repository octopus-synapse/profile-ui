import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { cva, type ExtractVariantProps } from "../../utils/cva";

const buttonVariants = cva(
 "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50 select-none",
 {
  variants: {
   variant: {
    // Primary - High emphasis, main actions
    primary:
     "bg-[var(--accent)] text-[var(--accent-foreground)] shadow-sm hover:opacity-90 active:scale-[0.98]",
    // Secondary - Medium emphasis
    secondary:
     "bg-[var(--surface-1)] text-[var(--text-primary)] border border-[var(--border)] hover:bg-[var(--surface-2)] active:scale-[0.98]",
    // Outline - Low emphasis, secondary actions
    outline:
     "border border-[var(--border)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--surface-1)] active:scale-[0.98]",
    // Ghost - Minimal emphasis
    ghost:
     "text-[var(--text-secondary)] hover:bg-[var(--surface-1)] hover:text-[var(--text-primary)]",
    // Link - Text-like button
    link:
     "text-[var(--text-primary)] underline-offset-4 hover:underline p-0 h-auto",
    // Danger/Destructive - Destructive actions
    danger:
     "bg-[var(--error)] text-[var(--text-inverse)] hover:opacity-90 active:scale-[0.98]",
    destructive:
     "bg-[var(--error)] text-[var(--text-inverse)] hover:opacity-90 active:scale-[0.98]",
    // Success - Positive actions
    success:
     "bg-[var(--success)] text-[var(--text-inverse)] hover:opacity-90 active:scale-[0.98]",
   },
   size: {
    xs: "h-7 px-2.5 text-xs rounded-md",
    sm: "h-8 px-3 text-sm rounded-md",
    md: "h-10 px-4 text-sm rounded-lg",
    lg: "h-11 px-5 text-base rounded-lg",
    xl: "h-12 px-6 text-base rounded-xl",
    icon: "h-10 w-10 rounded-lg",
    iconSm: "h-8 w-8 rounded-md",
    iconXs: "h-7 w-7 rounded-md",
    iconLg: "h-12 w-12 rounded-lg",
   },
   fullWidth: {
    true: "w-full",
    false: "",
   },
  },
  defaultVariants: {
   variant: "primary",
   size: "md",
   fullWidth: false,
  },
 }
);

export interface ButtonProps
 extends ButtonHTMLAttributes<HTMLButtonElement>,
  ExtractVariantProps<typeof buttonVariants> {
 /**
  * Loading state - shows spinner and disables button
  * Supports both 'loading' and 'isLoading' for compatibility
  */
 loading?: boolean;
 isLoading?: boolean;

 /**
  * Left icon/element
  */
 leftIcon?: React.ReactNode;

 /**
  * Right icon/element
  */
 rightIcon?: React.ReactNode;
}

/**
 * Button - Primary interactive element
 * Universal design for all tech professionals
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
 (
  {
   className,
   variant,
   size,
   fullWidth,
   loading,
   isLoading,
   leftIcon,
   rightIcon,
   disabled,
   children,
   ...props
  },
  ref
 ) => {
  const isLoadingState = loading || isLoading;

  return (
   <button
    ref={ref}
    className={cn(buttonVariants({ variant, size, fullWidth }), className)}
    disabled={disabled || isLoadingState}
    aria-busy={isLoadingState}
    {...props}
   >
    {isLoadingState ? (
     <svg
      className="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
     >
      <circle
       className="opacity-25"
       cx="12"
       cy="12"
       r="10"
       stroke="currentColor"
       strokeWidth="4"
      />
      <path
       className="opacity-75"
       fill="currentColor"
       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
     </svg>
    ) : leftIcon ? (
     <span className="inline-flex shrink-0" aria-hidden="true">
      {leftIcon}
     </span>
    ) : null}
    <span className={cn(isLoadingState && "opacity-0")}>{children}</span>
    {rightIcon && !isLoadingState && (
     <span className="inline-flex shrink-0" aria-hidden="true">
      {rightIcon}
     </span>
    )}
   </button>
  );
 }
);

Button.displayName = "Button";
