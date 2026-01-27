

import { describe, it, expect } from 'bun:test';
import { SkeletonController } from '../SkeletonController';

describe('SkeletonController', () => {
  it('should create with default state', () => {
    const controller = new SkeletonController({});
    const viewModel = controller.getViewModel();

    expect(viewModel.width).toBe('100%');
    expect(viewModel.height).toBe(20);
    expect(viewModel.variant).toBe('rectangular');
    expect(viewModel.animation).toBe('pulse');
    expect(viewModel.isAnimated).toBe(true);
  });

  it('should create with custom dimensions', () => {
    const controller = new SkeletonController({
      width: 200,
      height: 100,
    });
    const viewModel = controller.getViewModel();

    expect(viewModel.width).toBe(200);
    expect(viewModel.height).toBe(100);
  });

  it('should handle string dimensions', () => {
    const controller = new SkeletonController({
      width: '50%',
      height: '2rem',
    });
    const viewModel = controller.getViewModel();

    expect(viewModel.width).toBe('50%');
    expect(viewModel.height).toBe('2rem');
  });

  it('should update width', () => {
    const controller = new SkeletonController({ width: '100%' });
    
    controller.setWidth(150);
    const viewModel = controller.getViewModel();

    expect(viewModel.width).toBe(150);
  });

  it('should update height', () => {
    const controller = new SkeletonController({ height: 20 });
    
    controller.setHeight('3rem');
    const viewModel = controller.getViewModel();

    expect(viewModel.height).toBe('3rem');
  });

  it('should handle circular variant', () => {
    const controller = new SkeletonController({ variant: 'circular' });
    const viewModel = controller.getViewModel();

    expect(viewModel.variant).toBe('circular');
    expect(viewModel.styles.borderRadius).toBe(9999);
  });

  it('should handle rounded variant', () => {
    const controller = new SkeletonController({ variant: 'rounded' });
    const viewModel = controller.getViewModel();

    expect(viewModel.variant).toBe('rounded');
    expect(viewModel.styles.borderRadius).toBe(8);
  });

  it('should update variant', () => {
    const controller = new SkeletonController({ variant: 'rectangular' });
    
    controller.setVariant('circular');
    const viewModel = controller.getViewModel();

    expect(viewModel.variant).toBe('circular');
  });

  it('should handle different animations', () => {
    const animations: Array<'pulse' | 'shimmer' | 'none'> = ['pulse', 'shimmer', 'none'];

    animations.forEach((animation) => {
      const controller = new SkeletonController({ animation });
      const viewModel = controller.getViewModel();
      expect(viewModel.animation).toBe(animation);
    });
  });

  it('should update animation', () => {
    const controller = new SkeletonController({ animation: 'pulse' });
    
    controller.setAnimation('shimmer');
    const viewModel = controller.getViewModel();

    expect(viewModel.animation).toBe('shimmer');
  });

  it('should mark none animation as not animated', () => {
    const controller = new SkeletonController({ animation: 'none' });
    const viewModel = controller.getViewModel();

    expect(viewModel.isAnimated).toBe(false);
  });

  it('should have accessibility attributes', () => {
    const controller = new SkeletonController({});
    const viewModel = controller.getViewModel();

    expect(viewModel.ariaLabel).toBe('Loading content');
    expect(viewModel.ariaLive).toBe('polite');
  });

  it('should apply design tokens', () => {
    const controller = new SkeletonController({});
    const viewModel = controller.getViewModel();

    expect(viewModel.styles.baseColor).toBe('#171717');
    expect(viewModel.styles.highlightColor).toBe('#262626');
  });
});
