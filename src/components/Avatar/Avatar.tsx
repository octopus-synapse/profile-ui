import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { cva, type ExtractVariantProps } from "../../utils/cva";
import type { Variant } from "../../types";

const avatarVariants = cva(
 "relative flex shrink-0 overflow-hidden rounded-full bg-[var(--muted)]",
 {
  variants: {
   size: {
    xs: "h-6 w-6 text-xs",
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-12 w-12 text-lg",
    xl: "h-16 w-16 text-xl",
    "2xl": "h-20 w-20 text-2xl",
   },
   ring: {
    true:
     "ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--background)]",
    false: "",
   },
  },
  defaultVariants: {
   size: "md",
   ring: false,
  },
 }
);

export interface AvatarProps
 extends HTMLAttributes<HTMLDivElement>,
  ExtractVariantProps<typeof avatarVariants> {
 /**
  * Tech area variant for ring color
  */
 variant?: Variant;

 /**
  * Image source
  */
 src?: string;

 /**
  * Alt text for image
  */
 alt?: string;

 /**
  * Fallback text (initials)
  */
 fallback?: string;

 /**
  * Online status indicator
  */
 status?: "online" | "offline" | "away" | "busy";
}

const statusColors = {
 online: "bg-[var(--success)]",
 offline: "bg-gray-500",
 away: "bg-[var(--warning)]",
 busy: "bg-[var(--error)]",
};

/**
 * Avatar - User avatar component
 * Shows image with fallback to initials
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
 (
  { className, size, ring, variant, src, alt, fallback, status, ...props },
  ref
 ) => {
  const initials = fallback
   ?.split(" ")
   .map((n) => n[0])
   .join("")
   .toUpperCase()
   .slice(0, 2);

  return (
   <div
    ref={ref}
    className={cn(avatarVariants({ size, ring }), className)}
    data-variant={variant}
    {...props}
   >
    {src ? (
     <img
      src={src}
      alt={alt || fallback || "Avatar"}
      className="aspect-square h-full w-full object-cover"
     />
    ) : (
     <span className="flex h-full w-full items-center justify-center font-medium text-[var(--muted-foreground)]">
      {initials || (
       <svg className="h-1/2 w-1/2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
       </svg>
      )}
     </span>
    )}
    {status && (
     <span
      className={cn(
       "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[var(--background)]",
       statusColors[status]
      )}
     />
    )}
   </div>
  );
 }
);

Avatar.displayName = "Avatar";

/**
 * AvatarGroup - Group of avatars with overlap
 */
export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
 /**
  * Maximum avatars to show
  */
 max?: number;

 /**
  * Avatar size
  */
 size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
 ({ className, max = 3, size = "md", children, ...props }, ref) => {
  const childArray = Array.isArray(children) ? children : [children];
  const visibleChildren = childArray.slice(0, max);
  const remaining = childArray.length - max;

  return (
   <div ref={ref} className={cn("flex -space-x-2", className)} {...props}>
    {visibleChildren}
    {remaining > 0 && (
     <div
      className={cn(
       avatarVariants({ size }),
       "flex items-center justify-center bg-[var(--muted)] text-[var(--muted-foreground)] font-medium"
      )}
     >
      +{remaining}
     </div>
    )}
   </div>
  );
 }
);

AvatarGroup.displayName = "AvatarGroup";
