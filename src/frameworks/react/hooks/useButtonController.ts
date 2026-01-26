

import { useState, useCallback, useMemo } from 'react';
import { ButtonController } from '../../../adapters/controllers/ButtonController';
import {
  ButtonViewModel
} from '../../../adapters/view-models/ButtonViewModel';
import type {
  ButtonState,
  ButtonVariant,
  ButtonSize,
} from '../../../domain/entities/button/ButtonState';


export function useButtonController(initialState: Partial<ButtonState>) {
  
  const controller = useMemo(
    () => new ButtonController(initialState),
    
    
    []
  );

  
  const [viewModel, setViewModel] = useState<ButtonViewModel>(
    controller.getViewModel()
  );

  
  const updateViewModel = useCallback(() => {
    setViewModel(controller.getViewModel());
  }, [controller]);

  
  const handleClick = useCallback(
    async (handler?: () => void | Promise<void>) => {
      await controller.onClick(handler);
      updateViewModel();
    },
    [controller, updateViewModel]
  );

  
  const setDisabled = useCallback(
    (disabled: boolean) => {
      controller.setDisabled(disabled);
      updateViewModel();
    },
    [controller, updateViewModel]
  );

  const setLoading = useCallback(
    (loading: boolean) => {
      controller.setLoading(loading);
      updateViewModel();
    },
    [controller, updateViewModel]
  );

  const setVariant = useCallback(
    (variant: ButtonVariant) => {
      controller.setVariant(variant);
      updateViewModel();
    },
    [controller, updateViewModel]
  );

  const setSize = useCallback(
    (size: ButtonSize) => {
      controller.setSize(size);
      updateViewModel();
    },
    [controller, updateViewModel]
  );

  const setFullWidth = useCallback(
    (fullWidth: boolean) => {
      controller.setFullWidth(fullWidth);
      updateViewModel();
    },
    [controller, updateViewModel]
  );

  return {
    viewModel,
    handleClick,
    setDisabled,
    setLoading,
    setVariant,
    setSize,
    setFullWidth,
  };
}
