import { describe, it, expect } from 'bun:test';
import { TabsEntity } from '../../../domain/entities/tabs/TabsState';
import { TabsPresenter } from '../TabsPresenter';

describe('TabsPresenter', () => {
  const presenter = new TabsPresenter();

  it('should present tabs', () => {
    const entity = TabsEntity.create({ selectedValue: 'tab1', variant: 'pills' });
    const vm = presenter.present(entity);
    expect(vm.variant).toBe('pills');
    expect(vm.selectedValue).toBe('tab1');
  });
});
