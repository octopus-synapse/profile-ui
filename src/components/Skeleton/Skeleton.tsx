import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
 /**
  * Width (Tailwind class or custom)
  */
 width?: string;

 /**
  * Height (Tailwind class or custom)
  */
 height?: string;

 /**
  * Circle shape
  */
 circle?: boolean;
}

/**
 * Skeleton - Loading placeholder
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
 ({ className, width, height, circle, ...props }, ref) => {
  return (
   <div
    ref={ref}
    className={cn(
     "animate-pulse bg-[var(--muted)]",
     circle ? "rounded-full" : "rounded-md",
     className
    )}
    style={{
     width: width,
     height: height,
    }}
    {...props}
   />
  );
 }
);

Skeleton.displayName = "Skeleton";

/**
 * SkeletonText - Text line placeholder
 */
export const SkeletonText = forwardRef<
 HTMLDivElement,
 HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
 <Skeleton ref={ref} className={cn("h-4 w-full", className)} {...props} />
));

SkeletonText.displayName = "SkeletonText";

/**
 * SkeletonAvatar - Avatar placeholder
 */
export interface SkeletonAvatarProps extends HTMLAttributes<HTMLDivElement> {
 size?: "sm" | "md" | "lg" | "xl";
}

const avatarSizes = {
 sm: "h-8 w-8",
 md: "h-10 w-10",
 lg: "h-12 w-12",
 xl: "h-16 w-16",
};

export const SkeletonAvatar = forwardRef<HTMLDivElement, SkeletonAvatarProps>(
 ({ className, size = "md", ...props }, ref) => (
  <Skeleton
   ref={ref}
   circle
   className={cn(avatarSizes[size], className)}
   {...props}
  />
 )
);

SkeletonAvatar.displayName = "SkeletonAvatar";
