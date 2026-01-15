/**
 * Pressable Primitive - Web Implementation
 * Renders as button on web with proper accessibility
 */

import { forwardRef, type ButtonHTMLAttributes, useCallback } from "react";
import type { PressableProps } from "../types";
import { cn } from "../../utils/cn";

export interface WebPressableProps
 extends PressableProps,
  Omit<
   ButtonHTMLAttributes<HTMLButtonElement>,
   keyof PressableProps | "onClick"
  > {}

export const Pressable = forwardRef<HTMLButtonElement, WebPressableProps>(
 (
  {
   children,
   className,
   style,
   testID,
   onPress,
   onLongPress,
   onPressIn,
   onPressOut,
   disabled,
   role = "button",
   accessibilityLabel,
   ...props
  },
  ref
 ) => {
  // Handle long press with timer
  const handleMouseDown = useCallback(() => {
   onPressIn?.();

   if (onLongPress) {
    const timer = setTimeout(() => {
     onLongPress();
    }, 500);

    const cleanup = () => {
     clearTimeout(timer);
     window.removeEventListener("mouseup", cleanup);
    };

    window.addEventListener("mouseup", cleanup);
   }
  }, [onPressIn, onLongPress]);

  const handleMouseUp = useCallback(() => {
   onPressOut?.();
  }, [onPressOut]);

  return (
   <button
    ref={ref}
    type="button"
    className={cn(
     // Reset button styles
     "appearance-none bg-transparent border-none p-0 m-0 cursor-pointer",
     disabled && "cursor-not-allowed opacity-50",
     className
    )}
    style={style as React.CSSProperties}
    data-testid={testID}
    onClick={onPress}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
    disabled={disabled}
    role={role}
    aria-label={accessibilityLabel}
    {...props}
   >
    {children}
   </button>
  );
 }
);

Pressable.displayName = "Pressable";
