






export type SwitchValue = boolean;

export type SwitchVariant = 'default' | 'error';





export interface SwitchState {
  readonly value: SwitchValue;
  readonly variant: SwitchVariant;
  readonly disabled: boolean;
  readonly readonly: boolean;
}





export class SwitchEntity {
  
  private constructor(private readonly state: SwitchState) {
    this.validate();
  }

  
  static create(params: Partial<SwitchState> = {}): SwitchEntity {
    return new SwitchEntity({
      value: params.value ?? false,
      variant: params.variant ?? 'default',
      disabled: params.disabled ?? false,
      readonly: params.readonly ?? false,
    });
  }

  
  private validate(): void {
    
    
    
    if (typeof this.state.value !== 'boolean') {
      throw new Error(
        'Invalid switch value: must be boolean (true or false)'
      );
    }

    
    
    
    
    if (this.state.disabled && this.state.readonly) {
      throw new Error('Switch cannot be both disabled and readonly');
    }
  }

  
  get isInteractive(): boolean {
    return !this.state.disabled && !this.state.readonly;
  }

  
  get isOn(): boolean {
    return this.state.value === true;
  }

  
  get isOff(): boolean {
    return this.state.value === false;
  }

  
  get currentState(): SwitchState {
    return { ...this.state };
  }

  
  withValue(value: SwitchValue): SwitchEntity {
    return new SwitchEntity({
      ...this.state,
      value,
    });
  }

  
  toggle(): SwitchEntity {
    return this.withValue(!this.state.value);
  }

  
  withVariant(variant: SwitchVariant): SwitchEntity {
    return new SwitchEntity({
      ...this.state,
      variant,
    });
  }

  
  withDisabled(disabled: boolean): SwitchEntity {
    return new SwitchEntity({
      ...this.state,
      disabled,
      readonly: disabled ? false : this.state.readonly,
    });
  }

  
  withReadonly(readonly: boolean): SwitchEntity {
    return new SwitchEntity({
      ...this.state,
      readonly,
      disabled: readonly ? false : this.state.disabled,
    });
  }
}
