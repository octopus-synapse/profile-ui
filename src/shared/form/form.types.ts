

import type { ReactNode } from "react";

export interface FormProps {
 children: ReactNode;
 onSubmit?: () => void;
 testID?: string;
}

export interface FormFieldProps {
 name: string;
 error?: string;
 children: ReactNode;
}

export interface FormLabelProps {
 children: ReactNode;
 required?: boolean;
 htmlFor?: string;
}

export interface FormDescriptionProps {
 children: ReactNode;
}
export interface FormErrorProps {
 children: ReactNode;
}

export interface FormSectionProps {
 title?: string;
 description?: string;
 children: ReactNode;
}

export interface FormActionsProps {
 children: ReactNode;
 align?: "left" | "center" | "right" | "between";
}

export const formTokens = {
 field: { gap: 8, marginBottom: 24 },
 label: { fontSize: 14, color: "#ffffff", required: "#ef4444" },
 description: { fontSize: 12, color: "#a3a3a3" },
 error: { fontSize: 12, color: "#ef4444" },
 actions: { gap: 12, paddingTop: 24 },
} as const;
