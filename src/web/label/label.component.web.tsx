/**
 * Label - Web Implementation
 * @layer Infrastructure (Web)
 *
 * Form label with required indicator support
 */

"use client";

import { forwardRef, type LabelHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
 /** Show required indicator (*) */
 required?: boolean;
 /** Error state styling */
 error?: boolean;
 /** Disabled state styling */
 disabled?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
 ({ className, required, error, disabled, children, ...props }, ref) => (
  <label
   ref={ref}
   className={cn(
    "text-sm font-medium leading-none",
    "text-zinc-200",
    disabled && "cursor-not-allowed opacity-50",
    error && "text-red-400",
    className,
   )}
   {...props}
  >
   {children}
   {required && (
    <span className="ml-1 text-red-500" aria-hidden="true">
     *
    </span>
   )}
  </label>
 ),
);
Label.displayName = "Label";
