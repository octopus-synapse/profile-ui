import { forwardRef, type HTMLAttributes, type ElementType } from "react";
import { cn } from "../../utils/cn";

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
 /**
  * The element type to render
  * @default 'div'
  */
 as?: ElementType;

 /**
  * Padding (Tailwind class)
  */
 p?: string;

 /**
  * Padding X (Tailwind class)
  */
 px?: string;

 /**
  * Padding Y (Tailwind class)
  */
 py?: string;

 /**
  * Margin (Tailwind class)
  */
 m?: string;

 /**
  * Margin X (Tailwind class)
  */
 mx?: string;

 /**
  * Margin Y (Tailwind class)
  */
 my?: string;
}

/**
 * Box - Basic layout primitive
 * A polymorphic component that can render as any HTML element
 */
export const Box = forwardRef<HTMLDivElement, BoxProps>(
 (
  { as: Component = "div", className, p, px, py, m, mx, my, ...props },
  ref
 ) => {
  return (
   <Component
    ref={ref}
    className={cn(
     p && `p-${p}`,
     px && `px-${px}`,
     py && `py-${py}`,
     m && `m-${m}`,
     mx && `mx-${mx}`,
     my && `my-${my}`,
     className
    )}
    {...props}
   />
  );
 }
);

Box.displayName = "Box";
