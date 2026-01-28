
import { useCallback, useState } from 'react';
import type { InputState, InputStateType } from '../../domain/entities/input/InputState';
import { inputTokens } from '../../frameworks/tokens/input-tokens';

export interface UseInputProps extends Partial<InputState> {
  onChange?: (value: string) => void;
  onBlur?: () => void;
  defaultValue?: string;
}

/**
 * useInput Hook
 * Headless hook for managing input state, validation, and styles
 */
export function useInput(props: UseInputProps = {}) {
  const {
    defaultValue = '',
    value: controlledValue,
    error: propError,
    disabled = false,
    readOnly = false,
    required = false,
    type = 'text',
    size = 'md',
    state: propState,
    onChange,
    onBlur,
  } = props;

  const [internalValue, setInternalValue] = useState(defaultValue);
  const [touched, setTouched] = useState(false);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;
  
  // Business Rule: State derivation
  const hasError = !!propError;
  const currentState: InputStateType = hasError ? 'error' : (propState || 'default');

  const handleChange = useCallback((newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  }, [isControlled, onChange]);

  const handleBlur = useCallback(() => {
    setTouched(true);
    onBlur?.();
  }, [onBlur]);

  // Style Derivation
  const sizeToken = inputTokens.sizes[size];
  const stateToken = inputTokens.states[currentState];
  const colorToken = disabled ? inputTokens.colors.disabled : inputTokens.colors;

  const styles = {
    height: sizeToken.height,
    paddingH: sizeToken.paddingH,
    fontSize: sizeToken.fontSize,
    borderRadius: inputTokens.radius,
    backgroundColor: disabled ? colorToken.background : inputTokens.colors.background,
    textColor: disabled ? colorToken.text : inputTokens.colors.text,
    borderColor: stateToken.border,
    focusColor: stateToken.focus,
  };

  return {
    state: {
      value: currentValue,
      error: propError,
      disabled,
      readOnly,
      required,
      type,
      size,
      touched,
      hasError,
    },
    styles,
    handlers: {
      handleChange,
      handleBlur,
    },
    accessibility: {
      'aria-invalid': hasError,
      'aria-required': required,
      'aria-disabled': disabled,
      'aria-readonly': readOnly,
      role: 'textbox',
    }
  };
}
