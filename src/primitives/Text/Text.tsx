import { forwardRef, type HTMLAttributes, type ElementType } from "react";
import { cn } from "../../utils/cn";
import { cva, type ExtractVariantProps } from "../../utils/cva";

const textVariants = cva("", {
 variants: {
  variant: {
   h1: "text-5xl font-bold tracking-tight",
   h2: "text-4xl font-bold tracking-tight",
   h3: "text-3xl font-semibold",
   h4: "text-2xl font-semibold",
   h5: "text-xl font-semibold",
   h6: "text-lg font-semibold",
   body: "text-base",
   bodySmall: "text-sm",
   bodyLarge: "text-lg",
   code: "font-mono text-sm",
   label: "text-sm font-medium tracking-wide",
   caption: "text-xs",
  },
  color: {
   default: "text-[var(--foreground)]",
   muted: "text-[var(--muted-foreground)]",
   accent: "text-[var(--accent)]",
   success: "text-[var(--success)]",
   warning: "text-[var(--warning)]",
   error: "text-[var(--error)]",
   info: "text-[var(--info)]",
  },
  align: {
   left: "text-left",
   center: "text-center",
   right: "text-right",
   justify: "text-justify",
  },
  weight: {
   thin: "font-thin",
   light: "font-light",
   normal: "font-normal",
   medium: "font-medium",
   semibold: "font-semibold",
   bold: "font-bold",
  },
  truncate: {
   true: "truncate",
   false: "",
  },
 },
 defaultVariants: {
  variant: "body",
  color: "default",
  align: "left",
  truncate: false,
 },
});

const variantToElement: Record<string, ElementType> = {
 h1: "h1",
 h2: "h2",
 h3: "h3",
 h4: "h4",
 h5: "h5",
 h6: "h6",
 body: "p",
 bodySmall: "p",
 bodyLarge: "p",
 code: "code",
 label: "label",
 caption: "span",
};

export interface TextProps
 extends Omit<HTMLAttributes<HTMLElement>, "color">,
  ExtractVariantProps<typeof textVariants> {
 /**
  * Override the element type
  */
 as?: ElementType;
}

/**
 * Text - Typography primitive
 * Renders semantic HTML elements based on variant
 */
export const Text = forwardRef<HTMLElement, TextProps>(
 (
  { as, className, variant = "body", color, align, weight, truncate, ...props },
  ref
 ) => {
  const Component = as || variantToElement[variant ?? "body"] || "span";

  return (
   <Component
    ref={ref}
    className={cn(
     textVariants({ variant, color, align, weight, truncate }),
     className
    )}
    {...props}
   />
  );
 }
);

Text.displayName = "Text";
