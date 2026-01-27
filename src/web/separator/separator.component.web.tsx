

"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { useSeparator, type SeparatorProps } from "../../shared/separator";

export interface WebSeparatorProps
 extends SeparatorProps,
  Omit<HTMLAttributes<HTMLDivElement>, keyof SeparatorProps> {}

export const Separator = forwardRef<HTMLDivElement, WebSeparatorProps>(
 ({ className, testID, ...props }, ref) => {
  const { viewModel } = useSeparator(props);
  const isHorizontal = viewModel.orientation === "horizontal";

  return (
   <div
    ref={ref}
    data-testid={testID}
    role={viewModel.role}
    aria-orientation={viewModel.ariaOrientation}
    className={className}
    style={{
     width: isHorizontal ? "100%" : viewModel.styles.thickness,
     height: isHorizontal ? viewModel.styles.thickness : "100%",
     backgroundColor: viewModel.styles.color,
    }}
   />
  );
 }
);

Separator.displayName = "Separator";
