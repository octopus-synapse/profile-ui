

"use client";

import { forwardRef, type HTMLAttributes } from "react";
import {
 useAvatar,
 type AvatarProps,
 type AvatarGroupProps,
} from "../../shared/avatar";
import { cn } from "../../utils/cn";





export interface WebAvatarProps
 extends AvatarProps,
  Omit<HTMLAttributes<HTMLDivElement>, keyof AvatarProps> {}

export interface WebAvatarGroupProps
 extends AvatarGroupProps,
  Omit<HTMLAttributes<HTMLDivElement>, keyof AvatarGroupProps> {}





const sizeClasses: Record<AvatarProps["size"] & string, string> = {
 xs: "h-6 w-6 text-[10px]",
 sm: "h-8 w-8 text-xs",
 md: "h-10 w-10 text-sm",
 lg: "h-12 w-12 text-base",
 xl: "h-16 w-16 text-lg",
 "2xl": "h-20 w-20 text-xl",
 "3xl": "h-24 w-24 text-2xl",
};

const shapeClasses: Record<AvatarProps["shape"] & string, string> = {
 circle: "rounded-full",
 square: "rounded-lg",
};





export const Avatar = forwardRef<HTMLDivElement, WebAvatarProps>(
 ({ className, alt, testID, ...props }, ref) => {
  const { viewModel, getInitials, onImageError } = useAvatar(props);

  return (
   <div
    ref={ref}
    data-testid={testID}
    className={cn(
     "relative flex shrink-0 overflow-hidden items-center justify-center",
     "bg-[#171717]",
     sizeClasses[viewModel.size],
     shapeClasses[viewModel.shape],
     viewModel.ring && "ring-2 ring-[#06b6d4] ring-offset-2 ring-offset-[#020202]",
     className
    )}
    role="img"
    aria-label={alt || viewModel.fallback || "Avatar"}
   >
    {viewModel.hasImage ? (
     <img
      src={viewModel.src!}
      alt={alt || viewModel.fallback || "Avatar"}
      onError={onImageError}
      className="aspect-square h-full w-full object-cover"
      loading="lazy"
     />
    ) : (
     <span className="font-medium text-[#a3a3a3] select-none">
      {getInitials(viewModel.fallback || '') || <DefaultIcon />}
     </span>
    )}

    {viewModel.statusStyles && (
     <span
      className={cn(
       "absolute bottom-0 right-0 h-3 w-3 rounded-full",
       "border-2 border-[#020202]"
      )}
      style={{ backgroundColor: viewModel.statusStyles.color }}
      aria-label={viewModel.statusStyles.label}
     />
    )}
   </div>
  );
 }
);

Avatar.displayName = "Avatar";





export const AvatarGroup = forwardRef<HTMLDivElement, WebAvatarGroupProps>(
 (
  {
   className,
   children,
   max = 3,
   size = "md",
   shape = "circle",
   testID,
   ...props
  },
  ref
 ) => {
  const childArray = Array.isArray(children) ? children : [children];
  const visible = childArray.slice(0, max);
  const remaining = childArray.length - max;

  return (
   <div
    ref={ref}
    data-testid={testID}
    className={cn("flex -space-x-2", className)}
    role="group"
    aria-label={`Group of ${childArray.length} avatars`}
    {...props}
   >
    {visible}
    {remaining > 0 && (
     <div
      className={cn(
       "flex items-center justify-center font-medium",
       "bg-[#262626] text-[#a3a3a3]",
       "border-2 border-[#020202]",
       sizeClasses[size],
       shapeClasses[shape]
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





function DefaultIcon() {
 return (
  <svg
   className="h-1/2 w-1/2"
   fill="currentColor"
   viewBox="0 0 24 24"
   aria-hidden
  >
   <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
 );
}
