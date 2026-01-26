

import {
  TextareaEntity,
  ValidationResult,
} from '../../entities/textarea/TextareaState';





export interface ValidateTextareaRequest {
  readonly textarea: TextareaEntity;
}

export interface ValidateTextareaResponse {
  readonly success: true;
  readonly updatedTextarea: TextareaEntity;
  readonly validationResult: ValidationResult;
}





export class ValidateTextarea {
  
  execute(request: ValidateTextareaRequest): ValidateTextareaResponse {
    const { textarea } = request;

    
    const validationResult = textarea.validateAll();

    
    const updatedTextarea = validationResult.valid
      ? textarea.withError(null) 
      : textarea.withError(validationResult.errorMessage); 

    
    return {
      success: true,
      updatedTextarea,
      validationResult,
    };
  }
}
