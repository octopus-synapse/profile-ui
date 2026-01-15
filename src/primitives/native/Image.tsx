/**
 * Image Primitive - React Native Implementation
 * Re-exports Image from react-native with typed props
 */

import { forwardRef } from "react";
import {
 Image as RNImage,
 type ImageProps as RNImageProps,
} from "react-native";
import type { ImageProps } from "../types";

export interface NativeImageProps
 extends Omit<ImageProps, "source">,
  Omit<RNImageProps, keyof ImageProps> {
 source: string | { uri: string } | number;
}

export const Image = forwardRef<RNImage, NativeImageProps>(
 (
  {
   source,
   alt,
   className,
   testID,
   resizeMode = "cover",
   width,
   height,
   style,
   ...props
  },
  ref
 ) => {
  // Normalize source
  const imageSource =
   typeof source === "string"
    ? { uri: source }
    : typeof source === "number"
    ? source
    : source;

  return (
   <RNImage
    ref={ref}
    source={imageSource}
    className={className}
    testID={testID}
    resizeMode={resizeMode}
    accessibilityLabel={alt}
    style={[{ width, height }, style]}
    {...props}
   />
  );
 }
);

Image.displayName = "Image";
