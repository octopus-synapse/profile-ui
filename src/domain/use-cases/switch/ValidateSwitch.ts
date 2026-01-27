

import { SwitchEntity } from '../../entities/switch/SwitchState';





export interface ValidationRule {
  readonly validate: (switchEntity: SwitchEntity) => boolean;
  readonly errorMessage: string;
}

export interface ValidateSwitchRequest {
  readonly switchEntity: SwitchEntity;
  readonly customRules?: readonly ValidationRule[];
}

export interface ValidateSwitchResponse {
  readonly isValid: boolean;
  readonly errors: readonly string[];
}





export class ValidateSwitch {
  
  execute(request: ValidateSwitchRequest): ValidateSwitchResponse {
    const { switchEntity, customRules = [] } = request;
    const errors: string[] = [];

    
    

    
    for (const rule of customRules) {
      if (!rule.validate(switchEntity)) {
        errors.push(rule.errorMessage);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}






export const mustBeOn = (errorMessage = 'Switch must be on'): ValidationRule => ({
  validate: (switchEntity) => switchEntity.isOn,
  errorMessage,
});


export const mustBeOff = (errorMessage = 'Switch must be off'): ValidationRule => ({
  validate: (switchEntity) => switchEntity.isOff,
  errorMessage,
});


export const mustBeInteractive = (
  errorMessage = 'Switch must be interactive'
): ValidationRule => ({
  validate: (switchEntity) => switchEntity.isInteractive,
  errorMessage,
});
