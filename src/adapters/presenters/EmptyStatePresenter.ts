

import { EmptyStateEntity } from '../../domain/entities/empty-state/EmptyStateState';
import { EmptyStateViewModel } from '../view-models/EmptyStateViewModel';
import { emptyStateTokens } from '../../frameworks/tokens/empty-state-tokens';

export class EmptyStatePresenter {
  
  present(entity: EmptyStateEntity): EmptyStateViewModel {
    const state = entity.currentState;
    const sizeToken = emptyStateTokens.sizes[state.size];

    return {
      
      title: state.title,
      description: state.description,
      hasIcon: state.hasIcon,
      hasAction: state.hasAction,
      size: state.size,
      interactive: entity.isInteractive,

      
      styles: {
        padding: sizeToken.padding,
        iconSize: sizeToken.iconSize,
        titleSize: sizeToken.titleSize,
        descriptionSize: sizeToken.descSize,
        iconColor: emptyStateTokens.colors.icon,
        titleColor: emptyStateTokens.colors.title,
        descriptionColor: emptyStateTokens.colors.description,
      },

      
      role: 'status',
    };
  }
}
