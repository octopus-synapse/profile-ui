

export interface InputViewModel {
  
  readonly disabled: boolean;
  readonly readOnly: boolean;
  readonly required: boolean;
  readonly interactive: boolean;
  readonly hasError: boolean;
  readonly errorMessage: string | null;

  
  readonly styles: {
    readonly height: string;
    readonly paddingH: string;
    readonly fontSize: string;
    readonly borderRadius: string;
    readonly backgroundColor: string;
    readonly textColor: string;
    readonly borderColor: string;
    readonly focusColor: string;
  };

  
  readonly ariaInvalid: boolean;
  readonly ariaRequired: boolean;
  readonly ariaReadOnly: boolean;
}
