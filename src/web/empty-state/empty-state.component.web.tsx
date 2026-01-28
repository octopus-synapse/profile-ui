

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
  const { styles } = useEmptyState({ ...props, title });

  return (
   <div
    ref={ref}
    data-testid={testID}
    className={cn(
     "flex flex-col items-center justify-center text-center",
     className
    )}
    style={{ padding: styles.padding }}
   >
    {icon && (
     <div
      style={{
       fontSize: styles.iconSize,
       color: styles.iconColor,
       marginBottom: 16,
      }}
     >
      {icon}
     </div>
    )}
    <h3
     style={{
      fontSize: styles.titleSize,
      color: styles.titleColor,
      fontWeight: 600,
      marginBottom: 8,
     }}
    >
     {title}
    </h3>
    {description && (
     <p
      style={{
       fontSize: styles.descriptionSize,
       color: styles.descriptionColor,
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
