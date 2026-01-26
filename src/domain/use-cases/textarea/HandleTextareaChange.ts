

import { TextareaEntity } from '../../entities/textarea/TextareaState';





export interface TextareaChangeRequest {
  readonly textarea: TextareaEntity;
  readonly newValue: string;
  readonly validateOnChange?: boolean;
}

export interface TextareaChangeMetadata {
  readonly characterCount: number;
  readonly wordCount: number;
  readonly lineCount: number;
  readonly remainingCharacters: number | null;
  readonly exceedsMaxLength: boolean;
}

export interface TextareaChangeResponse {
  readonly success: true;
  readonly updatedTextarea: TextareaEntity;
  readonly validationError?: string | null;
  readonly metadata?: TextareaChangeMetadata;
}





export class HandleTextareaChange {
  
  execute(request: TextareaChangeRequest): TextareaChangeResponse {
    const { textarea, newValue, validateOnChange = false } = request;

    
    if (!textarea.isInteractive) {
      return {
        success: true,
        updatedTextarea: textarea,
      };
    }

    
    
    let updatedTextarea = textarea.withValue(newValue);

    
    const metadata: TextareaChangeMetadata = {
      characterCount: updatedTextarea.characterCount,
      wordCount: updatedTextarea.wordCount,
      lineCount: updatedTextarea.lineCount,
      remainingCharacters: updatedTextarea.remainingCharacters,
      exceedsMaxLength: updatedTextarea.exceedsMaxLength,
    };

    
    if (validateOnChange) {
      const validationResult = updatedTextarea.validateAll();
      if (!validationResult.valid) {
        const validationError = validationResult.errorMessage;
        
        updatedTextarea = updatedTextarea.withError(validationError);

        
        return {
          success: true,
          updatedTextarea,
          validationError,
          metadata,
        };
      }

      
      return {
        success: true,
        updatedTextarea,
        validationError: null,
        metadata,
      };
    }

    
    return {
      success: true,
      updatedTextarea,
      metadata,
    };
  }
}
