/**
 * Font families
 * Monospace-first for dev aesthetic
 */
export const fontFamily = {
 sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
 mono: ["JetBrains Mono", "Fira Code", "Consolas", "monospace"],
 display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
} as const;

/**
 * Font sizes (in rem)
 */
export const fontSize = {
 xs: ["0.75rem", { lineHeight: "1rem" }],
 sm: ["0.875rem", { lineHeight: "1.25rem" }],
 base: ["1rem", { lineHeight: "1.5rem" }],
 lg: ["1.125rem", { lineHeight: "1.75rem" }],
 xl: ["1.25rem", { lineHeight: "1.75rem" }],
 "2xl": ["1.5rem", { lineHeight: "2rem" }],
 "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
 "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
 "5xl": ["3rem", { lineHeight: "1" }],
 "6xl": ["3.75rem", { lineHeight: "1" }],
 "7xl": ["4.5rem", { lineHeight: "1" }],
 "8xl": ["6rem", { lineHeight: "1" }],
 "9xl": ["8rem", { lineHeight: "1" }],
} as const;

/**
 * Font weights
 */
export const fontWeight = {
 thin: "100",
 extralight: "200",
 light: "300",
 normal: "400",
 medium: "500",
 semibold: "600",
 bold: "700",
 extrabold: "800",
 black: "900",
} as const;

/**
 * Letter spacing
 */
export const letterSpacing = {
 tighter: "-0.05em",
 tight: "-0.025em",
 normal: "0em",
 wide: "0.025em",
 wider: "0.05em",
 widest: "0.1em",
} as const;

/**
 * Typography preset configurations
 */
export const typography = {
 // Headings
 h1: {
  fontSize: fontSize["5xl"],
  fontWeight: fontWeight.bold,
  fontFamily: fontFamily.display,
  letterSpacing: letterSpacing.tight,
 },
 h2: {
  fontSize: fontSize["4xl"],
  fontWeight: fontWeight.bold,
  fontFamily: fontFamily.display,
  letterSpacing: letterSpacing.tight,
 },
 h3: {
  fontSize: fontSize["3xl"],
  fontWeight: fontWeight.semibold,
  fontFamily: fontFamily.display,
 },
 h4: {
  fontSize: fontSize["2xl"],
  fontWeight: fontWeight.semibold,
  fontFamily: fontFamily.sans,
 },
 h5: {
  fontSize: fontSize.xl,
  fontWeight: fontWeight.semibold,
  fontFamily: fontFamily.sans,
 },
 h6: {
  fontSize: fontSize.lg,
  fontWeight: fontWeight.semibold,
  fontFamily: fontFamily.sans,
 },

 // Body
 body: {
  fontSize: fontSize.base,
  fontWeight: fontWeight.normal,
  fontFamily: fontFamily.sans,
 },
 bodySmall: {
  fontSize: fontSize.sm,
  fontWeight: fontWeight.normal,
  fontFamily: fontFamily.sans,
 },
 bodyLarge: {
  fontSize: fontSize.lg,
  fontWeight: fontWeight.normal,
  fontFamily: fontFamily.sans,
 },

 // Code
 code: {
  fontSize: fontSize.sm,
  fontWeight: fontWeight.normal,
  fontFamily: fontFamily.mono,
 },
 codeBlock: {
  fontSize: fontSize.sm,
  fontWeight: fontWeight.normal,
  fontFamily: fontFamily.mono,
  letterSpacing: letterSpacing.tight,
 },

 // Labels
 label: {
  fontSize: fontSize.sm,
  fontWeight: fontWeight.medium,
  fontFamily: fontFamily.sans,
  letterSpacing: letterSpacing.wide,
 },
 caption: {
  fontSize: fontSize.xs,
  fontWeight: fontWeight.normal,
  fontFamily: fontFamily.sans,
 },
} as const;
