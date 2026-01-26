import { describe, it, expect } from 'bun:test';
import { LoadingStateEntity } from '../../../domain/entities/loading-state/LoadingStateState';
import { LoadingStatePresenter } from '../LoadingStatePresenter';

describe('LoadingStatePresenter', () => {
  const presenter = new LoadingStatePresenter();

  it('should present loading state', () => {
    const entity = LoadingStateEntity.create({ variant: 'loading' });
    const vm = presenter.present(entity);
    expect(vm.isLoading).toBe(true);
    expect(vm.styles.icon).toBe('spinner');
  });

  it('should use assertive for errors', () => {
    const entity = LoadingStateEntity.create({ variant: 'error' });
    const vm = presenter.present(entity);
    expect(vm.ariaLive).toBe('assertive');
  });
});
