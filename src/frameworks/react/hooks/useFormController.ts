import { useState, useCallback, useMemo } from "react";
import {
 FormController,
 FormSubmitHandler,
} from "../../../adapters/controllers/FormController";
import { FormViewModel } from "../../../adapters/view-models/FormViewModel";
import type { FieldValue } from "../../../domain/entities/form/FormState";

export function useFormController(submitHandler?: FormSubmitHandler) {
 const controller = useMemo(
  () => new FormController(submitHandler),

  [],
 );

 const [viewModel, setViewModel] = useState<FormViewModel>(
  controller.getViewModel(),
 );

 const updateViewModel = useCallback(() => {
  setViewModel(controller.getViewModel());
 }, [controller]);

 const registerField = useCallback(
  (
   name: string,
   initialValue?: FieldValue,
   required?: boolean,
   validator?: (value: FieldValue) => string | null,
  ) => {
   controller.registerField(name, initialValue, required, validator);
   updateViewModel();
  },
  [controller, updateViewModel],
 );

 const unregisterField = useCallback(
  (name: string) => {
   controller.unregisterField(name);
   updateViewModel();
  },
  [controller, updateViewModel],
 );

 const setFieldValue = useCallback(
  (name: string, value: FieldValue) => {
   controller.setFieldValue(name, value);
   updateViewModel();
  },
  [controller, updateViewModel],
 );

 const getFieldValue = useCallback(
  (name: string): FieldValue => {
   return controller.getFieldValue(name);
  },
  [controller],
 );

 const touchField = useCallback(
  (name: string) => {
   controller.touchField(name);
   updateViewModel();
  },
  [controller, updateViewModel],
 );

 const validateField = useCallback(
  (name: string): boolean => {
   const isValid = controller.validateField(name);
   updateViewModel();
   return isValid;
  },
  [controller, updateViewModel],
 );

 const validateForm = useCallback(
  (touchAllFields = false): boolean => {
   const isValid = controller.validateForm(touchAllFields);
   updateViewModel();
   return isValid;
  },
  [controller, updateViewModel],
 );

 const submit = useCallback(async () => {
  await controller.submit();
  updateViewModel();
 }, [controller, updateViewModel]);

 const reset = useCallback(
  (values?: Record<string, FieldValue>) => {
   controller.reset(values);
   updateViewModel();
  },
  [controller, updateViewModel],
 );

 const getValues = useCallback((): Record<string, FieldValue> => {
  return controller.getValues();
 }, [controller]);

 const setSubmitError = useCallback(
  (error: string | null) => {
   controller.setSubmitError(error);
   updateViewModel();
  },
  [controller, updateViewModel],
 );

 const clearSubmitError = useCallback(() => {
  controller.clearSubmitError();
  updateViewModel();
 }, [controller, updateViewModel]);

 const isValid = useCallback(() => controller.isValid(), [controller]);
 const isPristine = useCallback(() => controller.isPristine(), [controller]);
 const isDirty = useCallback(() => controller.isDirty(), [controller]);
 const isSubmitting = useCallback(
  () => controller.isSubmitting(),
  [controller],
 );
 const getFieldCount = useCallback(
  () => controller.getFieldCount(),
  [controller],
 );
 const getErrorCount = useCallback(
  () => controller.getErrorCount(),
  [controller],
 );

 return {
  viewModel,
  registerField,
  unregisterField,
  setFieldValue,
  getFieldValue,
  touchField,
  validateField,
  validateForm,
  submit,
  reset,
  getValues,
  setSubmitError,
  clearSubmitError,
  isValid,
  isPristine,
  isDirty,
  isSubmitting,
  getFieldCount,
  getErrorCount,
 };
}
