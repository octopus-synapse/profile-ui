

import {
  ButtonEntity,
  ButtonState,
  ButtonVariant,
  ButtonSize,
} from '../../domain/entities/button/ButtonState';
import { HandleButtonClick } from '../../domain/use-cases/button/HandleButtonClick';
import { ButtonPresenter } from '../presenters/ButtonPresenter';
import { ButtonViewModel } from '../view-models/ButtonViewModel';

export class ButtonController {
  public entity: ButtonEntity;
  private readonly handleClickUseCase: HandleButtonClick;
  private readonly presenter: ButtonPresenter;

  constructor(initialState: Partial<ButtonState>) {
    // BUSINESS RULE: Loading buttons must be disabled
    const state = {
      ...initialState,
      disabled: initialState.loading ? true : initialState.disabled,
    };
    this.entity = ButtonEntity.create(state);

    
    this.handleClickUseCase = new HandleButtonClick();

    
    this.presenter = new ButtonPresenter();
  }

  
  getViewModel(): ButtonViewModel {
    return this.presenter.present(this.entity);
  }

  
  async onClick(handler?: () => void | Promise<void>): Promise<void> {
    const response = await this.handleClickUseCase.execute({
      button: this.entity,
      handler,
    });

    
    this.entity = response.updatedButton;

    
    if (!response.success) {
      throw new Error(response.error);
    }
  }

  
  setDisabled(disabled: boolean): void {
    this.entity = this.entity.withDisabled(disabled);
  }

  
  setLoading(loading: boolean): void {
    this.entity = this.entity.withLoading(loading);
  }

  
  setVariant(variant: ButtonVariant): void {
    this.entity = this.entity.withVariant(variant);
  }

  
  setSize(size: ButtonSize): void {
    this.entity = this.entity.withSize(size);
  }

  
  setFullWidth(fullWidth: boolean): void {
    this.entity = this.entity.withFullWidth(fullWidth);
  }
}
