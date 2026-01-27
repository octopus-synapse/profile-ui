

import { describe, it, expect } from 'bun:test';
import { BadgeController } from '../BadgeController';

describe('BadgeController', () => {
  it('should create with default state', () => {
    const controller = new BadgeController({});
    const viewModel = controller.getViewModel();

    expect(viewModel.variant).toBe('default');
    expect(viewModel.size).toBe('md');
    expect(viewModel.shape).toBe('rounded');
    expect(viewModel.dot).toBe(false);
    expect(viewModel.removable).toBe(false);
  });

  it('should create with custom state', () => {
    const controller = new BadgeController({
      variant: 'success',
      size: 'sm',
      shape: 'pill',
    });
    const viewModel = controller.getViewModel();

    expect(viewModel.variant).toBe('success');
    expect(viewModel.size).toBe('sm');
    expect(viewModel.shape).toBe('pill');
  });

  it('should update variant', () => {
    const controller = new BadgeController({ variant: 'default' });
    
    controller.setVariant('error');
    const viewModel = controller.getViewModel();

    expect(viewModel.variant).toBe('error');
    expect(viewModel.styles.backgroundColor).toBe('rgba(220,38,38,0.1)');
    expect(viewModel.styles.textColor).toBe('#ef4444');
  });

  it('should update size', () => {
    const controller = new BadgeController({ size: 'md' });
    
    controller.setSize('lg');
    const viewModel = controller.getViewModel();

    expect(viewModel.size).toBe('lg');
    expect(viewModel.styles.fontSize).toBe(14);
  });

  it('should update shape', () => {
    const controller = new BadgeController({ shape: 'rounded' });
    
    controller.setShape('square');
    const viewModel = controller.getViewModel();

    expect(viewModel.shape).toBe('square');
    expect(viewModel.styles.borderRadius).toBe(0);
  });

  it('should handle dot state', () => {
    const controller = new BadgeController({ dot: true });
    const viewModel = controller.getViewModel();

    expect(viewModel.dot).toBe(true);
    expect(viewModel.dotStyles).toEqual({ size: 6, gap: 6 });
  });

  it('should not include dotStyles when dot is false', () => {
    const controller = new BadgeController({ dot: false });
    const viewModel = controller.getViewModel();

    expect(viewModel.dotStyles).toBeUndefined();
  });

  it('should handle removable state', () => {
    const controller = new BadgeController({ removable: true });
    const viewModel = controller.getViewModel();

    expect(viewModel.removable).toBe(true);
    expect(viewModel.interactive).toBe(true);
  });

  it('should handle remove action', async () => {
    const controller = new BadgeController({ removable: true });
    let removed = false;

    await controller.onRemove(() => {
      removed = true;
    });

    expect(removed).toBe(true);
  });

  it('should throw error when removing non-removable badge', async () => {
    const controller = new BadgeController({ removable: false });

    expect(async () => {
      await controller.onRemove();
    }).toThrow();
  });

  it('should apply correct variant tokens', () => {
    const variants: Array<{
      variant: 'success' | 'warning' | 'error' | 'info';
      bg: string;
    }> = [
      { variant: 'success', bg: 'rgba(22,163,74,0.1)' },
      { variant: 'warning', bg: 'rgba(202,138,4,0.1)' },
      { variant: 'error', bg: 'rgba(220,38,38,0.1)' },
      { variant: 'info', bg: 'rgba(37,99,235,0.1)' },
    ];

    variants.forEach(({ variant, bg }) => {
      const controller = new BadgeController({ variant });
      const viewModel = controller.getViewModel();
      expect(viewModel.styles.backgroundColor).toBe(bg);
    });
  });
});
