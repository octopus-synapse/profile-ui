import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import type { Variant } from "../../types";

export interface PageLayoutProps extends HTMLAttributes<HTMLDivElement> {
 /**
  * Tech area variant
  */
 variant?: Variant;

 /**
  * Header content
  */
 header?: ReactNode;

 /**
  * Sidebar content (left)
  */
 sidebar?: ReactNode;

 /**
  * Right sidebar content
  */
 rightSidebar?: ReactNode;

 /**
  * Footer content
  */
 footer?: ReactNode;

 /**
  * Sidebar width
  */
 sidebarWidth?: "sm" | "md" | "lg";

 /**
  * Full height layout
  */
 fullHeight?: boolean;
}

const sidebarWidths = {
 sm: "w-56",
 md: "w-64",
 lg: "w-72",
};

/**
 * PageLayout - Full page layout with optional header, sidebar, footer
 */
export const PageLayout = forwardRef<HTMLDivElement, PageLayoutProps>(
 (
  {
   className,
   variant,
   header,
   sidebar,
   rightSidebar,
   footer,
   sidebarWidth = "md",
   fullHeight = true,
   children,
   ...props
  },
  ref
 ) => {
  return (
   <div
    ref={ref}
    className={cn(
     "flex flex-col",
     fullHeight && "min-h-screen",
     variant && `variant-${variant}`,
     className
    )}
    data-variant={variant}
    {...props}
   >
    {/* Header */}
    {header && (
     <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/60">
      {header}
     </header>
    )}

    {/* Main content area */}
    <div className="flex flex-1">
     {/* Left Sidebar */}
     {sidebar && (
      <aside
       className={cn(
        "hidden md:flex flex-col border-r border-[var(--border)] bg-[var(--background)]",
        sidebarWidths[sidebarWidth]
       )}
      >
       {sidebar}
      </aside>
     )}

     {/* Main content */}
     <main className="flex-1 overflow-auto">{children}</main>

     {/* Right Sidebar */}
     {rightSidebar && (
      <aside
       className={cn(
        "hidden lg:flex flex-col border-l border-[var(--border)] bg-[var(--background)]",
        sidebarWidths[sidebarWidth]
       )}
      >
       {rightSidebar}
      </aside>
     )}
    </div>

    {/* Footer */}
    {footer && (
     <footer className="border-t border-[var(--border)] bg-[var(--background)]">
      {footer}
     </footer>
    )}
   </div>
  );
 }
);

PageLayout.displayName = "PageLayout";
