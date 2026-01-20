/**
 * Progress - Web Implementation
 * @layer Infrastructure (Web)
 *
 * Progress bar component
 */

"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
 /** Progress value (0-100) */
 value?: number;
 /** Maximum value */
 max?: number;
 /** Show percentage text */
 showValue?: boolean;
 /** Indeterminate state (animated) */
 indeterminate?: boolean;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
 (
  { className, value = 0, max = 100, showValue, indeterminate, ...props },
  ref,
 ) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
   <div className="relative">
    <div
     ref={ref}
     role="progressbar"
     aria-valuenow={indeterminate ? undefined : value}
     aria-valuemin={0}
     aria-valuemax={max}
     className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-white/5",
      className,
     )}
     {...props}
    >
     <div
      className={cn(
       "h-full flex-1 bg-cyan-500 transition-all",
       indeterminate && "animate-indeterminate-progress w-1/3",
      )}
      style={
       indeterminate
        ? undefined
        : { transform: `translateX(-${100 - percentage}%)` }
      }
     />
    </div>
    {showValue && !indeterminate && (
     <span className="absolute top-1/2 right-0 ml-2 -translate-y-1/2 text-xs text-zinc-400">
      {Math.round(percentage)}%
     </span>
    )}
   </div>
  );
 },
);
Progress.displayName = "Progress";
