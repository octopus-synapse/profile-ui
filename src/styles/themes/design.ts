import { accentColors } from "../../tokens/colors";

/**
 * Design variant theme
 * Accent: Purple (creative, innovative, artistic)
 */
export const designTheme = {
 name: "design" as const,
 label: "Design",
 description: "UX/UI Design & Creative",
 accent: accentColors.design,

 // Semantic color overrides for design context
 semantic: {
  // Design system colors
  primary: "#A855F7",
  secondary: "#EC4899",
  tertiary: "#06B6D4",

  // Feedback states
  positive: "#22C55E",
  negative: "#EF4444",
  neutral: "#6B7280",

  // Accessibility indicators
  a11yPass: "#22C55E",
  a11yFail: "#EF4444",
  a11yWarning: "#EAB308",
 },
} as const;

export type DesignTheme = typeof designTheme;
