





export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'search';

export type InputSize = 'sm' | 'md' | 'lg';

export type InputStateType = 'default' | 'error' | 'success';





export interface InputState {
  readonly type: InputType;
  readonly size: InputSize;
  readonly state: InputStateType;
  readonly value: string;
  readonly disabled: boolean;
  readonly readOnly: boolean;
  readonly required: boolean;
  readonly error: string | null;
}





export interface ValidationResult {
  readonly valid: boolean;
  readonly errorMessage: string | null;
}





export class InputEntity {
  
  private constructor(private readonly state: InputState) {
    this.validate();
  }

  
  static create(params: Partial<InputState>): InputEntity {
    return new InputEntity({
      type: params.type ?? 'text',
      size: params.size ?? 'md',
      state: params.state ?? 'default',
      value: params.value ?? '',
      disabled: params.disabled ?? false,
      readOnly: params.readOnly ?? false,
      required: params.required ?? false,
      error: params.error ?? null,
    });
  }

  
  private validate(): void {
    
    
    
    if (this.state.readOnly && this.state.required) {
      throw new Error('ReadOnly inputs cannot be required');
    }

    
    
    
    if (this.state.disabled && this.state.error !== null) {
      throw new Error('Disabled inputs cannot have errors');
    }

    
    
    
    if (this.state.error !== null && this.state.state !== 'error') {
      throw new Error('Error message requires error state');
    }
  }

  
  get isInteractive(): boolean {
    return !this.state.disabled && !this.state.readOnly;
  }

  
  get hasError(): boolean {
    return this.state.error !== null || this.state.state === 'error';
  }

  
  get errorMessage(): string | null {
    return this.state.error;
  }

  
  get currentState(): InputState {
    return { ...this.state };
  }

  
  withValue(value: string): InputEntity {
    return new InputEntity({
      ...this.state,
      value,
      
      error: null,
      state: this.state.error ? 'default' : this.state.state,
    });
  }

  
  withError(error: string | null): InputEntity {
    return new InputEntity({
      ...this.state,
      error,
      state: error ? 'error' : 'default',
    });
  }

  
  withStateType(stateType: InputStateType): InputEntity {
    return new InputEntity({
      ...this.state,
      state: stateType,
      error: stateType === 'error' ? this.state.error : null,
    });
  }

  
  withDisabled(disabled: boolean): InputEntity {
    return new InputEntity({
      ...this.state,
      disabled,
      error: disabled ? null : this.state.error,
      state: disabled ? 'default' : this.state.state,
    });
  }

  
  withReadOnly(readOnly: boolean): InputEntity {
    return new InputEntity({
      ...this.state,
      readOnly,
      required: readOnly ? false : this.state.required,
    });
  }

  
  withRequired(required: boolean): InputEntity {
    return new InputEntity({
      ...this.state,
      required,
      readOnly: required ? false : this.state.readOnly,
    });
  }

  
  withType(type: InputType): InputEntity {
    return new InputEntity({
      ...this.state,
      type,
    });
  }

  
  withSize(size: InputSize): InputEntity {
    return new InputEntity({
      ...this.state,
      size,
    });
  }

  
  validateRequired(): ValidationResult {
    if (!this.state.required) {
      return { valid: true, errorMessage: null };
    }

    const isEmpty = this.state.value.trim().length === 0;
    return {
      valid: !isEmpty,
      errorMessage: isEmpty ? 'This field is required' : null,
    };
  }

  
  validateEmail(): ValidationResult {
    if (this.state.type !== 'email' || this.state.value.trim().length === 0) {
      return { valid: true, errorMessage: null };
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(this.state.value);

    return {
      valid: isValid,
      errorMessage: isValid ? null : 'Please enter a valid email address',
    };
  }

  
  validateUrl(): ValidationResult {
    if (this.state.type !== 'url' || this.state.value.trim().length === 0) {
      return { valid: true, errorMessage: null };
    }

    try {
      new URL(this.state.value);
      return { valid: true, errorMessage: null };
    } catch (_error) {
      return {
        valid: false,
        errorMessage: 'Please enter a valid URL',
      };
    }
  }

  
  validateTel(): ValidationResult {
    if (this.state.type !== 'tel' || this.state.value.trim().length === 0) {
      return { valid: true, errorMessage: null };
    }

    const telRegex = /^[\d\s\-()+ ]+$/;
    const isValid = telRegex.test(this.state.value);

    return {
      valid: isValid,
      errorMessage: isValid ? null : 'Please enter a valid phone number',
    };
  }

  
  validateNumber(): ValidationResult {
    if (this.state.type !== 'number' || this.state.value.trim().length === 0) {
      return { valid: true, errorMessage: null };
    }

    const isValid = !isNaN(Number(this.state.value));

    return {
      valid: isValid,
      errorMessage: isValid ? null : 'Please enter a valid number',
    };
  }

  
  validateAll(): ValidationResult {
    
    const requiredResult = this.validateRequired();
    if (!requiredResult.valid) return requiredResult;

    
    const emailResult = this.validateEmail();
    if (!emailResult.valid) return emailResult;

    const urlResult = this.validateUrl();
    if (!urlResult.valid) return urlResult;

    const telResult = this.validateTel();
    if (!telResult.valid) return telResult;

    const numberResult = this.validateNumber();
    if (!numberResult.valid) return numberResult;

    return { valid: true, errorMessage: null };
  }
}
