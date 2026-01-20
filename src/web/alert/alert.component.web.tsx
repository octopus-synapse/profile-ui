/**
 * Alert - Web Implementation
 * @layer Infrastructure (Web)
 *
 * Alert messages with different variants
 */

"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";

export type AlertVariant =
 | "default"
 | "info"
 | "success"
 | "warning"
 | "danger";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
 /** Alert variant */
 variant?: AlertVariant;
 /** Optional icon to display */
 icon?: ReactNode;
}

const variantStyles: Record<AlertVariant, string> = {
 default: "bg-white/5 border-white/10 text-white",
 info: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
 success: "bg-emerald-500/10 border-emerald-500/30 text-emerald-500",
 warning: "bg-amber-500/10 border-amber-500/30 text-amber-500",
 danger: "bg-red-500/10 border-red-500/30 text-red-500",
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
 ({ className, variant = "default", icon, children, ...props }, ref) => (
  <div
   ref={ref}
   role="alert"
   className={cn(
    "relative w-full rounded-lg border p-4",
    icon &&
     "[&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-current",
    variantStyles[variant],
    className,
   )}
   {...props}
  >
   {icon}
   {children}
  </div>
 ),
);
Alert.displayName = "Alert";

export interface AlertTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export const AlertTitle = forwardRef<HTMLParagraphElement, AlertTitleProps>(
 ({ className, ...props }, ref) => (
  <h5
   ref={ref}
   className={cn("mb-1 leading-none font-medium tracking-tight", className)}
   {...props}
  />
 ),
);
AlertTitle.displayName = "AlertTitle";

export interface AlertDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export const AlertDescription = forwardRef<
 HTMLParagraphElement,
 AlertDescriptionProps
>(({ className, ...props }, ref) => (
 <div
  ref={ref}
  className={cn("text-sm opacity-90 [&_p]:leading-relaxed", className)}
  {...props}
 />
));
AlertDescription.displayName = "AlertDescription";
