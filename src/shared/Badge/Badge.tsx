/**
 * Badge - Base Component
 *
 * @layer Application
 */

import type { BadgeProps } from "./Badge.types";
import { badgeTokens } from "./Badge.types";

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

export * from "./Badge.types";
