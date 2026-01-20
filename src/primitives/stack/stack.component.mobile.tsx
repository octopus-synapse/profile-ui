/**
 * Stack - Mobile Implementation
 *
 * @layer Infrastructure (Mobile)
 */

import { Children, Fragment } from "react";
import { Box } from "../box/box.component.mobile";
import { buildStackStyles, type StackMobileProps } from "./stack.types";

export function Stack({ children, divider, ...props }: StackMobileProps) {
 const stackStyles = buildStackStyles(props);
 const childArray = Children.toArray(children).filter(Boolean);

 return (
  <Box style={stackStyles} {...props}>
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
}

// Convenience components
export function VStack(props: Omit<StackMobileProps, "direction">) {
 return <Stack direction="vertical" {...props} />;
}

export function HStack(props: Omit<StackMobileProps, "direction">) {
 return <Stack direction="horizontal" {...props} />;
}
