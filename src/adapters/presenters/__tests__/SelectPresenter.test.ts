import { describe, it, expect } from 'bun:test';
import { SelectEntity } from '../../../domain/entities/select/SelectState';
import { SelectPresenter } from '../SelectPresenter';

describe('SelectPresenter', () => {
  const presenter = new SelectPresenter();

  it('should present select', () => {
    const entity = SelectEntity.create<string>({ open: true, selectedValue: 'test', options: [{ value: 'test', label: 'Test' }] });
    const vm = presenter.present(entity);
    expect(vm.ariaExpanded).toBe(true);
    expect(vm.selected).toBe('test');
  });

  it('should mark disabled', () => {
    const entity = SelectEntity.create({ disabled: true });
    const vm = presenter.present(entity);
    expect(vm.ariaDisabled).toBe(true);
  });
});
