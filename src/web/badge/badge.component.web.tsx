/**
 * Badge - Web Implementation
 * @layer Infrastructure (Web)
 */

"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { useBadge, type BadgeProps, badgeTokens } from "../../shared/badge";
import { cn } from "../../utils/cn";

export interface WebBadgeProps
 extends BadgeProps,
  Omit<HTMLAttributes<HTMLSpanElement>, keyof BadgeProps> {}

export const Badge = forwardRef<HTMLSpanElement, WebBadgeProps>(
 ({ className, children, onRemove, testID, ...props }, ref) => {
  const { variantToken, sizeToken, shapeToken, dot, removable } = useBadge({
   ...props,
   children,
  });

  return (
   <span
    ref={ref}
    data-testid={testID}
    className={cn(
     "inline-flex items-center font-medium transition-all duration-150",
     className
    )}
    style={{
     paddingLeft: sizeToken.paddingH,
     paddingRight: removable ? sizeToken.paddingH + 4 : sizeToken.paddingH,
     paddingTop: sizeToken.paddingV,
     paddingBottom: sizeToken.paddingV,
     fontSize: sizeToken.fontSize,
     borderRadius: shapeToken.radius,
     backgroundColor: variantToken.background,
     color: variantToken.text,
     ...(variantToken.border !== "transparent" && {
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: variantToken.border,
     }),
    }}
   >
    {dot && (
     <span
      className="rounded-full"
      style={{
       width: badgeTokens.dot.size,
       height: badgeTokens.dot.size,
       marginRight: badgeTokens.dot.gap,
       backgroundColor: variantToken.text,
      }}
     />
    )}
    {children}
    {removable && (
     <button
      type="button"
      onClick={(e) => {
       e.stopPropagation();
       onRemove?.();
      }}
      className="ml-1 -mr-1 p-0.5 rounded-full hover:opacity-70"
      aria-label="Remove"
     >
      <svg
       viewBox="0 0 16 16"
       fill="currentColor"
       style={{ width: sizeToken.fontSize - 2, height: sizeToken.fontSize - 2 }}
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
