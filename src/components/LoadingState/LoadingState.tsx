import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { Spinner, type SpinnerProps } from "../Spinner";

export interface LoadingStateProps extends HTMLAttributes<HTMLDivElement> {
 /**
  * Loading message to display
  */
 message?: string;

 /**
  * Size of the spinner
  */
 size?: SpinnerProps["size"];

 /**
  * Whether to center the loading state
  */
 centered?: boolean;

 /**
  * Minimum height for the container
  */
 minHeight?: string;

 /**
  * Show a subtle backdrop
  */
 overlay?: boolean;
}

/**
 * LoadingState - Consistent loading indicator
 * Use for async operations, data fetching, and transitions
 *
 * Nielsen: Visibility of system status
 * Users should always know when something is loading
 */
export const LoadingState = forwardRef<HTMLDivElement, LoadingStateProps>(
 (
  {
   className,
   message = "Loading...",
   size = "md",
   centered = true,
   minHeight = "200px",
   overlay = false,
   ...props
  },
  ref
 ) => {
  return (
   <div
    ref={ref}
    className={cn(
     "flex flex-col items-center justify-center gap-3",
     centered && "w-full",
     overlay && "bg-[var(--background)]/80 backdrop-blur-sm",
     className
    )}
    style={{ minHeight }}
    role="status"
    aria-live="polite"
    aria-busy="true"
    {...props}
   >
    <div className="relative">
     <div className="absolute inset-0 animate-ping rounded-full bg-[var(--border)] opacity-75" />
     <Spinner size={size} className="relative" />
    </div>
    {message && (
     <p className="font-mono text-sm text-[var(--text-secondary)]">{message}</p>
    )}
   </div>
  );
 }
);

LoadingState.displayName = "LoadingState";
