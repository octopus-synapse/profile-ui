"use client";

import {
 forwardRef,
 createContext,
 useContext,
 type HTMLAttributes,
 type FormHTMLAttributes,
} from "react";
import { cn } from "../../utils/cn";

// ============================================================================
// Form Context
// ============================================================================

interface FormFieldContextValue {
 id: string;
 name: string;
 error?: string;
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

function useFormField() {
 const context = useContext(FormFieldContext);
 return context;
}

// ============================================================================
// Form Root
// ============================================================================

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {}

export const Form = forwardRef<HTMLFormElement, FormProps>(
 ({ className, ...props }, ref) => {
  return <form ref={ref} className={cn("space-y-6", className)} {...props} />;
 }
);
Form.displayName = "Form";

// ============================================================================
// Form Field (wrapper for label + input + error)
// ============================================================================

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
 name: string;
 error?: string;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
 ({ className, name, error, children, ...props }, ref) => {
  const id = `field-${name}`;

  return (
   <FormFieldContext.Provider value={{ id, name, error }}>
    <div ref={ref} className={cn("space-y-2", className)} {...props}>
     {children}
    </div>
   </FormFieldContext.Provider>
  );
 }
);
FormField.displayName = "FormField";

// ============================================================================
// Form Label
// ============================================================================

export interface FormLabelProps extends HTMLAttributes<HTMLLabelElement> {
 required?: boolean;
}

export const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
 ({ className, required, children, ...props }, ref) => {
  const field = useFormField();

  return (
   <label
    ref={ref}
    htmlFor={field?.id}
    className={cn(
     "text-sm font-medium text-[var(--text-primary)]",
     field?.error && "text-[var(--error)]",
     className
    )}
    {...props}
   >
    {children}
    {required && <span className="ml-1 text-[var(--error)]">*</span>}
   </label>
  );
 }
);
FormLabel.displayName = "FormLabel";

// ============================================================================
// Form Control (wraps input components)
// ============================================================================

export interface FormControlProps extends HTMLAttributes<HTMLDivElement> {}

export const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
 ({ className, children, ...props }, ref) => {
  return (
   <div ref={ref} className={cn("relative", className)} {...props}>
    {children}
   </div>
  );
 }
);
FormControl.displayName = "FormControl";

// ============================================================================
// Form Description
// ============================================================================

export interface FormDescriptionProps
 extends HTMLAttributes<HTMLParagraphElement> {}

export const FormDescription = forwardRef<
 HTMLParagraphElement,
 FormDescriptionProps
>(({ className, ...props }, ref) => {
 return (
  <p
   ref={ref}
   className={cn("text-xs text-[var(--text-tertiary)]", className)}
   {...props}
  />
 );
});
FormDescription.displayName = "FormDescription";

// ============================================================================
// Form Message (error message)
// ============================================================================

export interface FormMessageProps extends HTMLAttributes<HTMLParagraphElement> {
 error?: string;
}

export const FormMessage = forwardRef<HTMLParagraphElement, FormMessageProps>(
 ({ className, error: propError, children, ...props }, ref) => {
  const field = useFormField();
  const error = propError ?? field?.error;

  if (!error && !children) {
   return null;
  }

  return (
   <p
    ref={ref}
    role="alert"
    className={cn("text-xs text-[var(--error)]", className)}
    {...props}
   >
    {error || children}
   </p>
  );
 }
);
FormMessage.displayName = "FormMessage";

// ============================================================================
// Form Actions (submit/cancel buttons container)
// ============================================================================

export interface FormActionsProps extends HTMLAttributes<HTMLDivElement> {
 align?: "left" | "center" | "right" | "between";
}

export const FormActions = forwardRef<HTMLDivElement, FormActionsProps>(
 ({ className, align = "right", ...props }, ref) => {
  const alignmentClasses = {
   left: "justify-start",
   center: "justify-center",
   right: "justify-end",
   between: "justify-between",
  };

  return (
   <div
    ref={ref}
    className={cn(
     "flex items-center gap-3 pt-4",
     alignmentClasses[align],
     className
    )}
    {...props}
   />
  );
 }
);
FormActions.displayName = "FormActions";

// ============================================================================
// Form Section (for grouping related fields)
// ============================================================================

export interface FormSectionProps extends HTMLAttributes<HTMLFieldSetElement> {
 title?: string;
 description?: string;
}

export const FormSection = forwardRef<HTMLFieldSetElement, FormSectionProps>(
 ({ className, title, description, children, ...props }, ref) => {
  return (
   <fieldset
    ref={ref}
    className={cn("space-y-4 border-0 p-0", className)}
    {...props}
   >
    {(title || description) && (
     <div className="mb-4">
      {title && (
       <legend className="text-base font-semibold text-[var(--text-primary)]">
        {title}
       </legend>
      )}
      {description && (
       <p className="mt-1 text-sm text-[var(--text-secondary)]">
        {description}
       </p>
      )}
     </div>
    )}
    <div className="space-y-4">{children}</div>
   </fieldset>
  );
 }
);
FormSection.displayName = "FormSection";
