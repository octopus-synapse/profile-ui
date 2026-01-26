

import { InputEntity } from '../../domain/entities/input/InputState';
import { InputViewModel } from '../view-models/InputViewModel';
import { inputTokens } from '../../frameworks/tokens/input-tokens';

export class InputPresenter {
  
  present(entity: InputEntity): InputViewModel {
    const state = entity.currentState;

    
    const effectiveState = entity.hasError ? 'error' : state.state;

    
    const sizeToken = inputTokens.sizes[state.size];
    const stateToken = inputTokens.states[effectiveState];

    return {
      
      disabled: state.disabled,
      readOnly: state.readOnly,
      required: state.required,
      interactive: entity.isInteractive,
      hasError: entity.hasError,
      errorMessage: entity.errorMessage,

      
      styles: {
        height: sizeToken.height,
        paddingH: sizeToken.paddingH,
        fontSize: sizeToken.fontSize,
        borderRadius: inputTokens.radius,
        backgroundColor: state.disabled
          ? inputTokens.colors.disabled.background
          : inputTokens.colors.background,
        textColor: state.disabled
          ? inputTokens.colors.disabled.text
          : inputTokens.colors.text,
        borderColor: stateToken.border,
        focusColor: stateToken.focus,
      },

      
      ariaInvalid: entity.hasError,
      ariaRequired: state.required,
      ariaReadOnly: state.readOnly,
    };
  }
}
