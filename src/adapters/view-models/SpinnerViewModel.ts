

export interface SpinnerViewModel {
  
  readonly size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  readonly colorScheme: 'default' | 'accent' | 'muted';
  readonly label: string | null;

  
  readonly styles: {
    readonly size: number;
    readonly color: string;
    readonly strokeWidth: number;
  };

  
  readonly ariaLabel: string;
  readonly role: string;
  readonly ariaLive: 'polite' | 'assertive';
}
