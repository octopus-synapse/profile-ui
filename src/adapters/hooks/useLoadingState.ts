import { useState, useCallback, useMemo } from 'react';
import { LoadingStateController } from '../controllers/LoadingStateController';
import type { LoadingStateState, LoadingStateVariant } from '../../domain/entities/loading-state/LoadingStateState';

export function useLoadingState(props: Partial<LoadingStateState> = {}) {
  const [controller] = useState(() => new LoadingStateController(props));
  const [, forceUpdate] = useState(0);

  const viewModel = useMemo(() => controller.getViewModel(), [controller, forceUpdate]);

  const transitionTo = useCallback((variant: LoadingStateVariant, message?: string) => {
    controller.transitionTo(variant, message);
    forceUpdate((t) => t + 1);
  }, [controller]);

  return { viewModel, transitionTo };
}
