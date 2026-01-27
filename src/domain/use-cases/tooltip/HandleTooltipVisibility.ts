import { TooltipEntity } from '../../entities/tooltip/TooltipState';

export interface HandleTooltipVisibilityRequest {
  tooltip: TooltipEntity;
  show: boolean;
}

export interface HandleTooltipVisibilityResponse {
  updatedTooltip: TooltipEntity;
  shouldShow: boolean;
}

export class HandleTooltipVisibility {
  execute(request: HandleTooltipVisibilityRequest): HandleTooltipVisibilityResponse {
    if (!request.tooltip.canShow && request.show) {
      return { updatedTooltip: request.tooltip, shouldShow: false };
    }

    return {
      updatedTooltip: request.tooltip.withVisible(request.show),
      shouldShow: request.show && request.tooltip.canShow,
    };
  }
}
