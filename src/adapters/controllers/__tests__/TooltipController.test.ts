import { describe, it, expect } from 'bun:test';
import { TooltipController } from '../TooltipController';

describe('TooltipController', () => {
  it('should create hidden by default', () => {
    const controller = new TooltipController({});
    expect(controller.getViewModel().visible).toBe(false);
  });

  it('should show and hide', () => {
    const controller = new TooltipController({});
    controller.show();
    expect(controller.getViewModel().visible).toBe(true);
    controller.hide();
    expect(controller.getViewModel().visible).toBe(false);
  });

  it('should not show when disabled', () => {
    const controller = new TooltipController({ disabled: true });
    controller.show();
    expect(controller.getViewModel().visible).toBe(false);
  });

  it('should update position', () => {
    const controller = new TooltipController({});
    controller.setPosition('bottom');
    expect(controller.getViewModel().position).toBe('bottom');
  });
});
