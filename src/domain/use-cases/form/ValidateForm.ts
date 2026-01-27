

import { FormEntity, FormValidationResult } from '../../entities/form/FormState';





export interface ValidateFormRequest {
  readonly form: FormEntity;
  readonly touchAllFields?: boolean; 
}

export interface ValidateFormResponse {
  readonly success: true;
  readonly updatedForm: FormEntity;
  readonly validationResult: FormValidationResult;
  readonly isValid: boolean;
}





export class ValidateForm {
  
  execute(request: ValidateFormRequest): ValidateFormResponse {
    const { form, touchAllFields = false } = request;

    
    let updatedForm = form.withStatus('validating');

    
    
    if (touchAllFields) {
      const fieldNames = updatedForm.getFieldNames();
      for (const fieldName of fieldNames) {
        updatedForm = updatedForm.touchField(fieldName);
      }
    }

    
    const validationResult = updatedForm.validateAllFields();

    
    updatedForm = updatedForm.withValidationResults(validationResult);

    
    updatedForm = updatedForm.withStatus('idle');

    
    return {
      success: true,
      updatedForm,
      validationResult,
      isValid: validationResult.valid,
    };
  }
}
