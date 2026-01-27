





export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'ghost'
  | 'danger'
  | 'outline';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';





export interface ButtonState {
  readonly variant: ButtonVariant;
  readonly size: ButtonSize;
  readonly disabled: boolean;
  readonly loading: boolean;
  readonly fullWidth: boolean;
}





export class ButtonEntity {
  
  private constructor(private readonly state: ButtonState) {
    this.validate();
  }

  
  static create(params: Partial<ButtonState>): ButtonEntity {
    return new ButtonEntity({
      variant: params.variant ?? 'primary',
      size: params.size ?? 'md',
      disabled: params.disabled ?? false,
      loading: params.loading ?? false,
      fullWidth: params.fullWidth ?? false,
    });
  }

  
  private validate(): void {
    
    
    
    if (this.state.loading && !this.state.disabled) {
      throw new Error('Loading buttons must be disabled');
    }
  }

  
  get isInteractive(): boolean {
    return !this.state.disabled && !this.state.loading;
  }

  
  get currentState(): ButtonState {
    return { ...this.state };
  }

  
  withLoading(loading: boolean): ButtonEntity {
    return new ButtonEntity({
      ...this.state,
      loading,
      
      disabled: loading ? true : this.state.disabled,
    });
  }

  
  withDisabled(disabled: boolean): ButtonEntity {
    return new ButtonEntity({
      ...this.state,
      disabled,
      
      loading: disabled ? this.state.loading : false,
    });
  }

  
  withVariant(variant: ButtonVariant): ButtonEntity {
    return new ButtonEntity({
      ...this.state,
      variant,
    });
  }

  
  withSize(size: ButtonSize): ButtonEntity {
    return new ButtonEntity({
      ...this.state,
      size,
    });
  }

  
  withFullWidth(fullWidth: boolean): ButtonEntity {
    return new ButtonEntity({
      ...this.state,
      fullWidth,
    });
  }
}
