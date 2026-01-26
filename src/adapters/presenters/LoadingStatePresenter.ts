import { LoadingStateEntity } from '../../domain/entities/loading-state/LoadingStateState';
import { LoadingStateViewModel } from '../view-models/LoadingStateViewModel';
import { loadingStateTokens } from '../../frameworks/tokens/loading-state-tokens';

export class LoadingStatePresenter {
  present(entity: LoadingStateEntity): LoadingStateViewModel {
    const state = entity.currentState;
    const variantToken = loadingStateTokens.variants[state.variant];

    return {
      variant: state.variant,
      message: state.message,
      isLoading: entity.isLoading,
      hasError: entity.hasError,
      styles: {
        color: variantToken.color,
        icon: variantToken.icon,
        messageColor: loadingStateTokens.messageColor,
        spacing: loadingStateTokens.spacing,
      },
      ariaLive: state.variant === 'error' ? 'assertive' : 'polite',
    };
  }
}
