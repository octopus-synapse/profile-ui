import { CardEntity, CardState, CardPadding, CardVariant, CardHover } from '../../domain/entities/card/CardState';
import { HandleCardPress } from '../../domain/use-cases/card/HandleCardPress';
import { CardPresenter } from '../presenters/CardPresenter';
import { CardViewModel } from '../view-models/CardViewModel';

export class CardController {
  private entity: CardEntity;
  private readonly handlePressUseCase: HandleCardPress;
  private readonly presenter: CardPresenter;

  constructor(initialState: Partial<CardState>) {
    this.entity = CardEntity.create(initialState);
    this.handlePressUseCase = new HandleCardPress();
    this.presenter = new CardPresenter();
  }

  getViewModel(): CardViewModel {
    return this.presenter.present(this.entity);
  }

  async onPress(handler?: () => void | Promise<void>): Promise<void> {
    const response = await this.handlePressUseCase.execute({ card: this.entity, handler });
    if (!response.success) {
      throw new Error(response.error);
    }
  }

  setPadding(padding: CardPadding): void {
    this.entity = this.entity.withPadding(padding);
  }

  setVariant(variant: CardVariant): void {
    this.entity = this.entity.withVariant(variant);
  }

  setHover(hover: CardHover): void {
    this.entity = this.entity.withHover(hover);
  }

  setInteractive(interactive: boolean): void {
    this.entity = this.entity.withInteractive(interactive);
  }
}
