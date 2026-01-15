/**
 * ActivityIndicator Primitive - Web Implementation
 * Renders as a spinning loader on web
 */

import { forwardRef, type HTMLAttributes } from "react";
import type { ActivityIndicatorProps } from "../types";
import { cn } from "../../utils/cn";

export interface WebActivityIndicatorProps
 extends ActivityIndicatorProps,
  Omit<HTMLAttributes<HTMLDivElement>, keyof ActivityIndicatorProps> {}

export const ActivityIndicator = forwardRef<
 HTMLDivElement,
 WebActivityIndicatorProps
>(
 (
  {
   className,
   style,
   testID,
   size = "small",
   color = "currentColor",
   animating = true,
   ...props
  },
  ref
 ) => {
  // Map size to pixels
  const sizeMap = {
   small: 20,
   large: 36,
  };
  const sizeValue = typeof size === "number" ? size : sizeMap[size];

  if (!animating) {
   return null;
  }

  return (
   <div
    ref={ref}
    className={cn("inline-flex items-center justify-center", className)}
    style={style as React.CSSProperties}
    data-testid={testID}
    role="progressbar"
    aria-label="Loading"
    {...props}
   >
    <svg
     className="animate-spin"
     width={sizeValue}
     height={sizeValue}
     viewBox="0 0 24 24"
     fill="none"
     xmlns="http://www.w3.org/2000/svg"
    >
     <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke={color}
      strokeWidth="4"
     />
     <path
      className="opacity-75"
      fill={color}
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
     />
    </svg>
   </div>
  );
 }
);

ActivityIndicator.displayName = "ActivityIndicator";
