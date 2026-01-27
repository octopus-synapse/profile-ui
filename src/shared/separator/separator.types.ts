

export type SeparatorOrientation = "horizontal" | "vertical";

export interface SeparatorProps {
 orientation?: SeparatorOrientation;
 decorative?: boolean;
 testID?: string;
}

export const separatorTokens = {
 color: "rgba(255,255,255,0.1)",
 thickness: 1,
} as const;
