/**
 * Tabs - Mobile Implementation
 * @layer Infrastructure (Mobile)
 */

import { createContext, useContext, type ReactNode } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import {
 useTabs,
 type TabsProps,
 type TabsListProps,
 type TabsTriggerProps,
 type TabsContentProps,
 type TabsListVariant,
 tabsTokens,
} from "../../shared/tabs";

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

export function Tabs({ children, testID, ...props }: TabsProps) {
 const { value, setValue } = useTabs({ ...props, children });

 return (
  <TabsContext.Provider value={{ value, setValue, variant: "default" }}>
   <View testID={testID}>{children}</View>
  </TabsContext.Provider>
 );
}

// ─── Tabs List ───────────────────────────────────────────────────────────────

export function TabsList({ variant = "default", children }: TabsListProps) {
 const ctx = useTabsContext();
 const listStyle = tabsTokens.list[variant];

 return (
  <TabsContext.Provider value={{ ...ctx, variant }}>
   <View
    style={[
     styles.list,
     {
      gap: "gap" in listStyle ? listStyle.gap : 0,
      padding: "padding" in listStyle ? listStyle.padding : 0,
      borderRadius: "radius" in listStyle ? listStyle.radius : 0,
      backgroundColor:
       "background" in listStyle ? listStyle.background : "transparent",
      borderBottomWidth: "borderBottom" in listStyle ? 1 : 0,
      borderBottomColor:
       "borderBottom" in listStyle ? listStyle.borderBottom : undefined,
     },
    ]}
   >
    {children}
   </View>
  </TabsContext.Provider>
 );
}

// ─── Tabs Trigger ────────────────────────────────────────────────────────────

export function TabsTrigger({
 value,
 children,
 disabled = false,
}: TabsTriggerProps) {
 const { value: activeValue, setValue, variant } = useTabsContext();
 const isActive = activeValue === value;

 return (
  <Pressable
   onPress={() => setValue(value)}
   disabled={disabled}
   style={[
    styles.trigger,
    {
     backgroundColor: isActive
      ? tabsTokens.trigger.active.background
      : "transparent",
     borderRadius: variant === "pills" || variant === "default" ? 6 : 0,
     opacity: disabled ? 0.5 : 1,
    },
   ]}
   accessibilityRole="tab"
   accessibilityState={{ selected: isActive }}
  >
   <Text
    style={{
     fontSize: 14,
     fontWeight: "500",
     color: isActive
      ? tabsTokens.trigger.active.text
      : tabsTokens.trigger.inactive.text,
    }}
   >
    {children as ReactNode}
   </Text>
  </Pressable>
 );
}

// ─── Tabs Content ────────────────────────────────────────────────────────────

export function TabsContent({ value, children }: TabsContentProps) {
 const { value: activeValue } = useTabsContext();
 if (activeValue !== value) return null;
 return <View>{children}</View>;
}

const styles = StyleSheet.create({
 list: {
  flexDirection: "row",
  alignItems: "center",
 },
 trigger: {
  paddingHorizontal: 12,
  paddingVertical: 6,
 },
});
