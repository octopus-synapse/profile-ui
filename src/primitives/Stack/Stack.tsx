import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { cva, type ExtractVariantProps } from "../../utils/cva";

const stackVariants = cva("flex", {
 variants: {
  direction: {
   row: "flex-row",
   column: "flex-col",
   rowReverse: "flex-row-reverse",
   columnReverse: "flex-col-reverse",
  },
  align: {
   start: "items-start",
   center: "items-center",
   end: "items-end",
   stretch: "items-stretch",
   baseline: "items-baseline",
  },
  justify: {
   start: "justify-start",
   center: "justify-center",
   end: "justify-end",
   between: "justify-between",
   around: "justify-around",
   evenly: "justify-evenly",
  },
  gap: {
   0: "gap-0",
   1: "gap-1",
   2: "gap-2",
   3: "gap-3",
   4: "gap-4",
   5: "gap-5",
   6: "gap-6",
   8: "gap-8",
   10: "gap-10",
   12: "gap-12",
  },
  wrap: {
   wrap: "flex-wrap",
   nowrap: "flex-nowrap",
   wrapReverse: "flex-wrap-reverse",
  },
 },
 defaultVariants: {
  direction: "column",
  align: "stretch",
  justify: "start",
  gap: 4,
  wrap: "nowrap",
 },
});

export interface StackProps
 extends HTMLAttributes<HTMLDivElement>,
  ExtractVariantProps<typeof stackVariants> {}

/**
 * Stack - Flex layout primitive
 * Easily create vertical or horizontal layouts with consistent spacing
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
 ({ className, direction, align, justify, gap, wrap, ...props }, ref) => {
  return (
   <div
    ref={ref}
    className={cn(
     stackVariants({ direction, align, justify, gap, wrap }),
     className
    )}
    {...props}
   />
  );
 }
);

Stack.displayName = "Stack";

/**
 * HStack - Horizontal Stack shorthand
 */
export const HStack = forwardRef<HTMLDivElement, Omit<StackProps, "direction">>(
 (props, ref) => <Stack ref={ref} direction="row" {...props} />
);

HStack.displayName = "HStack";

/**
 * VStack - Vertical Stack shorthand
 */
export const VStack = forwardRef<HTMLDivElement, Omit<StackProps, "direction">>(
 (props, ref) => <Stack ref={ref} direction="column" {...props} />
);

VStack.displayName = "VStack";
