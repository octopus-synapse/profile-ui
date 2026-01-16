/**
 * Skeleton - Type Contract
 * @layer Domain
 */

export type SkeletonVariant = "rectangular" | "circular" | "rounded";
export type SkeletonAnimation = "pulse" | "shimmer" | "none";

export interface SkeletonProps {
 width?: string | number;
 height?: string | number;
 variant?: SkeletonVariant;
 animation?: SkeletonAnimation;
 testID?: string;
}

export interface SkeletonTextProps {
 lines?: number;
 testID?: string;
}

export const skeletonTokens = {
 shapes: { rectangular: 0, circular: 9999, rounded: 8 },
 colors: { base: "#171717", highlight: "#262626" },
 text: { height: 16, gap: 8 },
} as const;
