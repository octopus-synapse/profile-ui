import { useState, useCallback, useMemo } from 'react';
import { BadgeController } from '../controllers/BadgeController';
import type { BadgeState } from '../../domain/entities/badge/BadgeState';

export interface UseBadgeProps extends Partial<BadgeState> {
  onRemove?: () => void | Promise<void>;
}

export function useBadge(props: UseBadgeProps = {}) {
  const [controller] = useState(() => new BadgeController(props));
  const [, forceUpdate] = useState(0);

  const viewModel = useMemo(() => controller.getViewModel(), [controller, forceUpdate]);

  const handleRemove = useCallback(async () => {
    try {
      await controller.onRemove(props.onRemove);
      forceUpdate((t) => t + 1);
    } catch (error) {
      console.error('Badge remove failed:', error);
    }
  }, [controller, props.onRemove]);

  return { viewModel, handleRemove };
}
