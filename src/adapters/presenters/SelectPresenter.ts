import { SelectEntity } from '../../domain/entities/select/SelectState';
import { SelectViewModel } from '../view-models/SelectViewModel';
import { selectTokens } from '../../frameworks/tokens/select-tokens';

export class SelectPresenter {
  present<T = string>(entity: SelectEntity<T>): SelectViewModel<T> {
    const state = entity.currentState;

    return {
      open: state.open,
      selected: state.selectedValue,
      disabled: state.disabled,
      interactive: entity.isInteractive,
      styles: {
        trigger: {
          background: selectTokens.trigger.background,
          border: selectTokens.trigger.border,
          text: selectTokens.trigger.text,
          placeholder: selectTokens.trigger.placeholder,
          paddingH: selectTokens.trigger.padding.h,
          paddingV: selectTokens.trigger.padding.v,
          radius: selectTokens.trigger.radius,
        },
        dropdown: {
          background: selectTokens.dropdown.background,
          border: selectTokens.dropdown.border,
          shadow: selectTokens.dropdown.shadow,
          radius: selectTokens.dropdown.radius,
        },
      },
      ariaExpanded: state.open,
      ariaDisabled: state.disabled,
    };
  }
}
