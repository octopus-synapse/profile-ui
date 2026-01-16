/**
 * LoadingState - Web Implementation
 * @layer Infrastructure (Web)
 */

"use client";

import { forwardRef, type HTMLAttributes } from "react";
import {
 useLoadingState,
 type LoadingStateProps,
 loadingStateTokens,
} from "../../shared/LoadingState";
import { Spinner } from "../Spinner/Spinner.web";
import { cn } from "../../utils/cn";

export interface WebLoadingStateProps
 extends LoadingStateProps,
  Omit<HTMLAttributes<HTMLDivElement>, keyof LoadingStateProps> {}

export const LoadingState = forwardRef<HTMLDivElement, WebLoadingStateProps>(
 ({ className, message, testID, ...props }, ref) => {
  const { size, minHeight, overlay } = useLoadingState(props);

  const content = (
   <div
    ref={ref}
    data-testid={testID}
    className={cn("flex flex-col items-center justify-center gap-3", className)}
    style={{ minHeight }}
   >
    <Spinner size={size} />
    {message && (
     <p
      style={{
       fontSize: loadingStateTokens.message.fontSize,
       color: loadingStateTokens.message.color,
      }}
     >
      {message}
     </p>
    )}
   </div>
  );

  if (overlay) {
   return (
    <div
     className="fixed inset-0 z-50 flex items-center justify-center"
     style={{ backgroundColor: loadingStateTokens.overlay.background }}
    >
     {content}
    </div>
   );
  }

  return content;
 }
);

LoadingState.displayName = "LoadingState";
