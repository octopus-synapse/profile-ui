import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { cva, type ExtractVariantProps } from "../../utils/cva";

const cardVariants = cva(
 "rounded-xl border border-[var(--border)] bg-[var(--surface-elevated,var(--card))] text-[var(--text-primary,var(--card-foreground))] transition-all duration-150",
 {
  variants: {
   padding: {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
   },
   variant: {
    default: "",
    outlined: "bg-transparent",
    filled: "bg-[var(--surface-1,var(--muted))]",
    elevated: "shadow-md border-transparent",
    ghost: "border-transparent bg-transparent",
   },
   hover: {
    true: "hover:border-[var(--border-emphasis)] hover:shadow-md",
    lift: "hover:shadow-lg hover:-translate-y-0.5",
    false: "",
   },
   interactive: {
    true: "cursor-pointer active:scale-[0.99]",
    false: "",
   },
  },
  defaultVariants: {
   padding: "md",
   variant: "default",
   hover: false,
   interactive: false,
  },
 }
);

export interface CardProps
 extends HTMLAttributes<HTMLDivElement>,
  ExtractVariantProps<typeof cardVariants> {}

/**
 * Card - Container component
 * Clean, universal design for all content types
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
 ({ className, padding, variant, hover, interactive, ...props }, ref) => {
  return (
   <div
    ref={ref}
    className={cn(
     cardVariants({ padding, variant, hover, interactive }),
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
