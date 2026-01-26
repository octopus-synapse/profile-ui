

export interface TextareaViewModel {
  
  readonly disabled: boolean;
  readonly readOnly: boolean;
  readonly required: boolean;
  readonly interactive: boolean;
  readonly hasError: boolean;
  readonly errorMessage: string | null;

  
  readonly rows: number;
  readonly autoResize: boolean;

  
  readonly characterCount: number;
  readonly wordCount: number;
  readonly lineCount: number;
  readonly remainingCharacters: number | null;
  readonly exceedsMaxLength: boolean;

  
  readonly styles: {
    readonly minHeight: string;
    readonly paddingH: string;
    readonly paddingV: string;
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
