import { useState, useCallback } from 'react';
import type { ChangeEvent } from 'react';
import { TextareaProps, textareaTokens } from '../../shared/textarea/textarea.types';

export function useTextarea(props: TextareaProps & { size?: 'sm' | 'md' | 'lg' }) {
  const {
    value,
    defaultValue,
    onChange,
    onValueChange,
    disabled = false,
    readOnly = false,
    required = false,
    error,
    maxLength,
    size = 'md',
  } = props;

  const [internalValue, setInternalValue] = useState<string>(
    (value as string) ?? (defaultValue as string) ?? ''
  );

  const isControlled = value !== undefined;
  const currentValue = isControlled ? (value as string) : internalValue;

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    if (disabled || readOnly) return;
    
    const newValue = e.target.value;
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    onChange?.(e);
    onValueChange?.(newValue);
  }, [disabled, readOnly, isControlled, onChange, onValueChange]);

  const charCount = currentValue?.length ?? 0;
  // Filter boolean to avoid empty strings counting as words
  const wordCount = currentValue ? currentValue.trim().split(/\s+/).filter(Boolean).length : 0;
  
  const hasError = !!error;
  const errorMessage = typeof error === 'string' ? error : undefined;

  const isTooLong = maxLength ? charCount > maxLength : false;

  const sizeToken = textareaTokens.sizes[size];
  const stateToken = (hasError || isTooLong) ? textareaTokens.states.error : textareaTokens.states.default;

  return {
    state: {
      value: currentValue,
      charCount,
      wordCount,
      disabled,
      readOnly,
      required,
      error: hasError || isTooLong,
      errorMessage,
      isTooLong,
    },
    handlers: {
      onChange: handleChange,
    },
    styles: {
        root: {
            minHeight: sizeToken.minHeight,
            paddingLeft: sizeToken.paddingH,
            paddingRight: sizeToken.paddingH,
            paddingTop: sizeToken.paddingV,
            paddingBottom: sizeToken.paddingV,
            fontSize: sizeToken.fontSize,
            borderColor: stateToken.border,
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? 'not-allowed' : 'text',
        }
    },
    accessibility: {
      'aria-invalid': hasError || isTooLong,
      'aria-required': required,
      'aria-readonly': readOnly,
      'aria-disabled': disabled,
    }
  };
}
