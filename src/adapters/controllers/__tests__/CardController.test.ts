import { describe, it, expect } from 'bun:test';
import { CardController } from '../CardController';

describe('CardController', () => {
  it('should create with defaults', () => {
    const controller = new CardController({});
    const vm = controller.getViewModel();
    expect(vm.padding).toBe('md');
    expect(vm.variant).toBe('default');
  });

  it('should handle press when interactive', async () => {
    const controller = new CardController({ interactive: true });
    let pressed = false;
    await controller.onPress(() => { pressed = true; });
    expect(pressed).toBe(true);
  });

  it('should throw when pressing non-interactive card', async () => {
    const controller = new CardController({ interactive: false });
    await expect(controller.onPress()).rejects.toThrow();
  });
});
