import type { Variant } from "../types";

/**
 * Base colors - Always B&W
 */
export const baseColors = {
 // Pure
 black: "#000000",
 white: "#FFFFFF",

 // Grays (neutral scale)
 gray: {
  50: "#FAFAFA",
  100: "#F5F5F5",
  200: "#E5E5E5",
  300: "#D4D4D4",
  400: "#A3A3A3",
  500: "#737373",
  600: "#525252",
  700: "#404040",
  800: "#262626",
  900: "#171717",
  950: "#0A0A0A",
 },
} as const;

/**
 * Accent colors per variant
 * Sempre preto e branco com um toque de cor por área
 */
export const accentColors: Record<
 Variant,
 { main: string; light: string; dark: string }
> = {
 // Dev: White accent (pure, clean, minimal)
 dev: {
  main: "#FFFFFF",
  light: "#FAFAFA",
  dark: "#E5E5E5",
 },

 // Product: Blue (strategic, trustworthy)
 product: {
  main: "#3B82F6",
  light: "#60A5FA",
  dark: "#2563EB",
 },

 // Design: Purple (creative, innovative)
 design: {
  main: "#A855F7",
  light: "#C084FC",
  dark: "#9333EA",
 },

 // Data: Green (growth, insights)
 data: {
  main: "#22C55E",
  light: "#4ADE80",
  dark: "#16A34A",
 },

 // DevOps: Orange (energy, automation)
 devops: {
  main: "#F97316",
  light: "#FB923C",
  dark: "#EA580C",
 },
} as const;

/**
 * Semantic colors
 */
export const semanticColors = {
 success: "#22C55E",
 warning: "#EAB308",
 error: "#EF4444",
 info: "#3B82F6",
} as const;

/**
 * Get accent color for a variant
 */
export function getAccentColor(variant: Variant) {
 return accentColors[variant];
}

/**
 * All colors export
 */
export const colors = {
 ...baseColors,
 accent: accentColors,
 semantic: semanticColors,
} as const;
