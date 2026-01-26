import { TooltipEntity, TooltipState, TooltipPosition } from '../../domain/entities/tooltip/TooltipState';
import { HandleTooltipVisibility } from '../../domain/use-cases/tooltip/HandleTooltipVisibility';
import { TooltipPresenter } from '../presenters/TooltipPresenter';
import { TooltipViewModel } from '../view-models/TooltipViewModel';

export class TooltipController {
  private entity: TooltipEntity;
  private readonly handleVisibilityUseCase: HandleTooltipVisibility;
  private readonly presenter: TooltipPresenter;

  constructor(initialState: Partial<TooltipState>) {
    this.entity = TooltipEntity.create(initialState);
    this.handleVisibilityUseCase = new HandleTooltipVisibility();
    this.presenter = new TooltipPresenter();
  }

  getViewModel(): TooltipViewModel {
    return this.presenter.present(this.entity);
  }

  show(): void {
    const response = this.handleVisibilityUseCase.execute({ tooltip: this.entity, show: true });
    this.entity = response.updatedTooltip;
  }

  hide(): void {
    const response = this.handleVisibilityUseCase.execute({ tooltip: this.entity, show: false });
    this.entity = response.updatedTooltip;
  }

  setPosition(position: TooltipPosition): void {
    this.entity = this.entity.withPosition(position);
  }

  setDelay(delay: number): void {
    this.entity = this.entity.withDelay(delay);
  }

  setDisabled(disabled: boolean): void {
    this.entity = this.entity.withDisabled(disabled);
  }
}
