
import { useState, useCallback, useMemo } from 'react';
import { InputController } from '../controllers/InputController';
import type { InputState, InputType, InputSize, InputStateType } from '../../domain/entities/input/InputState';

export interface UseInputProps extends Partial<InputState> {
  onChange?: (value: string) => void;
  onBlur?: () => void;
}

export function useInput(props: UseInputProps = {}) {
  const [controller] = useState(() => new InputController(props));
  const [, setUpdateToken] = useState(0);
  const forceUpdate = useCallback(() => setUpdateToken((t) => t + 1), []);

  const viewModel = useMemo(() => controller.getViewModel(), [controller, setUpdateToken]);

  const handleChange = useCallback((value: string) => {
    controller.onChange(value, false);
    props.onChange?.(value);
    forceUpdate();
  }, [controller, props, forceUpdate]);

  const handleBlur = useCallback(() => {
    controller.onBlur();
    props.onBlur?.();
    forceUpdate();
  }, [controller, props, forceUpdate]);

  return {
    viewModel,
    handleChange,
    handleBlur,
    setValue: (v: string) => { controller.setValue(v); forceUpdate(); },
    setError: (e: string | null) => { controller.setError(e); forceUpdate(); },
    setDisabled: (d: boolean) => { controller.setDisabled(d); forceUpdate(); },
    setReadOnly: (r: boolean) => { controller.setReadOnly(r); forceUpdate(); },
    setRequired: (r: boolean) => { controller.setRequired(r); forceUpdate(); },
    setType: (t: InputType) => { controller.setType(t); forceUpdate(); },
    setSize: (s: InputSize) => { controller.setSize(s); forceUpdate(); },
    setStateType: (st: InputStateType) => { controller.setStateType(st); forceUpdate(); },
  };
}
