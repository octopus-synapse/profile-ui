/**
 * Card - Type Contract
 *
 * @principle Dependency Inversion
 * @layer Domain
 */

import type { ReactNode } from "react";

// =============================================================================
// Domain Types
// =============================================================================

export type CardPadding = "none" | "sm" | "md" | "lg";
export type CardVariant =
 | "default"
 | "outlined"
 | "filled"
 | "elevated"
 | "ghost";
export type CardHover = "none" | "border" | "lift";

// =============================================================================
// Component Contracts
// =============================================================================

export interface CardProps {
 children: ReactNode;
 padding?: CardPadding;
 variant?: CardVariant;
 hover?: CardHover;
 interactive?: boolean;
 onPress?: () => void;
 testID?: string;
}

export interface CardHeaderProps {
 children: ReactNode;
}

export interface CardTitleProps {
 children: ReactNode;
}

export interface CardDescriptionProps {
 children: ReactNode;
}

export interface CardContentProps {
 children: ReactNode;
}

export interface CardFooterProps {
 children: ReactNode;
}

// =============================================================================
// Design Tokens
// =============================================================================

export const cardTokens = {
 padding: { none: 0, sm: 16, md: 24, lg: 32 },
 variants: {
  default: {
   background: "#0a0a0a",
   border: "rgba(255,255,255,0.1)",
   shadow: "none",
  },
  outlined: {
   background: "transparent",
   border: "rgba(255,255,255,0.1)",
   shadow: "none",
  },
  filled: { background: "#171717", border: "transparent", shadow: "none" },
  elevated: {
   background: "#0a0a0a",
   border: "transparent",
   shadow: "0 4px 6px -1px rgba(0,0,0,0.3)",
  },
  ghost: { background: "transparent", border: "transparent", shadow: "none" },
 },
 radius: 12,
} as const;
