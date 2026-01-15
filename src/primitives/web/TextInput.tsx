/**
 * TextInput Primitive - Web Implementation
 * Renders as input/textarea on web
 */

import {
 forwardRef,
 type InputHTMLAttributes,
 type TextareaHTMLAttributes,
 useCallback,
} from "react";
import type { TextInputProps } from "../types";
import { cn } from "../../utils/cn";

export interface WebTextInputProps
 extends TextInputProps,
  Omit<
   InputHTMLAttributes<HTMLInputElement> &
    TextareaHTMLAttributes<HTMLTextAreaElement>,
   keyof TextInputProps | "onChange"
  > {}

export const TextInput = forwardRef<
 HTMLInputElement | HTMLTextAreaElement,
 WebTextInputProps
>(
 (
  {
   value,
   onChangeText,
   placeholder,
   placeholderTextColor,
   secureTextEntry,
   keyboardType = "default",
   autoCapitalize = "sentences",
   autoCorrect = true,
   autoFocus,
   editable = true,
   maxLength,
   multiline,
   numberOfLines,
   onSubmitEditing,
   onFocus,
   onBlur,
   className,
   style,
   testID,
   accessibilityLabel,
   ...props
  },
  ref
 ) => {
  // Map keyboardType to input type
  const inputType = {
   default: "text",
   "email-address": "email",
   numeric: "number",
   "phone-pad": "tel",
   url: "url",
  }[keyboardType];

  // Handle change
  const handleChange = useCallback(
   (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChangeText?.(e.target.value);
   },
   [onChangeText]
  );

  // Handle key press for submit
  const handleKeyPress = useCallback(
   (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline && onSubmitEditing) {
     e.preventDefault();
     onSubmitEditing();
    }
   },
   [multiline, onSubmitEditing]
  );

  // Common props
  const commonProps = {
   value,
   onChange: handleChange,
   onKeyPress: handleKeyPress,
   placeholder,
   autoFocus,
   disabled: !editable,
   maxLength,
   onFocus,
   onBlur,
   className: cn(
    "outline-none",
    !editable && "cursor-not-allowed opacity-50",
    className
   ),
   style: {
    ...(style as React.CSSProperties),
    ...(placeholderTextColor &&
     ({
      "--placeholder-color": placeholderTextColor,
     } as React.CSSProperties)),
   },
   "data-testid": testID,
   "aria-label": accessibilityLabel,
   autoComplete: autoCorrect ? "on" : "off",
   autoCapitalize: autoCapitalize === "none" ? "off" : autoCapitalize,
  };

  if (multiline) {
   return (
    <textarea
     ref={ref as React.Ref<HTMLTextAreaElement>}
     rows={numberOfLines}
     {...commonProps}
     {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
    />
   );
  }

  return (
   <input
    ref={ref as React.Ref<HTMLInputElement>}
    type={secureTextEntry ? "password" : inputType}
    {...commonProps}
    {...(props as InputHTMLAttributes<HTMLInputElement>)}
   />
  );
 }
);

TextInput.displayName = "TextInput";
