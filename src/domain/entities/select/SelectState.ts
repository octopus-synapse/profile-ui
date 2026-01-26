export interface SelectOption<T = string> {
  readonly label: string;
  readonly value: T;
  readonly disabled?: boolean;
}

export interface ValidationResult {
  readonly isValid: boolean;
  readonly message?: string;
}

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectStateType = 'default' | 'error' | 'success' | 'warning';

export interface SelectState<T = string> {
  readonly options: readonly SelectOption<T>[];
  readonly selectedValue: T | null;
  readonly open: boolean;
  readonly size: SelectSize;
  readonly state: SelectStateType;
  readonly disabled: boolean;
  readonly required: boolean;
  readonly error: string | null;
  readonly placeholder: string;
}

export class SelectEntity<T = string> {
  private constructor(private readonly state: SelectState<T>) {
    this.validateBusinessRules();
  }

  private validateBusinessRules(): void {
    // BUSINESS RULE #1: Options must have unique values
    const values = this.state.options.map(o => o.value);
    const uniqueValues = new Set(values);
    if (values.length !== uniqueValues.size) {
      throw new Error('Options must have unique values');
    }

    // BUSINESS RULE #2: Selected value must exist in options
    if (this.state.selectedValue !== null) {
      const exists = this.state.options.some(o => o.value === this.state.selectedValue);
      if (!exists) {
        throw new Error('Selected value must exist in options');
      }
    }

    // BUSINESS RULE #3: Cannot select a disabled option
    if (this.state.selectedValue !== null) {
      const option = this.state.options.find(o => o.value === this.state.selectedValue);
      if (option?.disabled) {
        throw new Error('Cannot select a disabled option');
      }
    }

    // BUSINESS RULE #4: Disabled select cannot have error
    if (this.state.disabled && this.state.error !== null) {
      throw new Error('Disabled selects cannot have errors');
    }

    // BUSINESS RULE #5: Error state must match error message  
    // If error message exists, state must be error
    if (this.state.error !== null && this.state.state !== 'error') {
      throw new Error('Error message requires error state');
    }

    // BUSINESS RULE #6: Empty options require placeholder
    if (this.state.options.length === 0 && !this.state.placeholder) {
      throw new Error('Empty options require placeholder text');
    }
  }

  static create<T = string>(params: Partial<SelectState<T>> = {}): SelectEntity<T> {
    return new SelectEntity<T>({
      options: params.options ?? [],
      selectedValue: params.selectedValue ?? null,
      open: params.open ?? false,
      size: params.size ?? 'md',
      state: params.state ?? 'default',
      disabled: params.disabled ?? false,
      required: params.required ?? false,
      error: params.error ?? null,
      placeholder: params.placeholder ?? 'Select an option',
    });
  }

  get currentState(): SelectState<T> {
    return { ...this.state };
  }

  get isInteractive(): boolean {
    return !this.state.disabled;
  }

  get hasError(): boolean {
    return this.state.error !== null || this.state.state === 'error';
  }

  get hasSelection(): boolean {
    return this.state.selectedValue !== null;
  }

  get errorMessage(): string | null {
    return this.state.error;
  }

  get selectedOption(): SelectOption<T> | null {
    if (this.state.selectedValue === null) return null;
    return this.state.options.find(o => o.value === this.state.selectedValue) ?? null;
  }

  get selectableOptions(): readonly SelectOption<T>[] {
    return this.state.options.filter(o => !o.disabled);
  }

  withSelectedValue(value: T | null): SelectEntity<T> {
    // Validate value exists in options (unless null)
    if (value !== null) {
      const exists = this.state.options.some(o => o.value === value);
      if (!exists) {
        throw new Error('Cannot select value that does not exist in options');
      }
      // Validate not selecting disabled option
      const option = this.state.options.find(o => o.value === value);
      if (option?.disabled) {
        throw new Error('Cannot select a disabled option');
      }
    }

    // Always clear error when changing selection (even when clearing to null)
    return new SelectEntity<T>({
      ...this.state,
      selectedValue: value,
      error: null,
      state: 'default',
    });
  }

  withOptions(options: readonly SelectOption<T>[]): SelectEntity<T> {
    // Clear selection if selected value no longer exists
    const selectedStillExists = this.state.selectedValue !== null
      ? options.some(o => o.value === this.state.selectedValue)
      : true;

    return new SelectEntity<T>({
      ...this.state,
      options,
      selectedValue: selectedStillExists ? this.state.selectedValue : null,
    });
  }

  withAddedOption(option: SelectOption<T>): SelectEntity<T> {
    // Check for duplicate value
    if (this.state.options.some(o => o.value === option.value)) {
      throw new Error('Cannot add option with duplicate value');
    }
    return this.withOptions([...this.state.options, option]);
  }

  withRemovedOption(value: T): SelectEntity<T> {
    const newOptions = this.state.options.filter(o => o.value !== value);
    return this.withOptions(newOptions);
  }

  withError(error: string | null): SelectEntity<T> {
    return new SelectEntity<T>({
      ...this.state,
      error,
      state: error ? 'error' : 'default',
    });
  }

  withStateType(stateType: SelectStateType): SelectEntity<T> {
    return new SelectEntity<T>({
      ...this.state,
      state: stateType,
      error: stateType !== 'error' ? null : this.state.error,
    });
  }

  withDisabled(disabled: boolean): SelectEntity<T> {
    return new SelectEntity<T>({
      ...this.state,
      disabled,
      error: disabled ? null : this.state.error,
      state: disabled ? 'default' : this.state.state,
    });
  }

  withRequired(required: boolean): SelectEntity<T> {
    return new SelectEntity<T>({ ...this.state, required });
  }

  withSize(size: SelectSize): SelectEntity<T> {
    return new SelectEntity<T>({ ...this.state, size });
  }

  withPlaceholder(placeholder: string): SelectEntity<T> {
    return new SelectEntity<T>({ ...this.state, placeholder });
  }

  withOpen(open: boolean): SelectEntity<T> {
    if (this.state.disabled) {
      return new SelectEntity<T>({ ...this.state, open: false });
    }
    return new SelectEntity<T>({ ...this.state, open });
  }

  // BUSINESS RULE #10: Required validation
  validateRequired(): { valid: boolean; errorMessage: string | null } {
    if (!this.state.required) {
      return { valid: true, errorMessage: null };
    }
    const valid = this.state.selectedValue !== null;
    return {
      valid,
      errorMessage: valid ? null : 'Please select an option',
    };
  }

  // BUSINESS RULE #11: Must have selectable options if required
  validateOptions(): { valid: boolean; errorMessage: string | null } {
    if (!this.state.required) {
      return { valid: true, errorMessage: null };
    }
    const hasSelectableOptions = this.selectableOptions.length > 0;
    return {
      valid: hasSelectableOptions,
      errorMessage: hasSelectableOptions ? null : 'No options available to select',
    };
  }

  // Alias for validateOptions (for backwards compatibility)
  validateHasOptions(): { valid: boolean; errorMessage: string | null } {
    return this.validateOptions();
  }

  // Validate all business rules
  validateAll(): { valid: boolean; errorMessage: string | null } {
    // Check options first
    const optionsResult = this.validateOptions();
    if (!optionsResult.valid) {
      return optionsResult;
    }

    // Then check required
    const requiredResult = this.validateRequired();
    if (!requiredResult.valid) {
      return requiredResult;
    }

    return { valid: true, errorMessage: null };
  }
}
