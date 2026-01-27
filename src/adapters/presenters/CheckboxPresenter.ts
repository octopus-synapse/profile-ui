

import { CheckboxEntity } from '../../domain/entities/checkbox/CheckboxState';
import { CheckboxViewModel } from '../view-models/CheckboxViewModel';
import { checkboxTokens } from '../../frameworks/tokens/checkbox-tokens';

export class CheckboxPresenter {
  
  present(entity: CheckboxEntity): CheckboxViewModel {
    const state = entity.currentState;

    
    const variantToken = checkboxTokens.variants[state.variant];
    const stateToken = entity.isChecked
      ? variantToken.checked
      : entity.isIndeterminate
      ? variantToken.indeterminate
      : variantToken.unchecked;

    return {
      
      checked: entity.isChecked,
      unchecked: entity.isUnchecked,
      indeterminate: entity.isIndeterminate,
      disabled: state.disabled,
      readonly: state.readonly,
      required: state.required,
      interactive: entity.isInteractive,
      formValue: entity.formValue,

      
      styles: {
        size: checkboxTokens.size,
        radius: checkboxTokens.radius,
        checkmarkSize: checkboxTokens.checkmarkSize,
        backgroundColor: stateToken.background,
        borderColor: stateToken.border,
        checkmarkColor:
          'checkmark' in stateToken ? stateToken.checkmark : undefined,
        indicatorColor:
          'indicator' in stateToken ? stateToken.indicator : undefined,
      },

      
      ariaDisabled: state.disabled,
      ariaReadonly: state.readonly,
      ariaRequired: state.required,
      ariaChecked: entity.isIndeterminate
        ? 'mixed'
        : entity.isChecked
        ? true
        : false,
      role: 'checkbox',
    };
  }
}
