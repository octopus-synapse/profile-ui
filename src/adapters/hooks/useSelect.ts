import { useState, useCallback } from 'react';
import { SelectProps, selectTokens } from '../../shared/select/select.types';

// We omit options and placeholder because the hook doesn't need to know about them for logic
// but the component will pass them through to the UI
export function useSelect<T = string>(props: SelectProps<T>) {
  const {
    value,
    defaultValue,
    disabled = false,
    required = false,
    error,
    state: stateProp = 'default',
    selectSize = 'md',
    onChange,
    onValueChange,
  } = props;

  const [internalValue, setInternalValue] = useState<T | null>(defaultValue ?? null);
  const [open, setOpen] = useState(false);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const hasError = !!error;
  const currentState = hasError ? 'error' : stateProp;

  const handleValueChange = useCallback((newValue: T) => {
    if (disabled) return;
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    onChange?.(newValue);
    onValueChange?.(newValue);
    setOpen(false);
  }, [disabled, isControlled, onChange, onValueChange]);

  const handleOpenChange = useCallback((newOpen: boolean) => {
    if (disabled) {
      setOpen(false);
      return;
    }
    setOpen(newOpen);
  }, [disabled]);

  // Styles
  const sizeToken = selectTokens.sizes[selectSize];
  const stateToken = selectTokens.states[currentState];

  return {
    state: {
      value: currentValue,
      open,
      disabled,
      error: hasError,
      required,
      currentSize: selectSize,
      currentState,
    },
    styles: {
      container: {
        height: sizeToken.height,
        paddingLeft: sizeToken.paddingH,
        paddingRight: sizeToken.paddingH,
        fontSize: sizeToken.fontSize,
        borderColor: stateToken.border,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      },
      tokens: {
        size: sizeToken,
        state: stateToken,
      }
    },
    handlers: {
      onValueChange: handleValueChange,
      onOpenChange: handleOpenChange,
    },
    accessibility: {
      'aria-expanded': open,
      'aria-disabled': disabled,
      'aria-required': required,
      'aria-invalid': hasError,
    }
  };
}
