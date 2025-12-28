import type { Variant } from "./variant.types";

/**
 * Theme mode
 */
export type ThemeMode = "dark" | "light";

/**
 * Theme configuration
 */
export interface Theme {
 mode: ThemeMode;
 variant: Variant;
 colors: ThemeColors;
}

/**
 * Theme color palette
 */
export interface ThemeColors {
 // Base B&W
 background: string;
 foreground: string;
 muted: string;
 mutedForeground: string;
 border: string;

 // Accent (per variant)
 accent: string;
 accentForeground: string;
 accentMuted: string;

 // Semantic
 success: string;
 warning: string;
 error: string;
 info: string;
}

/**
 * Theme context value
 */
export interface ThemeContextValue {
 theme: Theme;
 variant: Variant;
 setVariant: (variant: Variant) => void;
 mode: ThemeMode;
 setMode: (mode: ThemeMode) => void;
 toggleMode: () => void;
}
