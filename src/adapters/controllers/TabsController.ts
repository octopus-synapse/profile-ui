import { TabsEntity } from '../../domain/entities/tabs/TabsState';
import { HandleTabChange } from '../../domain/use-cases/tabs/HandleTabChange';
import { TabsPresenter } from '../presenters/TabsPresenter';
import { TabsViewModel } from '../view-models/TabsViewModel';

export class TabsController {
  private entity: TabsEntity;
  private readonly handleTabChangeUseCase: HandleTabChange;
  private readonly presenter: TabsPresenter;

  constructor(initialState: { selectedValue: string; variant?: 'default' | 'underline' | 'pills' }) {
    this.entity = TabsEntity.create(initialState);
    this.handleTabChangeUseCase = new HandleTabChange();
    this.presenter = new TabsPresenter();
  }

  getViewModel(): TabsViewModel {
    return this.presenter.present(this.entity);
  }

  async onChange(value: string, handler?: (value: string) => void | Promise<void>): Promise<void> {
    const response = await this.handleTabChangeUseCase.execute({
      tabs: this.entity,
      newValue: value,
      handler,
    });
    this.entity = response.updatedTabs;
  }

  isSelected(value: string): boolean {
    return this.entity.isSelected(value);
  }

  setVariant(variant: 'default' | 'underline' | 'pills'): void {
    this.entity = this.entity.withVariant(variant);
  }
}
