






export const palette = {
 
 background: {
  primary: "#020202",
  secondary: "#0a0a0a",
  tertiary: "#171717",
  elevated: "#1f1f1f",
 },

 
 surface: {
  default: "#0a0a0a",
  hover: "#171717",
  active: "#262626",
  disabled: "#0a0a0a",
 },

 
 border: {
  subtle: "rgba(255, 255, 255, 0.05)",
  default: "rgba(255, 255, 255, 0.1)",
  strong: "rgba(255, 255, 255, 0.2)",
  focus: "#06b6d4",
 },

 
 text: {
  primary: "#ffffff",
  secondary: "#a3a3a3",
  tertiary: "#737373",
  muted: "#525252",
  inverse: "#000000",
 },

 
 accent: {
  default: "#06b6d4",
  light: "#22d3ee",
  dark: "#0891b2",
  muted: "rgba(6, 182, 212, 0.1)",
  border: "rgba(6, 182, 212, 0.2)",
 },

 
 semantic: {
  success: "#22c55e",
  successMuted: "rgba(34, 197, 94, 0.1)",
  warning: "#eab308",
  warningMuted: "rgba(234, 179, 8, 0.1)",
  error: "#ef4444",
  errorMuted: "rgba(239, 68, 68, 0.1)",
  info: "#3b82f6",
  infoMuted: "rgba(59, 130, 246, 0.1)",
 },

 
 pure: {
  white: "#ffffff",
  black: "#000000",
  transparent: "transparent",
 },
} as const;


export const space = {
 0: 0,
 px: 1,
 0.5: 2,
 1: 4,
 1.5: 6,
 2: 8,
 2.5: 10,
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
} as const;


export const radii = {
 none: 0,
 sm: 4,
 md: 8,
 lg: 12,
 xl: 16,
 "2xl": 24,
 full: 9999,
} as const;


export const fontSizes = {
 xs: 12,
 sm: 14,
 base: 16,
 lg: 18,
 xl: 20,
 "2xl": 24,
 "3xl": 30,
 "4xl": 36,
 "5xl": 48,
 "6xl": 60,
} as const;

export const lineHeights = {
 none: 1,
 tight: 1.25,
 snug: 1.375,
 normal: 1.5,
 relaxed: 1.625,
 loose: 2,
} as const;

export const fontWeights = {
 normal: "400" as const,
 medium: "500" as const,
 semibold: "600" as const,
 bold: "700" as const,
 extrabold: "800" as const,
};

export const fontFamilies = {
 sans: "Inter",
 mono: "JetBrains Mono",
 display: "Space Grotesk",
};


export const shadows = {
 none: {
  shadowColor: "transparent",
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0,
  shadowRadius: 0,
  elevation: 0,
 },
 sm: {
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.3,
  shadowRadius: 2,
  elevation: 2,
 },
 md: {
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 4,
 },
 lg: {
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 8,
 },
 xl: {
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.4,
  shadowRadius: 16,
  elevation: 12,
 },
 glow: {
  shadowColor: palette.accent.default,
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.5,
  shadowRadius: 12,
  elevation: 8,
 },
} as const;






export const button = {
 primary: {
  background: palette.pure.white,
  text: palette.pure.black,
  border: palette.pure.white,
  hover: {
   background: palette.text.secondary,
  },
 },
 secondary: {
  background: palette.pure.transparent,
  text: palette.pure.white,
  border: palette.border.default,
  hover: {
   background: palette.surface.hover,
  },
 },
 accent: {
  background: palette.accent.default,
  text: palette.pure.black,
  border: palette.accent.default,
  hover: {
   background: palette.accent.light,
  },
 },
 ghost: {
  background: palette.pure.transparent,
  text: palette.text.secondary,
  border: palette.pure.transparent,
  hover: {
   background: palette.surface.hover,
  },
 },
} as const;


export const input = {
 background: palette.surface.default,
 text: palette.text.primary,
 placeholder: palette.text.muted,
 border: palette.border.default,
 borderFocus: palette.accent.default,
 borderError: palette.semantic.error,
} as const;


export const card = {
 background: palette.surface.default,
 border: palette.border.subtle,
 borderHover: palette.border.default,
 radius: radii.xl,
} as const;


export const badge = {
 default: {
  background: palette.surface.hover,
  text: palette.text.secondary,
  border: palette.border.subtle,
 },
 accent: {
  background: palette.accent.muted,
  text: palette.accent.light,
  border: palette.accent.border,
 },
 success: {
  background: palette.semantic.successMuted,
  text: palette.semantic.success,
  border: "rgba(34, 197, 94, 0.2)",
 },
 warning: {
  background: palette.semantic.warningMuted,
  text: palette.semantic.warning,
  border: "rgba(234, 179, 8, 0.2)",
 },
 error: {
  background: palette.semantic.errorMuted,
  text: palette.semantic.error,
  border: "rgba(239, 68, 68, 0.2)",
 },
} as const;






export function toCSS(value: number): string {
 return `${value}px`;
}


export function toRem(px: number, base = 16): string {
 return `${px / base}rem`;
}


export function generateCSSVariables(): Record<string, string> {
 return {
  
  "--pf-bg-primary": palette.background.primary,
  "--pf-bg-secondary": palette.background.secondary,
  "--pf-bg-tertiary": palette.background.tertiary,
  "--pf-bg-elevated": palette.background.elevated,

  "--pf-surface-default": palette.surface.default,
  "--pf-surface-hover": palette.surface.hover,
  "--pf-surface-active": palette.surface.active,

  "--pf-border-subtle": palette.border.subtle,
  "--pf-border-default": palette.border.default,
  "--pf-border-strong": palette.border.strong,
  "--pf-border-focus": palette.border.focus,

  "--pf-text-primary": palette.text.primary,
  "--pf-text-secondary": palette.text.secondary,
  "--pf-text-tertiary": palette.text.tertiary,
  "--pf-text-muted": palette.text.muted,

  "--pf-accent": palette.accent.default,
  "--pf-accent-light": palette.accent.light,
  "--pf-accent-dark": palette.accent.dark,
  "--pf-accent-muted": palette.accent.muted,

  "--pf-success": palette.semantic.success,
  "--pf-warning": palette.semantic.warning,
  "--pf-error": palette.semantic.error,
  "--pf-info": palette.semantic.info,

  
  "--pf-space-1": toCSS(space[1]),
  "--pf-space-2": toCSS(space[2]),
  "--pf-space-3": toCSS(space[3]),
  "--pf-space-4": toCSS(space[4]),
  "--pf-space-5": toCSS(space[5]),
  "--pf-space-6": toCSS(space[6]),
  "--pf-space-8": toCSS(space[8]),

  
  "--pf-radius-sm": toCSS(radii.sm),
  "--pf-radius-md": toCSS(radii.md),
  "--pf-radius-lg": toCSS(radii.lg),
  "--pf-radius-xl": toCSS(radii.xl),
  "--pf-radius-full": toCSS(radii.full),
 };
}





export const designSystem = {
 palette,
 space,
 radii,
 fontSizes,
 lineHeights,
 fontWeights,
 fontFamilies,
 shadows,
 button,
 input,
 card,
 badge,
} as const;

export type DesignSystem = typeof designSystem;
export type Palette = typeof palette;
export type Space = keyof typeof space;
export type Radii = keyof typeof radii;
export type FontSize = keyof typeof fontSizes;
export type Shadow = keyof typeof shadows;
