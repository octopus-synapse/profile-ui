

import { ModalEntity } from '../../domain/entities/modal/ModalState';
import { ModalViewModel } from '../view-models/ModalViewModel';
import { modalTokens } from '../../frameworks/tokens/modal-tokens';

export class ModalPresenter {
  
  present(entity: ModalEntity): ModalViewModel {
    const state = entity.currentState;

    
    const sizeToken = modalTokens.sizes[state.size];

    return {
      
      open: state.open,
      interactive: entity.isInteractive,
      animating: entity.isAnimating,
      animationState: state.animationState,

      
      shouldLockBodyScroll: entity.shouldLockBodyScroll,
      shouldTrapFocus: entity.shouldTrapFocus,
      canDismissViaEscape: entity.canDismissViaEscape,
      canDismissViaBackdrop: entity.canDismissViaBackdrop,

      
      styles: {
        maxWidth: sizeToken.maxWidth,
        padding: sizeToken.padding,
        backgroundColor: modalTokens.content.background,
        borderColor: modalTokens.content.border,
        borderRadius: modalTokens.content.radius,
        overlayBackground: modalTokens.overlay.background,
      },

      
      ariaModal: state.open,
      ariaHidden: !state.open,
      role: 'dialog',
    };
  }
}
