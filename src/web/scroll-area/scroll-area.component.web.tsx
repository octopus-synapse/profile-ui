/**
 * ScrollArea - Web Implementation
 * @layer Infrastructure (Web)
 *
 * Custom scrollable area with styled scrollbar
 */

"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
 /** Orientation for the scrollbar */
 orientation?: "vertical" | "horizontal" | "both";
 /** Maximum height (for vertical scroll) */
 maxHeight?: string | number;
 /** Maximum width (for horizontal scroll) */
 maxWidth?: string | number;
}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
 (
  {
   className,
   children,
   orientation = "vertical",
   maxHeight,
   maxWidth,
   style,
   ...props
  },
  ref,
 ) => {
  const overflowClass =
   orientation === "both"
    ? "overflow-auto"
    : orientation === "horizontal"
      ? "overflow-x-auto overflow-y-hidden"
      : "overflow-y-auto overflow-x-hidden";

  return (
   <div
    ref={ref}
    className={cn(
     "relative",
     overflowClass,
     // Custom scrollbar styling
     "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10",
     "hover:scrollbar-thumb-white/20",
     className,
    )}
    style={{
     maxHeight,
     maxWidth,
     ...style,
    }}
    {...props}
   >
    {children}
   </div>
  );
 },
);
ScrollArea.displayName = "ScrollArea";
