import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { cva, type ExtractVariantProps } from "../../utils/cva";

const avatarVariants = cva(
 "relative flex shrink-0 overflow-hidden bg-[var(--surface-1,var(--muted))]",
 {
  variants: {
   size: {
    xs: "h-6 w-6 text-[10px]",
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
    "2xl": "h-20 w-20 text-xl",
    "3xl": "h-24 w-24 text-2xl",
   },
   shape: {
    circle: "rounded-full",
    square: "rounded-lg",
   },
   ring: {
    true:
     "ring-2 ring-[var(--border-emphasis,var(--accent))] ring-offset-2 ring-offset-[var(--background)]",
    false: "",
   },
  },
  defaultVariants: {
   size: "md",
   shape: "circle",
   ring: false,
  },
 }
);

export interface AvatarProps
 extends HTMLAttributes<HTMLDivElement>,
  ExtractVariantProps<typeof avatarVariants> {
 /**
  * Image source URL
  */
 src?: string | null;

 /**
  * Alt text for the image
  */
 alt?: string;

 /**
  * Fallback text (name/initials)
  */
 fallback?: string;

 /**
  * Status indicator
  */
 status?: "online" | "offline" | "away" | "busy";
}

const statusColors = {
 online: "bg-[var(--success)]",
 offline: "bg-[var(--text-disabled,#a3a3a3)]",
 away: "bg-[var(--warning)]",
 busy: "bg-[var(--error)]",
};

const statusLabels = {
 online: "Online",
 offline: "Offline",
 away: "Away",
 busy: "Busy",
};

/**
 * Avatar - User avatar component
 * Universal design with image, initials fallback, and status
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
 (
  { className, size, shape, ring, src, alt, fallback, status, ...props },
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
    className={cn(avatarVariants({ size, shape, ring }), className)}
    role="img"
    aria-label={alt || fallback || "Avatar"}
    {...props}
   >
    {src && src.trim() ? (
     <img
      src={src}
      alt={alt || fallback || "Avatar"}
      className="aspect-square h-full w-full object-cover"
      loading="lazy"
     />
    ) : (
     <span className="flex h-full w-full items-center justify-center font-medium text-[var(--text-secondary,var(--muted-foreground))] select-none">
      {initials || (
       <svg
        className="h-1/2 w-1/2"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
       >
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
       </svg>
      )}
     </span>
    )}
    {status && (
     <span
      className={cn(
       "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[var(--background)]",
       statusColors[status],
       status === "online" && "pulse-dot"
      )}
      aria-label={statusLabels[status]}
     />
    )}
   </div>
  );
 }
);

Avatar.displayName = "Avatar";

/**
 * AvatarGroup - Stack of overlapping avatars
 */
export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
 /**
  * Maximum number of avatars to display
  */
 max?: number;

 /**
  * Size of avatars in the group
  */
 size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

 /**
  * Shape of avatars
  */
 shape?: "circle" | "square";
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
 (
  { className, max = 3, size = "md", shape = "circle", children, ...props },
  ref
 ) => {
  const childArray = Array.isArray(children) ? children : [children];
  const visibleChildren = childArray.slice(0, max);
  const remaining = childArray.length - max;

  return (
   <div
    ref={ref}
    className={cn("flex -space-x-2", className)}
    role="group"
    aria-label={`Group of ${childArray.length} avatars`}
    {...props}
   >
    {visibleChildren}
    {remaining > 0 && (
     <div
      className={cn(
       avatarVariants({ size, shape }),
       "flex items-center justify-center bg-[var(--surface-2,var(--muted))] text-[var(--text-secondary,var(--muted-foreground))] font-medium border-2 border-[var(--background)]"
      )}
      aria-label={`${remaining} more`}
     >
      +{remaining}
     </div>
    )}
   </div>
  );
 }
);

AvatarGroup.displayName = "AvatarGroup";
