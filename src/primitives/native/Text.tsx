/**
 * Text Primitive - React Native Implementation
 * Re-exports Text from react-native with typed props
 */

import { forwardRef } from "react";
import { Text as RNText, type TextProps as RNTextProps } from "react-native";
import type { PlatformTextProps } from "../types";

export interface NativeTextProps
 extends PlatformTextProps,
  Omit<RNTextProps, keyof PlatformTextProps> {}

export const Text = forwardRef<RNText, NativeTextProps>(
 (
  {
   children,
   className,
   testID,
   numberOfLines,
   selectable,
   accessibilityLabel,
   role,
   accessibilityLevel,
   ...props
  },
  ref
 ) => {
  // Map role to accessibilityRole
  const accessibilityRole =
   role === "heading" ? "header" : role === "label" ? "text" : "text";

  return (
   <RNText
    ref={ref}
    className={className}
    testID={testID}
    numberOfLines={numberOfLines}
    selectable={selectable}
    accessibilityLabel={accessibilityLabel}
    accessibilityRole={accessibilityRole}
    {...props}
   >
    {children}
   </RNText>
  );
 }
);

Text.displayName = "Text";
