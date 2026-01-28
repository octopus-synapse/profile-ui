export type SwitchVariant = 'default' | 'error';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  variant?: SwitchVariant;
  
  // HTML Props
  id?: string;
  name?: string;
  value?: string;
  testID?: string;
  className?: string;
  'aria-label'?: string;
}

export { switchTokens } from '../../frameworks/tokens/switch-tokens';
