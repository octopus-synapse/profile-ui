/**
 * Skeleton - Web Implementation
 * @layer Infrastructure (Web)
 */

"use client";

import { forwardRef, type HTMLAttributes } from "react";
import {
 useSkeleton,
 type SkeletonProps,
 skeletonTokens,
} from "../../shared/skeleton";
import { cn } from "../../utils/cn";

export interface WebSkeletonProps
 extends SkeletonProps,
  Omit<HTMLAttributes<HTMLDivElement>, keyof SkeletonProps> {}

export const Skeleton = forwardRef<HTMLDivElement, WebSkeletonProps>(
 ({ className, width = "100%", height = 20, testID, ...props }, ref) => {
  const { radius, animation } = useSkeleton(props);

  return (
   <div
    ref={ref}
    data-testid={testID}
    className={cn(
     animation === "pulse" && "animate-pulse",
     animation === "shimmer" && "animate-shimmer",
     className
    )}
    style={{
     width,
     height,
     borderRadius: radius,
     backgroundColor: skeletonTokens.colors.base,
    }}
   />
  );
 }
);

Skeleton.displayName = "Skeleton";

// ─── Skeleton Variants ───────────────────────────────────────────────────────

export interface SkeletonTextProps {
 lines?: number;
 testID?: string;
 className?: string;
}

export function SkeletonText({
 lines = 3,
 testID,
 className,
}: SkeletonTextProps) {
 return (
  <div
   data-testid={testID}
   className={cn("flex flex-col", className)}
   style={{ gap: skeletonTokens.text.gap }}
  >
   {Array.from({ length: lines }).map((_, i) => (
    <Skeleton
     key={i}
     width={i === lines - 1 ? "60%" : "100%"}
     height={skeletonTokens.text.height}
     variant="rounded"
    />
   ))}
  </div>
 );
}

export interface SkeletonAvatarProps {
 size?: number;
 className?: string;
}

export function SkeletonAvatar({ size = 40, className }: SkeletonAvatarProps) {
 return (
  <Skeleton
   width={size}
   height={size}
   variant="circular"
   className={className}
  />
 );
}
