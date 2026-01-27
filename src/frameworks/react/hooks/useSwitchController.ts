import { useState, useCallback, useMemo } from "react";
import { SwitchController } from "../../../adapters/controllers/SwitchController";
import { SwitchViewModel } from "../../../adapters/view-models/SwitchViewModel";
import type {
 SwitchState,
 SwitchValue,
 SwitchVariant,
} from "../../../domain/entities/switch/SwitchState";
import type { ValidationRule } from "../../../domain/use-cases/switch/ValidateSwitch";

export function useSwitchController(initialState: Partial<SwitchState>) {
 
 const controller = useMemo(() => new SwitchController(initialState), []);

 const [viewModel, setViewModel] = useState<SwitchViewModel>(
  controller.getViewModel(),
 );

 const updateViewModel = useCallback(() => {
  setViewModel(controller.getViewModel());
 }, [controller]);

 const handleToggle = useCallback(
  async (handler?: (value: SwitchValue) => void | Promise<void>) => {
   await controller.onToggle(handler);
   updateViewModel();
  },
  [controller, updateViewModel],
 );

 const setValue = useCallback(
  async (
   value: SwitchValue,
   handler?: (value: SwitchValue) => void | Promise<void>,
  ) => {
   await controller.setValue(value, handler);
   updateViewModel();
  },
  [controller, updateViewModel],
 );

 const validate = useCallback(() => {
  return controller.validate();
 }, [controller]);

 const setValidationRules = useCallback(
  (rules: ValidationRule[]) => {
   controller.setValidationRules(rules);
  },
  [controller],
 );

 const setDisabled = useCallback(
  (disabled: boolean) => {
   controller.setDisabled(disabled);
   updateViewModel();
  },
  [controller, updateViewModel],
 );

 const setReadonly = useCallback(
  (readonly: boolean) => {
   controller.setReadonly(readonly);
   updateViewModel();
  },
  [controller, updateViewModel],
 );

 const setVariant = useCallback(
  (variant: SwitchVariant) => {
   controller.setVariant(variant);
   updateViewModel();
  },
  [controller, updateViewModel],
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
 };
}
