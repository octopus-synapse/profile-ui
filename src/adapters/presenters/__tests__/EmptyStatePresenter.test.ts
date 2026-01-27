

import { describe, it, expect } from 'bun:test';
import { EmptyStateEntity } from '../../../domain/entities/empty-state/EmptyStateState';
import { EmptyStatePresenter } from '../EmptyStatePresenter';

describe('EmptyStatePresenter', () => {
  const presenter = new EmptyStatePresenter();

  it('should present minimal empty state', () => {
    const entity = EmptyStateEntity.create({ title: 'No results' });
    const viewModel = presenter.present(entity);

    expect(viewModel.title).toBe('No results');
    expect(viewModel.description).toBeNull();
    expect(viewModel.size).toBe('md');
  });

  it('should present full empty state', () => {
    const entity = EmptyStateEntity.create({
      title: 'No items',
      description: 'Try adding some',
      hasIcon: true,
      hasAction: true,
      size: 'lg',
    });

    const viewModel = presenter.present(entity);

    expect(viewModel.title).toBe('No items');
    expect(viewModel.description).toBe('Try adding some');
    expect(viewModel.hasIcon).toBe(true);
    expect(viewModel.hasAction).toBe(true);
    expect(viewModel.interactive).toBe(true);
  });

  it('should apply size tokens', () => {
    const entity = EmptyStateEntity.create({ title: 'Empty', size: 'sm' });
    const viewModel = presenter.present(entity);

    expect(viewModel.styles).toEqual({
      padding: 32,
      iconSize: 24,
      titleSize: 16,
      descriptionSize: 12,
      iconColor: '#a3a3a3',
      titleColor: '#ffffff',
      descriptionColor: '#a3a3a3',
    });
  });

  it('should apply color tokens', () => {
    const entity = EmptyStateEntity.create({ title: 'Empty' });
    const viewModel = presenter.present(entity);

    expect(viewModel.styles.iconColor).toBe('#a3a3a3');
    expect(viewModel.styles.titleColor).toBe('#ffffff');
    expect(viewModel.styles.descriptionColor).toBe('#a3a3a3');
  });

  it('should set role to status', () => {
    const entity = EmptyStateEntity.create({ title: 'Empty' });
    const viewModel = presenter.present(entity);

    expect(viewModel.role).toBe('status');
  });

  it('should mark as interactive when hasAction', () => {
    const entity = EmptyStateEntity.create({
      title: 'Empty',
      hasAction: true,
    });
    const viewModel = presenter.present(entity);

    expect(viewModel.interactive).toBe(true);
  });

  it('should not be interactive without action', () => {
    const entity = EmptyStateEntity.create({
      title: 'Empty',
      hasAction: false,
    });
    const viewModel = presenter.present(entity);

    expect(viewModel.interactive).toBe(false);
  });
});
