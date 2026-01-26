

import { SkeletonEntity } from '../../domain/entities/skeleton/SkeletonState';
import { SkeletonViewModel } from '../view-models/SkeletonViewModel';
import { skeletonTokens } from '../../frameworks/tokens/skeleton-tokens';

export class SkeletonPresenter {
  
  present(entity: SkeletonEntity): SkeletonViewModel {
    const state = entity.currentState;

    return {
      
      width: state.width,
      height: state.height,
      variant: state.variant,
      animation: state.animation,
      isAnimated: entity.isAnimated,

      
      styles: {
        borderRadius: skeletonTokens.shapes[state.variant],
        baseColor: skeletonTokens.colors.base,
        highlightColor: skeletonTokens.colors.highlight,
      },

      
      ariaLabel: 'Loading content',
      ariaLive: 'polite',
    };
  }
}
