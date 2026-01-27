

import { useState, useCallback, useMemo } from 'react';
import { ButtonController } from '../controllers/ButtonController';
import type { ButtonState, ButtonVariant, ButtonSize } from '../../domain/entities/button/ButtonState';

export interface UseButtonProps extends Partial<ButtonState> {
  onClick?: () => void | Promise<void>;
}

export function useButton(props: UseButtonProps = {}) {
  const [controller] = useState(() => new ButtonController(props));
  const [, setUpdateToken] = useState(0);
  const forceUpdate = useCallback(() => setUpdateToken((t) => t + 1), []);

  // Update controller when props change
  useMemo(() => {
    if (props.loading !== undefined && controller.entity.currentState.loading !== props.loading) {
      controller.setLoading(props.loading);
    }
    if (props.disabled !== undefined && controller.entity.currentState.disabled !== props.disabled) {
      controller.setDisabled(props.disabled);
    }
    if (props.variant && controller.entity.currentState.variant !== props.variant) {
      controller.setVariant(props.variant);
    }
    if (props.size && controller.entity.currentState.size !== props.size) {
      controller.setSize(props.size);
    }
    if (props.fullWidth !== undefined && controller.entity.currentState.fullWidth !== props.fullWidth) {
      controller.setFullWidth(props.fullWidth);
    }
  }, [props.loading, props.disabled, props.variant, props.size, props.fullWidth, controller]);

  const viewModel = useMemo(() => controller.getViewModel(), [controller, setUpdateToken]);

  const handleClick = useCallback(async () => {
    try {
      await controller.onClick(props.onClick);
      forceUpdate();
    } catch (error) {
      console.error('Button click failed:', error);
      forceUpdate();
    }
  }, [controller, props.onClick, forceUpdate]);

  return {
    viewModel,
    handleClick,
    setDisabled: (d: boolean) => { controller.setDisabled(d); forceUpdate(); },
    setLoading: (l: boolean) => { controller.setLoading(l); forceUpdate(); },
    setVariant: (v: ButtonVariant) => { controller.setVariant(v); forceUpdate(); },
    setSize: (s: ButtonSize) => { controller.setSize(s); forceUpdate(); },
    setFullWidth: (f: boolean) => { controller.setFullWidth(f); forceUpdate(); },
  };
}
