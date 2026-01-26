import { useState, useCallback, useMemo } from 'react';
import { CardController } from '../controllers/CardController';
import type { CardState } from '../../domain/entities/card/CardState';

export interface UseCardProps extends Partial<CardState> {
  onPress?: () => void | Promise<void>;
}

export function useCard(props: UseCardProps = {}) {
  const [controller] = useState(() => new CardController(props));
  const [, forceUpdate] = useState(0);

  const viewModel = useMemo(() => controller.getViewModel(), [controller, forceUpdate]);

  const handlePress = useCallback(async () => {
    try {
      await controller.onPress(props.onPress);
      forceUpdate((t) => t + 1);
    } catch (error) {
      console.error('Card press failed:', error);
    }
  }, [controller, props.onPress]);

  return { viewModel, handlePress };
}
