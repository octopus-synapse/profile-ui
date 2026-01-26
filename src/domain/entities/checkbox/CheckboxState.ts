






export type CheckboxValue = boolean | 'indeterminate';

export type CheckboxVariant = 'default' | 'error';





export interface CheckboxState {
  readonly value: CheckboxValue;
  readonly variant: CheckboxVariant;
  readonly disabled: boolean;
  readonly readonly: boolean;
  readonly required: boolean;
}





export class CheckboxEntity {
  
  private constructor(private readonly state: CheckboxState) {
    this.validate();
  }

  
  static create(params: Partial<CheckboxState> = {}): CheckboxEntity {
    return new CheckboxEntity({
      value: params.value ?? false,
      variant: params.variant ?? 'default',
      disabled: params.disabled ?? false,
      readonly: params.readonly ?? false,
      required: params.required ?? false,
    });
  }

  
  private validate(): void {
    
    
    if (
      this.state.value !== true &&
      this.state.value !== false &&
      this.state.value !== 'indeterminate'
    ) {
      throw new Error(
        'Invalid checkbox value: must be true, false, or "indeterminate"'
      );
    }

    
    
    
    
    if (this.state.disabled && this.state.readonly) {
      throw new Error('Checkbox cannot be both disabled and readonly');
    }
  }

  
  get isInteractive(): boolean {
    return !this.state.disabled && !this.state.readonly;
  }

  
  get isChecked(): boolean {
    return this.state.value === true;
  }

  
  get isUnchecked(): boolean {
    return this.state.value === false;
  }

  
  get isIndeterminate(): boolean {
    return this.state.value === 'indeterminate';
  }

  
  get formValue(): boolean {
    return this.state.value === true;
  }

  
  get currentState(): CheckboxState {
    return { ...this.state };
  }

  
  withValue(value: CheckboxValue): CheckboxEntity {
    return new CheckboxEntity({
      ...this.state,
      value,
    });
  }

  
  toggle(): CheckboxEntity {
    const newValue =
      this.state.value === 'indeterminate' || this.state.value === false
        ? true
        : false;
    return this.withValue(newValue);
  }

  
  withVariant(variant: CheckboxVariant): CheckboxEntity {
    return new CheckboxEntity({
      ...this.state,
      variant,
    });
  }

  
  withDisabled(disabled: boolean): CheckboxEntity {
    return new CheckboxEntity({
      ...this.state,
      disabled,
      readonly: disabled ? false : this.state.readonly,
    });
  }

  
  withReadonly(readonly: boolean): CheckboxEntity {
    return new CheckboxEntity({
      ...this.state,
      readonly,
      disabled: readonly ? false : this.state.disabled,
    });
  }

  
  withRequired(required: boolean): CheckboxEntity {
    return new CheckboxEntity({
      ...this.state,
      required,
    });
  }
}
