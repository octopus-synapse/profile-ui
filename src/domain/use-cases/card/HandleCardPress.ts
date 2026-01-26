import { CardEntity } from '../../entities/card/CardState';

export interface HandleCardPressRequest {
  card: CardEntity;
  handler?: () => void | Promise<void>;
}

export interface HandleCardPressResponse {
  success: boolean;
  error?: string;
}

export class HandleCardPress {
  async execute(request: HandleCardPressRequest): Promise<HandleCardPressResponse> {
    if (!request.card.isClickable) {
      return { success: false, error: 'Card is not interactive' };
    }

    try {
      if (request.handler) {
        await request.handler();
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Press failed' };
    }
  }
}
