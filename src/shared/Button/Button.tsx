/**
 * Button - Base Component
 *
 * @principle Dependency Inversion
 * @layer Application
 */

import type { ButtonProps } from "./Button.types";
import { buttonTokens } from "./Button.types";

// =============================================================================
// Shared Hook
// =============================================================================

export function useButton(props: ButtonProps) {
 const {
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
 } = props;

 const isDisabled = disabled || loading;
 const variantToken = buttonTokens.variants[variant];
 const sizeToken = buttonTokens.sizes[size];

 return {
  isDisabled,
  variantToken,
  sizeToken,
  fullWidth,
  loading,
  variant,
  size,
 };
}

// =============================================================================
// Re-exports
// =============================================================================

export * from "./Button.types";
