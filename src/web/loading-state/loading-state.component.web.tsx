

"use client";

import { forwardRef, type HTMLAttributes } from "react";
import {
 useLoadingState,
 type LoadingStateProps,
 loadingStateTokens,
} from "../../shared/loading-state";
import { Spinner } from "../spinner";
import { cn } from "../../utils/cn";

export interface WebLoadingStateProps
 extends LoadingStateProps,
  Omit<HTMLAttributes<HTMLDivElement>, keyof LoadingStateProps> {}

export const LoadingState = forwardRef<HTMLDivElement, WebLoadingStateProps>(
 ({ className, message, testID, size = 'md', overlay = false, minHeight = 200, ..._props }, ref) => {
  const { viewModel } = useLoadingState({});

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
       color: viewModel.styles.messageColor,
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
