import { useState, useCallback, useMemo } from 'react';
import { EmptyStateController } from '../controllers/EmptyStateController';
import type { EmptyStateState } from '../../domain/entities/empty-state/EmptyStateState';

export interface UseEmptyStateProps extends Partial<EmptyStateState> {
  title: string;
  onAction?: () => void | Promise<void>;
}

export function useEmptyState(props: UseEmptyStateProps) {
  const [controller] = useState(() => new EmptyStateController(props));
  const [, forceUpdate] = useState(0);

  const viewModel = useMemo(() => controller.getViewModel(), [controller, forceUpdate]);

  const handleAction = useCallback(async () => {
    try {
      await controller.onAction(props.onAction);
      forceUpdate((t) => t + 1);
    } catch (error) {
      console.error('EmptyState action failed:', error);
    }
  }, [controller, props.onAction]);

  return { viewModel, handleAction };
}
