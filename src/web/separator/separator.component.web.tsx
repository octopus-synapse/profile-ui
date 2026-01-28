

"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { useSeparator, type SeparatorProps } from "../../shared/separator";

export interface WebSeparatorProps
 extends SeparatorProps,
  Omit<HTMLAttributes<HTMLDivElement>, keyof SeparatorProps> {}

export const Separator = forwardRef<HTMLDivElement, WebSeparatorProps>(
 ({ className, testID, ...props }, ref) => {
  const { state, styles, accessibility } = useSeparator(props);
  const isHorizontal = state.orientation === "horizontal";

  return (
   <div
    ref={ref}
    data-testid={testID}
    className={className}
    style={{
     width: isHorizontal ? "100%" : styles.thickness,
     height: isHorizontal ? styles.thickness : "100%",
     backgroundColor: styles.color,
    }}
    {...accessibility}
   />
  );
 }
);

Separator.displayName = "Separator";
