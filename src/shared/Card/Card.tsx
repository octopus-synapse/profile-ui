/**
 * Card - Base Component
 *
 * @layer Application
 */

import type { CardProps } from "./Card.types";
import { cardTokens } from "./Card.types";

export function useCard(props: CardProps) {
 const {
  padding = "md",
  variant = "default",
  hover = "none",
  interactive = false,
 } = props;

 const paddingValue = cardTokens.padding[padding];
 const variantToken = cardTokens.variants[variant];

 return { paddingValue, variantToken, hover, interactive, variant, padding };
}

export * from "./Card.types";
