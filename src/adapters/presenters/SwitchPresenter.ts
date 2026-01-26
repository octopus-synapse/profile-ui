

import { SwitchEntity } from '../../domain/entities/switch/SwitchState';
import { SwitchViewModel } from '../view-models/SwitchViewModel';
import { switchTokens } from '../../frameworks/tokens/switch-tokens';

export class SwitchPresenter {
  
  present(entity: SwitchEntity): SwitchViewModel {
    const state = entity.currentState;

    
    const variantToken = switchTokens.variants[state.variant];
    const stateToken = entity.isOn ? variantToken.on : variantToken.off;

    return {
      
      on: entity.isOn,
      off: entity.isOff,
      disabled: state.disabled,
      readonly: state.readonly,
      interactive: entity.isInteractive,

      
      styles: {
        width: switchTokens.width,
        height: switchTokens.height,
        thumbSize: switchTokens.thumbSize,
        thumbTranslate: entity.isOn
          ? switchTokens.thumbTranslate.on
          : switchTokens.thumbTranslate.off,
        backgroundColor: stateToken.background,
        borderColor: stateToken.border,
        thumbColor: stateToken.thumb,
      },

      
      ariaDisabled: state.disabled,
      ariaReadonly: state.readonly,
      ariaChecked: entity.isOn,
      role: 'switch',
    };
  }
}
