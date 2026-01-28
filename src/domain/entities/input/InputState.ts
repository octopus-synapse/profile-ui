





export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'search';

export type InputSize = 'sm' | 'md' | 'lg';

export type InputStateType = 'default' | 'error' | 'success';

export interface InputState {
  readonly type: InputType;
  readonly size: InputSize;
  readonly state: InputStateType;
  readonly value: string;
  readonly disabled: boolean;
  readonly readOnly: boolean;
  readonly required: boolean;
  readonly error: string | null;
  readonly touched?: boolean;
  readonly hasError?: boolean;
}

export interface ValidationResult {
  readonly valid: boolean;
  readonly errorMessage: string | null;
}

