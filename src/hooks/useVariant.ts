"use client";

import { useMemo } from "react";
import type { Variant } from "../types";
import { useTheme } from "./useTheme";
import { accentColors } from "../tokens/colors";
import { getVariantTheme } from "../styles/themes";

export interface UseVariantOptions {
 variant?: Variant;
}

export interface UseVariantReturn {
 variant: Variant;
 accent: typeof accentColors.dev;
 theme: ReturnType<typeof getVariantTheme>;
 className: string;
   isActive: (_v: Variant) => boolean;
}

/**
 * Hook to access variant-specific styling and config
 * @param options - Override variant instead of using context
 */
export function useVariant(options?: UseVariantOptions): UseVariantReturn {
 const { variant: contextVariant } = useTheme();
 const variant = options?.variant ?? contextVariant;

 return useMemo(
  () => ({
   variant,
   accent: accentColors[variant],
   theme: getVariantTheme(variant),
   className: `variant-${variant}`,
   isActive: (_v: Variant) => _v === variant,
  }),
  [variant]
 );
}

/**
 * Get variant accent color directly
 */
export function getVariantAccent(variant: Variant) {
 return accentColors[variant];
}

/**
 * Get CSS class for variant
 */
export function getVariantClassName(variant: Variant) {
 return `variant-${variant}`;
}
