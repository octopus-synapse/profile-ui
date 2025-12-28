import type { Variant } from "../../types";
import { baseColors, accentColors, semanticColors } from "../../tokens/colors";

/**
 * Base theme configuration (B&W)
 */
export const baseTheme = {
 dark: {
  background: baseColors.black,
  foreground: baseColors.white,
  muted: baseColors.gray[900],
  mutedForeground: baseColors.gray[400],
  border: baseColors.gray[800],
  card: baseColors.gray[950],
  cardForeground: baseColors.white,
  popover: baseColors.gray[950],
  popoverForeground: baseColors.white,
  input: baseColors.gray[900],
  ring: baseColors.gray[700],
 },
 light: {
  background: baseColors.white,
  foreground: baseColors.black,
  muted: baseColors.gray[100],
  mutedForeground: baseColors.gray[600],
  border: baseColors.gray[200],
  card: baseColors.white,
  cardForeground: baseColors.black,
  popover: baseColors.white,
  popoverForeground: baseColors.black,
  input: baseColors.gray[100],
  ring: baseColors.gray[300],
 },
} as const;

/**
 * Get theme colors for a specific variant and mode
 */
export function getThemeColors(
 variant: Variant,
 mode: "dark" | "light" = "dark"
) {
 const base = baseTheme[mode];
 const accent = accentColors[variant];

 return {
  ...base,
  accent: accent.main,
  accentForeground: mode === "dark" ? baseColors.black : baseColors.white,
  accentMuted: accent.light,
  accentDark: accent.dark,
  ...semanticColors,
 };
}

/**
 * CSS variables for theme
 */
export function getThemeCSSVars(
 variant: Variant,
 mode: "dark" | "light" = "dark"
) {
 const colors = getThemeColors(variant, mode);

 return {
  "--background": colors.background,
  "--foreground": colors.foreground,
  "--muted": colors.muted,
  "--muted-foreground": colors.mutedForeground,
  "--border": colors.border,
  "--card": colors.card,
  "--card-foreground": colors.cardForeground,
  "--popover": colors.popover,
  "--popover-foreground": colors.popoverForeground,
  "--input": colors.input,
  "--ring": colors.ring,
  "--accent": colors.accent,
  "--accent-foreground": colors.accentForeground,
  "--accent-muted": colors.accentMuted,
  "--success": colors.success,
  "--warning": colors.warning,
  "--error": colors.error,
  "--info": colors.info,
 };
}
