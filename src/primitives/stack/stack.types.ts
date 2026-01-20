/**
 * Stack - Primitive Type Contract
 *
 * @principle Single Responsibility
 * @layer Domain (Contract)
 *
 * Stack provides vertical (VStack) or horizontal (HStack) layout with consistent spacing.
 */

import type { ReactNode } from "react";
import type { BoxBaseProps } from "../box/box.types";

export type StackDirection = "horizontal" | "vertical";

export interface StackBaseProps extends Omit<BoxBaseProps, "flexDirection"> {
 children?: ReactNode;
 direction?: StackDirection;
 spacing?: number | string;
 divider?: ReactNode;
 wrap?: boolean;
 reverse?: boolean;
}

export interface StackWebProps extends StackBaseProps {
 className?: string;
}

export interface StackMobileProps extends StackBaseProps {}

export function buildStackStyles(props: StackBaseProps) {
 const {
  direction = "vertical",
  spacing = 0,
  wrap = false,
  reverse = false,
 } = props;
 const isHorizontal = direction === "horizontal";

 let flexDir: "row" | "row-reverse" | "column" | "column-reverse";
 if (isHorizontal) {
  flexDir = reverse ? "row-reverse" : "row";
 } else {
  flexDir = reverse ? "column-reverse" : "column";
 }

 return {
  display: "flex" as const,
  flexDirection: flexDir,
  gap: spacing,
  flexWrap: (wrap ? "wrap" : "nowrap") as "wrap" | "nowrap",
 };
}
