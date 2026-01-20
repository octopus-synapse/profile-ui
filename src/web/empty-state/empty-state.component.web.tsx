/**
 * EmptyState - Web Implementation
 * @layer Infrastructure (Web)
 */

"use client";

import { forwardRef, type HTMLAttributes } from "react";
import {
 useEmptyState,
 type EmptyStateProps,
 emptyStateTokens,
} from "../../shared/empty-state";
import { cn } from "../../utils/cn";

export interface WebEmptyStateProps
 extends EmptyStateProps,
  Omit<HTMLAttributes<HTMLDivElement>, keyof EmptyStateProps> {}

export const EmptyState = forwardRef<HTMLDivElement, WebEmptyStateProps>(
 ({ className, icon, title, description, action, testID, ...props }, ref) => {
  const { sizeToken } = useEmptyState({ ...props, title });

  return (
   <div
    ref={ref}
    data-testid={testID}
    className={cn(
     "flex flex-col items-center justify-center text-center",
     className
    )}
    style={{ padding: sizeToken.padding }}
   >
    {icon && (
     <div
      style={{
       fontSize: sizeToken.iconSize,
       color: emptyStateTokens.colors.icon,
       marginBottom: 16,
      }}
     >
      {icon}
     </div>
    )}
    <h3
     style={{
      fontSize: sizeToken.titleSize,
      color: emptyStateTokens.colors.title,
      fontWeight: 600,
      marginBottom: 8,
     }}
    >
     {title}
    </h3>
    {description && (
     <p
      style={{
       fontSize: sizeToken.descSize,
       color: emptyStateTokens.colors.description,
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
