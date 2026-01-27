

import { TextareaEntity } from '../../domain/entities/textarea/TextareaState';
import { TextareaViewModel } from '../view-models/TextareaViewModel';
import { textareaTokens } from '../../frameworks/tokens/textarea-tokens';

export class TextareaPresenter {
  
  present(entity: TextareaEntity): TextareaViewModel {
    const state = entity.currentState;

    
    const effectiveState = entity.hasError ? 'error' : state.state;

    
    const sizeToken = textareaTokens.sizes[state.size];
    const stateToken = textareaTokens.states[effectiveState];

    return {
      
      disabled: state.disabled,
      readOnly: state.readOnly,
      required: state.required,
      interactive: entity.isInteractive,
      hasError: entity.hasError,
      errorMessage: entity.errorMessage,

      
      rows: state.rows,
      autoResize: state.autoResize,

      
      characterCount: entity.characterCount,
      wordCount: entity.wordCount,
      lineCount: entity.lineCount,
      remainingCharacters: entity.remainingCharacters,
      exceedsMaxLength: entity.exceedsMaxLength,

      
      styles: {
        minHeight: sizeToken.minHeight,
        paddingH: sizeToken.paddingH,
        paddingV: sizeToken.paddingV,
        fontSize: sizeToken.fontSize,
        borderRadius: textareaTokens.radius,
        backgroundColor: state.disabled
          ? textareaTokens.colors.disabled.background
          : textareaTokens.colors.background,
        textColor: state.disabled
          ? textareaTokens.colors.disabled.text
          : textareaTokens.colors.text,
        borderColor: stateToken.border,
        focusColor: stateToken.focus,
      },

      
      ariaInvalid: entity.hasError,
      ariaRequired: state.required,
      ariaReadOnly: state.readOnly,
    };
  }
}
