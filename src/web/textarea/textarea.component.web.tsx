

"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { useTextarea, TextareaProps } from "../../shared/textarea";

export interface WebTextareaProps extends TextareaProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export const Textarea = forwardRef<HTMLTextAreaElement, WebTextareaProps>(
 (props, ref) => {
  const { 
      className, 
      size, 
      showCharacterCount, 
      showWordCount, 
      helperText,
      // Destructure these to avoid passing them to DOM element twice or conflicting
      value, defaultValue, onChange, onValueChange, error, disabled, readOnly, required,
      ...restProps 
  } = props;

  const { state, styles, handlers, accessibility } = useTextarea(props);

  return (
   <div className="w-full">
    <textarea
     ref={ref}
     value={state.value}
     disabled={state.disabled}
     readOnly={state.readOnly}
     required={state.required}
     className={cn(
      "flex w-full rounded-md border bg-[#030303] text-white placeholder:text-zinc-600",
      "focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303] focus-visible:outline-none",
      "resize-y transition-colors",
      className,
     )}
     style={{
         ...styles.root,
     }}
     onChange={handlers.onChange}
     {...accessibility}
     {...restProps}
    />
    
    {(helperText || state.errorMessage || showCharacterCount || showWordCount) && (
        <div className="mt-1 flex items-center justify-between text-xs">
           <div className={state.error ? "text-red-500" : "text-zinc-500"}>
               {state.errorMessage || helperText}
           </div>
           
           {(showCharacterCount || showWordCount) && (
               <div className="flex gap-3 text-zinc-500">
                   {showWordCount && <span>{state.wordCount} words</span>}
                   {showCharacterCount && (
                       <span className={state.isTooLong ? "text-red-500" : ""}>
                           {state.charCount}
                           {props.maxLength && ` / ${props.maxLength}`}
                       </span>
                   )}
               </div>
           )}
        </div>
    )}
   </div>
  );
 },
);
Textarea.displayName = "Textarea";
