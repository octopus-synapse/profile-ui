
import { useState, useCallback, useMemo } from 'react';
import { FormController, FormSubmitHandler } from '../controllers/FormController';
import type { FieldValue } from '../../domain/entities/form/FormState';

export interface UseFormProps {
  onSubmit?: FormSubmitHandler;
}

export function useForm(props: UseFormProps = {}) {
  const [controller] = useState(() => new FormController(props.onSubmit));
  const [, setUpdateToken] = useState(0);
  const forceUpdate = useCallback(() => setUpdateToken((t) => t + 1), []);

  const viewModel = useMemo(() => controller.getViewModel(), [controller, setUpdateToken]);

  const handleSubmit = useCallback(async () => {
    try {
      await controller.submit();
      forceUpdate();
    } catch (_error) {
      forceUpdate();
    }
  }, [controller, forceUpdate]);

  const registerField = useCallback(
    (name: string, initialValue?: FieldValue, required?: boolean, validator?: (value: FieldValue) => string | null) => {
      controller.registerField(name, initialValue, required, validator);
      forceUpdate();
    },
    [controller, forceUpdate]
  );

  const setFieldValue = useCallback(
    (name: string, value: FieldValue) => {
      controller.setFieldValue(name, value);
      forceUpdate();
    },
    [controller, forceUpdate]
  );

  return {
    viewModel,
    handleSubmit,
    registerField,
    setFieldValue,
    reset: (values?: Record<string, FieldValue>) => { controller.reset(values); forceUpdate(); },
    validateForm: (touchAll?: boolean) => controller.validateForm(touchAll),
  };
}

export interface UseFormFieldProps {
  name: string;
  formController: FormController;
}

export function useFormField(props: UseFormFieldProps) {
  const { name, formController } = props;
  const [, setUpdateToken] = useState(0);
  const forceUpdate = useCallback(() => setUpdateToken((t) => t + 1), []);

  const viewModel = useMemo(() => formController.getViewModel(), [formController, setUpdateToken]);

  const setValue = useCallback(
    (value: FieldValue) => {
      formController.setFieldValue(name, value);
      forceUpdate();
    },
    [formController, name, forceUpdate]
  );

  const touch = useCallback(() => {
    formController.touchField(name);
    forceUpdate();
  }, [formController, name, forceUpdate]);

  return {
    viewModel,
    setValue,
    touch,
    validate: () => formController.validateField(name),
  };
}
