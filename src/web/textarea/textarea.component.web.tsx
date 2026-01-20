/**
 * Textarea - Web Implementation
 * @layer Infrastructure (Web)
 *
 * Multi-line text input component
 */

"use client";

import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
 /** Error state styling */
 error?: boolean;
 /** Custom change handler with text value */
 onChangeText?: (text: string) => void;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
 ({ className, error, onChangeText, onChange, ...props }, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
   onChange?.(e);
   onChangeText?.(e.target.value);
  };

  return (
   <textarea
    ref={ref}
    className={cn(
     "flex min-h-[80px] w-full rounded-md px-3 py-2 text-sm",
     "border border-white/10 bg-[#030303]",
     "text-white placeholder:text-zinc-600",
     "ring-offset-[#030303]",
     "focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:outline-none",
     "disabled:cursor-not-allowed disabled:opacity-50",
     "resize-y",
     error && "border-red-500 focus-visible:ring-red-500",
     className,
    )}
    onChange={handleChange}
    {...props}
   />
  );
 },
);
Textarea.displayName = "Textarea";
