import { describe, it, expect } from 'bun:test';
import { SelectController } from '../SelectController';

describe('SelectController', () => {
  it('should create closed by default', () => {
    const controller = new SelectController({});
    expect(controller.getViewModel().open).toBe(false);
  });

  it('should toggle open state', () => {
    const controller = new SelectController({});
    controller.toggleOpen();
    expect(controller.getViewModel().open).toBe(true);
    controller.toggleOpen();
    expect(controller.getViewModel().open).toBe(false);
  });

  it('should select value and close', async () => {
    const controller = new SelectController({ 
      open: true,
      options: [{ value: 'option1', label: 'Option 1' }]
    });
    await controller.onChange('option1');
    const vm = controller.getViewModel();
    expect(vm.selected).toBe('option1');
    expect(vm.open).toBe(false);
  });

  it('should not open when disabled', () => {
    const controller = new SelectController({ disabled: true });
    controller.toggleOpen();
    expect(controller.getViewModel().open).toBe(false);
  });
});
