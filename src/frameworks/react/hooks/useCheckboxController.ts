

import { useState, useCallback, useMemo } from 'react';
import { CheckboxController } from '../../../adapters/controllers/CheckboxController';
import { CheckboxViewModel } from '../../../adapters/view-models/CheckboxViewModel';
import type {
  CheckboxState,
  CheckboxValue,
  CheckboxVariant,
} from '../../../domain/entities/checkbox/CheckboxState';
import type { ValidationRule } from '../../../domain/use-cases/checkbox/ValidateCheckbox';


export function useCheckboxController(initialState: Partial<CheckboxState>) {
  
  const controller = useMemo(
    () => new CheckboxController(initialState),
    
    
    []
  );

  
  const [viewModel, setViewModel] = useState<CheckboxViewModel>(
    controller.getViewModel()
  );

  
  const updateViewModel = useCallback(() => {
    setViewModel(controller.getViewModel());
  }, [controller]);

  
  const handleToggle = useCallback(
    async (handler?: (value: CheckboxValue) => void | Promise<void>) => {
      await controller.onToggle(handler);
      updateViewModel();
    },
    [controller, updateViewModel]
  );

  
  const setValue = useCallback(
    async (
      value: CheckboxValue,
      handler?: (value: CheckboxValue) => void | Promise<void>
    ) => {
      await controller.setValue(value, handler);
      updateViewModel();
    },
    [controller, updateViewModel]
  );

  
  const validate = useCallback(() => {
    return controller.validate();
  }, [controller]);

  
  const setValidationRules = useCallback(
    (rules: ValidationRule[]) => {
      controller.setValidationRules(rules);
    },
    [controller]
  );

  
  const setDisabled = useCallback(
    (disabled: boolean) => {
      controller.setDisabled(disabled);
      updateViewModel();
    },
    [controller, updateViewModel]
  );

  const setReadonly = useCallback(
    (readonly: boolean) => {
      controller.setReadonly(readonly);
      updateViewModel();
    },
    [controller, updateViewModel]
  );

  const setVariant = useCallback(
    (variant: CheckboxVariant) => {
      controller.setVariant(variant);
      updateViewModel();
    },
    [controller, updateViewModel]
  );

  const setRequired = useCallback(
    (required: boolean) => {
      controller.setRequired(required);
      updateViewModel();
    },
    [controller, updateViewModel]
  );

  return {
    viewModel,
    handleToggle,
    setValue,
    validate,
    setValidationRules,
    setDisabled,
    setReadonly,
    setVariant,
    setRequired,
  };
}
