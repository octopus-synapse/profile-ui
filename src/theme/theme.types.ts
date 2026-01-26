

import type { ReactNode } from "react";

export type ColorMode = "light" | "dark" | "system";

export interface ThemeColors {
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  ring: string;
  destructive: string;
  destructiveForeground: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
}

export interface ThemeSpacing {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  8: number;
  10: number;
  12: number;
  16: number;
  20: number;
  24: number;
}

export interface ThemeBorderRadius {
  none: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

export interface ThemeTypography {
  fontFamily: {
    sans: string;
    mono: string;
  };
  fontSize: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    "2xl": number;
    "3xl": number;
    "4xl": number;
  };
  fontWeight: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  typography: ThemeTypography;
}

export interface ThemeContextValue {
  theme: Theme;
  colorMode: ColorMode;
  resolvedColorMode: "light" | "dark";
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
  theme?: Partial<Theme>;
  defaultColorMode?: ColorMode;
  storageKey?: string;
}
