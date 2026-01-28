

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SpinnerVariant = "primary" | "secondary" | "muted";

export interface SpinnerProps {
 size?: SpinnerSize;
 variant?: SpinnerVariant;
 label?: string;
 testID?: string;
}

export const spinnerTokens = {
 sizes: { 
   xs: { size: 12, strokeWidth: 2 }, 
   sm: { size: 16, strokeWidth: 2 }, 
   md: { size: 24, strokeWidth: 3 }, 
   lg: { size: 32, strokeWidth: 3 }, 
   xl: { size: 48, strokeWidth: 4 } 
 },
 variants: { 
   primary: { color: "#06b6d4" }, 
   secondary: { color: "#ffffff" }, 
   muted: { color: "#a3a3a3" } 
 },
} as const;
