import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
 /**
  * Width (CSS value or Tailwind class)
  */
 width?: string;

 /**
  * Height (CSS value or Tailwind class)
  */
 height?: string;

 /**
  * Shape variant
  */
 variant?: "rectangular" | "circular" | "rounded";

 /**
  * Animation style
  */
 animation?: "pulse" | "shimmer" | "none";
}

/**
 * Skeleton - Loading placeholder
 * Universal design for content loading states
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
 (
  {
   className,
   width,
   height,
   variant = "rounded",
   animation = "shimmer",
   ...props
  },
  ref
 ) => {
  const shapeClasses = {
   rectangular: "rounded-none",
   circular: "rounded-full",
   rounded: "rounded-lg",
  };

  const animationClasses = {
   pulse: "animate-pulse bg-[var(--surface-1,var(--muted))]",
   shimmer: "skeleton-loading",
   none: "bg-[var(--surface-1,var(--muted))]",
  };

  return (
   <div
    ref={ref}
    className={cn(
     shapeClasses[variant],
     animationClasses[animation],
     className
    )}
    style={{
     width: width,
     height: height,
    }}
    aria-hidden="true"
    {...props}
   />
  );
 }
);

Skeleton.displayName = "Skeleton";

/**
 * SkeletonText - Text line placeholder
 */
export interface SkeletonTextProps extends HTMLAttributes<HTMLDivElement> {
 /**
  * Number of lines
  */
 lines?: number;
}

export const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
 ({ className, lines = 1, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props}>
   {Array.from({ length: lines }).map((_, i) => (
    <Skeleton
     key={i}
     className={cn("h-4", i === lines - 1 && lines > 1 ? "w-3/4" : "w-full")}
    />
   ))}
  </div>
 )
);

SkeletonText.displayName = "SkeletonText";

/**
 * SkeletonAvatar - Avatar placeholder
 */
export interface SkeletonAvatarProps extends HTMLAttributes<HTMLDivElement> {
 size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

const avatarSizes = {
 xs: "h-6 w-6",
 sm: "h-8 w-8",
 md: "h-10 w-10",
 lg: "h-12 w-12",
 xl: "h-16 w-16",
 "2xl": "h-20 w-20",
};

export const SkeletonAvatar = forwardRef<HTMLDivElement, SkeletonAvatarProps>(
 ({ className, size = "md", ...props }, ref) => (
  <Skeleton
   ref={ref}
   variant="circular"
   className={cn(avatarSizes[size], className)}
   {...props}
  />
 )
);

SkeletonAvatar.displayName = "SkeletonAvatar";
