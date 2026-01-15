/**
 * View Primitive - Web Implementation
 * Renders as a div on web
 */

import { forwardRef, type HTMLAttributes } from "react";
import type { ViewProps } from "../types";
import { cn } from "../../utils/cn";

export interface WebViewProps
 extends ViewProps,
  Omit<HTMLAttributes<HTMLDivElement>, keyof ViewProps> {}

export const View = forwardRef<HTMLDivElement, WebViewProps>(
 (
  { children, className, style, testID, role, accessibilityLabel, ...props },
  ref
 ) => {
  return (
   <div
    ref={ref}
    className={cn(className)}
    style={style as React.CSSProperties}
    data-testid={testID}
    role={role}
    aria-label={accessibilityLabel}
    {...props}
   >
    {children}
   </div>
  );
 }
);

View.displayName = "View";
