

import { describe, it, expect } from 'bun:test';
import { BadgeEntity } from '../../../domain/entities/badge/BadgeState';
import { BadgePresenter } from '../BadgePresenter';

describe('BadgePresenter', () => {
  const presenter = new BadgePresenter();

  it('should present default badge', () => {
    const entity = BadgeEntity.create({});
    const viewModel = presenter.present(entity);

    expect(viewModel.variant).toBe('default');
    expect(viewModel.size).toBe('md');
    expect(viewModel.shape).toBe('rounded');
  });

  it('should present badge with all states', () => {
    const entity = BadgeEntity.create({
      variant: 'primary',
      size: 'lg',
      shape: 'pill',
      dot: true,
      removable: true,
    });

    const viewModel = presenter.present(entity);

    expect(viewModel.variant).toBe('primary');
    expect(viewModel.size).toBe('lg');
    expect(viewModel.shape).toBe('pill');
    expect(viewModel.dot).toBe(true);
    expect(viewModel.removable).toBe(true);
    expect(viewModel.interactive).toBe(true);
  });

  it('should apply design tokens', () => {
    const entity = BadgeEntity.create({
      variant: 'success',
      size: 'sm',
      shape: 'rounded',
    });

    const viewModel = presenter.present(entity);

    expect(viewModel.styles).toEqual({
      paddingH: 8,
      paddingV: 2,
      fontSize: 12,
      borderRadius: 6,
      backgroundColor: 'rgba(22,163,74,0.1)',
      textColor: '#22c55e',
      borderColor: 'transparent',
    });
  });

  it('should include dot styles when dot is enabled', () => {
    const entity = BadgeEntity.create({ dot: true });
    const viewModel = presenter.present(entity);

    expect(viewModel.dotStyles).toEqual({ size: 6, gap: 6 });
  });

  it('should not include dot styles when dot is disabled', () => {
    const entity = BadgeEntity.create({ dot: false });
    const viewModel = presenter.present(entity);

    expect(viewModel.dotStyles).toBeUndefined();
  });

  it('should set role to status', () => {
    const entity = BadgeEntity.create({});
    const viewModel = presenter.present(entity);

    expect(viewModel.role).toBe('status');
  });

  it('should handle outline variant', () => {
    const entity = BadgeEntity.create({ variant: 'outline' });
    const viewModel = presenter.present(entity);

    expect(viewModel.styles.backgroundColor).toBe('transparent');
    expect(viewModel.styles.borderColor).toBe('rgba(255,255,255,0.1)');
  });
});
