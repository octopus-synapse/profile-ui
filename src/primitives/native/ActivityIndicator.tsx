/**
 * ActivityIndicator Primitive - React Native Implementation
 * Re-exports ActivityIndicator from react-native with typed props
 */

import { forwardRef } from "react";
import {
 ActivityIndicator as RNActivityIndicator,
 type ActivityIndicatorProps as RNActivityIndicatorProps,
 View,
} from "react-native";
import type { ActivityIndicatorProps } from "../types";

export interface NativeActivityIndicatorProps
 extends ActivityIndicatorProps,
  Omit<RNActivityIndicatorProps, keyof ActivityIndicatorProps> {}

export const ActivityIndicator = forwardRef<View, NativeActivityIndicatorProps>(
 (
  { className, testID, size = "small", color, animating = true, ...props },
  ref
 ) => {
  return (
   <RNActivityIndicator
    // ActivityIndicator doesn't support ref directly, wrap if needed
    size={size}
    color={color}
    animating={animating}
    testID={testID}
    {...props}
   />
  );
 }
);

ActivityIndicator.displayName = "ActivityIndicator";
