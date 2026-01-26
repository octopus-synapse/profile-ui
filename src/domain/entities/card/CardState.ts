export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardVariant = 'default' | 'outlined' | 'filled' | 'elevated' | 'ghost';
export type CardHover = 'none' | 'border' | 'lift';

export interface CardState {
  readonly padding: CardPadding;
  readonly variant: CardVariant;
  readonly hover: CardHover;
  readonly interactive: boolean;
}

export class CardEntity {
  private constructor(private readonly state: CardState) {}

  static create(params: Partial<CardState>): CardEntity {
    return new CardEntity({
      padding: params.padding ?? 'md',
      variant: params.variant ?? 'default',
      hover: params.hover ?? 'none',
      interactive: params.interactive ?? false,
    });
  }

  get currentState(): CardState {
    return { ...this.state };
  }

  get isClickable(): boolean {
    return this.state.interactive;
  }

  withPadding(padding: CardPadding): CardEntity {
    return new CardEntity({ ...this.state, padding });
  }

  withVariant(variant: CardVariant): CardEntity {
    return new CardEntity({ ...this.state, variant });
  }

  withHover(hover: CardHover): CardEntity {
    return new CardEntity({ ...this.state, hover });
  }

  withInteractive(interactive: boolean): CardEntity {
    return new CardEntity({ ...this.state, interactive });
  }
}
