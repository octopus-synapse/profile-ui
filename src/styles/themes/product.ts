import { accentColors } from "../../tokens/colors";

/**
 * Product variant theme
 * Accent: Blue (strategic, trustworthy, corporate-friendly)
 */
export const productTheme = {
 name: "product" as const,
 label: "Product",
 description: "Product Management & Strategy",
 accent: accentColors.product,

 // Semantic color overrides for product context
 semantic: {
  // Priority levels
  critical: "#EF4444",
  high: "#F97316",
  medium: "#EAB308",
  low: "#22C55E",

  // Status
  backlog: "#6B7280",
  inProgress: "#3B82F6",
  review: "#A855F7",
  done: "#22C55E",
 },
} as const;

export type ProductTheme = typeof productTheme;
