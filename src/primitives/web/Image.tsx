/**
 * Image Primitive - Web Implementation
 * Renders as img on web
 */

import { forwardRef, type ImgHTMLAttributes } from "react";
import type { ImageProps } from "../types";
import { cn } from "../../utils/cn";

export interface WebImageProps
 extends Omit<ImageProps, "source">,
  Omit<ImgHTMLAttributes<HTMLImageElement>, keyof ImageProps | "src"> {
 source: string | { uri: string } | number;
}

export const Image = forwardRef<HTMLImageElement, WebImageProps>(
 (
  {
   source,
   alt,
   className,
   style,
   testID,
   resizeMode = "cover",
   width,
   height,
   ...props
  },
  ref
 ) => {
  // Resolve source to URL string
  const src =
   typeof source === "string"
    ? source
    : typeof source === "object" && "uri" in source
    ? source.uri
    : "";

  // Map resizeMode to CSS object-fit
  const objectFit = {
   cover: "cover",
   contain: "contain",
   stretch: "fill",
   center: "none",
  }[resizeMode] as React.CSSProperties["objectFit"];

  return (
   <img
    ref={ref}
    src={src}
    alt={alt}
    className={cn(className)}
    style={{
     objectFit,
     width,
     height,
     ...(style as React.CSSProperties),
    }}
    data-testid={testID}
    {...props}
   />
  );
 }
);

Image.displayName = "Image";
