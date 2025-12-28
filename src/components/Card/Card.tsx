import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { cva, type ExtractVariantProps } from "../../utils/cva";
import type { Variant } from "../../types";

const cardVariants = cva(
 "rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] transition-all duration-200",
 {
  variants: {
   padding: {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
   },
   hover: {
    true: "hover:border-[var(--accent)]/50 hover:shadow-lg",
    false: "",
   },
   interactive: {
    true: "cursor-pointer active:scale-[0.98]",
    false: "",
   },
   elevated: {
    true: "shadow-md",
    false: "",
   },
  },
  defaultVariants: {
   padding: "md",
   hover: false,
   interactive: false,
   elevated: false,
  },
 }
);

export interface CardProps
 extends HTMLAttributes<HTMLDivElement>,
  ExtractVariantProps<typeof cardVariants> {
 /**
  * Tech area variant for accent highlights
  */
 variant?: Variant;
}

/**
 * Card - Container component
 * Clean B&W card with optional variant accent on hover
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
 (
  { className, padding, hover, interactive, elevated, variant, ...props },
  ref
 ) => {
  return (
   <div
    ref={ref}
    className={cn(
     cardVariants({ padding, hover, interactive, elevated }),
     variant && `variant-${variant}`,
     className
    )}
    data-variant={variant}
    {...props}
   />
  );
 }
);

Card.displayName = "Card";

/**
 * CardHeader - Card header section
 */
export const CardHeader = forwardRef<
 HTMLDivElement,
 HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
 <div
  ref={ref}
  className={cn("flex flex-col space-y-1.5", className)}
  {...props}
 />
));

CardHeader.displayName = "CardHeader";

/**
 * CardTitle - Card title
 */
export const CardTitle = forwardRef<
 HTMLHeadingElement,
 HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
 <h3
  ref={ref}
  className={cn("text-xl font-semibold leading-none tracking-tight", className)}
  {...props}
 />
));

CardTitle.displayName = "CardTitle";

/**
 * CardDescription - Card description text
 */
export const CardDescription = forwardRef<
 HTMLParagraphElement,
 HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
 <p
  ref={ref}
  className={cn("text-sm text-[var(--muted-foreground)]", className)}
  {...props}
 />
));

CardDescription.displayName = "CardDescription";

/**
 * CardContent - Card main content area
 */
export const CardContent = forwardRef<
 HTMLDivElement,
 HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
 <div ref={ref} className={cn("", className)} {...props} />
));

CardContent.displayName = "CardContent";

/**
 * CardFooter - Card footer section
 */
export const CardFooter = forwardRef<
 HTMLDivElement,
 HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
 <div
  ref={ref}
  className={cn("flex items-center pt-4", className)}
  {...props}
 />
));

CardFooter.displayName = "CardFooter";
