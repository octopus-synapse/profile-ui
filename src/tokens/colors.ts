
export type Variant = "dev" | "product" | "design" | "data" | "devops";


export const baseColors = {
 
 black: "#000000",
 white: "#FFFFFF",

 
 gray: {
  50: "#FAFAFA",
  100: "#F5F5F5",
  200: "#E5E5E5",
  300: "#D4D4D4",
  400: "#A3A3A3",
  500: "#737373",
  600: "#525252",
  700: "#404040",
  800: "#262626",
  900: "#171717",
  950: "#0A0A0A",
 },
} as const;


export const accentColors: Record<
 Variant,
 { main: string; light: string; dark: string }
> = {
 
 dev: {
  main: "#FFFFFF",
  light: "#FAFAFA",
  dark: "#E5E5E5",
 },

 
 product: {
  main: "#3B82F6",
  light: "#60A5FA",
  dark: "#2563EB",
 },

 
 design: {
  main: "#A855F7",
  light: "#C084FC",
  dark: "#9333EA",
 },

 
 data: {
  main: "#22C55E",
  light: "#4ADE80",
  dark: "#16A34A",
 },

 
 devops: {
  main: "#F97316",
  light: "#FB923C",
  dark: "#EA580C",
 },
} as const;


export const semanticColors = {
 success: "#22C55E",
 warning: "#EAB308",
 error: "#EF4444",
 info: "#3B82F6",
} as const;


export function getAccentColor(variant: Variant) {
 return accentColors[variant];
}


export const colors = {
 ...baseColors,
 accent: accentColors,
 semantic: semanticColors,
} as const;
