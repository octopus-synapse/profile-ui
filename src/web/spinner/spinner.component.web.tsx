

"use client";

import { forwardRef, type SVGAttributes } from "react";
import { useSpinner, type SpinnerProps } from "../../shared/spinner";
import { cn } from "../../utils/cn";

export interface WebSpinnerProps
 extends SpinnerProps,
  Omit<SVGAttributes<SVGSVGElement>, keyof SpinnerProps> {}

export const Spinner = forwardRef<SVGSVGElement, WebSpinnerProps>(
 ({ className, label = "Loading...", testID, ...props }, ref) => {
  const { viewModel } = useSpinner(props);

  return (
   <svg
    ref={ref}
    data-testid={testID}
    className={cn("animate-spin", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    role="status"
    aria-label={label}
    style={{ width: viewModel.styles.size, height: viewModel.styles.size, color: viewModel.styles.color }}
   >
    <circle
     className="opacity-25"
     cx="12"
     cy="12"
     r="10"
     stroke="currentColor"
     strokeWidth={viewModel.styles.strokeWidth}
    />
    <path
     className="opacity-75"
     fill="currentColor"
     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
   </svg>
  );
 }
);

Spinner.displayName = "Spinner";
