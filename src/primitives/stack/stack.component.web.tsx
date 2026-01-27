

"use client";

import { forwardRef, Children, Fragment } from "react";
import { Box } from "../box/box.component.web";
import { buildStackStyles, type StackWebProps } from "./stack.types";
import { cn } from "../../utils";

export const Stack = forwardRef<HTMLDivElement, StackWebProps>(
 ({ children, className, divider, ...props }, ref) => {
  const stackStyles = buildStackStyles(props);
  const childArray = Children.toArray(children).filter(Boolean);

  return (
   <Box ref={ref} className={cn(className)} style={stackStyles} {...props}>
    {divider
     ? childArray.map((child, index) => (
        <Fragment key={index}>
         {child}
         {index < childArray.length - 1 && divider}
        </Fragment>
       ))
     : children}
   </Box>
  );
 },
);

Stack.displayName = "Stack";


export const VStack = forwardRef<
 HTMLDivElement,
 Omit<StackWebProps, "direction">
>((props, ref) => <Stack ref={ref} direction="vertical" {...props} />);
VStack.displayName = "VStack";

export const HStack = forwardRef<
 HTMLDivElement,
 Omit<StackWebProps, "direction">
>((props, ref) => <Stack ref={ref} direction="horizontal" {...props} />);
HStack.displayName = "HStack";
