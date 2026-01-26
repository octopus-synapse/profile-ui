

import { FormEntity, FieldValue } from '../../entities/form/FormState';





export interface RegisterFieldRequest {
  readonly form: FormEntity;
  readonly fieldName: string;
  readonly initialValue?: FieldValue;
  readonly required?: boolean;
  readonly validator?: (value: FieldValue) => string | null;
}

export interface RegisterFieldResponse {
  readonly success: true;
  readonly updatedForm: FormEntity;
  readonly fieldName: string;
}





export class RegisterField {
  
  execute(request: RegisterFieldRequest): RegisterFieldResponse {
    const { form, fieldName, initialValue, required, validator } = request;

    
    if (!fieldName || fieldName.trim().length === 0) {
      throw new Error('Field name cannot be empty');
    }

    
    const updatedForm = form.registerField(
      fieldName,
      initialValue,
      required ?? false,
      validator
    );

    
    return {
      success: true,
      updatedForm,
      fieldName,
    };
  }
}
