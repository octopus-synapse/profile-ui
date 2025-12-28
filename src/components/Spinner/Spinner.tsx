import { forwardRef, type SVGAttributes } from "react";
import { cn } from "../../utils/cn";
import { cva, type ExtractVariantProps } from "../../utils/cva";

const spinnerVariants = cva("animate-spin", {
 variants: {
  size: {
   xs: "h-3 w-3",
   sm: "h-4 w-4",
   md: "h-6 w-6",
   lg: "h-8 w-8",
   xl: "h-12 w-12",
  },
  colorScheme: {
   default: "text-[var(--foreground)]",
   accent: "text-[var(--accent)]",
   muted: "text-[var(--muted-foreground)]",
  },
 },
 defaultVariants: {
  size: "md",
  colorScheme: "default",
 },
});

export interface SpinnerProps
 extends Omit<SVGAttributes<SVGSVGElement>, "color">,
  ExtractVariantProps<typeof spinnerVariants> {
 /**
  * Accessibility label
  */
 label?: string;
}

/**
 * Spinner - Loading indicator
 */
export const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(
 ({ className, size, colorScheme, label = "Loading...", ...props }, ref) => {
  return (
   <svg
    ref={ref}
    className={cn(spinnerVariants({ size, colorScheme }), className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    role="status"
    aria-label={label}
    {...props}
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
  );
 }
);

Spinner.displayName = "Spinner";
