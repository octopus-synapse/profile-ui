

import { useState, useCallback, useMemo } from 'react';
import { TextareaController } from '../../../adapters/controllers/TextareaController';
import { TextareaViewModel } from '../../../adapters/view-models/TextareaViewModel';
import type {
  TextareaState,
  TextareaSize,
  TextareaStateType,
} from '../../../domain/entities/textarea/TextareaState';


export function useTextareaController(initialState: Partial<TextareaState>) {
  
  const controller = useMemo(
    () => new TextareaController(initialState),
    
    
    []
  );

  
  const [viewModel, setViewModel] = useState<TextareaViewModel>(
    controller.getViewModel()
  );

  
  const updateViewModel = useCallback(() => {
    setViewModel(controller.getViewModel());
  }, [controller]);

  
  const handleChange = useCallback(
    (value: string, validateOnChange = false) => {
      controller.onChange(value, validateOnChange);
      updateViewModel();
    },
    [controller, updateViewModel]
  );

  
  const handleBlur = useCallback(() => {
    controller.onBlur();
    updateViewModel();
  }, [controller, updateViewModel]);

  
  const validate = useCallback((): boolean => {
    const isValid = controller.validate();
    updateViewModel();
    return isValid;
  }, [controller, updateViewModel]);

  
  const getValue = useCallback(() => {
    return controller.getValue();
  }, [controller]);

  const setValue = useCallback(
    (value: string) => {
      controller.setValue(value);
      updateViewModel();
    },
    [controller, updateViewModel]
  );

  
  const setError = useCallback(
    (error: string | null) => {
      controller.setError(error);
      updateViewModel();
    },
    [controller, updateViewModel]
  );

  const clearError = useCallback(() => {
    controller.clearError();
    updateViewModel();
  }, [controller, updateViewModel]);

  
  const setDisabled = useCallback(
    (disabled: boolean) => {
      controller.setDisabled(disabled);
      updateViewModel();
    },
    [controller, updateViewModel]
  );

  const setReadOnly = useCallback(
    (readOnly: boolean) => {
      controller.setReadOnly(readOnly);
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

  const setSize = useCallback(
    (size: TextareaSize) => {
      controller.setSize(size);
      updateViewModel();
    },
    [controller, updateViewModel]
  );

  const setStateType = useCallback(
    (stateType: TextareaStateType) => {
      controller.setStateType(stateType);
      updateViewModel();
    },
    [controller, updateViewModel]
  );

  const setMaxLength = useCallback(
    (maxLength: number | undefined) => {
      controller.setMaxLength(maxLength);
      updateViewModel();
    },
    [controller, updateViewModel]
  );

  const setMinLength = useCallback(
    (minLength: number | undefined) => {
      controller.setMinLength(minLength);
      updateViewModel();
    },
    [controller, updateViewModel]
  );

  const setRows = useCallback(
    (rows: number) => {
      controller.setRows(rows);
      updateViewModel();
    },
    [controller, updateViewModel]
  );

  const setAutoResize = useCallback(
    (autoResize: boolean) => {
      controller.setAutoResize(autoResize);
      updateViewModel();
    },
    [controller, updateViewModel]
  );

  return {
    viewModel,
    handleChange,
    handleBlur,
    validate,
    getValue,
    setValue,
    setError,
    clearError,
    setDisabled,
    setReadOnly,
    setRequired,
    setSize,
    setStateType,
    setMaxLength,
    setMinLength,
    setRows,
    setAutoResize,
  };
}
