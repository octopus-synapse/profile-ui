import { SelectEntity, SelectState } from '../../domain/entities/select/SelectState';
import { HandleSelectChange } from '../../domain/use-cases/select/HandleSelectChange';
import { SelectPresenter } from '../presenters/SelectPresenter';
import { SelectViewModel } from '../view-models/SelectViewModel';

export class SelectController<T = string> {
  public entity: SelectEntity<T>;
  private readonly handleChangeUseCase: HandleSelectChange<T>;
  private readonly presenter: SelectPresenter;

  constructor(initialState: Partial<SelectState<T>> = {}) {
    this.entity = SelectEntity.create<T>(initialState);
    this.handleChangeUseCase = new HandleSelectChange<T>();
    this.presenter = new SelectPresenter();
  }

  getViewModel(): SelectViewModel<T> {
    return this.presenter.present(this.entity);
  }

  toggleOpen(): void {
    if (!this.entity.isInteractive) return;
    this.entity = this.entity.withOpen(!this.entity.currentState.open);
  }

  onChange(value: T | null): void {
    const response = this.handleChangeUseCase.execute({
      select: this.entity,
      newValue: value,
    });
    if (response.success) {
      this.entity = response.updatedSelect.withOpen(false);
    }
  }

  setDisabled(disabled: boolean): void {
    this.entity = this.entity.withDisabled(disabled);
  }
}
