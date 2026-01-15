/**
 * TextInput Primitive - React Native Implementation
 * Re-exports TextInput from react-native with typed props
 */

import { forwardRef } from "react";
import {
 TextInput as RNTextInput,
 type TextInputProps as RNTextInputProps,
} from "react-native";
import type { TextInputProps } from "../types";

export interface NativeTextInputProps
 extends TextInputProps,
  Omit<RNTextInputProps, keyof TextInputProps> {}

export const TextInput = forwardRef<RNTextInput, NativeTextInputProps>(
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
   testID,
   accessibilityLabel,
   ...props
  },
  ref
 ) => {
  return (
   <RNTextInput
    ref={ref}
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    placeholderTextColor={placeholderTextColor}
    secureTextEntry={secureTextEntry}
    keyboardType={keyboardType}
    autoCapitalize={autoCapitalize}
    autoCorrect={autoCorrect}
    autoFocus={autoFocus}
    editable={editable}
    maxLength={maxLength}
    multiline={multiline}
    numberOfLines={numberOfLines}
    onSubmitEditing={onSubmitEditing}
    onFocus={onFocus}
    onBlur={onBlur}
    className={className}
    testID={testID}
    accessibilityLabel={accessibilityLabel}
    {...props}
   />
  );
 }
);

TextInput.displayName = "TextInput";
