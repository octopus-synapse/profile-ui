

export interface SwitchViewModel {
  
  readonly on: boolean;
  readonly off: boolean;
  readonly disabled: boolean;
  readonly readonly: boolean;
  readonly interactive: boolean;

  
  readonly styles: {
    readonly width: string;
    readonly height: string;
    readonly thumbSize: string;
    readonly thumbTranslate: string;
    readonly backgroundColor: string;
    readonly borderColor: string;
    readonly thumbColor: string;
  };

  
  readonly ariaDisabled: boolean;
  readonly ariaReadonly: boolean;
  readonly ariaChecked: boolean;
  readonly role: string;
}
