

import {
  SpinnerEntity,
  SpinnerState,
  SpinnerSize,
  SpinnerColorScheme,
} from '../../domain/entities/spinner/SpinnerState';
import { SpinnerPresenter } from '../presenters/SpinnerPresenter';
import { SpinnerViewModel } from '../view-models/SpinnerViewModel';

export class SpinnerController {
  private entity: SpinnerEntity;
  private readonly presenter: SpinnerPresenter;

  constructor(initialState: Partial<SpinnerState>) {
    this.entity = SpinnerEntity.create(initialState);
    this.presenter = new SpinnerPresenter();
  }

  
  getViewModel(): SpinnerViewModel {
    return this.presenter.present(this.entity);
  }

  
  setSize(size: SpinnerSize): void {
    this.entity = this.entity.withSize(size);
  }

  
  setColorScheme(colorScheme: SpinnerColorScheme): void {
    this.entity = this.entity.withColorScheme(colorScheme);
  }

  
  setLabel(label: string | null): void {
    this.entity = this.entity.withLabel(label);
  }
}
