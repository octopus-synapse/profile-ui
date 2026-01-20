import type { SkeletonProps } from "./skeleton.types";
import { skeletonTokens } from "./skeleton.types";

export function useSkeleton(props: SkeletonProps) {
 const { variant = "rounded", animation = "shimmer" } = props;
 const radius = skeletonTokens.shapes[variant];
 return { radius, animation, variant };
}

export * from "./skeleton.types";
