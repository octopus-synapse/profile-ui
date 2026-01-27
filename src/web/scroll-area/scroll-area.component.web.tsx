

"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
 
 orientation?: "vertical" | "horizontal" | "both";
 
 maxHeight?: string | number;
 
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
