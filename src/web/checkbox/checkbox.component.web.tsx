

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
  const { viewModel, handleChange } = useCheckbox({
    value: props.checked,
  });

  return (
   <label
    htmlFor={id}
    className={cn(
     "inline-flex items-start gap-2 cursor-pointer",
     viewModel.disabled && "cursor-not-allowed opacity-50",
     className
    )}
   >
    <div className="relative flex items-center justify-center">
     <input
      ref={ref}
      id={id}
      type="checkbox"
      checked={viewModel.checked}
      disabled={viewModel.disabled}
      data-testid={testID}
      onChange={async () => {
        await handleChange();
        onCheckedChange?.(viewModel.checked);
      }}
      className="sr-only"
     />
     <div
      className={cn(
       "flex items-center justify-center transition-all duration-150",
       "border-2 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-[#020202]"
      )}
      style={{
       width: viewModel.styles.size,
       height: viewModel.styles.size,
       borderRadius: viewModel.styles.radius,
       backgroundColor: viewModel.styles.backgroundColor,
       borderColor: error ? checkboxTokens.colors.error : viewModel.styles.borderColor,
      }}
     >
      {(viewModel.checked || viewModel.indeterminate) && (
       <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke={viewModel.styles.checkmarkColor || '#fff'}
        strokeWidth={2}
        style={{ width: viewModel.styles.checkmarkSize, height: viewModel.styles.checkmarkSize }}
       >
        {viewModel.indeterminate ? (
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
