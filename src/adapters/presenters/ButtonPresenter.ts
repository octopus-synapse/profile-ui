

import { ButtonEntity } from '../../domain/entities/button/ButtonState';
import { ButtonViewModel } from '../view-models/ButtonViewModel';
import { buttonTokens } from '../../frameworks/tokens/button-tokens';

export class ButtonPresenter {
  
  present(entity: ButtonEntity): ButtonViewModel {
    const state = entity.currentState;

    
    const variantToken = buttonTokens.variants[state.variant];
    const sizeToken = buttonTokens.sizes[state.size];

    return {
      
      disabled: state.disabled,
      loading: state.loading,
      interactive: entity.isInteractive,
      fullWidth: state.fullWidth,

      
      styles: {
        height: sizeToken.height,
        paddingH: sizeToken.paddingH,
        fontSize: sizeToken.fontSize,
        borderRadius: sizeToken.radius,
        backgroundColor: variantToken.background,
        textColor: variantToken.text,
        borderColor: variantToken.border,
      },

      
      ariaDisabled: state.disabled || state.loading,
      ariaLabel: state.loading ? 'Loading' : undefined,
      role: 'button',
    };
  }
}
