import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
 /**
  * Orientation
  */
 orientation?: "horizontal" | "vertical";

 /**
  * Decorative (no semantic meaning)
  */
 decorative?: boolean;
}

/**
 * Separator - Visual divider
 */
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
 (
  { className, orientation = "horizontal", decorative = true, ...props },
  ref
 ) => {
  return (
   <div
    ref={ref}
    role={decorative ? "none" : "separator"}
    aria-orientation={decorative ? undefined : orientation}
    className={cn(
     "shrink-0 bg-[var(--border)]",
     orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
     className
    )}
    {...props}
   />
  );
 }
);

Separator.displayName = "Separator";
