

"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { useBadge, type BadgeProps } from "../../shared/badge";
import { cn } from "../../utils/cn";

export interface WebBadgeProps
 extends BadgeProps,
  Omit<HTMLAttributes<HTMLSpanElement>, keyof BadgeProps> {}

export const Badge = forwardRef<HTMLSpanElement, WebBadgeProps>(
 ({ className, children, onRemove, testID, ...props }, ref) => {
  const { viewModel, handleRemove } = useBadge(props);

  return (
   <span
    ref={ref}
    data-testid={testID}
    className={cn(
     "inline-flex items-center font-medium transition-all duration-150",
     className
    )}
    style={{
     paddingLeft: viewModel.styles.paddingH,
     paddingRight: viewModel.removable ? viewModel.styles.paddingH + 4 : viewModel.styles.paddingH,
     paddingTop: viewModel.styles.paddingV,
     paddingBottom: viewModel.styles.paddingV,
     fontSize: viewModel.styles.fontSize,
     borderRadius: viewModel.styles.borderRadius,
     backgroundColor: viewModel.styles.backgroundColor,
     color: viewModel.styles.textColor,
     ...(viewModel.styles.borderColor !== "transparent" && {
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: viewModel.styles.borderColor,
     }),
    }}
   >
    {viewModel.dot && viewModel.dotStyles && (
     <span
      className="rounded-full"
      style={{
       width: viewModel.dotStyles.size,
       height: viewModel.dotStyles.size,
       marginRight: viewModel.dotStyles.gap,
       backgroundColor: viewModel.styles.textColor,
      }}
     />
    )}
    {children}
    {viewModel.removable && (
     <button
      type="button"
      onClick={(e) => {
       e.stopPropagation();
       onRemove?.();
       handleRemove();
      }}
      className="ml-1 -mr-1 p-0.5 rounded-full hover:opacity-70"
      aria-label="Remove"
     >
      <svg
       viewBox="0 0 16 16"
       fill="currentColor"
       style={{ width: viewModel.styles.fontSize - 2, height: viewModel.styles.fontSize - 2 }}
      >
       <path d="M4.28 3.22a.75.75 0 0 0-1.06 1.06L6.94 8l-3.72 3.72a.75.75 0 1 0 1.06 1.06L8 9.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L9.06 8l3.72-3.72a.75.75 0 0 0-1.06-1.06L8 6.94 4.28 3.22Z" />
      </svg>
     </button>
    )}
   </span>
  );
 }
);

Badge.displayName = "Badge";
