

import {
  BadgeEntity,
  BadgeState,
  BadgeVariant,
  BadgeSize,
  BadgeShape,
} from '../../domain/entities/badge/BadgeState';
import { HandleBadgeRemove } from '../../domain/use-cases/badge/HandleBadgeRemove';
import { BadgePresenter } from '../presenters/BadgePresenter';
import { BadgeViewModel } from '../view-models/BadgeViewModel';

export class BadgeController {
  private entity: BadgeEntity;
  private readonly handleRemoveUseCase: HandleBadgeRemove;
  private readonly presenter: BadgePresenter;

  constructor(initialState: Partial<BadgeState>) {
    this.entity = BadgeEntity.create(initialState);
    this.handleRemoveUseCase = new HandleBadgeRemove();
    this.presenter = new BadgePresenter();
  }

  
  getViewModel(): BadgeViewModel {
    return this.presenter.present(this.entity);
  }

  
  async onRemove(handler?: () => void | Promise<void>): Promise<void> {
    const response = await this.handleRemoveUseCase.execute({
      badge: this.entity,
      handler,
    });

    if (!response.success) {
      throw new Error(response.error);
    }
  }

  
  setVariant(variant: BadgeVariant): void {
    this.entity = this.entity.withVariant(variant);
  }

  
  setSize(size: BadgeSize): void {
    this.entity = this.entity.withSize(size);
  }

  
  setShape(shape: BadgeShape): void {
    this.entity = this.entity.withShape(shape);
  }

  
  setDot(dot: boolean): void {
    this.entity = this.entity.withDot(dot);
  }

  
  setRemovable(removable: boolean): void {
    this.entity = this.entity.withRemovable(removable);
  }
}
