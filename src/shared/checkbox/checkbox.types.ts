/**
 * Checkbox - Type Contract
 * @layer Domain
 */

import type { ReactNode } from "react";

export type CheckboxVariant = "default" | "error";

export interface CheckboxProps {
 checked?: boolean;
 defaultChecked?: boolean;
 variant?: CheckboxVariant;
 disabled?: boolean;
 onCheckedChange?: (checked: boolean) => void;
 testID?: string;
 accessibilityLabel?: string;
}

export interface CheckboxWithLabelProps extends CheckboxProps {
 label: ReactNode;
 description?: ReactNode;
 error?: string;
 id?: string;
}

export const checkboxTokens = {
 size: 16,
 radius: 4,
 variants: {
  default: {
   unchecked: { background: "#171717", border: "rgba(255,255,255,0.1)" },
   checked: { background: "#06b6d4", border: "#06b6d4", check: "#000000" },
  },
  error: {
   unchecked: { background: "#171717", border: "#ef4444" },
   checked: { background: "#ef4444", border: "#ef4444", check: "#ffffff" },
  },
 },
 colors: { label: "#ffffff", description: "#a3a3a3", error: "#ef4444" },
} as const;
