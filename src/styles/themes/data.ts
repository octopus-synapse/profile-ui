import { accentColors } from "../../tokens/colors";

/**
 * Data variant theme
 * Accent: Green (growth, insights, analytics)
 */
export const dataTheme = {
 name: "data" as const,
 label: "Data",
 description: "Data Science & Analytics",
 accent: accentColors.data,

 // Semantic color overrides for data context
 semantic: {
  // Chart colors (colorblind-friendly palette)
  chart1: "#22C55E", // Green
  chart2: "#3B82F6", // Blue
  chart3: "#F97316", // Orange
  chart4: "#A855F7", // Purple
  chart5: "#EC4899", // Pink
  chart6: "#06B6D4", // Cyan

  // Data quality indicators
  valid: "#22C55E",
  invalid: "#EF4444",
  missing: "#6B7280",
  outlier: "#EAB308",

  // Trend indicators
  positive: "#22C55E",
  negative: "#EF4444",
  neutral: "#6B7280",
 },
} as const;

export type DataTheme = typeof dataTheme;
