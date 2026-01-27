

import { InputEntity } from '../../entities/input/InputState';





export interface InputChangeRequest {
  readonly input: InputEntity;
  readonly newValue: string;
  readonly validateOnChange?: boolean;
}

export interface InputChangeResponse {
  readonly success: true;
  readonly updatedInput: InputEntity;
  readonly validationError?: string | null;
}





export class HandleInputChange {
  
  execute(request: InputChangeRequest): InputChangeResponse {
    const { input, newValue, validateOnChange = false } = request;

    
    
    if (!input.isInteractive) {
      
      return {
        success: true,
        updatedInput: input,
      };
    }

    
    let updatedInput = input.withValue(newValue);

    
    if (validateOnChange) {
      const validationResult = updatedInput.validateAll();
      if (!validationResult.valid) {
        const validationError = validationResult.errorMessage;
        
        updatedInput = updatedInput.withError(validationError);

        
        return {
          success: true,
          updatedInput,
          validationError,
        };
      }

      
      return {
        success: true,
        updatedInput,
        validationError: null,
      };
    }

    
    return {
      success: true,
      updatedInput,
    };
  }
}
