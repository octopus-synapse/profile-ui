

import { SpinnerEntity } from '../../domain/entities/spinner/SpinnerState';
import { SpinnerViewModel } from '../view-models/SpinnerViewModel';
import { spinnerTokens } from '../../frameworks/tokens/spinner-tokens';

export class SpinnerPresenter {
  
  present(entity: SpinnerEntity): SpinnerViewModel {
    const state = entity.currentState;

    return {
      
      size: state.size,
      colorScheme: state.colorScheme,
      label: state.label,

      
      styles: {
        size: spinnerTokens.sizes[state.size],
        color: spinnerTokens.colors[state.colorScheme],
        strokeWidth: spinnerTokens.strokeWidth[state.size],
      },

      
      ariaLabel: entity.ariaLabel,
      role: 'status',
      ariaLive: 'polite',
    };
  }
}
