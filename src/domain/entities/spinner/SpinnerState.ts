





export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerColorScheme = 'default' | 'accent' | 'muted';





export interface SpinnerState {
  readonly size: SpinnerSize;
  readonly colorScheme: SpinnerColorScheme;
  readonly label: string | null;
}





export class SpinnerEntity {
  private constructor(private readonly state: SpinnerState) {}

  
  static create(params: Partial<SpinnerState>): SpinnerEntity {
    return new SpinnerEntity({
      size: params.size ?? 'md',
      colorScheme: params.colorScheme ?? 'default',
      label: params.label ?? null,
    });
  }

  
  get currentState(): SpinnerState {
    return { ...this.state };
  }

  
  get ariaLabel(): string {
    return this.state.label ?? 'Loading';
  }

  
  withSize(size: SpinnerSize): SpinnerEntity {
    return new SpinnerEntity({
      ...this.state,
      size,
    });
  }

  
  withColorScheme(colorScheme: SpinnerColorScheme): SpinnerEntity {
    return new SpinnerEntity({
      ...this.state,
      colorScheme,
    });
  }

  
  withLabel(label: string | null): SpinnerEntity {
    return new SpinnerEntity({
      ...this.state,
      label,
    });
  }
}
