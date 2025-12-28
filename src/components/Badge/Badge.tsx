import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { cva, type ExtractVariantProps } from "../../utils/cva";

const badgeVariants = cva(
 "inline-flex items-center font-medium transition-all duration-150",
 {
  variants: {
   variant: {
    // Neutral
    default:
     "bg-[var(--surface-1,var(--muted))] text-[var(--text-primary,var(--foreground))]",
    secondary:
     "bg-[var(--surface-2,var(--muted))] text-[var(--text-secondary)]",
    // Emphasis
    primary: "bg-[var(--accent)] text-[var(--accent-foreground)]",
    // Outline styles
    outline:
     "border border-[var(--border)] text-[var(--text-primary,var(--foreground))] bg-transparent",
    // Semantic states
    success:
     "bg-[var(--success-muted,rgba(22,163,74,0.1))] text-[var(--success)]",
    warning:
     "bg-[var(--warning-muted,rgba(202,138,4,0.1))] text-[var(--warning)]",
    error: "bg-[var(--error-muted,rgba(220,38,38,0.1))] text-[var(--error)]",
    destructive:
     "bg-[var(--error-muted,rgba(220,38,38,0.1))] text-[var(--error)]",
    info: "bg-[var(--info-muted,rgba(37,99,235,0.1))] text-[var(--info)]",
   },
   size: {
    xs: "px-1.5 py-0.5 text-[10px]",
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1 text-sm",
   },
   shape: {
    rounded: "rounded-md",
    pill: "rounded-full",
    square: "rounded-none",
   },
  },
  defaultVariants: {
   variant: "default",
   size: "sm",
   shape: "pill",
  },
 }
);

export interface BadgeProps
 extends HTMLAttributes<HTMLSpanElement>,
  ExtractVariantProps<typeof badgeVariants> {
 /**
  * Dot indicator before content
  */
 dot?: boolean;

 /**
  * Removable badge (shows X button)
  */
 removable?: boolean;

 /**
  * Callback when remove button is clicked
  */
 onRemove?: () => void;
}

/**
 * Badge - Label/tag component
 * Universal design for status, categories, and labels
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
 (
  {
   className,
   variant,
   size,
   shape,
   dot,
   removable,
   onRemove,
   children,
   ...props
  },
  ref
 ) => {
  return (
   <span
    ref={ref}
    className={cn(badgeVariants({ variant, size, shape }), className)}
    {...props}
   >
    {dot && (
     <span
      className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current flex-shrink-0"
      aria-hidden="true"
     />
    )}
    {children}
    {removable && (
     <button
      type="button"
      className="ml-1 -mr-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full opacity-60 hover:opacity-100 hover:bg-current/10 transition-opacity"
      onClick={(e) => {
       e.stopPropagation();
       onRemove?.();
      }}
      aria-label="Remove"
     >
      <svg
       className="h-3 w-3"
       fill="none"
       stroke="currentColor"
       viewBox="0 0 24 24"
       aria-hidden="true"
      >
       <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
       />
      </svg>
     </button>
    )}
   </span>
  );
 }
);

Badge.displayName = "Badge";
