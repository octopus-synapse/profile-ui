import { TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean | string;
  showCharacterCount?: boolean;
  showWordCount?: boolean;
  onValueChange?: (value: string) => void;
  // helperText is common in other components, maybe add it?
  helperText?: string;
}

export { textareaTokens } from '../../frameworks/tokens/textarea-tokens';
