

export interface ButtonViewModel {
  
  readonly disabled: boolean;
  readonly loading: boolean;
  readonly interactive: boolean;
  readonly fullWidth: boolean;

  
  readonly styles: {
    readonly height: string;
    readonly paddingH: string;
    readonly fontSize: string;
    readonly borderRadius: string;
    readonly backgroundColor: string;
    readonly textColor: string;
    readonly borderColor: string;
  };

  
  readonly ariaDisabled: boolean;
  readonly ariaLabel?: string;
  readonly role: string;
}
