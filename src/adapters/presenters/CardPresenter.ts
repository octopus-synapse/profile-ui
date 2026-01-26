import { CardEntity } from '../../domain/entities/card/CardState';
import { CardViewModel } from '../view-models/CardViewModel';
import { cardTokens } from '../../frameworks/tokens/card-tokens';

export class CardPresenter {
  present(entity: CardEntity): CardViewModel {
    const state = entity.currentState;
    const variantToken = cardTokens.variants[state.variant];

    return {
      padding: state.padding,
      variant: state.variant,
      hover: state.hover,
      interactive: state.interactive,
      styles: {
        padding: cardTokens.padding[state.padding],
        borderRadius: cardTokens.radius,
        backgroundColor: variantToken.background,
        borderColor: variantToken.border,
        shadow: variantToken.shadow,
      },
      role: state.interactive ? 'button' : undefined,
    };
  }
}
