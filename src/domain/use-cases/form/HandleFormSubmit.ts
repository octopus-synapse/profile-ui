

import { FormEntity, FieldValue } from '../../entities/form/FormState';
import { ValidateForm } from './ValidateForm';





export interface HandleFormSubmitRequest {
  readonly form: FormEntity;
}

export interface HandleFormSubmitResponse {
  readonly success: boolean;
  readonly updatedForm: FormEntity;
  readonly canSubmit: boolean;
  readonly formData: Record<string, FieldValue>;
  readonly validationErrors?: ReadonlyMap<string, string>;
}





export class HandleFormSubmit {
  private readonly validateFormUseCase: ValidateForm;

  constructor() {
    this.validateFormUseCase = new ValidateForm();
  }

  
  execute(request: HandleFormSubmitRequest): HandleFormSubmitResponse {
    const { form } = request;

    
    let updatedForm = form.incrementSubmitAttempts();

    
    const validationResponse = this.validateFormUseCase.execute({
      form: updatedForm,
      touchAllFields: true, 
    });

    updatedForm = validationResponse.updatedForm;

    
    if (!validationResponse.isValid) {
      return {
        success: false,
        updatedForm,
        canSubmit: false,
        formData: {},
        validationErrors: validationResponse.validationResult.fieldErrors,
      };
    }

    
    const formData = updatedForm.getFieldValues();

    
    updatedForm = updatedForm.withStatus('submitting');

    
    return {
      success: true,
      updatedForm,
      canSubmit: true,
      formData,
    };
  }
}
