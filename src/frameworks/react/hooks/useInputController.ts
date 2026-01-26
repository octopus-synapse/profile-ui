import { useState, useCallback, useMemo } from "react";
import { InputController } from "../../../adapters/controllers/InputController";
import { InputViewModel } from "../../../adapters/view-models/InputViewModel";
import type {
 InputState,
 InputType,
 InputSize,
 InputStateType,
} from "../../../domain/entities/input/InputState";

export function useInputController(initialState: Partial<InputState>) {
 const controller = useMemo(() => new InputController(initialState), []);

 const [viewModel, setViewModel] = useState<InputViewModel>(
  controller.getViewModel(),
 );

 const updateViewModel = useCallback(() => {
  setViewModel(controller.getViewModel());
 }, [controller]);

 const handleChange = useCallback(
  (value: string, validateOnChange = false) => {
   controller.onChange(value, validateOnChange);
   updateViewModel();
  },
  [controller, updateViewModel],
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
  [controller, updateViewModel],
 );

 const setError = useCallback(
  (error: string | null) => {
   controller.setError(error);
   updateViewModel();
  },
  [controller, updateViewModel],
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
  [controller, updateViewModel],
 );

 const setReadOnly = useCallback(
  (readOnly: boolean) => {
   controller.setReadOnly(readOnly);
   updateViewModel();
  },
  [controller, updateViewModel],
 );

 const setRequired = useCallback(
  (required: boolean) => {
   controller.setRequired(required);
   updateViewModel();
  },
  [controller, updateViewModel],
 );

 const setType = useCallback(
  (type: InputType) => {
   controller.setType(type);
   updateViewModel();
  },
  [controller, updateViewModel],
 );

 const setSize = useCallback(
  (size: InputSize) => {
   controller.setSize(size);
   updateViewModel();
  },
  [controller, updateViewModel],
 );

 const setStateType = useCallback(
  (stateType: InputStateType) => {
   controller.setStateType(stateType);
   updateViewModel();
  },
  [controller, updateViewModel],
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
  setType,
  setSize,
  setStateType,
 };
}
