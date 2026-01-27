

"use client";

import { forwardRef, type HTMLAttributes } from "react";
import {
 useEmptyState,
 type EmptyStateProps,
} from "../../shared/empty-state";
import { cn } from "../../utils/cn";

export interface WebEmptyStateProps
 extends EmptyStateProps,
  Omit<HTMLAttributes<HTMLDivElement>, keyof EmptyStateProps> {}

export const EmptyState = forwardRef<HTMLDivElement, WebEmptyStateProps>(
 ({ className, icon, title, description, action, testID, ...props }, ref) => {
  const { viewModel } = useEmptyState({ ...props, title });

  return (
   <div
    ref={ref}
    data-testid={testID}
    className={cn(
     "flex flex-col items-center justify-center text-center",
     className
    )}
    style={{ padding: viewModel.styles.padding }}
   >
    {icon && (
     <div
      style={{
       fontSize: viewModel.styles.iconSize,
       color: viewModel.styles.iconColor,
       marginBottom: 16,
      }}
     >
      {icon}
     </div>
    )}
    <h3
     style={{
      fontSize: viewModel.styles.titleSize,
      color: viewModel.styles.titleColor,
      fontWeight: 600,
      marginBottom: 8,
     }}
    >
     {title}
    </h3>
    {description && (
     <p
      style={{
       fontSize: viewModel.styles.descriptionSize,
       color: viewModel.styles.descriptionColor,
       maxWidth: 320,
      }}
     >
      {description}
     </p>
    )}
    {action && <div className="mt-6">{action}</div>}
   </div>
  );
 }
);

EmptyState.displayName = "EmptyState";
