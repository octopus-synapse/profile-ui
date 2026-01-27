



export type { SelectOption } from '../../domain/entities/select/SelectState';

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectState = 'default' | 'error' | 'success';





export interface SelectProps<T = string> {
  value?: T | null;
  defaultValue?: T | null;
  placeholder?: string;
  options: readonly {
    readonly value: T;
    readonly label: string;
    readonly disabled?: boolean;
  }[];
  selectSize?: SelectSize;
  state?: SelectState;
  error?: boolean | string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  onValueChange?: (value: T | null) => void;
  onChange?: (value: T | null) => void;
  onBlur?: () => void;
  testID?: string;
  id?: string;
  accessibilityLabel?: string;
  name?: string;
}





export const selectTokens = {
  sizes: {
    sm: { height: 32, paddingH: 12, fontSize: 14 },
    md: { height: 40, paddingH: 14, fontSize: 14 },
    lg: { height: 48, paddingH: 16, fontSize: 16 },
  },
  states: {
    default: { border: 'rgba(255,255,255,0.1)', focus: '#06b6d4' },
    error: { border: '#ef4444', focus: '#ef4444' },
    success: { border: '#22c55e', focus: '#22c55e' },
  },
  colors: {
    background: '#0a0a0a',
    text: '#ffffff',
    placeholder: '#a3a3a3',
    disabled: { background: '#171717', text: '#525252' },
  },
  radius: 8,
} as const;
