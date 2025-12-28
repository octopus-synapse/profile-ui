import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { cva, type ExtractVariantProps } from "../../utils/cva";
import type { Variant } from "../../types";

const badgeVariants = cva(
 "inline-flex items-center rounded-full font-medium transition-colors",
 {
  variants: {
   variant: {
    default: "bg-[var(--muted)] text-[var(--foreground)]",
    secondary: "bg-[var(--muted)] text-[var(--foreground)]",
    accent: "bg-[var(--accent)] text-[var(--accent-foreground)]",
    outline: "border border-[var(--border)] text-[var(--foreground)]",
    success:
     "bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/20",
    warning:
     "bg-[var(--warning)]/10 text-[var(--warning)] border border-[var(--warning)]/20",
    error:
     "bg-[var(--error)]/10 text-[var(--error)] border border-[var(--error)]/20",
    destructive:
     "bg-[var(--error)]/10 text-[var(--error)] border border-[var(--error)]/20",
    info:
     "bg-[var(--info)]/10 text-[var(--info)] border border-[var(--info)]/20",
   },
   size: {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-sm",
    lg: "px-3 py-1 text-sm",
   },
  },
  defaultVariants: {
   variant: "default",
   size: "md",
  },
 }
);

// Variant-specific accent classes for tech areas
const techVariantClasses: Record<Variant, string> = {
 dev: "data-[variant=accent]:bg-white data-[variant=accent]:text-black",
 product: "data-[variant=accent]:bg-blue-500 data-[variant=accent]:text-white",
 design: "data-[variant=accent]:bg-purple-500 data-[variant=accent]:text-white",
 data: "data-[variant=accent]:bg-green-500 data-[variant=accent]:text-white",
 devops: "data-[variant=accent]:bg-orange-500 data-[variant=accent]:text-white",
};

export interface BadgeProps
 extends HTMLAttributes<HTMLSpanElement>,
  ExtractVariantProps<typeof badgeVariants> {
 /**
  * Tech area variant for accent color
  * @deprecated Use `techVariant` instead
  */
 techVariant?: Variant;

 /**
  * Dot indicator
  */
 dot?: boolean;

 /**
  * Removable badge (shows X)
  */
 removable?: boolean;

 /**
  * Callback when remove is clicked
  */
 onRemove?: () => void;
}

/**
 * Badge - Label/tag component
 * For status indicators, categories, and labels
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
 (
  {
   className,
   variant,
   size,
   techVariant,
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
    className={cn(
     badgeVariants({ variant, size }),
     techVariant && techVariantClasses[techVariant],
     className
    )}
    data-variant={variant}
    data-tech-variant={techVariant}
    {...props}
   >
    {dot && <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />}
    {children}
    {removable && (
     <button
      type="button"
      className="ml-1 -mr-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/10"
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
