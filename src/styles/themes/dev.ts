import { accentColors } from "../../tokens/colors";

/**
 * Dev variant theme
 * Accent: White (pure, clean, minimal - the OG dev aesthetic)
 */
export const devTheme = {
 name: "dev" as const,
 label: "Development",
 description: "Programming & Software Development",
 accent: accentColors.dev,

 // Semantic color overrides for dev context
 semantic: {
  // Git-style colors
  added: "#22C55E",
  removed: "#EF4444",
  modified: "#EAB308",

  // Syntax highlighting accents
  keyword: "#C084FC",
  string: "#4ADE80",
  number: "#60A5FA",
  comment: "#6B7280",
 },
} as const;

export type DevTheme = typeof devTheme;
