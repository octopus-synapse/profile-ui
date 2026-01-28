import { loadingStateTokens } from '../../shared/loading-state/loading-state.types';

export function useLoadingState() {
  return {
    styles: {
      messageColor: loadingStateTokens.message.color,
    },
  };
}
