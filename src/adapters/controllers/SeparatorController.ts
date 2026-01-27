

import {
  SeparatorEntity,
  SeparatorState,
  SeparatorOrientation,
} from '../../domain/entities/separator/SeparatorState';
import { SeparatorPresenter } from '../presenters/SeparatorPresenter';
import { SeparatorViewModel } from '../view-models/SeparatorViewModel';

export class SeparatorController {
  private entity: SeparatorEntity;
  private readonly presenter: SeparatorPresenter;

  constructor(initialState: Partial<SeparatorState>) {
    this.entity = SeparatorEntity.create(initialState);
    this.presenter = new SeparatorPresenter();
  }

  
  getViewModel(): SeparatorViewModel {
    return this.presenter.present(this.entity);
  }

  
  setOrientation(orientation: SeparatorOrientation): void {
    this.entity = this.entity.withOrientation(orientation);
  }

  
  setDecorative(decorative: boolean): void {
    this.entity = this.entity.withDecorative(decorative);
  }
}
