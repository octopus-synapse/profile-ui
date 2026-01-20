/**
 * Badge - Base Component
 *
 * @layer Application
 */

import type { BadgeProps } from "./badge.types";
import { badgeTokens } from "./badge.types";

export function useBadge(props: BadgeProps) {
 const {
  variant = "default",
  size = "sm",
  shape = "pill",
  dot = false,
  removable = false,
 } = props;

 const variantToken = badgeTokens.variants[variant];
 const sizeToken = badgeTokens.sizes[size];
 const shapeToken = badgeTokens.shapes[shape];

 return {
  variantToken,
  sizeToken,
  shapeToken,
  dot,
  removable,
  variant,
  size,
  shape,
 };
}

export * from "./badge.types";
