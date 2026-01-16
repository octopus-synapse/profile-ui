/**
 * Input - Type Contract
 *
 * @principle Dependency Inversion
 * @layer Domain
 */

import type { ReactNode } from "react";

// =============================================================================
// Domain Types
// =============================================================================

export type InputSize = "sm" | "md" | "lg";
export type InputState = "default" | "error" | "success";

// =============================================================================
// Component Contract
// =============================================================================

export interface InputProps {
 value?: string;
 defaultValue?: string;
 placeholder?: string;
 type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
 inputSize?: InputSize;
 state?: InputState;
 leftAddon?: ReactNode;
 rightAddon?: ReactNode;
 error?: boolean | string;
 helperText?: string;
 disabled?: boolean;
 readOnly?: boolean;
 onChangeText?: (text: string) => void;
 onFocus?: () => void;
 onBlur?: () => void;
 onSubmit?: () => void;
 testID?: string;
 id?: string;
 accessibilityLabel?: string;
}

// =============================================================================
// Design Tokens
// =============================================================================

export const inputTokens = {
 sizes: {
  sm: { height: 32, paddingH: 12, fontSize: 14 },
  md: { height: 40, paddingH: 14, fontSize: 14 },
  lg: { height: 48, paddingH: 16, fontSize: 16 },
 },
 states: {
  default: { border: "rgba(255,255,255,0.1)", focus: "#06b6d4" },
  error: { border: "#ef4444", focus: "#ef4444" },
  success: { border: "#22c55e", focus: "#22c55e" },
 },
 colors: {
  background: "#0a0a0a",
  text: "#ffffff",
  placeholder: "#a3a3a3",
  disabled: { background: "#171717", text: "#525252" },
 },
 radius: 8,
} as const;
