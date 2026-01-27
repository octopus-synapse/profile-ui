

import { describe, it, expect } from 'bun:test';
import { SpinnerController } from '../SpinnerController';

describe('SpinnerController', () => {
  it('should create with default state', () => {
    const controller = new SpinnerController({});
    const viewModel = controller.getViewModel();

    expect(viewModel.size).toBe('md');
    expect(viewModel.colorScheme).toBe('default');
    expect(viewModel.ariaLabel).toBe('Loading');
  });

  it('should create with custom size', () => {
    const controller = new SpinnerController({ size: 'lg' });
    const viewModel = controller.getViewModel();

    expect(viewModel.size).toBe('lg');
    expect(viewModel.styles.size).toBe(32);
  });

  it('should update size', () => {
    const controller = new SpinnerController({ size: 'sm' });
    
    controller.setSize('xl');
    const viewModel = controller.getViewModel();

    expect(viewModel.size).toBe('xl');
    expect(viewModel.styles.size).toBe(48);
    expect(viewModel.styles.strokeWidth).toBe(4);
  });

  it('should handle color scheme', () => {
    const controller = new SpinnerController({ colorScheme: 'accent' });
    const viewModel = controller.getViewModel();

    expect(viewModel.colorScheme).toBe('accent');
    expect(viewModel.styles.color).toBe('#06b6d4');
  });

  it('should update color scheme', () => {
    const controller = new SpinnerController({ colorScheme: 'default' });
    
    controller.setColorScheme('muted');
    const viewModel = controller.getViewModel();

    expect(viewModel.colorScheme).toBe('muted');
    expect(viewModel.styles.color).toBe('#a3a3a3');
  });

  it('should handle custom label', () => {
    const controller = new SpinnerController({ label: 'Processing...' });
    const viewModel = controller.getViewModel();

    expect(viewModel.label).toBe('Processing...');
    expect(viewModel.ariaLabel).toBe('Processing...');
  });

  it('should update label', () => {
    const controller = new SpinnerController({ label: 'Loading' });
    
    controller.setLabel('Saving...');
    const viewModel = controller.getViewModel();

    expect(viewModel.ariaLabel).toBe('Saving...');
  });

  it('should have accessibility attributes', () => {
    const controller = new SpinnerController({});
    const viewModel = controller.getViewModel();

    expect(viewModel.role).toBe('status');
    expect(viewModel.ariaLive).toBe('polite');
  });

  it('should apply correct stroke width per size', () => {
    const sizes: Array<{ size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; stroke: number }> = [
      { size: 'xs', stroke: 2 },
      { size: 'sm', stroke: 2 },
      { size: 'md', stroke: 3 },
      { size: 'lg', stroke: 3 },
      { size: 'xl', stroke: 4 },
    ];

    sizes.forEach(({ size, stroke }) => {
      const controller = new SpinnerController({ size });
      const viewModel = controller.getViewModel();
      expect(viewModel.styles.strokeWidth).toBe(stroke);
    });
  });
});
