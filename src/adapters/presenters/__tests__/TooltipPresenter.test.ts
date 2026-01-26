import { describe, it, expect } from 'bun:test';
import { TooltipEntity } from '../../../domain/entities/tooltip/TooltipState';
import { TooltipPresenter } from '../TooltipPresenter';

describe('TooltipPresenter', () => {
  const presenter = new TooltipPresenter();

  it('should present tooltip', () => {
    const entity = TooltipEntity.create({ visible: true, position: 'left' });
    const vm = presenter.present(entity);
    expect(vm.visible).toBe(true);
    expect(vm.position).toBe('left');
    expect(vm.role).toBe('tooltip');
  });
});
