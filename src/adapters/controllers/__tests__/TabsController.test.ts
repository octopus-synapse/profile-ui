import { describe, it, expect } from 'bun:test';
import { TabsController } from '../TabsController';

describe('TabsController', () => {
  it('should create with selected value', () => {
    const controller = new TabsController({ selectedValue: 'tab1' });
    const vm = controller.getViewModel();
    expect(vm.selectedValue).toBe('tab1');
  });

  it('should change selected tab', async () => {
    const controller = new TabsController({ selectedValue: 'tab1' });
    await controller.onChange('tab2');
    expect(controller.getViewModel().selectedValue).toBe('tab2');
  });

  it('should detect selected tab', () => {
    const controller = new TabsController({ selectedValue: 'tab1' });
    expect(controller.isSelected('tab1')).toBe(true);
    expect(controller.isSelected('tab2')).toBe(false);
  });
});
