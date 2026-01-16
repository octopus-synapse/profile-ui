/**
 * Input - Web Implementation
 * @layer Infrastructure (Web)
 */

"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { useInput, type InputProps, inputTokens } from "../../shared/Input";
import { cn } from "../../utils/cn";

export interface WebInputProps
 extends InputProps,
  Omit<
   InputHTMLAttributes<HTMLInputElement>,
   keyof InputProps | "size" | "onChange"
  > {}

export const Input = forwardRef<HTMLInputElement, WebInputProps>(
 (
  {
   className,
   value,
   defaultValue,
   placeholder,
   type = "text",
   leftAddon,
   rightAddon,
   helperText,
   disabled,
   readOnly,
   onChangeText,
   onFocus,
   onBlur,
   onSubmit,
   testID,
   id,
   accessibilityLabel,
   ...props
  },
  ref
 ) => {
  const { hasError, errorMessage, sizeToken, stateToken } = useInput(props);

  return (
   <div className="w-full">
    <div className="relative flex items-center">
     {leftAddon && (
      <div
       className="absolute left-3 flex items-center pointer-events-none"
       style={{ color: inputTokens.colors.placeholder }}
      >
       {leftAddon}
      </div>
     )}
     <input
      ref={ref}
      id={id}
      type={type}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      data-testid={testID}
      aria-label={accessibilityLabel}
      aria-invalid={hasError}
      onChange={(e) => onChangeText?.(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={(e) => e.key === "Enter" && onSubmit?.()}
      className={cn(
       "w-full transition-all duration-150",
       "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020202]",
       "disabled:cursor-not-allowed disabled:opacity-50",
       leftAddon && "pl-10",
       rightAddon && "pr-10",
       className
      )}
      style={{
       height: sizeToken.height,
       paddingLeft: leftAddon ? 40 : sizeToken.paddingH,
       paddingRight: rightAddon ? 40 : sizeToken.paddingH,
       fontSize: sizeToken.fontSize,
       borderRadius: inputTokens.radius,
       backgroundColor: disabled
        ? inputTokens.colors.disabled.background
        : inputTokens.colors.background,
       color: disabled
        ? inputTokens.colors.disabled.text
        : inputTokens.colors.text,
       borderWidth: 1,
       borderStyle: "solid",
       borderColor: stateToken.border,
      }}
      {...props}
     />
     {rightAddon && (
      <div
       className="absolute right-3 flex items-center"
       style={{ color: inputTokens.colors.placeholder }}
      >
       {rightAddon}
      </div>
     )}
    </div>
    {(errorMessage || helperText) && (
     <p
      className="mt-1.5 text-xs"
      style={{
       color: errorMessage ? "#ef4444" : inputTokens.colors.placeholder,
      }}
     >
      {errorMessage || helperText}
     </p>
    )}
   </div>
  );
 }
);

Input.displayName = "Input";
