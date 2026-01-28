import { useCallback } from 'react';
import { CardProps, cardTokens } from '../../shared/card/card.types';

export function useCard(props: Partial<CardProps> = {}) {
  const {
    padding = 'md',
    variant = 'default',
    hover = 'none',
    interactive = false,
    onPress,
  } = props;

  const handlePress = useCallback(() => {
    onPress?.();
  }, [onPress]);

  const variantToken = cardTokens.variants[variant];
  const paddingValue = cardTokens.padding[padding];

  return {
    state: {
      padding,
      variant,
      hover,
      interactive: interactive || !!onPress,
    },
    styles: {
      padding: paddingValue,
      borderRadius: cardTokens.radius,
      backgroundColor: variantToken.background,
      borderColor: variantToken.border,
      shadow: variantToken.shadow,
    },
    handlers: {
      onPress: handlePress,
    },
  };
}
