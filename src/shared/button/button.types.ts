/**
 * Button - Type Contract
 *
 * @principle Dependency Inversion
 * @layer Domain
 */

import type { ReactNode } from "react";

// =============================================================================
// Domain Types
// =============================================================================

export type ButtonVariant =
 | "primary"
 | "secondary"
 | "accent"
 | "ghost"
 | "danger"
 | "outline";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

// =============================================================================
// Component Contract
// =============================================================================

export interface ButtonProps {
 children: ReactNode;
 variant?: ButtonVariant;
 size?: ButtonSize;
 fullWidth?: boolean;
 loading?: boolean;
 disabled?: boolean;
 leftIcon?: ReactNode;
 rightIcon?: ReactNode;
 onPress?: () => void;
 onClick?: () => void;
 testID?: string;
}

// =============================================================================
// Design Tokens
// =============================================================================

export const buttonTokens = {
 variants: {
  primary: {
   background: "#ffffff",
   text: "#000000",
   border: "#ffffff",
   pressed: "#a3a3a3",
  },
  secondary: {
   background: "transparent",
   text: "#ffffff",
   border: "rgba(255,255,255,0.1)",
   pressed: "#171717",
  },
  accent: {
   background: "#06b6d4",
   text: "#000000",
   border: "#06b6d4",
   pressed: "#22d3ee",
  },
  ghost: {
   background: "transparent",
   text: "#a3a3a3",
   border: "transparent",
   pressed: "#171717",
  },
  danger: {
   background: "#ef4444",
   text: "#ffffff",
   border: "#ef4444",
   pressed: "#dc2626",
  },
  outline: {
   background: "transparent",
   text: "#ffffff",
   border: "rgba(255,255,255,0.2)",
   pressed: "#171717",
  },
 },
 sizes: {
  xs: { height: 28, paddingH: 10, fontSize: 12, radius: 8 },
  sm: { height: 32, paddingH: 12, fontSize: 14, radius: 8 },
  md: { height: 40, paddingH: 16, fontSize: 14, radius: 12 },
  lg: { height: 44, paddingH: 20, fontSize: 16, radius: 12 },
  xl: { height: 48, paddingH: 24, fontSize: 16, radius: 16 },
 },
} as const;
