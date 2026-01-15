/**
 * Text Primitive - Web Implementation
 * Renders as span/p/h1-h6 on web based on role
 */

import { forwardRef, type HTMLAttributes, type ElementType } from "react";
import type { PlatformTextProps } from "../types";
import { cn } from "../../utils/cn";

export interface WebTextProps
 extends PlatformTextProps,
  Omit<HTMLAttributes<HTMLElement>, keyof PlatformTextProps> {}

export const Text = forwardRef<HTMLElement, WebTextProps>(
 (
  {
   children,
   className,
   style,
   testID,
   numberOfLines,
   selectable = true,
   role = "text",
   accessibilityLevel,
   ...props
  },
  ref
 ) => {
  // Determine element type based on role and accessibility level
  let Component: ElementType = "span";

  if (role === "heading" && accessibilityLevel) {
   Component = `h${accessibilityLevel}` as ElementType;
  } else if (role === "label") {
   Component = "label";
  }

  // Build className with truncation support
  const textClassName = cn(
   className,
   !selectable && "select-none",
   numberOfLines === 1 && "truncate",
   numberOfLines && numberOfLines > 1 && "line-clamp-" + numberOfLines
  );

  return (
   <Component
    ref={ref as React.Ref<HTMLElement>}
    className={textClassName}
    style={style as React.CSSProperties}
    data-testid={testID}
    {...props}
   >
    {children}
   </Component>
  );
 }
);

Text.displayName = "Text";
