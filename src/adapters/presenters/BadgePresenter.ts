

import { BadgeEntity } from '../../domain/entities/badge/BadgeState';
import { BadgeViewModel } from '../view-models/BadgeViewModel';
import { badgeTokens } from '../../frameworks/tokens/badge-tokens';

export class BadgePresenter {
  
  present(entity: BadgeEntity): BadgeViewModel {
    const state = entity.currentState;

    const variantToken = badgeTokens.variants[state.variant];
    const sizeToken = badgeTokens.sizes[state.size];
    const shapeToken = badgeTokens.shapes[state.shape];

    return {
      
      variant: state.variant,
      size: state.size,
      shape: state.shape,
      dot: state.dot,
      removable: state.removable,
      interactive: entity.isInteractive,

      
      styles: {
        paddingH: sizeToken.paddingH,
        paddingV: sizeToken.paddingV,
        fontSize: sizeToken.fontSize,
        borderRadius: shapeToken.radius,
        backgroundColor: variantToken.background,
        textColor: variantToken.text,
        borderColor: variantToken.border,
      },

      
      dotStyles: state.dot ? badgeTokens.dot : undefined,

      
      role: 'status',
    };
  }
}
