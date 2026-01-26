

import { FormEntity } from '../../domain/entities/form/FormState';
import { FormViewModel, FormFieldViewModel } from '../view-models/FormViewModel';

export class FormPresenter {
  
  present(entity: FormEntity): FormViewModel {
    const state = entity.currentState;

    
    const fieldViewModels = new Map<string, FormFieldViewModel>();
    state.fields.forEach((field, name) => {
      fieldViewModels.set(name, {
        name: field.name,
        value: field.value,
        error: field.error,
        hasError: field.error !== null,
        touched: field.touched,
        dirty: field.dirty,
        required: field.required,
      });
    });

    
    const canSubmit = entity.isValid && !entity.isSubmitting;
    const canReset = entity.fieldCount > 0 && !entity.isSubmitting;

    return {
      
      status: state.status,
      isPristine: entity.isPristine,
      isDirty: entity.isDirty,
      isTouched: entity.isTouched,
      isValid: entity.isValid,
      hasErrors: entity.hasErrors,
      isSubmitting: entity.isSubmitting,
      isValidating: entity.isValidating,
      isSuccess: entity.isSuccess,
      isError: entity.isError,

      
      fieldCount: entity.fieldCount,
      errorCount: entity.errorCount,
      submitAttempts: state.submitAttempts,

      
      submitError: state.submitError,

      
      fields: fieldViewModels,
      fieldNames: entity.getFieldNames(),

      
      canSubmit,
      canReset,
    };
  }
}
