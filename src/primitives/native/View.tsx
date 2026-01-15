/**
 * View Primitive - React Native Implementation
 * Re-exports View from react-native with typed props
 */

import { forwardRef } from "react";
import { View as RNView, type ViewProps as RNViewProps } from "react-native";
import type { ViewProps } from "../types";

export interface NativeViewProps
 extends ViewProps,
  Omit<RNViewProps, keyof ViewProps> {}

export const View = forwardRef<RNView, NativeViewProps>(
 ({ children, className, testID, accessibilityLabel, ...props }, ref) => {
  return (
   <RNView
    ref={ref}
    // NativeWind will process className
    className={className}
    testID={testID}
    accessibilityLabel={accessibilityLabel}
    {...props}
   >
    {children}
   </RNView>
  );
 }
);

View.displayName = "View";
