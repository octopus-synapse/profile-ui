import { useState, useCallback } from 'react';
import type { TabsListVariant } from '../../shared/tabs/tabs.types';

export interface UseTabsProps {
  selectedValue?: string;
  defaultValue?: string;
  variant?: TabsListVariant;
  onValueChange?: (value: string) => void;
}

export function useTabs(props: UseTabsProps) {
  const { selectedValue, defaultValue, variant = 'default', onValueChange } = props;

  const [internalValue, setInternalValue] = useState(defaultValue || selectedValue || '');

  const isControlled = selectedValue !== undefined;
  const currentValue = isControlled ? selectedValue : internalValue;

  const onChange = useCallback((value: string) => {
    if (!isControlled) {
      setInternalValue(value);
    }
    onValueChange?.(value);
  }, [isControlled, onValueChange]);

  return {
    state: {
      selectedValue: currentValue,
      variant,
    },
    handlers: {
      onChange,
    },
  };
}
