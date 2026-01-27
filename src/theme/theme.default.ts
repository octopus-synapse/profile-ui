

import type { Theme } from "./theme.types";

export const darkTheme: Theme = {
  colors: {
    background: "#020202",
    foreground: "#fafafa",
    primary: "#ffffff",
    primaryForeground: "#000000",
    secondary: "#171717",
    secondaryForeground: "#fafafa",
    accent: "#06b6d4",
    accentForeground: "#000000",
    muted: "#262626",
    mutedForeground: "#a3a3a3",
    border: "rgba(255,255,255,0.1)",
    ring: "#06b6d4",
    destructive: "#ef4444",
    destructiveForeground: "#ffffff",
    success: "#22c55e",
    successForeground: "#ffffff",
    warning: "#eab308",
    warningForeground: "#000000",
  },
  spacing: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
    24: 96,
  },
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  typography: {
    fontFamily: {
      sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"Fira Code", "JetBrains Mono", Consolas, monospace',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      "2xl": 24,
      "3xl": 30,
      "4xl": 36,
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
};

export const lightTheme: Theme = {
  ...darkTheme,
  colors: {
    background: "#ffffff",
    foreground: "#0a0a0a",
    primary: "#0a0a0a",
    primaryForeground: "#ffffff",
    secondary: "#f5f5f5",
    secondaryForeground: "#0a0a0a",
    accent: "#0891b2",
    accentForeground: "#ffffff",
    muted: "#e5e5e5",
    mutedForeground: "#737373",
    border: "rgba(0,0,0,0.1)",
    ring: "#0891b2",
    destructive: "#dc2626",
    destructiveForeground: "#ffffff",
    success: "#16a34a",
    successForeground: "#ffffff",
    warning: "#ca8a04",
    warningForeground: "#000000",
  },
};

export function createTheme(overrides?: Partial<Theme>): Theme {
  return {
    ...darkTheme,
    ...overrides,
    colors: { ...darkTheme.colors, ...overrides?.colors },
    spacing: { ...darkTheme.spacing, ...overrides?.spacing },
    borderRadius: { ...darkTheme.borderRadius, ...overrides?.borderRadius },
    typography: {
      ...darkTheme.typography,
      ...overrides?.typography,
      fontFamily: { ...darkTheme.typography.fontFamily, ...overrides?.typography?.fontFamily },
      fontSize: { ...darkTheme.typography.fontSize, ...overrides?.typography?.fontSize },
      fontWeight: { ...darkTheme.typography.fontWeight, ...overrides?.typography?.fontWeight },
      lineHeight: { ...darkTheme.typography.lineHeight, ...overrides?.typography?.lineHeight },
    },
  };
}
