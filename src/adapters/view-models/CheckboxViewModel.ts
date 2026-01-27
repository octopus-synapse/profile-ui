

export interface CheckboxViewModel {
  
  readonly checked: boolean;
  readonly unchecked: boolean;
  readonly indeterminate: boolean;
  readonly disabled: boolean;
  readonly readonly: boolean;
  readonly required: boolean;
  readonly interactive: boolean;
  readonly formValue: boolean;

  
  readonly styles: {
    readonly size: string;
    readonly radius: string;
    readonly checkmarkSize: string;
    readonly backgroundColor: string;
    readonly borderColor: string;
    readonly checkmarkColor?: string;
    readonly indicatorColor?: string;
  };

  
  readonly ariaDisabled: boolean;
  readonly ariaReadonly: boolean;
  readonly ariaRequired: boolean;
  readonly ariaChecked: boolean | 'mixed';
  readonly role: string;
}
