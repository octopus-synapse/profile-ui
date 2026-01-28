

"use client";

import { forwardRef, type HTMLAttributes } from "react";
import {
 useCard,
 type CardProps,
 type CardHeaderProps,
 type CardTitleProps,
 type CardDescriptionProps,
 type CardContentProps,
 type CardFooterProps,
} from "../../shared/card";
import { cn } from "../../utils/cn";

export interface WebCardProps
 extends CardProps,
  Omit<HTMLAttributes<HTMLDivElement>, keyof CardProps | "onClick"> {}

export const Card = forwardRef<HTMLDivElement, WebCardProps>(
 ({ className, children, onPress, testID, ...props }, ref) => {
  const { state, styles, handlers } = useCard({ ...props, onPress });

  return (
   <div
    ref={ref}
    data-testid={testID}
    onClick={onPress || handlers.onPress}
    role={state.interactive ? "button" : undefined}
    tabIndex={state.interactive ? 0 : undefined}
    className={cn(
     "transition-all duration-150",
     state.interactive && "cursor-pointer active:scale-[0.99]",
     state.hover === "border" && "hover:border-[rgba(255,255,255,0.2)]",
     state.hover === "lift" && "hover:shadow-lg hover:-translate-y-0.5",
     className
    )}
    style={{
     padding: styles.padding,
     borderRadius: styles.borderRadius,
     backgroundColor: styles.backgroundColor,
     borderWidth: 1,
     borderStyle: "solid",
     borderColor: styles.borderColor,
     boxShadow: styles.shadow,
    }}
   >
    {children}
   </div>
  );
 }
);

Card.displayName = "Card";

export const CardHeader = forwardRef<
 HTMLDivElement,
 CardHeaderProps & HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
 <div
  ref={ref}
  className={cn("flex flex-col space-y-1.5", className)}
  {...props}
 >
  {children}
 </div>
));
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<
 HTMLHeadingElement,
 CardTitleProps & HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
 <h3
  ref={ref}
  className={cn(
   "text-xl font-semibold leading-none tracking-tight text-white",
   className
  )}
  {...props}
 >
  {children}
 </h3>
));
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<
 HTMLParagraphElement,
 CardDescriptionProps & HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
 <p ref={ref} className={cn("text-sm text-[#a3a3a3]", className)} {...props}>
  {children}
 </p>
));
CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<
 HTMLDivElement,
 CardContentProps & HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
 <div ref={ref} className={cn("pt-4", className)} {...props}>
  {children}
 </div>
));
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<
 HTMLDivElement,
 CardFooterProps & HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
 <div
  ref={ref}
  className={cn("flex items-center pt-4 gap-2", className)}
  {...props}
 >
  {children}
 </div>
));
CardFooter.displayName = "CardFooter";
