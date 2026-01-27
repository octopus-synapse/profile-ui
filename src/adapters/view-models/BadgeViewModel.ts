

export interface BadgeViewModel {
  
  readonly variant: 'default' | 'secondary' | 'primary' | 'outline' | 'success' | 'warning' | 'error' | 'info';
  readonly size: 'xs' | 'sm' | 'md' | 'lg';
  readonly shape: 'rounded' | 'pill' | 'square';
  readonly dot: boolean;
  readonly removable: boolean;
  readonly interactive: boolean;

  
  readonly styles: {
    readonly paddingH: number;
    readonly paddingV: number;
    readonly fontSize: number;
    readonly borderRadius: number;
    readonly backgroundColor: string;
    readonly textColor: string;
    readonly borderColor: string;
  };

  
  readonly dotStyles?: {
    readonly size: number;
    readonly gap: number;
  };

  
  readonly role: string;
}
