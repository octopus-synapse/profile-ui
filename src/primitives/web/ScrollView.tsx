/**
 * ScrollView Primitive - Web Implementation
 * Renders as a scrollable div on web
 */

import { forwardRef, type HTMLAttributes } from "react";
import type { ScrollViewProps } from "../types";
import { cn } from "../../utils/cn";

export interface WebScrollViewProps
 extends ScrollViewProps,
  Omit<HTMLAttributes<HTMLDivElement>, keyof ScrollViewProps> {}

export const ScrollView = forwardRef<HTMLDivElement, WebScrollViewProps>(
 (
  {
   children,
   className,
   style,
   testID,
   horizontal,
   showsScrollIndicator = true,
   contentContainerStyle,
   ...props
  },
  ref
 ) => {
  return (
   <div
    ref={ref}
    className={cn(
     horizontal ? "overflow-x-auto" : "overflow-y-auto",
     !showsScrollIndicator && "scrollbar-hide",
     className
    )}
    style={style as React.CSSProperties}
    data-testid={testID}
    {...props}
   >
    <div style={contentContainerStyle as React.CSSProperties}>{children}</div>
   </div>
  );
 }
);

ScrollView.displayName = "ScrollView";
