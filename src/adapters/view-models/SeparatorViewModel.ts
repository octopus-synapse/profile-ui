

export interface SeparatorViewModel {
  
  readonly orientation: 'horizontal' | 'vertical';
  readonly decorative: boolean;

  
  readonly styles: {
    readonly color: string;
    readonly thickness: number;
  };

  
  readonly role: 'none' | 'separator';
  readonly ariaOrientation?: 'horizontal' | 'vertical';
}
