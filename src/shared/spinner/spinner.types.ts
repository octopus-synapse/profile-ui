

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SpinnerColorScheme = "default" | "accent" | "muted";

export interface SpinnerProps {
 size?: SpinnerSize;
 colorScheme?: SpinnerColorScheme;
 label?: string;
 testID?: string;
}

export const spinnerTokens = {
 sizes: { xs: 12, sm: 16, md: 24, lg: 32, xl: 48 },
 colors: { default: "#ffffff", accent: "#06b6d4", muted: "#a3a3a3" },
 strokeWidth: { xs: 2, sm: 2, md: 3, lg: 3, xl: 4 },
} as const;
