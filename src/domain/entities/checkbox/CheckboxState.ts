export type CheckboxValue = boolean | 'indeterminate';
export type CheckboxVariant = 'default' | 'error';

export interface CheckboxState {
  readonly value: CheckboxValue;
  readonly checked: boolean;
  readonly indeterminate: boolean;
  readonly variant: CheckboxVariant;
  readonly disabled: boolean;
  readonly readonly: boolean;
  readonly required: boolean;
  readonly error: boolean;
}
