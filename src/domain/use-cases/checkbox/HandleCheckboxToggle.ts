

import { CheckboxEntity, type CheckboxValue } from '../../entities/checkbox/CheckboxState';





export interface CheckboxToggleRequest {
  readonly checkbox: CheckboxEntity;
  readonly newValue?: CheckboxValue;
  readonly onChange?: (value: CheckboxValue) => void | Promise<void>;
}

export type CheckboxToggleResponse =
  | {
      readonly success: true;
      readonly updatedCheckbox: CheckboxEntity;
      readonly oldValue: CheckboxValue;
      readonly newValue: CheckboxValue;
    }
  | {
      readonly success: false;
      readonly updatedCheckbox: CheckboxEntity;
      readonly error: string;
    };





export class HandleCheckboxToggle {
  
  async execute(request: CheckboxToggleRequest): Promise<CheckboxToggleResponse> {
    const { checkbox, newValue, onChange } = request;
    const oldValue = checkbox.currentState.value;

    
    if (!checkbox.isInteractive) {
      return {
        success: false,
        updatedCheckbox: checkbox,
        error: 'Checkbox is not interactive (disabled or readonly)',
      };
    }

    
    
    const updatedCheckbox = newValue !== undefined
      ? checkbox.withValue(newValue)
      : checkbox.toggle();

    const finalValue = updatedCheckbox.currentState.value;

    
    if (onChange) {
      try {
        await onChange(finalValue);
      } catch (error) {
        
        
        return {
          success: false,
          updatedCheckbox: checkbox.withValue(oldValue),
          error: error instanceof Error ? error.message : 'onChange handler failed',
        };
      }
    }

    return {
      success: true,
      updatedCheckbox,
      oldValue,
      newValue: finalValue,
    };
  }
}
