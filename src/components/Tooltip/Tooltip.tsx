import {
 forwardRef,
 type ReactNode,
 useState,
 useRef,
 useEffect,
 useCallback,
} from "react";
import { cn } from "../../utils/cn";

export interface TooltipProps {
 /**
  * The content to show in the tooltip
  */
 content: ReactNode;

 /**
  * The trigger element
  */
 children: ReactNode;

 /**
  * Position of the tooltip
  */
 position?: "top" | "bottom" | "left" | "right";

 /**
  * Delay before showing tooltip (ms)
  */
 delay?: number;

 /**
  * Whether tooltip is disabled
  */
 disabled?: boolean;

 /**
  * Additional class name
  */
 className?: string;
}

/**
 * Tooltip - Contextual help on hover
 * Use for additional information without cluttering the UI
 *
 * Nielsen #10: Help and documentation
 * Provides inline help without requiring users to leave context
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
 (
  {
   className,
   content,
   children,
   position = "top",
   delay = 200,
   disabled = false,
  },
  ref
 ) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const showTooltip = useCallback(() => {
   if (disabled) return;
   timeoutRef.current = setTimeout(() => {
    setIsVisible(true);
   }, delay);
  }, [delay, disabled]);

  const hideTooltip = useCallback(() => {
   if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
   }
   setIsVisible(false);
  }, []);

  useEffect(() => {
   return () => {
    if (timeoutRef.current) {
     clearTimeout(timeoutRef.current);
    }
   };
  }, []);

  const positionStyles = {
   top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
   bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
   left: "right-full top-1/2 -translate-y-1/2 mr-2",
   right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowStyles = {
   top: "top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-[var(--surface-inverse)]",
   bottom:
    "bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-[var(--surface-inverse)]",
   left:
    "left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-[var(--surface-inverse)]",
   right:
    "right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-[var(--surface-inverse)]",
  };

  return (
   <div ref={ref} className={cn("relative inline-flex", className)}>
    <div
     ref={triggerRef}
     onMouseEnter={showTooltip}
     onMouseLeave={hideTooltip}
     onFocus={showTooltip}
     onBlur={hideTooltip}
    >
     {children}
    </div>

    {isVisible && content && (
     <div
      role="tooltip"
      className={cn(
       "absolute z-50 whitespace-nowrap rounded-md px-3 py-1.5",
       "bg-[var(--surface-inverse)] text-[var(--text-inverse)]",
       "text-xs font-medium shadow-lg",
       "animate-in fade-in-0 zoom-in-95 duration-100",
       positionStyles[position]
      )}
     >
      {content}
      <div className={cn("absolute h-0 w-0 border-4", arrowStyles[position])} />
     </div>
    )}
   </div>
  );
 }
);

Tooltip.displayName = "Tooltip";

/**
 * HelpTooltip - Question mark icon with tooltip
 * Use for inline help on form fields
 */
export interface HelpTooltipProps {
 content: ReactNode;
 className?: string;
}

export function HelpTooltip({ content, className }: HelpTooltipProps) {
 return (
  <Tooltip content={content} position="top">
   <button
    type="button"
    className={cn(
     "inline-flex h-4 w-4 items-center justify-center rounded-full",
     "bg-[var(--surface-1)] text-[var(--text-tertiary)]",
     "text-xs font-medium hover:bg-[var(--surface-2)]",
     "transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)]",
     className
    )}
    aria-label="Help"
   >
    ?
   </button>
  </Tooltip>
 );
}
