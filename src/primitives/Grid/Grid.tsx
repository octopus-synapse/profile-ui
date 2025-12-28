import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { cva, type ExtractVariantProps } from "../../utils/cva";

const gridVariants = cva("grid", {
 variants: {
  cols: {
   1: "grid-cols-1",
   2: "grid-cols-2",
   3: "grid-cols-3",
   4: "grid-cols-4",
   5: "grid-cols-5",
   6: "grid-cols-6",
   12: "grid-cols-12",
   auto: "grid-cols-[repeat(auto-fit,minmax(250px,1fr))]",
  },
  rows: {
   1: "grid-rows-1",
   2: "grid-rows-2",
   3: "grid-rows-3",
   4: "grid-rows-4",
   5: "grid-rows-5",
   6: "grid-rows-6",
   auto: "grid-rows-[auto]",
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
  align: {
   start: "items-start",
   center: "items-center",
   end: "items-end",
   stretch: "items-stretch",
  },
  justify: {
   start: "justify-items-start",
   center: "justify-items-center",
   end: "justify-items-end",
   stretch: "justify-items-stretch",
  },
 },
 defaultVariants: {
  cols: 1,
  gap: 4,
  align: "stretch",
  justify: "stretch",
 },
});

export interface GridProps
 extends HTMLAttributes<HTMLDivElement>,
  ExtractVariantProps<typeof gridVariants> {}

/**
 * Grid - CSS Grid layout primitive
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
 ({ className, cols, rows, gap, align, justify, ...props }, ref) => {
  return (
   <div
    ref={ref}
    className={cn(gridVariants({ cols, rows, gap, align, justify }), className)}
    {...props}
   />
  );
 }
);

Grid.displayName = "Grid";

export interface GridItemProps extends HTMLAttributes<HTMLDivElement> {
 /**
  * Column span
  */
 colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 12 | "full";

 /**
  * Row span
  */
 rowSpan?: 1 | 2 | 3 | 4 | 5 | 6;

 /**
  * Column start position
  */
 colStart?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | "auto";

 /**
  * Row start position
  */
 rowStart?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | "auto";
}

const colSpanClasses = {
 1: "col-span-1",
 2: "col-span-2",
 3: "col-span-3",
 4: "col-span-4",
 5: "col-span-5",
 6: "col-span-6",
 12: "col-span-12",
 full: "col-span-full",
};

const rowSpanClasses = {
 1: "row-span-1",
 2: "row-span-2",
 3: "row-span-3",
 4: "row-span-4",
 5: "row-span-5",
 6: "row-span-6",
};

/**
 * GridItem - Grid item for positioning within Grid
 */
export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
 ({ className, colSpan, rowSpan, colStart, rowStart, ...props }, ref) => {
  return (
   <div
    ref={ref}
    className={cn(
     colSpan && colSpanClasses[colSpan],
     rowSpan && rowSpanClasses[rowSpan],
     colStart && colStart !== "auto" && `col-start-${colStart}`,
     rowStart && rowStart !== "auto" && `row-start-${rowStart}`,
     className
    )}
    {...props}
   />
  );
 }
);

GridItem.displayName = "GridItem";
