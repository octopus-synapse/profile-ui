

import type { ReactNode } from "react";





export type BadgeVariant =
 | "default"
 | "secondary"
 | "primary"
 | "outline"
 | "success"
 | "warning"
 | "error"
 | "info";

export type BadgeSize = "xs" | "sm" | "md" | "lg";
export type BadgeShape = "rounded" | "pill" | "square";





export interface BadgeProps {
 children: ReactNode;
 variant?: BadgeVariant;
 size?: BadgeSize;
 shape?: BadgeShape;
 dot?: boolean;
 removable?: boolean;
 onRemove?: () => void;
 testID?: string;
}





export const badgeTokens = {
 variants: {
  default: { background: "#171717", text: "#ffffff", border: "transparent" },
  secondary: { background: "#262626", text: "#a3a3a3", border: "transparent" },
  primary: { background: "#06b6d4", text: "#000000", border: "transparent" },
  outline: {
   background: "transparent",
   text: "#ffffff",
   border: "rgba(255,255,255,0.1)",
  },
  success: {
   background: "rgba(22,163,74,0.1)",
   text: "#22c55e",
   border: "transparent",
  },
  warning: {
   background: "rgba(202,138,4,0.1)",
   text: "#f59e0b",
   border: "transparent",
  },
  error: {
   background: "rgba(220,38,38,0.1)",
   text: "#ef4444",
   border: "transparent",
  },
  info: {
   background: "rgba(37,99,235,0.1)",
   text: "#3b82f6",
   border: "transparent",
  },
 },
 sizes: {
  xs: { paddingH: 6, paddingV: 2, fontSize: 10 },
  sm: { paddingH: 8, paddingV: 2, fontSize: 12 },
  md: { paddingH: 10, paddingV: 4, fontSize: 12 },
  lg: { paddingH: 12, paddingV: 4, fontSize: 14 },
 },
 shapes: {
  rounded: { radius: 6 },
  pill: { radius: 9999 },
  square: { radius: 0 },
 },
 dot: { size: 6, gap: 6 },
} as const;
