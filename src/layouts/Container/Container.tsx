import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { cva, type ExtractVariantProps } from "../../utils/cva";

const containerVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-8", {
 variants: {
  maxWidth: {
   sm: "max-w-screen-sm",
   md: "max-w-screen-md",
   lg: "max-w-screen-lg",
   xl: "max-w-screen-xl",
   "2xl": "max-w-screen-2xl",
   full: "max-w-full",
   prose: "max-w-prose",
  },
  padding: {
   none: "px-0",
   sm: "px-4",
   md: "px-4 sm:px-6 lg:px-8",
   lg: "px-6 sm:px-8 lg:px-12",
  },
  centered: {
   true: "flex flex-col items-center",
   false: "",
  },
 },
 defaultVariants: {
  maxWidth: "xl",
  padding: "md",
  centered: false,
 },
});

export interface ContainerProps
 extends HTMLAttributes<HTMLDivElement>,
  ExtractVariantProps<typeof containerVariants> {}

/**
 * Container - Centered content container with max-width
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
 ({ className, maxWidth, padding, centered, ...props }, ref) => {
  return (
   <div
    ref={ref}
    className={cn(
     containerVariants({ maxWidth, padding, centered }),
     className
    )}
    {...props}
   />
  );
 }
);

Container.displayName = "Container";
