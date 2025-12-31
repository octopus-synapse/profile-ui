import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
 /**
  * Icon to display (ReactNode for flexibility)
  */
 icon?: ReactNode;

 /**
  * Title text
  */
 title: string;

 /**
  * Description text
  */
 description?: string;

 /**
  * Action element (button, link, etc.)
  */
 action?: ReactNode;

 /**
  * Size variant
  */
 size?: "sm" | "md" | "lg";
}

/**
 * EmptyState - Placeholder for empty content
 * Use when there's no data to display
 *
 * Nielsen: Help users recognize, diagnose, and recover from errors
 * Empty states should guide users on what to do next
 */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
 (
  { className, icon, title, description, action, size = "md", ...props },
  ref
 ) => {
  const sizeStyles = {
   sm: {
    container: "py-8 px-4",
    iconWrapper: "mb-3 p-3",
    icon: "h-6 w-6",
    title: "text-base",
    description: "text-xs max-w-xs",
   },
   md: {
    container: "py-12 px-4",
    iconWrapper: "mb-4 p-4",
    icon: "h-8 w-8",
    title: "text-lg",
    description: "text-sm max-w-sm",
   },
   lg: {
    container: "py-16 px-6",
    iconWrapper: "mb-6 p-5",
    icon: "h-10 w-10",
    title: "text-xl",
    description: "text-base max-w-md",
   },
  };

  const styles = sizeStyles[size];

  return (
   <div
    ref={ref}
    className={cn(
     "flex flex-col items-center justify-center text-center",
     styles.container,
     className
    )}
    {...props}
   >
    {icon && (
     <div
      className={cn("rounded-full bg-[var(--surface-1)]", styles.iconWrapper)}
     >
      <div className={cn("text-[var(--text-tertiary)]", styles.icon)}>
       {icon}
      </div>
     </div>
    )}
    <h3
     className={cn("mb-2 font-medium text-[var(--text-primary)]", styles.title)}
    >
     {title}
    </h3>
    {description && (
     <p className={cn("mb-4 text-[var(--text-secondary)]", styles.description)}>
      {description}
     </p>
    )}
    {action && <div className="mt-2">{action}</div>}
   </div>
  );
 }
);

EmptyState.displayName = "EmptyState";
