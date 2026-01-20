/**
 * Grid - Web Implementation
 *
 * @layer Infrastructure (Web)
 */

"use client";

import { forwardRef } from "react";
import { buildGridStyles, type GridWebProps } from "./grid.types";
import { cn } from "../../utils";

export const Grid = forwardRef<HTMLDivElement, GridWebProps>(
  ({ children, className, style, testID, ...props }, ref) => {
    const gridStyles = buildGridStyles(props);

    return (
      <div
        ref={ref}
        data-testid={testID}
        className={cn(className)}
        style={{ ...gridStyles, ...style }}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = "Grid";

// GridItem for spanning
export interface GridItemProps {
  children?: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  colStart?: number;
  colEnd?: number;
  rowStart?: number;
  rowEnd?: number;
  className?: string;
  style?: React.CSSProperties;
  testID?: string;
}

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({ children, colSpan, rowSpan, colStart, colEnd, rowStart, rowEnd, className, style, testID }, ref) => {
    return (
      <div
        ref={ref}
        data-testid={testID}
        className={cn(className)}
        style={{
          gridColumn: colSpan ? `span ${colSpan}` : colStart || colEnd ? `${colStart ?? "auto"} / ${colEnd ?? "auto"}` : undefined,
          gridRow: rowSpan ? `span ${rowSpan}` : rowStart || rowEnd ? `${rowStart ?? "auto"} / ${rowEnd ?? "auto"}` : undefined,
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
);

GridItem.displayName = "GridItem";
