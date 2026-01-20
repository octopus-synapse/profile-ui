/**
 * Tabs - Type Contract
 * @layer Domain
 */

import type { ReactNode } from "react";

export type TabsListVariant = "default" | "underline" | "pills";

export interface TabsProps {
 value?: string;
 defaultValue?: string;
 onValueChange?: (value: string) => void;
 children: ReactNode;
 testID?: string;
}

export interface TabsListProps {
 variant?: TabsListVariant;
 children: ReactNode;
}

export interface TabsTriggerProps {
 value: string;
 children: ReactNode;
 disabled?: boolean;
}

export interface TabsContentProps {
 value: string;
 children: ReactNode;
}

export const tabsTokens = {
 list: {
  default: { background: "#171717", padding: 4, radius: 8, gap: 4 },
  underline: { borderBottom: "rgba(255,255,255,0.1)", gap: 0 },
  pills: { gap: 8 },
 },
 trigger: {
  inactive: { text: "#a3a3a3" },
  active: { background: "#262626", text: "#ffffff" },
 },
} as const;
