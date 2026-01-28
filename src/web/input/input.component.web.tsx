

"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { useInput, type InputProps, inputTokens } from "../../shared/input";
import { cn } from "../../utils/cn";

export interface WebInputProps
 extends InputProps,
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof InputProps | "size"> {}

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
   onChange,
   onFocus,
   onBlur,
   onSubmit,
   testID,
   id,
   accessibilityLabel,
   autoComplete,
   required,
   
   
   error, 
   ...props
  },
  ref
 ) => {
  const { state, styles, handlers, accessibility } = useInput({
   value,
   error: typeof error === 'string' ? error : undefined,
   disabled,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   onChange?.(e);
   onChangeText?.(e.target.value);
   handlers.handleChange(e.target.value);
  };

  const handleBlur = () => {
   handlers.handleBlur();
   onBlur?.();
  };

  const displayError = typeof error === 'string' ? error : state.error;
  const hasError = Boolean(displayError) || state.hasError;

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
      autoComplete={autoComplete}
      required={required}
      data-testid={testID}
      aria-label={accessibilityLabel}
      aria-invalid={hasError}
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={handleBlur}
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
       height: styles.height,
       paddingLeft: leftAddon ? 40 : styles.paddingH,
       paddingRight: rightAddon ? 40 : styles.paddingH,
       fontSize: styles.fontSize,
       borderRadius: styles.borderRadius,
       backgroundColor: styles.backgroundColor,
       color: styles.textColor,
       borderWidth: 1,
       borderStyle: "solid",
       borderColor: styles.borderColor,
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
    {(displayError || helperText) && (
     <p
      className="mt-1.5 text-xs"
      style={{
       color: displayError ? "#ef4444" : inputTokens.colors.placeholder,
      }}
     >
      {displayError || helperText}
     </p>
    )}
   </div>
  );
 }
);

Input.displayName = "Input";
