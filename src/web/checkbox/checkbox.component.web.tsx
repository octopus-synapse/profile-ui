

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
   // Extract HTML props to pass through
   name,
   required,
   form,
   value,
   ...props
  },
  ref
 ) => {
  const { state, styles, handlers, accessibility } = useCheckbox({
    checked: props.checked as boolean | 'indeterminate',
    defaultChecked: props.defaultChecked as boolean | 'indeterminate',
    onCheckedChange,
    disabled: props.disabled,
    readOnly: props.readOnly,
    required: required,
    error: error,
    ...props
  });

  return (
   <label
    htmlFor={id}
    className={cn(
     "inline-flex items-start gap-2 cursor-pointer",
     state.disabled && "cursor-not-allowed opacity-50",
     className
    )}
   >
    <div className="relative flex items-center justify-center">
     <input
      ref={ref}
      id={id}
      type="checkbox"
      name={name}
      required={required}
      form={form}
      value={value}
      checked={state.checked}
      disabled={state.disabled}
      data-testid={testID}
      onChange={handlers.handleChange}
      className="sr-only"
      {...accessibility}
     />
     <div
      className={cn(
       "flex items-center justify-center transition-all duration-150",
       "border-2 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-[#020202]"
      )}
      style={{
       width: styles.size,
       height: styles.size,
       borderRadius: styles.radius,
       backgroundColor: styles.backgroundColor,
       borderColor: error ? checkboxTokens.colors.error : styles.borderColor,
      }}
     >
      {(state.checked || state.indeterminate) && (
       <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke={styles.checkmarkColor || styles.indicatorColor || '#fff'}
        strokeWidth={2}
        style={{ width: styles.checkmarkSize, height: styles.checkmarkSize }}
       >
        {state.indeterminate ? (
          <path d="M4 8H12" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M4 8L7 11L12 5" strokeLinecap="round" strokeLinejoin="round" />
        )}
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
