import { TabsEntity } from '../../domain/entities/tabs/TabsState';
import { TabsViewModel } from '../view-models/TabsViewModel';
import { tabsTokens } from '../../frameworks/tokens/tabs-tokens';

export class TabsPresenter {
  present(entity: TabsEntity): TabsViewModel {
    const state = entity.currentState;
    const variantToken = tabsTokens.variants[state.variant];

    return {
      selectedValue: state.selectedValue,
      variant: state.variant,
      styles: {
        background: variantToken.background,
        activeBackground: variantToken.activeBackground,
        border: variantToken.border,
        activeBorder: variantToken.activeBorder,
        text: tabsTokens.colors.text,
        activeText: tabsTokens.colors.activeText,
        gap: tabsTokens.spacing.gap,
        padding: tabsTokens.spacing.padding,
        radius: tabsTokens.radius,
      },
    };
  }
}
