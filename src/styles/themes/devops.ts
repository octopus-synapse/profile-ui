import { accentColors } from "../../tokens/colors";

/**
 * DevOps variant theme
 * Accent: Orange (energy, automation, infrastructure)
 */
export const devopsTheme = {
 name: "devops" as const,
 label: "DevOps",
 description: "DevOps & Infrastructure",
 accent: accentColors.devops,

 // Semantic color overrides for devops context
 semantic: {
  // Pipeline status
  running: "#3B82F6",
  success: "#22C55E",
  failed: "#EF4444",
  pending: "#EAB308",
  cancelled: "#6B7280",

  // Health status
  healthy: "#22C55E",
  degraded: "#EAB308",
  unhealthy: "#EF4444",
  unknown: "#6B7280",

  // Resource utilization
  low: "#22C55E",
  medium: "#EAB308",
  high: "#F97316",
  critical: "#EF4444",
 },
} as const;

export type DevOpsTheme = typeof devopsTheme;
