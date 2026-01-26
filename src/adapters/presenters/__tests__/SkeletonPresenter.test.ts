

import { describe, it, expect } from 'bun:test';
import { SkeletonEntity } from '../../../domain/entities/skeleton/SkeletonState';
import { SkeletonPresenter } from '../SkeletonPresenter';

describe('SkeletonPresenter', () => {
  const presenter = new SkeletonPresenter();

  it('should present default skeleton', () => {
    const entity = SkeletonEntity.create({});
    const viewModel = presenter.present(entity);

    expect(viewModel.width).toBe('100%');
    expect(viewModel.height).toBe(20);
    expect(viewModel.variant).toBe('rectangular');
    expect(viewModel.animation).toBe('pulse');
  });

  it('should present circular skeleton', () => {
    const entity = SkeletonEntity.create({
      width: 40,
      height: 40,
      variant: 'circular',
    });

    const viewModel = presenter.present(entity);

    expect(viewModel.variant).toBe('circular');
    expect(viewModel.styles.borderRadius).toBe(9999);
  });

  it('should present shimmer animation', () => {
    const entity = SkeletonEntity.create({ animation: 'shimmer' });
    const viewModel = presenter.present(entity);

    expect(viewModel.animation).toBe('shimmer');
    expect(viewModel.isAnimated).toBe(true);
  });

  it('should present no animation', () => {
    const entity = SkeletonEntity.create({ animation: 'none' });
    const viewModel = presenter.present(entity);

    expect(viewModel.animation).toBe('none');
    expect(viewModel.isAnimated).toBe(false);
  });

  it('should apply design tokens', () => {
    const entity = SkeletonEntity.create({ variant: 'rounded' });
    const viewModel = presenter.present(entity);

    expect(viewModel.styles).toEqual({
      borderRadius: 8,
      baseColor: '#171717',
      highlightColor: '#262626',
    });
  });

  it('should include accessibility attributes', () => {
    const entity = SkeletonEntity.create({});
    const viewModel = presenter.present(entity);

    expect(viewModel.ariaLabel).toBe('Loading content');
    expect(viewModel.ariaLive).toBe('polite');
  });

  it('should handle string dimensions', () => {
    const entity = SkeletonEntity.create({
      width: '75%',
      height: '3rem',
    });

    const viewModel = presenter.present(entity);

    expect(viewModel.width).toBe('75%');
    expect(viewModel.height).toBe('3rem');
  });
});
