

import { SwitchEntity, type SwitchValue } from '../../entities/switch/SwitchState';





export interface SwitchToggleRequest {
  readonly switchEntity: SwitchEntity;
  readonly newValue?: SwitchValue;
  readonly onChange?: (value: SwitchValue) => void | Promise<void>;
}

export type SwitchToggleResponse =
  | {
      readonly success: true;
      readonly updatedSwitch: SwitchEntity;
      readonly oldValue: SwitchValue;
      readonly newValue: SwitchValue;
    }
  | {
      readonly success: false;
      readonly updatedSwitch: SwitchEntity;
      readonly error: string;
    };





export class HandleSwitchToggle {
  
  async execute(request: SwitchToggleRequest): Promise<SwitchToggleResponse> {
    const { switchEntity, newValue, onChange } = request;
    const oldValue = switchEntity.currentState.value;

    
    if (!switchEntity.isInteractive) {
      return {
        success: false,
        updatedSwitch: switchEntity,
        error: 'Switch is not interactive (disabled or readonly)',
      };
    }

    
    
    const updatedSwitch = newValue !== undefined
      ? switchEntity.withValue(newValue)
      : switchEntity.toggle();

    const finalValue = updatedSwitch.currentState.value;

    
    if (onChange) {
      try {
        await onChange(finalValue);
      } catch (error) {
        
        
        return {
          success: false,
          updatedSwitch: switchEntity.withValue(oldValue),
          error: error instanceof Error ? error.message : 'onChange handler failed',
        };
      }
    }

    return {
      success: true,
      updatedSwitch,
      oldValue,
      newValue: finalValue,
    };
  }
}
