





export type TextareaSize = 'sm' | 'md' | 'lg';

export type TextareaStateType = 'default' | 'error' | 'success';





export interface TextareaState {
  readonly size: TextareaSize;
  readonly state: TextareaStateType;
  readonly value: string;
  readonly disabled: boolean;
  readonly readOnly: boolean;
  readonly required: boolean;
  readonly error: string | null;
  readonly maxLength?: number;
  readonly minLength?: number;
  readonly rows: number;
  readonly autoResize: boolean;
}





export interface ValidationResult {
  readonly valid: boolean;
  readonly errorMessage: string | null;
}





export class TextareaEntity {
  
  private constructor(private readonly state: TextareaState) {
    this.validate();
  }

  
  static create(params: Partial<TextareaState>): TextareaEntity {
    return new TextareaEntity({
      size: params.size ?? 'md',
      state: params.state ?? 'default',
      value: params.value ?? '',
      disabled: params.disabled ?? false,
      readOnly: params.readOnly ?? false,
      required: params.required ?? false,
      error: params.error ?? null,
      maxLength: params.maxLength,
      minLength: params.minLength,
      rows: params.rows ?? 3,
      autoResize: params.autoResize ?? false,
    });
  }

  
  private validate(): void {
    
    if (this.state.readOnly && this.state.required) {
      throw new Error('ReadOnly textareas cannot be required');
    }

    
    if (this.state.disabled && this.state.error !== null) {
      throw new Error('Disabled textareas cannot have errors');
    }

    
    if (this.state.error !== null && this.state.state !== 'error') {
      throw new Error('Error message requires error state');
    }

    
    if (this.state.maxLength !== undefined && this.state.maxLength <= 0) {
      throw new Error('maxLength must be positive');
    }

    
    if (this.state.minLength !== undefined && this.state.minLength < 0) {
      throw new Error('minLength must be non-negative');
    }

    
    if (
      this.state.minLength !== undefined &&
      this.state.maxLength !== undefined &&
      this.state.minLength > this.state.maxLength
    ) {
      throw new Error('minLength cannot exceed maxLength');
    }

    
    if (this.state.rows <= 0) {
      throw new Error('rows must be positive');
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

  
  get characterCount(): number {
    return this.state.value.length;
  }

  
  get wordCount(): number {
    const trimmed = this.state.value.trim();
    if (trimmed.length === 0) return 0;
    return trimmed.split(/\s+/).length;
  }

  
  get lineCount(): number {
    if (this.state.value.length === 0) return 1;
    return (this.state.value.match(/\n/g) || []).length + 1;
  }

  
  get remainingCharacters(): number | null {
    if (this.state.maxLength === undefined) return null;
    return Math.max(0, this.state.maxLength - this.characterCount);
  }

  
  get exceedsMaxLength(): boolean {
    if (this.state.maxLength === undefined) return false;
    return this.characterCount > this.state.maxLength;
  }

  
  get currentState(): TextareaState {
    return { ...this.state };
  }

  
  withValue(value: string): TextareaEntity {
    return new TextareaEntity({
      ...this.state,
      value,
      
      error: null,
      state: this.state.error ? 'default' : this.state.state,
    });
  }

  
  withError(error: string | null): TextareaEntity {
    return new TextareaEntity({
      ...this.state,
      error,
      state: error ? 'error' : 'default',
    });
  }

  
  withStateType(stateType: TextareaStateType): TextareaEntity {
    return new TextareaEntity({
      ...this.state,
      state: stateType,
      error: stateType === 'error' ? this.state.error : null,
    });
  }

  
  withDisabled(disabled: boolean): TextareaEntity {
    return new TextareaEntity({
      ...this.state,
      disabled,
      error: disabled ? null : this.state.error,
      state: disabled ? 'default' : this.state.state,
    });
  }

  
  withReadOnly(readOnly: boolean): TextareaEntity {
    return new TextareaEntity({
      ...this.state,
      readOnly,
      required: readOnly ? false : this.state.required,
    });
  }

  
  withRequired(required: boolean): TextareaEntity {
    return new TextareaEntity({
      ...this.state,
      required,
      readOnly: required ? false : this.state.readOnly,
    });
  }

  
  withSize(size: TextareaSize): TextareaEntity {
    return new TextareaEntity({
      ...this.state,
      size,
    });
  }

  
  withMaxLength(maxLength: number | undefined): TextareaEntity {
    return new TextareaEntity({
      ...this.state,
      maxLength,
    });
  }

  
  withMinLength(minLength: number | undefined): TextareaEntity {
    return new TextareaEntity({
      ...this.state,
      minLength,
    });
  }

  
  withRows(rows: number): TextareaEntity {
    return new TextareaEntity({
      ...this.state,
      rows,
    });
  }

  
  withAutoResize(autoResize: boolean): TextareaEntity {
    return new TextareaEntity({
      ...this.state,
      autoResize,
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

  
  validateMaxLength(): ValidationResult {
    if (this.state.maxLength === undefined) {
      return { valid: true, errorMessage: null };
    }

    const exceedsMax = this.characterCount > this.state.maxLength;
    return {
      valid: !exceedsMax,
      errorMessage: exceedsMax
        ? `Maximum ${this.state.maxLength} characters allowed`
        : null,
    };
  }

  
  validateMinLength(): ValidationResult {
    if (this.state.minLength === undefined) {
      return { valid: true, errorMessage: null };
    }

    
    if (this.characterCount === 0) {
      return { valid: true, errorMessage: null };
    }

    const belowMin = this.characterCount < this.state.minLength;
    return {
      valid: !belowMin,
      errorMessage: belowMin
        ? `Minimum ${this.state.minLength} characters required`
        : null,
    };
  }

  
  validateAll(): ValidationResult {
    
    const requiredResult = this.validateRequired();
    if (!requiredResult.valid) return requiredResult;

    
    const minLengthResult = this.validateMinLength();
    if (!minLengthResult.valid) return minLengthResult;

    
    const maxLengthResult = this.validateMaxLength();
    if (!maxLengthResult.valid) return maxLengthResult;

    return { valid: true, errorMessage: null };
  }
}
