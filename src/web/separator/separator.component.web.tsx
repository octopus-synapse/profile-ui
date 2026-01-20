/**
 * Separator - Web Implementation
 * @layer Infrastructure (Web)
 */

"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { useSeparator, type SeparatorProps } from "../../shared/separator";

export interface WebSeparatorProps
 extends SeparatorProps,
  Omit<HTMLAttributes<HTMLDivElement>, keyof SeparatorProps> {}

export const Separator = forwardRef<HTMLDivElement, WebSeparatorProps>(
 ({ className, testID, ...props }, ref) => {
  const { orientation, decorative, color, thickness } = useSeparator(props);
  const isHorizontal = orientation === "horizontal";

  return (
   <div
    ref={ref}
    data-testid={testID}
    role={decorative ? "none" : "separator"}
    aria-orientation={decorative ? undefined : orientation}
    className={className}
    style={{
     width: isHorizontal ? "100%" : thickness,
     height: isHorizontal ? thickness : "100%",
     backgroundColor: color,
    }}
   />
  );
 }
);

Separator.displayName = "Separator";
