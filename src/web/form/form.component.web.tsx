

"use client";

import { forwardRef, type FormHTMLAttributes } from "react";
import {
 useForm,
 type FormProps,
 type FormFieldProps,
 type FormLabelProps,
 type FormDescriptionProps,
 type FormErrorProps,
 type FormActionsProps,
 formTokens,
} from "../../shared/form";
import { cn } from "../../utils/cn";



export interface WebFormProps
 extends FormProps,
  Omit<FormHTMLAttributes<HTMLFormElement>, keyof FormProps> {}

export const Form = forwardRef<HTMLFormElement, WebFormProps>(
 ({ className, children, onSubmit, testID, ...props }, ref) => {
  const formSubmitHandler = onSubmit ? async (_data: Record<string, any>) => {
    // Call the onSubmit prop (may not use data)
    onSubmit();
  } : undefined;

  const { handleSubmit } = useForm({ onSubmit: formSubmitHandler });

  return (
   <form
    ref={ref}
    data-testid={testID}
    onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}
    className={cn("space-y-6", className)}
    {...props}
   >
    {children}
   </form>
  );
 }
);

Form.displayName = "Form";



export function FormField({ name, error, children }: FormFieldProps) {
  // Simplified: useFormField expects a form controller but we don't have it in this context
  // For now, render with minimal logic
  const id = `form-field-${name}`;
  const hasError = typeof error === 'string' || error === true;
  const errorMessage = typeof error === 'string' ? error : undefined;

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
