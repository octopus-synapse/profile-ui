/**
 * Tabs - Web Implementation
 * @layer Infrastructure (Web)
 */

"use client";

import {
 forwardRef,
 createContext,
 useContext,
 type HTMLAttributes,
} from "react";
import {
 useTabs,
 type TabsProps,
 type TabsListProps,
 type TabsTriggerProps,
 type TabsContentProps,
 type TabsListVariant,
 tabsTokens,
} from "../../shared/tabs";
import { cn } from "../../utils/cn";

// ─── Context ─────────────────────────────────────────────────────────────────

interface TabsContextValue {
 value: string;
 setValue: (v: string) => void;
 variant: TabsListVariant;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
 const ctx = useContext(TabsContext);
 if (!ctx) throw new Error("Tabs components must be used within Tabs");
 return ctx;
}

// ─── Tabs Root ───────────────────────────────────────────────────────────────

export interface WebTabsProps
 extends TabsProps,
  Omit<HTMLAttributes<HTMLDivElement>, keyof TabsProps> {}

export const Tabs = forwardRef<HTMLDivElement, WebTabsProps>(
 ({ className, children, testID, ...props }, ref) => {
  const { value, setValue } = useTabs({ ...props, children });

  return (
   <TabsContext.Provider value={{ value, setValue, variant: "default" }}>
    <div ref={ref} data-testid={testID} className={cn("w-full", className)}>
     {children}
    </div>
   </TabsContext.Provider>
  );
 }
);

Tabs.displayName = "Tabs";

// ─── Tabs List ───────────────────────────────────────────────────────────────

export interface WebTabsListProps extends TabsListProps {}

export function TabsList({ variant = "default", children }: WebTabsListProps) {
 const ctx = useTabsContext();
 const listStyle = tabsTokens.list[variant];

 return (
  <TabsContext.Provider value={{ ...ctx, variant }}>
   <div
    role="tablist"
    className={cn("flex", variant === "default" && "inline-flex")}
    style={{
     gap: "gap" in listStyle ? listStyle.gap : 0,
     padding: "padding" in listStyle ? listStyle.padding : 0,
     borderRadius: "radius" in listStyle ? listStyle.radius : 0,
     backgroundColor:
      "background" in listStyle ? listStyle.background : "transparent",
     borderBottom:
      "borderBottom" in listStyle
       ? `1px solid ${listStyle.borderBottom}`
       : undefined,
    }}
   >
    {children}
   </div>
  </TabsContext.Provider>
 );
}

// ─── Tabs Trigger ────────────────────────────────────────────────────────────

export interface WebTabsTriggerProps extends TabsTriggerProps {}

export function TabsTrigger({
 value,
 children,
 disabled = false,
}: WebTabsTriggerProps) {
 const { value: activeValue, setValue, variant } = useTabsContext();
 const isActive = activeValue === value;

 return (
  <button
   type="button"
   role="tab"
   aria-selected={isActive}
   disabled={disabled}
   onClick={() => setValue(value)}
   className={cn(
    "px-3 py-1.5 text-sm font-medium transition-all",
    "focus-visible:outline-none focus-visible:ring-2",
    disabled && "opacity-50 cursor-not-allowed"
   )}
   style={{
    color: isActive
     ? tabsTokens.trigger.active.text
     : tabsTokens.trigger.inactive.text,
    backgroundColor: isActive
     ? tabsTokens.trigger.active.background
     : "transparent",
    borderRadius: variant === "pills" || variant === "default" ? 6 : 0,
   }}
  >
   {children}
  </button>
 );
}

// ─── Tabs Content ────────────────────────────────────────────────────────────

export interface WebTabsContentProps extends TabsContentProps {}

export function TabsContent({ value, children }: WebTabsContentProps) {
 const { value: activeValue } = useTabsContext();
 if (activeValue !== value) return null;
 return <div role="tabpanel">{children}</div>;
}
