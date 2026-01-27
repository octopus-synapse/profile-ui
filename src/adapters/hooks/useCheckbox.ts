
import { useState, useCallback, useMemo } from 'react';
import { CheckboxController } from '../controllers/CheckboxController';
import type { CheckboxState, CheckboxValue, CheckboxVariant } from '../../domain/entities/checkbox/CheckboxState';

export interface UseCheckboxProps extends Partial<CheckboxState> {
  onChange?: (value: CheckboxValue) => void | Promise<void>;
}

export function useCheckbox(props: UseCheckboxProps = {}) {
  const [controller] = useState(() => new CheckboxController(props));
  const [, setUpdateToken] = useState(0);
  const forceUpdate = useCallback(() => setUpdateToken((t) => t + 1), []);

  const viewModel = useMemo(() => controller.getViewModel(), [controller, setUpdateToken]);

  const handleChange = useCallback(async () => {
    try {
      await controller.onToggle(props.onChange);
      forceUpdate();
    } catch (_error) {
      forceUpdate();
    }
  }, [controller, props.onChange, forceUpdate]);

  return {
    viewModel,
    handleChange,
    setDisabled: (d: boolean) => { controller.setDisabled(d); forceUpdate(); },
    setReadonly: (r: boolean) => { controller.setReadonly(r); forceUpdate(); },
    setVariant: (v: CheckboxVariant) => { controller.setVariant(v); forceUpdate(); },
    setRequired: (r: boolean) => { controller.setRequired(r); forceUpdate(); },
  };
}
