
import { useCallback, useState } from 'react';
import { checkboxTokens } from '../../frameworks/tokens/checkbox-tokens';
import type { CheckboxValue, CheckboxVariant } from '../../domain/entities/checkbox/CheckboxState';

export interface UseCheckboxProps {
  checked?: CheckboxValue;
  defaultChecked?: CheckboxValue;
  onChange?: (checked: CheckboxValue) => void;
  onCheckedChange?: (checked: CheckboxValue) => void;
  error?: string | null;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  variant?: CheckboxVariant;
  label?: string;
}

export function useCheckbox(props: UseCheckboxProps = {}) {
  const {
    checked: controlledChecked,
    defaultChecked = false,
    onChange,
    onCheckedChange,
    disabled = false,
    readOnly = false,
    required = false,
    error,
    variant = error ? 'error' : 'default',
  } = props;

  const [internalChecked, setInternalChecked] = useState<CheckboxValue>(defaultChecked);
  
  const isControlled = controlledChecked !== undefined;
  const currentChecked = isControlled ? controlledChecked : internalChecked;

  const isChecked = currentChecked === true;
  const isIndeterminate = currentChecked === 'indeterminate';

  const handleChange = useCallback(() => {
    if (disabled || readOnly) return;

    const newChecked = currentChecked === true ? false : true;

    if (!isControlled) {
      setInternalChecked(newChecked);
    }

    onChange?.(newChecked);
    onCheckedChange?.(newChecked);
  }, [disabled, readOnly, currentChecked, isControlled, onChange, onCheckedChange]);

  // Style Derivation
  const stateKey = isIndeterminate ? 'indeterminate' : (isChecked ? 'checked' : 'unchecked');
  const variantTokens = checkboxTokens.variants[variant][stateKey];
  
  const styles = {
    size: checkboxTokens.size,
    radius: checkboxTokens.radius,
    backgroundColor: variantTokens.background,
    borderColor: variantTokens.border,
    checkmarkSize: checkboxTokens.checkmarkSize,
    checkmarkColor: 'checkmark' in variantTokens ? variantTokens.checkmark : undefined,
    indicatorColor: 'indicator' in variantTokens ? variantTokens.indicator : undefined,
  };

  return {
    state: {
      checked: isChecked,
      indeterminate: isIndeterminate,
      disabled,
      readOnly,
      required,
      error: !!error,
    },
    styles,
    handlers: {
      handleChange,
    },
    accessibility: {
      role: 'checkbox' as const,
      'aria-checked': (isIndeterminate ? 'mixed' : isChecked) as boolean | 'mixed',
      'aria-disabled': disabled,
      'aria-readonly': readOnly,
      'aria-required': required,
      'aria-invalid': !!error,
    }
  };
}
