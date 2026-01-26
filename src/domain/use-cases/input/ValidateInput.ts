

import { InputEntity, ValidationResult } from '../../entities/input/InputState';





export interface ValidateInputRequest {
  readonly input: InputEntity;
}

export interface ValidateInputResponse {
  readonly success: true;
  readonly updatedInput: InputEntity;
  readonly validationResult: ValidationResult;
}





export class ValidateInput {
  
  execute(request: ValidateInputRequest): ValidateInputResponse {
    const { input } = request;

    
    const validationResult = input.validateAll();

    
    const updatedInput = validationResult.valid
      ? input.withError(null) 
      : input.withError(validationResult.errorMessage); 

    
    return {
      success: true,
      updatedInput,
      validationResult,
    };
  }
}
