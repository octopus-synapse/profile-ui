import { LoadingStateEntity, LoadingStateState, LoadingStateVariant } from '../../domain/entities/loading-state/LoadingStateState';
import { TransitionLoadingState } from '../../domain/use-cases/loading-state/TransitionLoadingState';
import { LoadingStatePresenter } from '../presenters/LoadingStatePresenter';
import { LoadingStateViewModel } from '../view-models/LoadingStateViewModel';

export class LoadingStateController {
  private entity: LoadingStateEntity;
  private readonly transitionUseCase: TransitionLoadingState;
  private readonly presenter: LoadingStatePresenter;

  constructor(initialState: Partial<LoadingStateState>) {
    this.entity = LoadingStateEntity.create(initialState);
    this.transitionUseCase = new TransitionLoadingState();
    this.presenter = new LoadingStatePresenter();
  }

  getViewModel(): LoadingStateViewModel {
    return this.presenter.present(this.entity);
  }

  transitionTo(variant: LoadingStateVariant, message?: string): void {
    const response = this.transitionUseCase.execute({
      currentState: this.entity,
      targetVariant: variant,
      message,
    });
    this.entity = response.newState;
  }

  setMessage(message: string | null): void {
    this.entity = this.entity.withMessage(message);
  }
}
