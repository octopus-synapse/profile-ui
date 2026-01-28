import { useState, useCallback } from 'react';
import { TooltipProps, tooltipTokens } from '../../shared/tooltip/tooltip.types';

export function useTooltip(props: Partial<TooltipProps> = {}) {
  const { position = 'top', delay = 0, disabled = false } = props;
  const [visible, setVisible] = useState(false);

  const show = useCallback(() => {
    if (disabled) return;
    if (delay > 0) {
      setTimeout(() => setVisible(true), delay);
    } else {
      setVisible(true);
    }
  }, [disabled, delay]);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  return {
    state: {
      visible,
      position,
      disabled,
    },
    styles: {
      paddingH: tooltipTokens.padding.h,
      paddingV: tooltipTokens.padding.v,
      radius: tooltipTokens.radius,
      background: tooltipTokens.background,
    },
    handlers: {
      show,
      hide,
    },
  };
}
