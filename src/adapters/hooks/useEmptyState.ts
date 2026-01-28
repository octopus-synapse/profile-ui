import { EmptyStateProps, emptyStateTokens } from '../../shared/empty-state/empty-state.types';

export function useEmptyState(props: EmptyStateProps) {
  const { size = 'md' } = props;

  const sizeToken = emptyStateTokens.sizes[size];

  return {
    state: {
      size,
    },
    styles: {
      padding: sizeToken.padding,
      iconSize: sizeToken.iconSize,
      iconColor: emptyStateTokens.colors.icon,
      titleSize: sizeToken.titleSize,
      titleColor: emptyStateTokens.colors.title,
      descriptionSize: sizeToken.descSize,
      descriptionColor: emptyStateTokens.colors.description,
    },
  };
}
