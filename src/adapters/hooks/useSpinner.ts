import { SpinnerProps, spinnerTokens } from '../../shared/spinner/spinner.types';

export function useSpinner(props: Partial<SpinnerProps> = {}) {
  const { size = 'md', variant = 'primary' } = props;

  const sizeToken = spinnerTokens.sizes[size];
  const variantToken = spinnerTokens.variants[variant];

  return {
    state: {
      size,
      variant,
    },
    styles: {
      size: sizeToken.size,
      strokeWidth: sizeToken.strokeWidth,
      color: variantToken.color,
    },
  };
}
