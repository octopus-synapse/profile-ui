/**
 * Button - Web Implementation
 * @layer Infrastructure (Web)
 */

"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { useButton, type ButtonProps } from "../../shared/Button";
import { cn } from "../../utils/cn";

export interface WebButtonProps
 extends ButtonProps,
  Omit<
   ButtonHTMLAttributes<HTMLButtonElement>,
   keyof ButtonProps | "onClick"
  > {}

export const Button = forwardRef<HTMLButtonElement, WebButtonProps>(
 (
  { className, children, leftIcon, rightIcon, onPress, testID, ...props },
  ref
 ) => {
  const { isDisabled, variantToken, sizeToken, fullWidth, loading } = useButton(
   { ...props, children }
  );

  return (
   <button
    ref={ref}
    type="button"
    disabled={isDisabled}
    onClick={onPress}
    data-testid={testID}
    className={cn(
     "inline-flex items-center justify-center gap-2",
     "font-semibold whitespace-nowrap transition-all duration-150",
     "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020202]",
     "disabled:opacity-50 disabled:pointer-events-none",
     "active:scale-[0.98] select-none",
     fullWidth && "w-full",
     className
    )}
    style={{
     height: sizeToken.height,
     paddingLeft: sizeToken.paddingH,
     paddingRight: sizeToken.paddingH,
     fontSize: sizeToken.fontSize,
     borderRadius: sizeToken.radius,
     backgroundColor: variantToken.background,
     color: variantToken.text,
     borderWidth: 1,
     borderColor: variantToken.border,
    }}
   >
    {loading ? (
     <LoadingSpinner color={variantToken.text} />
    ) : (
     <>
      {leftIcon}
      {children}
      {rightIcon}
     </>
    )}
   </button>
  );
 }
);

Button.displayName = "Button";

function LoadingSpinner({ color }: { color: string }) {
 return (
  <svg
   className="animate-spin h-4 w-4"
   fill="none"
   viewBox="0 0 24 24"
   style={{ color }}
  >
   <circle
    className="opacity-25"
    cx="12"
    cy="12"
    r="10"
    stroke="currentColor"
    strokeWidth="4"
   />
   <path
    className="opacity-75"
    fill="currentColor"
    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
   />
  </svg>
 );
}
