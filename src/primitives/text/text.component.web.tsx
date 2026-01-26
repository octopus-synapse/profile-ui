

"use client";

import { forwardRef, type ElementType } from "react";
import { buildTextStyles, type TextWebProps } from "./text.types";
import { cn } from "../../utils";

export const Text = forwardRef<HTMLElement, TextWebProps>(
  ({ as: Component = "span", children, className, style, testID, htmlFor, ...props }, ref) => {
    const textStyles = buildTextStyles(props);
    const Tag = Component as ElementType;

    return (
      <Tag
        ref={ref}
        data-testid={testID}
        className={cn(className)}
        style={{ ...textStyles, ...style }}
        htmlFor={htmlFor}
      >
        {children}
      </Tag>
    );
  }
);

Text.displayName = "Text";


export const Heading = forwardRef<HTMLHeadingElement, Omit<TextWebProps, "as"> & { level?: 1 | 2 | 3 | 4 | 5 | 6 }>(
  ({ level = 2, size, weight = "bold", ...props }, ref) => {
    const defaultSizes: Record<number, TextWebProps["size"]> = {
      1: "4xl", 2: "3xl", 3: "2xl", 4: "xl", 5: "lg", 6: "md",
    };
    return (
      <Text
        ref={ref}
        as={`h${level}` as TextWebProps["as"]}
        size={size ?? defaultSizes[level]}
        weight={weight}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";
