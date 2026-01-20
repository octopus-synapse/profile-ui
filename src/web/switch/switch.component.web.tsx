/**
 * Switch - Web Implementation
 * @layer Infrastructure (Web)
 *
 * Toggle switch component
 */

"use client";

import React, { forwardRef, type ButtonHTMLAttributes, useState } from "react";
import { cn } from "../../utils/cn";

export interface SwitchProps extends Omit<
 ButtonHTMLAttributes<HTMLButtonElement>,
 "onChange"
> {
 /** Controlled checked state */
 checked?: boolean;
 /** Default checked state for uncontrolled usage */
 defaultChecked?: boolean;
 /** Change handler */
 onCheckedChange?: (checked: boolean) => void;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
 (
  { className, checked, defaultChecked, onCheckedChange, disabled, ...props },
  ref,
 ) => {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(
   defaultChecked ?? false,
  );

  const isChecked = isControlled ? checked : internalChecked;

  const handleClick = () => {
   if (disabled) return;

   const newChecked = !isChecked;
   if (!isControlled) {
    setInternalChecked(newChecked);
   }
   onCheckedChange?.(newChecked);
  };

  return (
   <button
    ref={ref}
    type="button"
    role="switch"
    aria-checked={isChecked}
    disabled={disabled}
    data-state={isChecked ? "checked" : "unchecked"}
    onClick={handleClick}
    className={cn(
     "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
     "bg-white/5",
     "focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303] focus-visible:outline-none",
     "disabled:cursor-not-allowed disabled:opacity-50",
     isChecked && "bg-green-500",
     className,
    )}
    {...props}
   >
    <span
     data-state={isChecked ? "checked" : "unchecked"}
     className={cn(
      "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform",
      isChecked ? "translate-x-4" : "translate-x-0",
     )}
    />
   </button>
  );
 },
);
Switch.displayName = "Switch";
