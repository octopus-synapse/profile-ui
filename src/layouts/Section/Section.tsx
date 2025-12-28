import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { cva, type ExtractVariantProps } from "../../utils/cva";

const sectionVariants = cva("w-full", {
 variants: {
  padding: {
   none: "",
   sm: "py-8 sm:py-12",
   md: "py-12 sm:py-16",
   lg: "py-16 sm:py-24",
   xl: "py-24 sm:py-32",
  },
  background: {
   default: "",
   muted: "bg-[var(--muted)]",
   accent: "bg-[var(--accent)]/5",
  },
 },
 defaultVariants: {
  padding: "md",
  background: "default",
 },
});

export interface SectionProps
 extends HTMLAttributes<HTMLElement>,
  ExtractVariantProps<typeof sectionVariants> {
 /**
  * Render as a different element
  */
 as?: "section" | "div" | "article" | "aside";
}

/**
 * Section - Page section with consistent padding
 */
export const Section = forwardRef<HTMLElement, SectionProps>(
 (
  { className, as: Component = "section", padding, background, ...props },
  ref
 ) => {
  return (
   <Component
    ref={ref as any}
    className={cn(sectionVariants({ padding, background }), className)}
    {...props}
   />
  );
 }
);

Section.displayName = "Section";
