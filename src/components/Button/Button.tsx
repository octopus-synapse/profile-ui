import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { cva, type ExtractVariantProps } from "../../utils/cva";
import type { Variant } from "../../types";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90",
        secondary:
          "bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--muted)]/80",
        outline:
          "border border-[var(--border)] bg-transparent hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
        ghost: "hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
        link: "text-[var(--accent)] underline-offset-4 hover:underline",
        danger: "bg-[var(--error)] text-white hover:bg-[var(--error)]/90",
        destructive: "bg-[var(--error)] text-white hover:bg-[var(--error)]/90",
      },
      size: {
        xs: "h-7 px-2 text-xs rounded",
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-11 px-6 text-base",
        xl: "h-12 px-8 text-lg",
        icon: "h-10 w-10",
        iconSm: "h-8 w-8",
        iconLg: "h-12 w-12",
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

// Tech area variant-specific accent color overrides
const techVariantClasses: Record<Variant, string> = {
  dev: "",
  product:
    "data-[tech-variant=product]:bg-blue-500 data-[tech-variant=product]:hover:bg-blue-600",
  design:
    "data-[tech-variant=design]:bg-purple-500 data-[tech-variant=design]:hover:bg-purple-600",
  data:
    "data-[tech-variant=data]:bg-green-500 data-[tech-variant=data]:hover:bg-green-600",
  devops:
    "data-[tech-variant=devops]:bg-orange-500 data-[tech-variant=devops]:hover:bg-orange-600",
};

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ExtractVariantProps<typeof buttonVariants> {
  /**
   * Tech area variant for accent color (dev, product, design, data, devops)
   */
  techVariant?: Variant;

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
 * Supports all tech area variants with consistent B&W + accent styling
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      techVariant,
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
        className={cn(
          buttonVariants({ variant, size, fullWidth }),
          techVariant && techVariantClasses[techVariant],
          className
        )}
        disabled={disabled || isLoadingState}
        data-tech-variant={techVariant}
        {...props}
      >
        {isLoadingState ? (
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
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
          <span className="inline-flex shrink-0">{leftIcon}</span>
        ) : null}
        {children}
        {rightIcon && !isLoadingState && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
