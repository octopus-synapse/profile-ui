

import { SeparatorEntity } from '../../domain/entities/separator/SeparatorState';
import { SeparatorViewModel } from '../view-models/SeparatorViewModel';
import { separatorTokens } from '../../frameworks/tokens/separator-tokens';

export class SeparatorPresenter {
  
  present(entity: SeparatorEntity): SeparatorViewModel {
    const state = entity.currentState;

    return {
      
      orientation: state.orientation,
      decorative: state.decorative,

      
      styles: {
        color: separatorTokens.color,
        thickness: separatorTokens.thickness,
      },

      
      role: entity.ariaRole,
      ariaOrientation: state.decorative ? undefined : state.orientation,
    };
  }
}
