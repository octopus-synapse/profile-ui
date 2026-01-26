

import { FormEntity, FieldValue } from '../../entities/form/FormState';





export interface ResetFormRequest {
  readonly form: FormEntity;
  readonly values?: Record<string, FieldValue>; 
}

export interface ResetFormResponse {
  readonly success: true;
  readonly updatedForm: FormEntity;
}





export class ResetForm {
  
  execute(request: ResetFormRequest): ResetFormResponse {
    const { form, values } = request;

    
    const updatedForm = values ? form.resetWithValues(values) : form.reset();

    
    
    return {
      success: true,
      updatedForm,
    };
  }
}
