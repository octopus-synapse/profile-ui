import { useState, useCallback, useMemo } from 'react';
import { TooltipController } from '../controllers/TooltipController';
import type { TooltipState } from '../../domain/entities/tooltip/TooltipState';

export function useTooltip(props: Partial<TooltipState> = {}) {
  const [controller] = useState(() => new TooltipController(props));
  const [, forceUpdate] = useState(0);

  const viewModel = useMemo(() => controller.getViewModel(), [controller, forceUpdate]);

  const show = useCallback(() => {
    controller.show();
    forceUpdate((t) => t + 1);
  }, [controller]);

  const hide = useCallback(() => {
    controller.hide();
    forceUpdate((t) => t + 1);
  }, [controller]);

  return { viewModel, show, hide };
}
