import type { SkeletonProps } from "./Skeleton.types";
import { skeletonTokens } from "./Skeleton.types";

export function useSkeleton(props: SkeletonProps) {
 const { variant = "rounded", animation = "shimmer" } = props;
 const radius = skeletonTokens.shapes[variant];
 return { radius, animation, variant };
}

export * from "./Skeleton.types";
