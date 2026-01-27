export interface CardViewModel {
  readonly padding: 'none' | 'sm' | 'md' | 'lg';
  readonly variant: 'default' | 'outlined' | 'filled' | 'elevated' | 'ghost';
  readonly hover: 'none' | 'border' | 'lift';
  readonly interactive: boolean;
  readonly styles: {
    readonly padding: number;
    readonly borderRadius: number;
    readonly backgroundColor: string;
    readonly borderColor: string;
    readonly shadow: string;
  };
  readonly role?: string;
}
