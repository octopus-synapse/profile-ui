import { TooltipEntity } from '../../domain/entities/tooltip/TooltipState';
import { TooltipViewModel } from '../view-models/TooltipViewModel';
import { tooltipTokens } from '../../frameworks/tokens/tooltip-tokens';

export class TooltipPresenter {
  present(entity: TooltipEntity): TooltipViewModel {
    const state = entity.currentState;

    return {
      visible: state.visible,
      position: state.position,
      delay: state.delay,
      disabled: state.disabled,
      canShow: entity.canShow,
      styles: {
        background: tooltipTokens.background,
        text: tooltipTokens.text,
        border: tooltipTokens.border,
        radius: tooltipTokens.radius,
        paddingH: tooltipTokens.padding.h,
        paddingV: tooltipTokens.padding.v,
        fontSize: tooltipTokens.fontSize,
        offset: tooltipTokens.offset,
      },
      role: 'tooltip',
    };
  }
}
