

import { describe, it, expect } from 'bun:test';
import { SeparatorController } from '../SeparatorController';

describe('SeparatorController', () => {
  it('should create with default state', () => {
    const controller = new SeparatorController({});
    const viewModel = controller.getViewModel();

    expect(viewModel.orientation).toBe('horizontal');
    expect(viewModel.decorative).toBe(true);
    expect(viewModel.role).toBe('none');
  });

  it('should create with custom orientation', () => {
    const controller = new SeparatorController({ orientation: 'vertical' });
    const viewModel = controller.getViewModel();

    expect(viewModel.orientation).toBe('vertical');
  });

  it('should update orientation', () => {
    const controller = new SeparatorController({ orientation: 'horizontal' });
    
    controller.setOrientation('vertical');
    const viewModel = controller.getViewModel();

    expect(viewModel.orientation).toBe('vertical');
  });

  it('should handle decorative state', () => {
    const controller = new SeparatorController({ decorative: false });
    const viewModel = controller.getViewModel();

    expect(viewModel.decorative).toBe(false);
    expect(viewModel.role).toBe('separator');
    expect(viewModel.ariaOrientation).toBe('horizontal');
  });

  it('should update decorative state', () => {
    const controller = new SeparatorController({ decorative: true });
    
    controller.setDecorative(false);
    const viewModel = controller.getViewModel();

    expect(viewModel.decorative).toBe(false);
    expect(viewModel.role).toBe('separator');
  });

  it('should apply design tokens', () => {
    const controller = new SeparatorController({});
    const viewModel = controller.getViewModel();

    expect(viewModel.styles.color).toBe('rgba(255,255,255,0.1)');
    expect(viewModel.styles.thickness).toBe(1);
  });

  it('should not expose ariaOrientation when decorative', () => {
    const controller = new SeparatorController({ decorative: true });
    const viewModel = controller.getViewModel();

    expect(viewModel.ariaOrientation).toBeUndefined();
  });
});
