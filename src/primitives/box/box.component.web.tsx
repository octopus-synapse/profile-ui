/**
 * Box - Web Implementation
 *
 * @layer Infrastructure (Web)
 */

"use client";

import { forwardRef, type ElementType } from "react";
import { buildBoxStyles, type BoxWebProps } from "./box.types";
import { cn } from "../../utils";

export interface BoxProps extends BoxWebProps {
  ref?: React.Ref<HTMLElement>;
}

export const Box = forwardRef<HTMLElement, BoxWebProps>(
  ({ as: Component = "div", children, className, style, testID, onClick, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const boxStyles = buildBoxStyles(props);
    const Tag = Component as ElementType;

    return (
      <Tag
        ref={ref}
        data-testid={testID}
        className={cn(className)}
        style={{ ...boxStyles, ...style }}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </Tag>
    );
  }
);

Box.displayName = "Box";
