export type LoadingStateVariant = 'loading' | 'success' | 'error' | 'idle';

export interface LoadingStateState {
  readonly variant: LoadingStateVariant;
  readonly message: string | null;
}

export class LoadingStateEntity {
  private constructor(private readonly state: LoadingStateState) {}

  static create(params: Partial<LoadingStateState>): LoadingStateEntity {
    return new LoadingStateEntity({
      variant: params.variant ?? 'idle',
      message: params.message ?? null,
    });
  }

  get currentState(): LoadingStateState {
    return { ...this.state };
  }

  get isLoading(): boolean {
    return this.state.variant === 'loading';
  }

  get hasError(): boolean {
    return this.state.variant === 'error';
  }

  withVariant(variant: LoadingStateVariant): LoadingStateEntity {
    return new LoadingStateEntity({ ...this.state, variant });
  }

  withMessage(message: string | null): LoadingStateEntity {
    return new LoadingStateEntity({ ...this.state, message });
  }
}
