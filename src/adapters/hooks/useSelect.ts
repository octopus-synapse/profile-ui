import { useState, useCallback, useMemo } from 'react';
import { SelectController } from '../controllers/SelectController';
import type { SelectState } from '../../domain/entities/select/SelectState';

export interface UseSelectProps extends Partial<SelectState> {
  onChange?: (value: string | null) => void | Promise<void>;
}

export function useSelect(props: UseSelectProps = {}) {
  const [controller] = useState(() => new SelectController(props));
  const [, forceUpdate] = useState(0);

  const viewModel = useMemo(() => controller.getViewModel(), [controller, forceUpdate]);

  const toggleOpen = useCallback(() => {
    controller.toggleOpen();
    forceUpdate((t) => t + 1);
  }, [controller]);

  const handleChange = useCallback((value: string | null) => {
    controller.onChange(value);
    props.onChange?.(value);
    forceUpdate((t) => t + 1);
  }, [controller, props.onChange]);

  return { viewModel, toggleOpen, handleChange };
}
