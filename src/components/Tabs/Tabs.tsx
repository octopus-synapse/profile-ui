"use client";

import {
 forwardRef,
 createContext,
 useContext,
 useState,
 type HTMLAttributes,
} from "react";
import { cn } from "../../utils/cn";
import { cva, type ExtractVariantProps } from "../../utils/cva";

// ============================================================================
// Tabs Context
// ============================================================================

interface TabsContextValue {
 value: string;
 onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
 const context = useContext(TabsContext);
 if (!context) {
  throw new Error("Tabs components must be used within a Tabs provider");
 }
 return context;
}

// ============================================================================
// Tabs Root
// ============================================================================

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
 value?: string;
 defaultValue?: string;
 onValueChange?: (value: string) => void;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
 (
  {
   className,
   value: controlledValue,
   defaultValue = "",
   onValueChange,
   children,
   ...props
  },
  ref
 ) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const value = controlledValue ?? uncontrolledValue;
  const handleValueChange = (newValue: string) => {
   if (controlledValue === undefined) {
    setUncontrolledValue(newValue);
   }
   onValueChange?.(newValue);
  };

  return (
   <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
    <div ref={ref} className={cn("w-full", className)} {...props}>
     {children}
    </div>
   </TabsContext.Provider>
  );
 }
);
Tabs.displayName = "Tabs";

// ============================================================================
// Tabs List
// ============================================================================

const tabsListVariants = cva("inline-flex items-center gap-1", {
 variants: {
  variant: {
   default: "rounded-lg bg-[var(--surface-1)] p-1",
   underline: "border-b border-[var(--border)]",
   pills: "gap-2",
  },
 },
 defaultVariants: {
  variant: "default",
 },
});

export interface TabsListProps
 extends HTMLAttributes<HTMLDivElement>,
  ExtractVariantProps<typeof tabsListVariants> {}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
 ({ className, variant, ...props }, ref) => {
  return (
   <div
    ref={ref}
    role="tablist"
    className={cn(tabsListVariants({ variant }), className)}
    {...props}
   />
  );
 }
);
TabsList.displayName = "TabsList";

// ============================================================================
// Tabs Trigger
// ============================================================================

const tabsTriggerVariants = cva(
 "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] disabled:pointer-events-none disabled:opacity-50",
 {
  variants: {
   variant: {
    default:
     "rounded-md px-3 py-1.5 data-[state=active]:bg-[var(--background)] data-[state=active]:text-[var(--text-primary)] data-[state=active]:shadow-sm text-[var(--text-secondary)]",
    underline:
     "px-4 py-2 border-b-2 border-transparent -mb-px data-[state=active]:border-[var(--accent)] data-[state=active]:text-[var(--text-primary)] text-[var(--text-secondary)]",
    pills:
     "rounded-full px-4 py-2 data-[state=active]:bg-[var(--accent)] data-[state=active]:text-[var(--accent-foreground)] text-[var(--text-secondary)] hover:bg-[var(--surface-1)]",
   },
  },
  defaultVariants: {
   variant: "default",
  },
 }
);

export interface TabsTriggerProps
 extends HTMLAttributes<HTMLButtonElement>,
  ExtractVariantProps<typeof tabsTriggerVariants> {
 value: string;
 disabled?: boolean;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
 ({ className, variant, value, disabled, ...props }, ref) => {
  const { value: selectedValue, onValueChange } = useTabsContext();
  const isActive = selectedValue === value;

  return (
   <button
    ref={ref}
    type="button"
    role="tab"
    aria-selected={isActive}
    data-state={isActive ? "active" : "inactive"}
    disabled={disabled}
    onClick={() => onValueChange(value)}
    className={cn(tabsTriggerVariants({ variant }), className)}
    {...props}
   />
  );
 }
);
TabsTrigger.displayName = "TabsTrigger";

// ============================================================================
// Tabs Content
// ============================================================================

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
 value: string;
 forceMount?: boolean;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
 ({ className, value, forceMount, children, ...props }, ref) => {
  const { value: selectedValue } = useTabsContext();
  const isActive = selectedValue === value;

  if (!forceMount && !isActive) {
   return null;
  }

  return (
   <div
    ref={ref}
    role="tabpanel"
    data-state={isActive ? "active" : "inactive"}
    hidden={!isActive}
    className={cn(
     "mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]",
     !isActive && "hidden",
     className
    )}
    tabIndex={0}
    {...props}
   >
    {children}
   </div>
  );
 }
);
TabsContent.displayName = "TabsContent";
