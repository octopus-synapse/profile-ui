import { useState, useCallback, useMemo } from 'react';
import { TabsController } from '../controllers/TabsController';

export interface UseTabsProps {
  selectedValue: string;
  variant?: 'default' | 'underline' | 'pills';
  onValueChange?: (value: string) => void | Promise<void>;
}

export function useTabs(props: UseTabsProps) {
  const [controller] = useState(() => new TabsController(props));
  const [, forceUpdate] = useState(0);

  const viewModel = useMemo(() => controller.getViewModel(), [controller, forceUpdate]);

  const onChange = useCallback(async (value: string) => {
    await controller.onChange(value, props.onValueChange);
    forceUpdate((t) => t + 1);
  }, [controller, props.onValueChange]);

  const isSelected = useCallback((value: string) => {
    return controller.isSelected(value);
  }, [controller]);

  return { viewModel, onChange, isSelected };
}
