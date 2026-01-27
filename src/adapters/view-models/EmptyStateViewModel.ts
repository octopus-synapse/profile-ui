

export interface EmptyStateViewModel {
  
  readonly title: string;
  readonly description: string | null;
  readonly hasIcon: boolean;
  readonly hasAction: boolean;
  readonly size: 'sm' | 'md' | 'lg';
  readonly interactive: boolean;

  
  readonly styles: {
    readonly padding: number;
    readonly iconSize: number;
    readonly titleSize: number;
    readonly descriptionSize: number;
    readonly iconColor: string;
    readonly titleColor: string;
    readonly descriptionColor: string;
  };

  
  readonly role: string;
}
