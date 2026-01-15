/**
 * ScrollView Primitive - React Native Implementation
 * Re-exports ScrollView from react-native with typed props
 */

import { forwardRef } from "react";
import {
 ScrollView as RNScrollView,
 type ScrollViewProps as RNScrollViewProps,
} from "react-native";
import type { ScrollViewProps } from "../types";

export interface NativeScrollViewProps
 extends ScrollViewProps,
  Omit<RNScrollViewProps, keyof ScrollViewProps> {}

export const ScrollView = forwardRef<RNScrollView, NativeScrollViewProps>(
 (
  {
   children,
   className,
   testID,
   horizontal,
   showsScrollIndicator = true,
   contentContainerStyle,
   ...props
  },
  ref
 ) => {
  return (
   <RNScrollView
    ref={ref}
    className={className}
    testID={testID}
    horizontal={horizontal}
    showsHorizontalScrollIndicator={
     horizontal ? showsScrollIndicator : undefined
    }
    showsVerticalScrollIndicator={
     !horizontal ? showsScrollIndicator : undefined
    }
    contentContainerStyle={contentContainerStyle}
    {...props}
   >
    {children}
   </RNScrollView>
  );
 }
);

ScrollView.displayName = "ScrollView";
