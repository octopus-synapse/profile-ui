/**
 * Pressable Primitive - React Native Implementation
 * Re-exports Pressable from react-native with typed props
 */

import { forwardRef } from "react";
import {
 Pressable as RNPressable,
 type PressableProps as RNPressableProps,
 type View as RNView,
} from "react-native";
import type { PressableProps } from "../types";

export interface NativePressableProps
 extends PressableProps,
  Omit<
   RNPressableProps,
   keyof PressableProps | "onPress" | "onLongPress" | "onPressIn" | "onPressOut"
  > {}

export const Pressable = forwardRef<RNView, NativePressableProps>(
 (
  {
   children,
   className,
   testID,
   onPress,
   onLongPress,
   onPressIn,
   onPressOut,
   disabled,
   accessibilityLabel,
   role,
   ...props
  },
  ref
 ) => {
  // Map role to accessibilityRole
  const accessibilityRole =
   role === "button"
    ? "button"
    : role === "link"
    ? "link"
    : role === "menuitem"
    ? "menuitem"
    : role === "tab"
    ? "tab"
    : "button";

  return (
   <RNPressable
    ref={ref}
    className={className}
    testID={testID}
    onPress={onPress}
    onLongPress={onLongPress}
    onPressIn={onPressIn}
    onPressOut={onPressOut}
    disabled={disabled}
    accessibilityLabel={accessibilityLabel}
    accessibilityRole={accessibilityRole}
    {...props}
   >
    {children}
   </RNPressable>
  );
 }
);

Pressable.displayName = "Pressable";
