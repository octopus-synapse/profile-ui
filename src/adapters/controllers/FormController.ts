

import { FormEntity, FieldValue } from '../../domain/entities/form/FormState';
import { RegisterField } from '../../domain/use-cases/form/RegisterField';
import { ValidateForm } from '../../domain/use-cases/form/ValidateForm';
import { HandleFormSubmit } from '../../domain/use-cases/form/HandleFormSubmit';
import { ResetForm } from '../../domain/use-cases/form/ResetForm';
import { FormPresenter } from '../presenters/FormPresenter';
import { FormViewModel } from '../view-models/FormViewModel';


export type FormSubmitHandler = (data: Record<string, FieldValue>) => Promise<void>;

export class FormController {
  private entity: FormEntity;
  private readonly registerFieldUseCase: RegisterField;
  private readonly validateFormUseCase: ValidateForm;
  private readonly handleSubmitUseCase: HandleFormSubmit;
  private readonly resetFormUseCase: ResetForm;
  private readonly presenter: FormPresenter;
  private readonly submitHandler?: FormSubmitHandler;

  constructor(submitHandler?: FormSubmitHandler) {
    
    this.entity = FormEntity.create();

    
    this.registerFieldUseCase = new RegisterField();
    this.validateFormUseCase = new ValidateForm();
    this.handleSubmitUseCase = new HandleFormSubmit();
    this.resetFormUseCase = new ResetForm();

    
    this.presenter = new FormPresenter();

    
    this.submitHandler = submitHandler;
  }

  
  getViewModel(): FormViewModel {
    return this.presenter.present(this.entity);
  }

  
  registerField(
    name: string,
    initialValue?: FieldValue,
    required?: boolean,
    validator?: (value: FieldValue) => string | null
  ): void {
    const response = this.registerFieldUseCase.execute({
      form: this.entity,
      fieldName: name,
      initialValue,
      required,
      validator,
    });

    this.entity = response.updatedForm;
  }

  
  unregisterField(name: string): void {
    this.entity = this.entity.unregisterField(name);
  }

  
  setFieldValue(name: string, value: FieldValue): void {
    this.entity = this.entity.setFieldValue(name, value);
  }

  
  getFieldValue(name: string): FieldValue {
    const field = this.entity.getField(name);
    return field?.value ?? null;
  }

  
  touchField(name: string): void {
    this.entity = this.entity.touchField(name);
  }

  
  validateField(name: string): boolean {
    const result = this.entity.validateField(name);

    if (!result.valid && result.error) {
      this.entity = this.entity.setFieldError(name, result.error);
    } else {
      this.entity = this.entity.setFieldError(name, null);
    }

    return result.valid;
  }

  
  validateForm(touchAllFields = false): boolean {
    const response = this.validateFormUseCase.execute({
      form: this.entity,
      touchAllFields,
    });

    this.entity = response.updatedForm;
    return response.isValid;
  }

  
  async submit(): Promise<void> {
    
    const response = this.handleSubmitUseCase.execute({
      form: this.entity,
    });

    this.entity = response.updatedForm;

    
    if (!response.canSubmit) {
      return;
    }

    
    if (!this.submitHandler) {
      this.entity = this.entity.withStatus('success');
      return;
    }

    
    try {
      await this.submitHandler(response.formData);

      
      this.entity = this.entity.withStatus('success');
    } catch (error) {
      
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred during submission';

      this.entity = this.entity.withSubmitError(errorMessage);
    }
  }

  
  reset(values?: Record<string, FieldValue>): void {
    const response = this.resetFormUseCase.execute({
      form: this.entity,
      values,
    });

    this.entity = response.updatedForm;
  }

  
  getValues(): Record<string, FieldValue> {
    return this.entity.getFieldValues();
  }

  
  setSubmitError(error: string | null): void {
    this.entity = this.entity.withSubmitError(error);
  }

  
  clearSubmitError(): void {
    this.entity = this.entity.withSubmitError(null);
  }

  
  isValid(): boolean {
    return this.entity.isValid;
  }

  
  isPristine(): boolean {
    return this.entity.isPristine;
  }

  
  isDirty(): boolean {
    return this.entity.isDirty;
  }

  
  isSubmitting(): boolean {
    return this.entity.isSubmitting;
  }

  
  getFieldCount(): number {
    return this.entity.fieldCount;
  }

  
  getErrorCount(): number {
    return this.entity.errorCount;
  }
}
