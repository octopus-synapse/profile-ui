export interface LoadingStateViewModel {
  readonly variant: 'loading' | 'success' | 'error' | 'idle';
  readonly message: string | null;
  readonly isLoading: boolean;
  readonly hasError: boolean;
  readonly styles: {
    readonly color: string;
    readonly icon: string;
    readonly messageColor: string;
    readonly spacing: number;
  };
  readonly ariaLive: 'polite' | 'assertive';
}
