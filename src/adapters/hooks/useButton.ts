

import { useCallback } from 'react';
import type { ButtonState } from '../../domain/entities/button/ButtonState';
import { buttonTokens } from '../../frameworks/tokens/button-tokens';

export interface UseButtonProps extends Partial<ButtonState> {
  onClick?: () => void | Promise<void>;
}

/**
 * useButton Hook
 * Encapsulates button logic and style derivation without unnecessary Controllers/Presenters
 */
export function useButton(props: UseButtonProps = {}) {
  const {
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    fullWidth = false,
    onClick,
  } = props;

  // Business Rule: Loading implies disabled
  const isDisabled = disabled || loading;

  const handleClick = useCallback(async () => {
    if (isDisabled) return;
    if (onClick) {
      await onClick();
    }
  }, [isDisabled, onClick]);

  // Style Derivation (replacing Presenter)
  const variantToken = buttonTokens.variants[variant];
  const sizeToken = buttonTokens.sizes[size];

  const styles = {
    height: sizeToken.height,
    paddingH: sizeToken.paddingH,
    fontSize: sizeToken.fontSize,
    borderRadius: sizeToken.radius,
    backgroundColor: variantToken.background,
    textColor: variantToken.text,
    borderColor: variantToken.border,
  };

  return {
    state: {
      disabled: isDisabled,
      loading,
      fullWidth,
      variant,
      size,
    },
    styles,
    handlers: {
      handleClick,
    },
    accessibility: {
      role: 'button',
      'aria-disabled': isDisabled,
      'aria-label': loading ? 'Loading' : undefined,
    }
  };
}
