/**
 * Form - Web Implementation
 * @layer Infrastructure (Web)
 */

"use client";

import { forwardRef, type FormHTMLAttributes } from "react";
import {
 useForm,
 useFormField,
 type FormProps,
 type FormFieldProps,
 type FormLabelProps,
 type FormDescriptionProps,
 type FormErrorProps,
 type FormActionsProps,
 formTokens,
} from "../../shared/Form";
import { cn } from "../../utils/cn";

// ─── Form Root ───────────────────────────────────────────────────────────────

export interface WebFormProps
 extends FormProps,
  Omit<FormHTMLAttributes<HTMLFormElement>, keyof FormProps> {}

export const Form = forwardRef<HTMLFormElement, WebFormProps>(
 ({ className, children, onSubmit, testID, ...props }, ref) => {
  const { handleSubmit } = useForm({ onSubmit, children });

  return (
   <form
    ref={ref}
    data-testid={testID}
    onSubmit={handleSubmit}
    className={cn("space-y-6", className)}
    {...props}
   >
    {children}
   </form>
  );
 }
);

Form.displayName = "Form";

// ─── Form Field ──────────────────────────────────────────────────────────────

export function FormField({ name, error, children }: FormFieldProps) {
 const { id, hasError, errorMessage } = useFormField({ name, error });

 return (
  <div
   className="space-y-2"
   style={{ marginBottom: formTokens.field.marginBottom }}
  >
   {children}
   {hasError && errorMessage && (
    <p
     id={`${id}-error`}
     style={{
      fontSize: formTokens.error.fontSize,
      color: formTokens.error.color,
     }}
    >
     {errorMessage}
    </p>
   )}
  </div>
 );
}

// ─── Form Label ──────────────────────────────────────────────────────────────

export function FormLabel({
 children,
 required = false,
 htmlFor,
}: FormLabelProps) {
 return (
  <label
   htmlFor={htmlFor}
   style={{
    fontSize: formTokens.label.fontSize,
    color: formTokens.label.color,
   }}
  >
   {children}
   {required && <span style={{ color: formTokens.label.required }}> *</span>}
  </label>
 );
}

// ─── Form Description ────────────────────────────────────────────────────────

export function FormDescription({ children }: FormDescriptionProps) {
 return (
  <p
   style={{
    fontSize: formTokens.description.fontSize,
    color: formTokens.description.color,
   }}
  >
   {children}
  </p>
 );
}

// ─── Form Error ──────────────────────────────────────────────────────────────

export function FormError({ children }: FormErrorProps) {
 return (
  <p
   style={{
    fontSize: formTokens.error.fontSize,
    color: formTokens.error.color,
   }}
  >
   {children}
  </p>
 );
}

// ─── Form Actions ────────────────────────────────────────────────────────────

export function FormActions({ children, align = "right" }: FormActionsProps) {
 const justifyMap = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
  between: "space-between",
 };

 return (
  <div
   className="flex"
   style={{
    justifyContent: justifyMap[align],
    gap: formTokens.actions.gap,
    paddingTop: formTokens.actions.paddingTop,
   }}
  >
   {children}
  </div>
 );
}
