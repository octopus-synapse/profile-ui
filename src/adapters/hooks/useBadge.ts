import { useCallback } from 'react';
import { BadgeProps, badgeTokens } from '../../shared/badge/badge.types';

export function useBadge(props: Partial<BadgeProps> = {}) {
  const {
    variant = 'default',
    size = 'md',
    shape = 'rounded',
    dot = false,
    removable = false,
    onRemove,
  } = props;

  const handleRemove = useCallback(() => {
    onRemove?.();
  }, [onRemove]);

  const variantToken = badgeTokens.variants[variant];
  const sizeToken = badgeTokens.sizes[size];
  const shapeToken = badgeTokens.shapes[shape];

  return {
    state: {
      variant,
      size,
      shape,
      dot,
      removable,
    },
    styles: {
      paddingH: sizeToken.paddingH,
      paddingV: sizeToken.paddingV,
      fontSize: sizeToken.fontSize,
      borderRadius: shapeToken.radius,
      backgroundColor: variantToken.background,
      textColor: variantToken.text,
      borderColor: variantToken.border,
    },
    dotStyles: dot ? badgeTokens.dot : undefined,
    handlers: {
      onRemove: handleRemove,
    },
  };
}
