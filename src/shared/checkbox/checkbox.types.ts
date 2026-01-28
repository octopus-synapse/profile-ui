

import type { ReactNode } from "react";

export type CheckboxVariant = "default" | "error";

export interface CheckboxProps {
 checked?: boolean | 'indeterminate';
 defaultChecked?: boolean | 'indeterminate';
 variant?: CheckboxVariant;
 disabled?: boolean;
 required?: boolean;
 onCheckedChange?: (checked: boolean | 'indeterminate') => void;
 testID?: string;
 accessibilityLabel?: string;
}

export interface CheckboxWithLabelProps extends CheckboxProps {
 label?: ReactNode;
 description?: ReactNode;
 error?: string;
 id?: string;
}
