/**
 * Grid - Primitive Type Contract
 *
 * @principle Single Responsibility
 * @layer Domain (Contract)
 *
 * Grid provides CSS Grid layout with responsive capabilities.
 */

import type { ReactNode, CSSProperties } from "react";

export interface GridBaseProps {
  children?: ReactNode;
  columns?: number | string;
  rows?: number | string;
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;
  templateColumns?: string;
  templateRows?: string;
  autoFlow?: "row" | "column" | "dense" | "row dense" | "column dense";
  alignItems?: "start" | "end" | "center" | "stretch";
  justifyItems?: "start" | "end" | "center" | "stretch";
  testID?: string;
}

export interface GridWebProps extends GridBaseProps {
  className?: string;
  style?: CSSProperties;
}

export interface GridMobileProps extends GridBaseProps {
  // React Native doesn't have native grid, we'll simulate with flexWrap
}

export function buildGridStyles(props: GridBaseProps) {
  const { columns, rows, gap, rowGap, columnGap, templateColumns, templateRows, autoFlow, alignItems, justifyItems } = props;

  return {
    display: "grid" as const,
    gridTemplateColumns: templateColumns ?? (typeof columns === "number" ? `repeat(${columns}, 1fr)` : columns),
    gridTemplateRows: templateRows ?? (typeof rows === "number" ? `repeat(${rows}, 1fr)` : rows),
    gap,
    rowGap,
    columnGap,
    gridAutoFlow: autoFlow,
    alignItems,
    justifyItems,
  };
}
