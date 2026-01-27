

import { CheckboxEntity } from '../../entities/checkbox/CheckboxState';





export type ValidationRule = (checkbox: CheckboxEntity) => string | null;





export interface CheckboxValidationRequest {
  readonly checkbox: CheckboxEntity;
  readonly customRules?: ReadonlyArray<ValidationRule>;
}

export interface CheckboxValidationResponse {
  readonly isValid: boolean;
  readonly errors: ReadonlyArray<string>;
}





export class ValidateCheckbox {
  
  execute(request: CheckboxValidationRequest): CheckboxValidationResponse {
    const { checkbox, customRules = [] } = request;
    const errors: string[] = [];

    
    if (checkbox.currentState.required && !checkbox.isChecked) {
      errors.push('This field is required');
    }

    
    for (const rule of customRules) {
      const error = rule(checkbox);
      if (error !== null) {
        errors.push(error);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}






export const mustBeChecked: ValidationRule = (checkbox) => {
  return checkbox.isChecked ? null : 'Must be checked';
};


export const mustBeUnchecked: ValidationRule = (checkbox) => {
  return checkbox.isUnchecked ? null : 'Must be unchecked';
};


export const cannotBeIndeterminate: ValidationRule = (checkbox) => {
  return checkbox.isIndeterminate ? 'Cannot be indeterminate' : null;
};


export const mustBeInteractive: ValidationRule = (checkbox) => {
  return checkbox.isInteractive ? null : 'Checkbox is not interactive';
};


export const createRequiredRule = (message: string): ValidationRule => {
  return (checkbox) => {
    return checkbox.isChecked ? null : message;
  };
};
