

"use client";

import { forwardRef, type HTMLAttributes } from "react";
import {
 useTooltip,
 type TooltipProps,
 tooltipTokens,
} from "../../shared/tooltip";
import { cn } from "../../utils/cn";

export interface WebTooltipProps
 extends TooltipProps,
  Omit<HTMLAttributes<HTMLDivElement>, keyof TooltipProps> {}

export const Tooltip = forwardRef<HTMLDivElement, WebTooltipProps>(
 (
  { className, children, content, testID, position = "top", ...props },
  ref
 ) => {
  const { state, styles, handlers } = useTooltip({
   ...props,
   position,
  });

  if (!content) return <>{children}</>;

  return (
   <div
    ref={ref}
    data-testid={testID}
    className={cn("relative inline-block", className)}
    onMouseEnter={handlers.show}
    onMouseLeave={handlers.hide}
    onFocus={handlers.show}
    onBlur={handlers.hide}
   >
    {children}
    {state.visible && (
     <div
      role="tooltip"
      className="absolute z-50 animate-in fade-in-0 duration-100"
      style={{
       padding: `${styles.paddingV}px ${styles.paddingH}px`,
       borderRadius: styles.radius,
       backgroundColor: styles.background,
       color: tooltipTokens.text,
       fontSize: tooltipTokens.fontSize,
       whiteSpace: "nowrap",
      }}
     >
      {content}
      <TooltipArrow position={position} />
     </div>
    )}
   </div>
  );
 }
);

Tooltip.displayName = "Tooltip";



function TooltipArrow({ position }: { position: TooltipProps["position"] }) {
 const arrowPositions: Record<NonNullable<typeof position>, string> = {
  top: "top-full left-1/2 -translate-x-1/2 border-t-[#333] border-x-transparent border-b-transparent",
  bottom:
   "bottom-full left-1/2 -translate-x-1/2 border-b-[#333] border-x-transparent border-t-transparent",
  left:
   "left-full top-1/2 -translate-y-1/2 border-l-[#333] border-y-transparent border-r-transparent",
  right:
   "right-full top-1/2 -translate-y-1/2 border-r-[#333] border-y-transparent border-l-transparent",
 };

 return (
  <div
   className={cn(
    "absolute w-0 h-0 border-4",
    arrowPositions[position ?? "top"]
   )}
  />
 );
}
