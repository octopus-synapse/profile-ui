

import {
  EmptyStateEntity,
  EmptyStateState,
  EmptyStateSize,
} from '../../domain/entities/empty-state/EmptyStateState';
import { HandleEmptyStateAction } from '../../domain/use-cases/empty-state/HandleEmptyStateAction';
import { EmptyStatePresenter } from '../presenters/EmptyStatePresenter';
import { EmptyStateViewModel } from '../view-models/EmptyStateViewModel';

export class EmptyStateController {
  private entity: EmptyStateEntity;
  private readonly handleActionUseCase: HandleEmptyStateAction;
  private readonly presenter: EmptyStatePresenter;

  constructor(initialState: Partial<EmptyStateState> & { title: string }) {
    this.entity = EmptyStateEntity.create(initialState);
    this.handleActionUseCase = new HandleEmptyStateAction();
    this.presenter = new EmptyStatePresenter();
  }

  
  getViewModel(): EmptyStateViewModel {
    return this.presenter.present(this.entity);
  }

  
  async onAction(handler?: () => void | Promise<void>): Promise<void> {
    const response = await this.handleActionUseCase.execute({
      emptyState: this.entity,
      handler,
    });

    if (!response.success) {
      throw new Error(response.error);
    }
  }

  
  setTitle(title: string): void {
    this.entity = this.entity.withTitle(title);
  }

  
  setDescription(description: string | null): void {
    this.entity = this.entity.withDescription(description);
  }

  
  setHasIcon(hasIcon: boolean): void {
    this.entity = this.entity.withHasIcon(hasIcon);
  }

  
  setHasAction(hasAction: boolean): void {
    this.entity = this.entity.withHasAction(hasAction);
  }

  
  setSize(size: EmptyStateSize): void {
    this.entity = this.entity.withSize(size);
  }
}
