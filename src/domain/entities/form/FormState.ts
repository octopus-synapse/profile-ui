





export type FormStatus = 'idle' | 'validating' | 'submitting' | 'success' | 'error';

export type FieldValue = string | number | boolean | null | undefined;





export interface RegisteredField {
  readonly name: string;
  readonly value: FieldValue;
  readonly error: string | null;
  readonly touched: boolean;
  readonly dirty: boolean;
  readonly required: boolean;
  readonly validator?: (value: FieldValue) => string | null;
}





export interface FormState {
  readonly status: FormStatus;
  readonly fields: ReadonlyMap<string, RegisteredField>;
  readonly submitAttempts: number;
  readonly submitError: string | null;
}





export interface FormValidationResult {
  readonly valid: boolean;
  readonly fieldErrors: ReadonlyMap<string, string>;
  readonly errorCount: number;
}

export interface FieldValidationResult {
  readonly valid: boolean;
  readonly error: string | null;
}





export class FormEntity {
  
  private constructor(private readonly state: FormState) {
    this.validate();
  }

  
  static create(params: Partial<FormState> = {}): FormEntity {
    return new FormEntity({
      status: params.status ?? 'idle',
      fields: params.fields ?? new Map<string, RegisteredField>(),
      submitAttempts: params.submitAttempts ?? 0,
      submitError: params.submitError ?? null,
    });
  }

  
  private validate(): void {
    
    
    
    if (this.state.status === 'submitting' && this.state.submitError !== null) {
      throw new Error('Submitting forms cannot have submit errors');
    }

    
    
    if (this.state.status === 'success' && this.state.submitError !== null) {
      throw new Error('Successful forms cannot have submit errors');
    }

    
    
    if (this.state.status === 'error' && this.state.submitError === null) {
      throw new Error('Error status requires submit error message');
    }

    
    
    const fieldNames = Array.from(this.state.fields.keys());
    const uniqueNames = new Set(fieldNames);
    if (fieldNames.length !== uniqueNames.size) {
      throw new Error('Duplicate field names detected');
    }
  }

  
  get currentState(): FormState {
    return {
      ...this.state,
      fields: new Map(this.state.fields),
    };
  }

  
  get isPristine(): boolean {
    return Array.from(this.state.fields.values()).every((field) => !field.dirty);
  }

  
  get isDirty(): boolean {
    return !this.isPristine;
  }

  
  get isTouched(): boolean {
    return Array.from(this.state.fields.values()).some((field) => field.touched);
  }

  
  get isValid(): boolean {
    const validation = this.validateAllFields();
    return validation.valid;
  }

  
  get hasErrors(): boolean {
    return Array.from(this.state.fields.values()).some((field) => field.error !== null);
  }

  
  get fieldCount(): number {
    return this.state.fields.size;
  }

  
  get errorCount(): number {
    return Array.from(this.state.fields.values()).filter((field) => field.error !== null).length;
  }

  
  get isSubmitting(): boolean {
    return this.state.status === 'submitting';
  }

  
  get isValidating(): boolean {
    return this.state.status === 'validating';
  }

  
  get isSuccess(): boolean {
    return this.state.status === 'success';
  }

  
  get isError(): boolean {
    return this.state.status === 'error';
  }

  
  getField(name: string): RegisteredField | undefined {
    return this.state.fields.get(name);
  }

  
  hasField(name: string): boolean {
    return this.state.fields.has(name);
  }

  
  getFieldNames(): string[] {
    return Array.from(this.state.fields.keys());
  }

  
  getFieldValues(): Record<string, FieldValue> {
    const values: Record<string, FieldValue> = {};
    this.state.fields.forEach((field, name) => {
      values[name] = field.value;
    });
    return values;
  }

  
  registerField(
    name: string,
    value: FieldValue = '',
    required = false,
    validator?: (value: FieldValue) => string | null
  ): FormEntity {
    const newFields = new Map(this.state.fields);

    newFields.set(name, {
      name,
      value,
      error: null,
      touched: false,
      dirty: false,
      required,
      validator,
    });

    return new FormEntity({
      ...this.state,
      fields: newFields,
    });
  }

  
  unregisterField(name: string): FormEntity {
    const newFields = new Map(this.state.fields);
    newFields.delete(name);

    return new FormEntity({
      ...this.state,
      fields: newFields,
    });
  }

  
  setFieldValue(name: string, value: FieldValue): FormEntity {
    const field = this.state.fields.get(name);
    if (!field) {
      throw new Error(`Field "${name}" is not registered`);
    }

    const newFields = new Map(this.state.fields);
    newFields.set(name, {
      ...field,
      value,
      dirty: true,
      
      error: null,
    });

    return new FormEntity({
      ...this.state,
      fields: newFields,
    });
  }

  
  touchField(name: string): FormEntity {
    const field = this.state.fields.get(name);
    if (!field) {
      throw new Error(`Field "${name}" is not registered`);
    }

    const newFields = new Map(this.state.fields);
    newFields.set(name, {
      ...field,
      touched: true,
    });

    return new FormEntity({
      ...this.state,
      fields: newFields,
    });
  }

  
  setFieldError(name: string, error: string | null): FormEntity {
    const field = this.state.fields.get(name);
    if (!field) {
      throw new Error(`Field "${name}" is not registered`);
    }

    const newFields = new Map(this.state.fields);
    newFields.set(name, {
      ...field,
      error,
    });

    return new FormEntity({
      ...this.state,
      fields: newFields,
    });
  }

  
  validateRequiredField(field: RegisteredField): FieldValidationResult {
    if (!field.required) {
      return { valid: true, error: null };
    }

    const isEmpty =
      field.value === null ||
      field.value === undefined ||
      (typeof field.value === 'string' && field.value.trim().length === 0);

    return {
      valid: !isEmpty,
      error: isEmpty ? 'This field is required' : null,
    };
  }

  
  validateFieldWithValidator(field: RegisteredField): FieldValidationResult {
    if (!field.validator) {
      return { valid: true, error: null };
    }

    const error = field.validator(field.value);
    return {
      valid: error === null,
      error,
    };
  }

  
  validateField(name: string): FieldValidationResult {
    const field = this.state.fields.get(name);
    if (!field) {
      throw new Error(`Field "${name}" is not registered`);
    }

    
    const requiredResult = this.validateRequiredField(field);
    if (!requiredResult.valid) {
      return requiredResult;
    }

    
    return this.validateFieldWithValidator(field);
  }

  
  validateAllFields(): FormValidationResult {
    const fieldErrors = new Map<string, string>();

    this.state.fields.forEach((field, name) => {
      const result = this.validateField(name);
      if (!result.valid && result.error) {
        fieldErrors.set(name, result.error);
      }
    });

    return {
      valid: fieldErrors.size === 0,
      fieldErrors,
      errorCount: fieldErrors.size,
    };
  }

  
  withValidationResults(results: FormValidationResult): FormEntity {
    const newFields = new Map(this.state.fields);

    
    newFields.forEach((field, name) => {
      newFields.set(name, { ...field, error: null });
    });

    
    results.fieldErrors.forEach((error, name) => {
      const field = newFields.get(name);
      if (field) {
        newFields.set(name, { ...field, error });
      }
    });

    return new FormEntity({
      ...this.state,
      fields: newFields,
    });
  }

  
  withStatus(status: FormStatus): FormEntity {
    return new FormEntity({
      ...this.state,
      status,
      
      submitError: status === 'error' ? this.state.submitError : null,
    });
  }

  
  withSubmitError(error: string | null): FormEntity {
    return new FormEntity({
      ...this.state,
      status: error ? 'error' : 'idle',
      submitError: error,
    });
  }

  
  incrementSubmitAttempts(): FormEntity {
    return new FormEntity({
      ...this.state,
      submitAttempts: this.state.submitAttempts + 1,
    });
  }

  
  reset(): FormEntity {
    const newFields = new Map<string, RegisteredField>();

    this.state.fields.forEach((field, name) => {
      newFields.set(name, {
        ...field,
        value: '',
        error: null,
        touched: false,
        dirty: false,
      });
    });

    return new FormEntity({
      status: 'idle',
      fields: newFields,
      submitAttempts: 0,
      submitError: null,
    });
  }

  
  resetWithValues(values: Record<string, FieldValue>): FormEntity {
    const newFields = new Map<string, RegisteredField>();

    this.state.fields.forEach((field, name) => {
      newFields.set(name, {
        ...field,
        value: values[name] ?? '',
        error: null,
        touched: false,
        dirty: false,
      });
    });

    return new FormEntity({
      status: 'idle',
      fields: newFields,
      submitAttempts: 0,
      submitError: null,
    });
  }
}
