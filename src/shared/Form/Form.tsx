/**
 * Form - Shared Hook
 * @layer Application (Shared Logic)
 */

import { useCallback, useMemo } from "react";
import type { FormProps } from "./Form.types";

export type FormSpacing = "sm" | "md" | "lg";
export type FormLayout = "vertical" | "horizontal";

export interface UseFormProps extends FormProps {
 spacing?: FormSpacing;
 layout?: FormLayout;
}

export function useForm({
 onSubmit,
 spacing = "md",
 layout = "vertical",
}: UseFormProps) {
 const handleSubmit = useCallback(
  (e?: React.FormEvent) => {
   e?.preventDefault();
   onSubmit?.();
  },
  [onSubmit]
 );

 const spacingValue = useMemo(() => {
  const spacingMap: Record<FormSpacing, number> = {
   sm: 12,
   md: 20,
   lg: 28,
  };
  return spacingMap[spacing];
 }, [spacing]);

 return {
  handleSubmit,
  spacingValue,
  layout,
  spacing,
 };
}

export interface UseFormFieldProps {
 name?: string;
 error?: string;
}

export function useFormField({ name, error }: UseFormFieldProps) {
 const id = useMemo(
  () => name ?? `field-${Math.random().toString(36).slice(2, 9)}`,
  [name]
 );
 const hasError = Boolean(error);
 const errorMessage = error;

 return {
  id,
  hasError,
  errorMessage,
 };
}

export * from "./Form.types";
