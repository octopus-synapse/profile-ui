/**
 * Checkbox - Web Implementation
 * @layer Infrastructure (Web)
 */

"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import {
 useCheckbox,
 type CheckboxWithLabelProps,
 checkboxTokens,
} from "../../shared/checkbox";
import { cn } from "../../utils/cn";

export interface WebCheckboxProps
 extends CheckboxWithLabelProps,
  Omit<
   InputHTMLAttributes<HTMLInputElement>,
   keyof CheckboxWithLabelProps | "onChange" | "size"
  > {}

export const Checkbox = forwardRef<HTMLInputElement, WebCheckboxProps>(
 (
  {
   className,
   label,
   description,
   error,
   onCheckedChange,
   testID,
   id,
   ...props
  },
  ref
 ) => {
  const { stateToken, checked, disabled } = useCheckbox(props);

  return (
   <label
    htmlFor={id}
    className={cn(
     "inline-flex items-start gap-2 cursor-pointer",
     disabled && "cursor-not-allowed opacity-50",
     className
    )}
   >
    <div className="relative flex items-center justify-center">
     <input
      ref={ref}
      id={id}
      type="checkbox"
      checked={checked}
      disabled={disabled}
      data-testid={testID}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      className="sr-only"
     />
     <div
      className={cn(
       "flex items-center justify-center transition-all duration-150",
       "border-2 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-[#020202]"
      )}
      style={{
       width: checkboxTokens.size,
       height: checkboxTokens.size,
       borderRadius: checkboxTokens.radius,
       backgroundColor: stateToken.background,
       borderColor: error ? checkboxTokens.colors.error : stateToken.border,
      }}
     >
      {checked && (
       <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke={
         "check" in stateToken
          ? (stateToken as { check: string }).check
          : "#fff"
        }
        strokeWidth={2}
        style={{ width: 12, height: 12 }}
       >
        <path d="M4 8L7 11L12 5" strokeLinecap="round" strokeLinejoin="round" />
       </svg>
      )}
     </div>
    </div>
    {(label || description || error) && (
     <div className="flex flex-col">
      {label && (
       <span style={{ fontSize: 14, color: checkboxTokens.colors.label }}>
        {label}
       </span>
      )}
      {description && (
       <span
        className="mt-0.5"
        style={{ fontSize: 12, color: checkboxTokens.colors.description }}
       >
        {description}
       </span>
      )}
      {error && (
       <span
        className="mt-0.5"
        style={{ fontSize: 12, color: checkboxTokens.colors.error }}
       >
        {error}
       </span>
      )}
     </div>
    )}
   </label>
  );
 }
);

Checkbox.displayName = "Checkbox";
